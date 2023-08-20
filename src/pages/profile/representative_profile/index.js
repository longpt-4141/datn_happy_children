import { Button, Col, Divider, Form, Input, Modal, Row, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatar, changePassWord, selectCurrentUser } from "../../../services/slicer/AuthSlicer";
import UploadFirebase from "../../../components/firebase-upload/UploadFirebase";
import "./index.scss";
function RepresentativeProfile() {
	const userData = useSelector(selectCurrentUser);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [avatar, setAvatarFile] = useState("");
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const handleGetAvatar = (avatarUrl) => {
		setAvatarFile(avatarUrl);
	};

	const handleRejectReport = async (value) => {
		// console.log(value);
    const password_data = {
      email : userData.email,
      old_password : value.old_password,
      new_password : value.new_password,
    }
		try {
      console.log(password_data)
      await dispatch(changePassWord({
        password_data
    })).unwrap();
    // navigate('/reports')
			setIsRejectModalOpen(false);
		} catch (error) {
			console.log("accept report failed", error);
		}
	};

	const showChangePassWordModal = () => {
		setIsRejectModalOpen(true);
	};

	const handleCancelReject = () => {
		setIsRejectModalOpen(false);
	};

  const handleUpdateAvatar = async () => {
    console.log({avatar});
    const change_avatar_request_data = {
      email : userData.email,
      avatar 
    }
		try {
      console.log(change_avatar_request_data)
      await dispatch(changeAvatar({
        change_avatar_request_data
    })).unwrap();
    // navigate('/reports')
		} catch (error) {
			console.log("change avatar", error);
		}
  }

	return (
		<div className="representative-profile__page">
			<h3
				style={{
					color: "var(--mainColor)",
					fontSize: "20px",
					fontWeight: "500",
					marginBottom: "40px",
				}}
			>
				Thông tin đại diện trung tâm
			</h3>
			<Row
				style={{
					justifyContent: "space-between",
				}}
			>
				<Col span={6} className="avatar-container">
					<UploadFirebase
						getUrl={handleGetAvatar}
						avatarUrl={userData.avatar}
					/>
					<Space>
						<Button
							className="update_password"
							onClick={showChangePassWordModal}
						>
							Đổi mật khẩu
						</Button>
						<Button type="primary" onClick={handleUpdateAvatar}>Cập nhật avatar</Button>
					</Space>
				</Col>
				<Col span={16}>
					<Space
						size={20}
						direction="vertical"
						style={{ width: "100%" }}
					>
						<Row>
							<Col
								span={6}
								style={{
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								Tên đại diện :
							</Col>
							<Col>
								<div>{userData.username}</div>
							</Col>
						</Row>
						<Row>
							<Col
								span={6}
								style={{
									fontSize: "16px",
									fontWeight: "500",
								}}
							>
								Địa chỉ mail :
							</Col>
							<Col>
								<div>{userData.email}</div>
							</Col>
						</Row>
					</Space>
				</Col>
			</Row>
			<Modal
				className="modal--reject_confirm"
				title="Xác nhận thay đổi mật khẩu"
				open={isRejectModalOpen}
				onOk={form.submit}
				// okButtonProps={{form:'reject-form', key: 'submit', htmlType: 'submit'}}
				onCancel={handleCancelReject}
				okText="Xác nhận đổi mật khẩu"
				cancelText="Bỏ qua"
			>
				<Divider
					style={{
						margin: "5px 0 15px 0",
					}}
				/>
				<p>
					Bạn có thực sự muốn đổi mật khẩu không ? Nếu có hãy
					điền thông tin mật khẩu mới nhé
				</p>
				<Form
					id="reject-form"
					form={form}
					onFinish={handleRejectReport}
					style={{
						maxWidth: 600,
						marginTop: 20,
					}}
					layout="vertical"
				>
					<Form.Item
						label="Mật khẩu cũ"
						name="old_password"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập mật khẩu ban đầu!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						label="Mật khẩu mới"
						name="new_password"
						rules={[
							{
								pattern:
									/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
								message: () => (
									<>
										<p>
											Mật khẩu hợp lệ gồm : 8 đến 15 ký tự
											chứa ít nhất một chữ thường, một chữ
											in hoa, một chữ số và một ký tự đặc
											biệt
										</p>
										<i>Ví dụ: Quydsd12.,</i>
									</>
								),
							},
							{
								required: true,
								message: "Vui lòng nhập mật khẩu!",
							},
              ({ getFieldValue }) => ({
                validator(_, value) {
                // console.log(form.getFieldsValue(['old_password']), value)
                
                if (!value || value !== getFieldValue('old_password')) {
                    return Promise.resolve();
                } else {
                  return Promise.reject(new Error(`Bạn hãy nhập mật khẩu khác mật khẩu cũ`)); 
                  // và lớn nhất cho 1 yêu cầu là ${convertVNDMoney(normalMoneyData)}
                  }
                }
            }),
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Xác nhận mật khẩu mới"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Vui lòng nhập lại mật khẩu bên trên!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("new_password") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											"Hai mật khẩu không khớp, vui lòng kiểm tra lại!"
										)
									);
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default RepresentativeProfile;
