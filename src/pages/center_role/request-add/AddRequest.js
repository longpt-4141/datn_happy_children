import React, { useState } from 'react';
import { Form, Row, Col, Input, Select, InputNumber, Button, Tooltip } from 'antd';
import './AddRequest.scss'
import { REQUEST_TYPE } from '../../../constants/requests';
import { regexMoney } from '../../../utils/Regex';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCenterId } from '../../../services/slicer/AuthSlicer';
import { createNewRequest, } from '../../../services/slicer/RequestSlicer';
import { useNormalMoney } from '../../requests';
import convertVNDMoney from '../../../utils/format/money-format';

const AddRequest = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const centerId = useSelector(selectCenterId);
    const [inputMoney, setInputMoney] = useState('')
    const dispatch = useDispatch()

    const formatNumber = (value) => new Intl.NumberFormat().format(value);
    const {normalMoneyData, isNormalMoneyLoading} = useNormalMoney()
    const onFinish = (values) => {
        let requestData = {
            centerId: +centerId,
            type_request: values.type_request,
            description: values.description,
            total_money : values.total_money,
            estimated_budget_url : values.estimated_budget_url
        }
        console.log({requestData})
        dispatch(createNewRequest({requestData, navigate}))
    }
    const handleCancel = () => {
        navigate(-1)
    }

    const handleChange = (value) => {
        console.log(formatNumber(value))
        setInputMoney(formatNumber(value))
    }

    return (
        <div className="request--add__page">
            <div className="request--add__title">
                <h3
                    style={{
                        color : 'var(--mainColor)',
                        fontSize : '20px',
                        fontWeight: '500'
                    }}
                >
                    Thêm mới yêu cầu
                </h3>
            </div>
            <Row>
                <Col span={12} offset={6}>
                    <div className="request--add__form">
                        <div className='form--title'>
                            <h4
                                style={{
                                    color : 'var(--mainColor)',
                                    fontSize : '16px',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Đơn yêu cầu
                            </h4>
                        </div>
                        <div className="form--inner">
                        <Form
                                form={form}
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <Form.Item
                                    name='type_request' 
                                    label="Loại yêu cầu :"
                                    placeholder='Hãy lựa chọn loại yêu cầu'
                                    rules={[
                                            {
                                                required: true,
                                                message: 'Bạn chưa chọn loại yêu cầu',
                                            },
                                    ]}
                                >
                                    <Select 
                                        placeholder="Chọn loại yêu cầu" 
                                        showSearch
                                        filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={REQUEST_TYPE.map((type) => 
                                            ({
                                                label: type.title,
                                                value: type.value
                                            })
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='description' 
                                    label="Mô tả yêu cầu :"
                                    rules={[
                                            {
                                                required: true,
                                                message: 'Bạn chưa ghi rõ yêu cầu',
                                            },
                                    ]}
                                >
                                    <Input.TextArea 
                                        placeholder='Hãy mô tả yêu cầu của bạn'
                                        rows={6}
                                        maxLength={255}
                                        showCount
                                    />
                                </Form.Item>
                                <Tooltip title={inputMoney}>
                                <Form.Item
                                    name='total_money' 
                                    label="Số tiền cần hỗ trợ :"
                                    rules={[
                                            {
                                                pattern: regexMoney,
                                                message: () => 
                                                <>
                                                    <p>
                                                        Số tiền hợp lệ chỉ bao gồm số và không bắt đầu từ số 0
                                                    </p>
                                                    <i>
                                                        Ví dụ: 1000000
                                                    </i>
                                                </>,
                                            },
                                            {
                                                required: true,
                                                message: 'Bạn chưa ghi rõ số tiền',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                if (!value || (value > 1000 && value < normalMoneyData)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error(`Số tiền nhỏ nhất là 1,000đ và lớn nhất cho 1 yêu cầu là ${convertVNDMoney(normalMoneyData)}`));
                                                },
                                            }),
                                    ]}
                                >
                                        <InputNumber  
                                            type='number'
                                            addonAfter="vnđ"  
                                            placeholder='Ví dụ: 1.000.000'
                                            onChange={handleChange}
                                            // value={inputMoney}
                                            style={{
                                                width: '60%',
                                            }}
                                        />
                                </Form.Item>
                                </Tooltip>
                                <Form.Item
                                    name="estimated_budget_url"
                                    label="Link tài liệu dự toán"
                                    rules={[
                                    {
                                        required: true,
                                        message: 'Bạn cần gửi tài liệu để chúng tôi tham khảo dự toán'
                                    },
                                    {
                                        type: 'url',
                                        warningOnly: true,
                                        message: 'đường link hợp lệ sẽ như sau : https/long.com'
                                    },
                                    ]}
                                >
                                    <Input placeholder="Hãy nhập link tài liệu (doc, sheet, ....)" />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 13,
                                        span: 11,
                                    }}
                                    >
                                    <Button 
                                        onClick={handleCancel}
                                        type="default" 
                                        style={{
                                            float: 'left',
                                        }}
                                    >
                                        Hủy bỏ
                                    </Button>
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        style={{
                                            float: 'right',
                                        }}
                                    >
                                        Tạo mới yêu cầu
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AddRequest;
