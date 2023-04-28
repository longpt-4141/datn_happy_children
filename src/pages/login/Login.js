import React from 'react';
import { LockOutlined,  MailOutlined, } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row } from 'antd';
import {  useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import './Login.scss';
// import PropTypes from 'prop-types';
import login_img_1  from './image/login_1.svg';
import login_img_2  from './image/login_2.svg';
import login_img_3  from './image/Login_3.svg';
import login_img_4  from './image/Login_4.svg';
import {ReactComponent as MenuShortLogo} from '../../assets/img/short_logo/Menu_short_logo.svg';

import {authLoginUser} from '../../services/userService';
import { toastError, toastSuccess } from "../../utils/toast-popup";

// import { UserContext } from '../../context/UserProvider';
import { useDispatch, useSelector } from 'react-redux';
import AuthSlice, {  selectCurrentUser } from '../../services/slicer/AuthSlicer';

const Login = () => {
    
    const [form] = Form.useForm();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    // const message = useSelector(selectLoginMessage);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch()
    console.log(user)

    const onFinish = async (values) => {
        console.log(values)
        const userEmail = values.email
        const userPassword = values.password
        const userData = {
            email: userEmail,
            password: userPassword
        }
        let dataResponse = await authLoginUser(userData)
        // const result = await dispatch(checkAuthUser(userData)).unwrap();
        dispatch(AuthSlice.actions.setCredentials(dataResponse));
        // console.log({result})
        const message = dataResponse
        console.log({message})
        switch (message.EC) {
            case "LOGIN_SUCCESS":
                let data = {
                    isAuthenticated: true,
                    token: 'fake token'
                }
                toastSuccess(message.EM)
                sessionStorage.setItem("account", JSON.stringify(data));
                // login(dataResponse.DT)
                navigate('/')
                break;
            case "ERR_PASSWORD_WRONG": 
                toastError(message.EM)
                break;
            case "ERR_EMAIL_NOT_EXISTED": 
                toastError(message.EM)
                break;
            default:
                toastError('Lỗi đăng nhập, vui lòng thử lại!')
                break;
        }
    }

    const checkInitValue = () => {
        if (!email || !password) { 
            return true;
        }
        else return false;
    }
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
                            form={form}
                            name="normal_login"
                            className="login-form__container"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            >
                            <Form.Item
                                name="email"
                                rules={[
                                {
                                    type: 'email',
                                    message: "Sai định dạng email, vui lòng kiểm tra lại!"
                                },
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
                                onChange={(e) => {setEmail(e.target.value)}}
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
                                <Input.Password
                                className="password_input"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {setPassword(e.target.value)}}
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
                            <Form.Item shouldUpdate>
                                {() => (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={
                                    checkInitValue()||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    Log in
                                </Button>
                                )}
                            </Form.Item>
                            Or <Link to="/register">register now!</Link>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
}

export default Login;
