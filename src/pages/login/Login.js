import React, { Component } from 'react';
import { LockOutlined,  MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import './Login.scss';
import PropTypes from 'prop-types';
import login_img_1  from './image/login_1.svg';
import login_img_2  from './image/login_2.svg';
import login_img_3  from './image/Login_3.svg';
import login_img_4  from './image/Login_4.svg';
import {ReactComponent as MenuShortLogo} from '../../assets/img/short_logo/Menu_short_logo.svg';

class Login extends Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }
    
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    render() {
        return (
            <div className="login">
                <div className="loginGlass">
                    <Row>
                        <Col
                            className="login_pic"
                            span={12}
                        >
                            <div className="image">
                                <div class="shape"></div>
                                <span className="login_img_2">
                                    <img src={login_img_2} alt="login_img_2" />
                                </span>
                                <span className="login_img_1">
                                    <img 
                                    src={login_img_1} alt="login_img_1" />
                                </span>
                                <span className="login_img_3">
                                    <img src={login_img_3} alt="login_img_3" />
                                </span>
                                <span className="login_img_4">
                                    <img src={login_img_4} alt="login_img_4" />
                                </span>
                                <div className="shape_con shape_con_1"></div>
                                <div className="shape_con shape_con_2"></div>
                                <div className="shape_con shape_con_3"></div>
                                <div className="shape_con shape_con_4"></div>
                                <div className="shape_con shape_con_5"></div>
                                <div className="message">
                                    <h2>Trẻ em luôn xứng đáng được hạnh phúc</h2>
                                    <p>Hãy lan truyền thông điệp này tới mọi người trên toàn thế giới.</p>
                                </div>
                            </div>
                        </Col>
                        <Col
                            className="login_form"
                            span={12}
                        >
                            <span className="login_form__logo">
                                <MenuShortLogo/>
                            </span>
                            <h2>
                                <p style={{marginBottom : '8px'}}>Happy Children</p>
                                Xin chào bạn
                            </h2>
                            <Form
                            name="normal_login"
                            className="login-form__container"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            >
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email của bạn!",
                                },
                                ]}
                            >
                                <Input
                                type="email"
                                className="username_input"
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu!",
                                },
                                ]}
                            >
                                <Input
                                className="password_input"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="/">
                                Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                >
                                Log in
                                </Button>
                                Or <a href="/">register now!</a>
                            </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Login;
