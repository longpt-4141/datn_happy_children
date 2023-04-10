import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Row,Col, Input, Form, Button,} from 'antd';
import UploadImage from '../../../../components/upload-image/Upload';
import {arrayBufferToBase64} from '../../../../utils/render-image';
import './CenterProfile.scss'



const CenterProfile = () => {

    let { id } = useParams(); 
    const [centerData, setCenterData] = useState([])
    const [centerName, setCenterName] = useState('')
    const [centerEmail, setCenterEmail] = useState('')
    const [centerPhone, setCenterPhone] = useState('')
    const [centerAddress, setCenterAddress] = useState('')
    const [avatar, setAvatarFile] = useState('')

    const [form] = Form.useForm();


    //call center data

    const handleGetAvatar = (avatarUrl) => {

        setAvatarFile(avatarUrl)
    }

    // put data

    const editCenterData = async () => {
        const center = {id, centerName, avatar, centerEmail, centerPhone, centerAddress}
        console.log(center)
        try{
            await axios({
                method: "PUT",
                url: `http://localhost:8080/centers/${id}`,
                data: center
            })
            
        }catch(err){
            if (err.response.status === 404) {
                console.log('Resource could not be found!');
            } else {
                console.log(err.message);
            }
        }
    }

    const onFinish = () => {
        editCenterData()
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:8080/centers/${id}`)
            .then((res) =>{
                form.setFieldsValue({
                    name: res.data.name,
                    email: res.data.user.email,
                    phone_number: res.data.phone_number,
                    address: res.data.address
                })
    
                setCenterData({
                    name: res.data.name,
                    avatar : res.data.avatar === null ? null : arrayBufferToBase64(res.data.avatar),
                    email: res.data.user.email,
                    phone_number: res.data.phone_number,
                    address: res.data.address,
                })
            })
        }
        getData()
    }, [form, id])


    return (
        <div className='profile--container'>
            {
                centerData ? 
                <Row>
                <Col md={4} >
                    <div className='avatar'>
                        {/* {
                            centerData.avatar ? <Avatar
                                        size={120}
                                        src={centerData.avatar}
                                        className='profile__left--avatar'
                                    /> 
                                    :  */}
                                    <UploadImage getUrl={handleGetAvatar} avatarUrl={centerData.avatar}/>
                        
                    </div>
                    <div className='location'>
                    </div>
                </Col>
                <Col md={18} offset={0} >
                    <div className="center--information">
                    
                        <Form 
                        form={form}
                        labelCol={{
                        span: 8,
                        }}
                        wrapperCol={{
                        span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item 
                                name="name"
                                label="Tên trung tâm" 
                                rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên trung tâm',
                                        },
                                        ]}
                            >
                                <Input
                                type="text"
                                bordered={false}
                                allowClear={true}
                                className="input--text"
                                onChange={(e) => {
                                    setCenterName(e.target.value);
                                }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                        ]}
                            >
                                <Input
                                type="email"
                                bordered={false}
                                allowClear={true}
                                className="input--text"
                                onChange={(e) => {
                                    setCenterEmail(e.target.value);
                                }}
                                />
                            </Form.Item>
                            <Form.Item 
                                name="phone_number"
                                label="Số điện thoại" 
                                rules={[
                                        {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại ',
                                        },
                                        ]}
                                >
                                <Input
                                type="text"
                                bordered={false}
                                allowClear={true}
                                className="input--text"
                                onChange={(e) => {
                                    setCenterPhone(e.target.value);
                                }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Địa chỉ" 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ trung tâm!',
                                    },
                                    ]}
                                >
                                <Input
                                type="text"
                                bordered={false}
                                allowClear={true}
                                className="input--text"
                                onChange={(e) => {
                                    setCenterAddress(e.target.value);
                                }}
                                />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 21,
                                    span: 4,
                                }}
                                >
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                        
                    </div>
                </Col>
            </Row>
            : 
            null
            }
        </div>
    );
}

export default CenterProfile