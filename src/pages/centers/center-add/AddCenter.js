import React from 'react';
import { Row, Col ,Input, Form, DatePicker, AutoComplete, Space, Button, Divider ,Select} from 'antd';
import './AddCenter.scss';
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { formatDate } from '../../../utils/format/date-format';
import { getProvinceData, getDistrictData, getProvinceName } from '../../../utils/province-city-data';
import banklist from '../../../constants/bank.json'
import { regexPhone } from '../../../utils/Regex';

import { createNewCenter } from '../../../services/centerService';
import { toastSuccess, toastError } from '../../../utils/toast-popup';

const provinceData = getProvinceData();
const districtData = getDistrictData();

const AddCenter = () => {
    const [form] = Form.useForm();
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const [fittedDistrict, setFittedDistrict] = useState([]);
    const navigate = useNavigate();

    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Vui lòng chọn ngày thành lập!',
            },
        ],
    };

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
            } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
            }
        };
        const websiteOptions = autoCompleteResult.map((website) => ({
            label: website,
            value: website,
    }));

    const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 24,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 21,
                },
            },
        };
    const taiFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 23
                },
            },
        };

    const handleProvinceChange = (value) => {
        const a = getProvinceName(value)
        let newArr = []
        districtData.forEach((item) => {
            if(item.name_code === value) {
                newArr.push(item);
            }
        })
        setFittedDistrict(newArr[0].districts)
    }

    const onCityChange = (value) => {
        console.log(value)
    }

    const handlePhoneNumberChange = (e) => {
        console.log('phone number: ',e.target.value, typeof e.target.value)
    }

    const onFinish = async (values) => {
        let name = values.name;
        let established_date = values.established.$d; // DD/MM/YYYY : 02/04/2023
        let province = values.province;
        let district = values.district;
        let address = values.address;
        let center_email = values.email;
        let phone_number = values.phone_number;
        let website = values.website;
        let bank_list = [
            {
                name: values.bank_name,
                account_number: values.bank_account
            }
        ];
        if(values.bank_info !== undefined ) {
            values.bank_info.forEach((bank) => {
                bank_list.push({
                    name: bank.bank_name,
                    account_number: bank.bank_account
                })
            })
        }

        let dataResponse = await createNewCenter(
            name,
            established_date,
            province, 
            district, 
            address,
            center_email,
            phone_number, 
            website, 
            bank_list
        )
        switch (dataResponse.EC) {
            case "CREATE_NEW_CENTER_SUCCESS":
                toastSuccess(dataResponse.EM)
                navigate('/centers')
                break;
            case "ERR_EMAIL_EXISTED": 
                toastError(dataResponse.EM)
                break;
            case "ERR_PHONE_EXISTED": 
                toastError(dataResponse.EM)
                break;
            default:
                toastError('Xin lỗi không thể thêm mới trung tâm, vui lòng thử lại!')
                break;
        }

    }   

    return (
        <div className='center__add--page'>
            <h2 className='center__add--title'>
                Thêm trung tâm mới
            </h2>
            <div className="center__add--form">
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name="name"
                                label="Tên trung tâm"
                                rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên của trung tâm!',
                                },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập tên trung tâm"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item 
                                name="established" 
                                label="Ngày thành lập" 
                                {...config}
                            >
                                <DatePicker 
                                    placeholder='Hãy chọn ngày thành lập'
                                    className='established__date--picker'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23}>
                            <Divider className='contact__information'>
                                Thông tin liên lạc
                            </Divider>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name="province"
                                label="Tỉnh thành phố"
                                rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn tỉnh thành phố!',
                                },
                                ]}
                            >
                                <Select
                                    placeholder="Hãy chọn tỉnh thành"
                                    showSearch
                                    onChange={handleProvinceChange}
                                    options={provinceData.map((province) => ({
                                        label: province.name,
                                        value: province.name_code,
                                    }))}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item 
                                name="district" 
                                label="Quận huyện"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn quận huyện!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Hãy chọn quận huyện"
                                    showSearch
                                    onChange={onCityChange}
                                    filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={fittedDistrict.map((city) => ({
                                        label: city.name,
                                        value: city.name,
                                    }))}
                                    />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                {...taiFormItemLayout}
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập địa chỉ"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                name="email"
                                label="Địa chỉ mail"
                                rules={[
                                        {
                                            type: 'email',
                                            message: 'Email chưa hợp lệ!',
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email!',
                                        },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập địa chỉ mail"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item
                            name="phone_number"
                            label="Số điện thoại"
                            rules={[
                                {
                                    pattern: regexPhone,
                                    message: () => 
                                    <>
                                        <p>
                                            Số điện thoại hợp lệ chỉ bao gồm chữ số
                                        </p>
                                        <i>
                                            Ví dụ: 0866157708
                                        </i>
                                    </>,
                                },
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                            ]}
                        >
                            <Input
                                onChange={handlePhoneNumberChange}
                                addonBefore="+84"
                                placeholder='ví dụ: 866157708'
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={16}>
                        <Form.Item
                            name="website"
                            label={  
                                <span>
                                    Địa chỉ website  <i style={{fontSize: '0.8rem'}}>(Nếu có) </i>
                                </span>
                            }
                        >
                                <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="Nhập dịa chỉ website">
                                    <Input />
                                </AutoComplete>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={23}>
                            <Divider className='bank__information'>
                                Thông tin ngân hàng
                            </Divider>
                        </Col>
                    </Row>
                    <Row>
                    <Col span={16}>
                        <Form.Item
                            name='bank_name'
                            label="Tên ngân hàng"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên ngân hàng',
                            },
                            ]}
                        >
                            <Select 
                                placeholder="Nhập tên ngân hàng" 
                                showSearch
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={banklist.map((bank) => ({
                                    label: bank.shortName,
                                    value: bank.shortName,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name='bank_account'
                            label="Số tài khoản"
                            rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số tài khoản ngân hàng',
                            },
                            ]}
                        >
                            <Input placeholder="Nhập số tài khoản" />
                        </Form.Item>
                    </Col>
                        <Col span={24}>
                        <Form.List name="bank_info">
                        {(fields, { add, remove }) => (
                            <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                        <Space
                                        key={key}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                        >
                                        <Row>
                                            <Col span={16}>
                                                <Form.Item
                                                    {...restField}
                                                    className="optional_bank_name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: () => 
                                                            <span>
                                                                Nếu không có tài khoản nào khác bạn hãy bấm  
                                                                    <DeleteOutlined
                                                                        style={{marginInline: '3px', fontSize: '16px'}}
                                                                        className='delete-icon'
                                                                    /> 
                                                                để xóa dòng
                                                            </span>,
                                                        },
                                                        ]}
                                                    label={
                                                        <span>
                                                            Tên ngân hàng thứ {index+2}  <i style={{fontSize: '0.8rem'}}>(Nếu có) </i>
                                                        </span>
                                                    }
                                                    name={[name, 'bank_name']}
                                                >
                                                    <Select 
                                                        placeholder="Nhập tên ngân hàng" 
                                                        showSearch
                                                        filterOption={(input, option) =>
                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                        }
                                                        options={banklist.map((bank) => ({
                                                            label: bank.shortName,
                                                            value: bank.shortName,
                                                        }))}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={7}>
                                                <Form.Item
                                                    {...restField}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Vui lòng nhập số tài khoản ngân hàng",
                                                        },
                                                    ]}
                                                    className="optional_bank_account"
                                                    label='Số tài khoản'
                                                    name={[name, 'bank_account']}
                                                >
                                                    <Input placeholder="Nhập số tài khoản" />
                                                </Form.Item>
                                            </Col>
                                            <Col 
                                                span={1}
                                                className='delete-icon--col'
                                                style={{margin: 'auto !important'}}
                                            >
                                                <DeleteOutlined
                                                className='delete-icon'
                                                onClick={() => remove(name)} />
                                            </Col>
                                        </Row>
                                        </Space>
                            ))}
                                <Form.Item
                                    {...taiFormItemLayout}
                                >
                                    <Button className='bank_plus' type="dashed" onClick={() => add()} block icon={<PlusOutlined className='plus_icon'/>}>
                                        <span

                                            style={{
                                                fontWeight: '600',
                                            }}
                                        >
                                            Thêm tài khoản ngân hàng
                                        </span>
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                        </Form.List>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            offset={16}
                            span={7}
                        >
                            <Button
                                style={{
                                    marginBottom: '40px',
                                    marginTop: '20px',
                                    float :'right'
                                }}
                                type="primary" 
                                htmlType="submit"
                            >
                                Thêm mới trung tâm
                            </Button>
                        </Col>
                        <Col 
                        span={1}>
                            
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default AddCenter;
