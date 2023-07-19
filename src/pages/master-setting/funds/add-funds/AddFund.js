import React, { useEffect } from "react";
import "./AddFund.scss";
import ImgCrop from "antd-img-crop";
import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Upload,
	message,
} from "antd";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../../configs/firebaseConfig";
import { regexMoney } from "../../../../utils/Regex";
import { toastError, toastWarning } from "../../../../utils/toast-popup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewFund } from "../../../../services/slicer/FundSlicer";
import dayjs from 'dayjs';
const AddFund = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [imageUrl, setImageUrl] = useState();
	const [fileList, setFile] = useState([]);
	const [idDateDisable, setIdDateDisable] = useState(null);
	const dispatch = useDispatch();

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
	const handleChange = (info) => {
		console.log("file", info.file);
		if (info.file.status === "done") {
			setFile(info.fileList);
			console.log(info.file);
		}
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
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
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
				dispatch(createNewFund({ fundData })).unwrap();
				navigate("/master-setting");
			} catch (err) {
				toastError("Xảy ra lỗi, vui lòng tải lại trang và thử lại");
			}
			console.log({ fundData });
		}
	};

	const handleChangeDate = (value) => {
		console.log(value);
		if (value !== undefined && value !== null) {
			setIdDateDisable(false);
		} else {
			setIdDateDisable(true);
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
					Thêm mới quỹ
				</h3>
			</div>
			<div className="fund--add__body">
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
									onChange={handleChange}
									onPreview={onPreview}
									beforeUpload={beforeUpload}
									customRequest={customUpload}
									className="article-add__thumbnail-upload"
								>
									{fileList.length >= 1 ? "" : "+ Upload"}
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
													Số tiền hợp lệ chỉ bao gồm
													số và không bắt đầu từ số 0
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
									onChange={handleChangeDate}
									disabledDate={disabledDate}
									style={{
										width: "100%",
									}}
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
									placeholder="Vô thời hạn"
									className="established__date--picker"
									disabled={idDateDisable}
									disabledDate={disabledEndOfFundDate}
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
							Thêm mới
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AddFund;
