import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { toastError, toastSuccess } from "../../utils/toast-popup";
import { registerNewUser } from "../../services/userService";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";
import withNavigateHook from "./withNavigateHook";

class Register extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }

    onFinish = async(values) => {
        console.log('Received values of form: ', values);
        let response = await registerNewUser(values.email, values.password);
        switch (response.EC) {
            case "REGISTER_SUCCESS":
                toastSuccess(response.EM)
                this.props.navigation('/login')
                break;
            case "ERR_EMAIL_EXISTED": 
                toastError(response.EM)
                break;
            default:
                toastSuccess('Lỗi đăng ký, vui lòng thử lại!')
                break;
        }
    }

    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    }
render() {
    return (
    <div>
        <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
        >

        <Form.Item
            label="Email trung tâm"
            name="email"
            rules={[
            {
                type: 'email',
                message: 'Email chưa hợp lệ!',
            },
            {   
                required: true,
                message: "Vui lòng nhập email của trung tâm!",
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
            {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                message: () => 
                <>
                    <p>
                        Mật khẩu hợp lệ gồm : 8 đến 15 ký tự chứa ít nhất một chữ thường, một chữ in hoa, một chữ số và một ký tự đặc biệt
                    </p>
                    <i>
                        Ví dụ: Quydsd12.,
                    </i>
                </>,
            },
            {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
            },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Vui lòng nhập lại mật khẩu bên trên!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Hai mật khẩu không khớp, vui lòng kiểm tra lại!'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    </div>
    );
}
}

export default withNavigateHook(Register)
