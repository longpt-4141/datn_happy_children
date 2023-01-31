import React, { Component } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        Axios.post('http://localhost:8080/register', values)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error)
            });
    }

    onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    }
render() {

    Axios({
        method: "GET",
        url: "http://localhost:8080/register",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.data.message);
      });

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
            label="Username"
            name="username"
            rules={[
            {
                required: true,
                message: "Please input your username!",
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
            {   
                type : 'email',
                required: true,
                message: "Please input your email!",
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
            {
                required: true,
                message: "Please input your password!",
            },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
        {
            required: true,
            message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
        }),
        ]}
    >
        <Input.Password />
    </Form.Item>

        <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Checkbox>Remember me</Checkbox>
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

export default Register;
