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
import { editTopic, getSpecificTopic, selectTopicItem, selectTopicLoading } from "../../../../services/slicer/TopicSlicer";
function TopicEditPage() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();


	const topicItem = useSelector(selectTopicItem);

	const TopicLoading = useSelector(selectTopicLoading);
	console.log("topicdd", topicItem);

	const [imageUrl, setImageUrl] = useState("");


	const handleSubmit = (value) => {
		console.log(value);
		if (value.name === topicItem.name) {
			toastWarning("Bạn chưa thay đổi tên chủ đề");
		} else {
			const topicData = {
				...value,
			};
			try {
				dispatch(editTopic({ id, topicData })).unwrap();
				navigate("/master-setting");
			} catch (err) {
				toastError("Xảy ra lỗi, vui lòng tải lại trang và thử lại");
			}
			console.log({ topicData });
		}
	};

	useEffect(() => {
		dispatch(getSpecificTopic({ id }));
	}, [dispatch, id]);

	useEffect(() => {
		if (topicItem) {
			form.setFieldsValue({
				name: topicItem.name,
			});
		}
	}, [form, topicItem]);


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
					Chỉnh sửa chủ đề
				</h3>
			</div>
			<div className="fund--add__body">
				{!TopicLoading ? (
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						name="name"
						label="Tên chủ đề :"
						rules={[
							{
								required: true,
								message: "Bạn chưa nhập tên chủ đề",
							},
						]}
					>
						<Input placeholder="Hãy nhập tên chủ đề" />
					</Form.Item>
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

export default TopicEditPage;
