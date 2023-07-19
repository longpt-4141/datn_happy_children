import React, { useEffect } from "react";
import "./AddTopic.scss";
import {
	Button,
	Col,
	Form,
	Input,
	Row,
} from "antd";
import { useState } from "react";
import { toastError, toastWarning } from "../../../../utils/toast-popup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewFund } from "../../../../services/slicer/FundSlicer";
import { createNewTopic } from "../../../../services/slicer/TopicSlicer";
const AddTopic = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const handleSubmit = (value) => {
            const topicData = {
                ...value
            }
			try {
				dispatch(createNewTopic({ topicData })).unwrap();
				navigate("/master-setting");
			} catch (err) {
				toastError("Xảy ra lỗi, vui lòng tải lại trang và thử lại");
			}
			console.log({ topicData });
	};

	return (
		<div className="add-topic-page">
			<div className="topic--add__title">
				<h3
					style={{
						color: "var(--mainColor)",
						fontSize: "20px",
						fontWeight: "500",
					}}
				>
					Thêm mới chủ đề
				</h3>
			</div>
			<div className="topic--add__body">
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
							Thêm mới
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default AddTopic;
