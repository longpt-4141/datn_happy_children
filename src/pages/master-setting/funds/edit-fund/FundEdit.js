import {
	DatePicker,
	Divider,
	Form,
	InputNumber,
	Modal,
	Upload,
	Input,
	message,
	Button,
	Row,
	Col,
} from "antd";
import React from "react";
import { regexMoney } from "../../../../utils/Regex";
import ImgCrop from "antd-img-crop";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../../configs/firebaseConfig";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	editFund,
	getSpecificFund,
	selectFundItem,
	selectFundLoading,
} from "../../../../services/slicer/FundSlicer";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastWarning } from "../../../../utils/toast-popup";
import SyncLoading from "../../../../components/spinners/SyncLoading";
import dayjs from "dayjs";
// import 'dayjs/locale/zh-cn';
import locale from "antd/locale/vi_VN";
function FundEditPage() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const [idDateDisable, setIdDateDisable] = useState(null);

	const fundItem = useSelector(selectFundItem);

	const FundLoading = useSelector(selectFundLoading);
	console.log("fundid dd", fundItem);

	const [imageUrl, setImageUrl] = useState("");

	const [fileList, setFile] = useState([]);
	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	const beforeUpload = (file) => {
		const isJpgOrPng =
			file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("You can only upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Image must smaller than 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange = ({ fileList: newFileList }) => {
		// console.log({newFileList})
		if (newFileList.length === 0) {
			setImageUrl(null);
		}
		return setFile(newFileList);
	};

	const customUpload = async ({ onError, onSuccess, file }) => {
		if (!file) {
			alert("Please choose a file first!");
		}
		const storageRef = ref(storage, `/news/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// const percent = Math.round(
				// (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// );
			},
			(err) => console.log(err),
			() => {
				// download url
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log(url);
					setImageUrl(url);
					onSuccess(null, url);
				});
			}
		);
	};

	const handleSubmit = (value) => {
		console.log(value);
		if (!imageUrl) {
			toastWarning("Bạn chưa thêm ảnh cho quỹ, vui lòng thêm ảnh");
		} else {
			const fundData = {
				image_url: imageUrl,
				end_at: value.end_at === undefined ? null : value.end_at,
				sponsor_estimate_amount:
					value.sponsor_estimate_amount === undefined
						? null
						: value.sponsor_estimate_amount,
				...value,
			};
			try {
				dispatch(editFund({ id, fundData })).unwrap();
				// navigate("/master-setting");
			} catch (err) {
				toastError("Xảy ra lỗi, vui lòng tải lại trang và thử lại");
			}
			console.log({ fundData });
		}
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current && current < dayjs().startOf('day');
	};

	const disabledEndOfFundDate = (current) => {
		const startFund = form.getFieldValue('start_at');
		return current < dayjs().endOf(startFund)
	}

	useEffect(() => {
		dispatch(getSpecificFund({ id }));
	}, [dispatch, id]);

	useEffect(() => {
		if (fundItem) {
			form.setFieldsValue({
				name: fundItem.name,
				description: fundItem.description,
				sponsor_estimate_amount: fundItem.sponsor_estimate_amount
					? fundItem.sponsor_estimate_amount
					: 0,
				// general_pay_amount : fundItem.general_pay_amount ? fundItem.general_pay_amount : null,
				end_at: fundItem.end_at
					? dayjs(fundItem.end_at, "YYYY-MM-DD")
					: "",
				start_at: fundItem.start_at
					? dayjs(fundItem.start_at, "YYYY-MM-DD")
					: "",
			});
		}
		setImageUrl(fundItem.image_url);
		setFile([
			{
				uid: "-1",
				name: "image.png",
				status: "done",
				url: fundItem.image_url,
			},
		]);
	}, [form, fundItem]);

	useEffect(() => {
		if (form.getFieldValue("start_at") === undefined) {
			console.log(form.getFieldValue("start_at"));
			setIdDateDisable(true);
		} else {
			setIdDateDisable(false);
		}
	}, [form]);

	return (
		<div className="add-fund-page">
			<div className="fund--add__title">
				<h3
					style={{
						color: "var(--mainColor)",
						fontSize: "20px",
						fontWeight: "500",
					}}
				>
					Chỉnh sửa quỹ
				</h3>
			</div>
			<div className="fund--add__body">
				{!FundLoading ? (
					<Form form={form} layout="vertical" onFinish={handleSubmit}>
						<Form.Item
							name="name"
							label="Tên quỹ :"
							rules={[
								{
									required: true,
									message: "Bạn chưa nhập tên quỹ",
								},
							]}
						>
							<Input placeholder="Hãy nhập tên quỹ" />
						</Form.Item>
						<div className="fund--add__image">
							<Form.Item name="image" label="Ảnh :">
								<ImgCrop rotationSlider aspect={16 / 9}>
									<Upload
										listType="picture-card"
										fileList={fileList}
										onChange={handleChange}
										onPreview={onPreview}
										beforeUpload={beforeUpload}
										customRequest={customUpload}
										className="article-edit__thumbnail-upload"
										maxCount={1}
									>
										{fileList.length >= 1
											? null
											: "+ Upload"}
									</Upload>
								</ImgCrop>
							</Form.Item>
						</div>
						<Form.Item
							name="description"
							label="Mô tả quỹ :"
							rules={[
								{
									required: true,
									message: "Bạn chưa mô tả quỹ",
								},
							]}
						>
							<Input.TextArea
								placeholder="Hãy mô tả quỹ của bạn"
								rows={6}
								maxLength={255}
								showCount
							/>
						</Form.Item>
						<Row>
							<Col span={11}>
								<Form.Item
									name="sponsor_estimate_amount"
									label="Số tiền cần hỗ trợ :"
									rules={[
										{
											pattern: regexMoney,
											message: () => (
												<>
													<p>
														Số tiền hợp lệ chỉ bao
														gồm số và không bắt đầu
														từ số 0
													</p>
													<i>Ví dụ: 1000000</i>
												</>
											),
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || value > 10000) {
													return Promise.resolve();
												}
												return Promise.reject(
													new Error(
														`Số tiền nhỏ nhất là 10,000đ`
													)
												);
											},
										}),
									]}
								>
									<InputNumber
										type="number"
										addonAfter="vnđ"
										placeholder="Ví dụ: 1.000.000"
										onChange={handleChange}
										// value={inputMoney}
										style={{
											width: "100%",
										}}
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={11}>
								<Form.Item
									name="start_at"
									label="Ngày mở quỹ"
									rules={[
										{
											required: true,
											message: "Bạn cần chọn ngày mở quỹ",
										},
									]}
								>
									<DatePicker
										placeholder="VD: 27/08/2023"
										className="established__date--picker"
										style={{
											width: "100%",
										}}
										disabledDate={disabledDate}
									/>
								</Form.Item>
							</Col>
							<Col span={11} offset={2}>
								<Form.Item 
									name="end_at" 
									label="Ngày đóng quỹ"
									rules={[
										({ getFieldValue }) => ({
											validator(rule, value) {
												// from 'getFieldValue("fieldName")' we can get the current value of that field.
												if (
													value <
													getFieldValue("start_at")
												) {
													// value = currentValue of this field. with that we can do validations with other values in form fields
													return Promise.reject(
														"End range must be greater than start"
													); // The validator should always return a promise on both success and error
												} else if (
													value ===
													getFieldValue("start_at")
												) {
													return Promise.reject(
														"End cannot be same as start"
													);
												} else {
													return Promise.resolve();
												}
											},
										}),
									]}
								>
									<DatePicker
										disabled={idDateDisable}
										disabledDate={disabledEndOfFundDate}
										placeholder="Vô thời hạn"
										className="established__date--picker"
										style={{
											width: "100%",
										}}
									/>
								</Form.Item>
							</Col> 
						</Row>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								style={{
									float: "right",
								}}
							>
								Sửa
							</Button>
						</Form.Item>
					</Form>
				) : (
					<>
						<SyncLoading />
					</>
				)}
			</div>
		</div>
	);
}

export default FundEditPage;
