import React, { Component, useState } from "react";
import { AutoComplete, Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space, Steps, theme } from "antd";
import { toastError, toastSuccess } from "../../utils/toast-popup";
import { registerNewUser } from "../../services/userService";
import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MenuShortLogo } from "../../assets/img/short_logo/Menu_short_logo.svg";
import { getDistrictData, getProvinceData, getProvinceName } from "../../utils/province-city-data";
import { checkExistedEmail, createNewCenter } from "../../services/centerService";
import { regexPhone } from "../../utils/Regex";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import banklist from '../../constants/bank.json'


const provinceData = getProvinceData();
const districtData = getDistrictData();

function Register() {
	const navigate = useNavigate();
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [representativeData, setRepresentativeData] = useState({
		username: "",
		email: "",
	});
	const [form] = Form.useForm();

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const [fittedDistrict, setFittedDistrict] = useState([]);

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

	const next =  () => {
		form.validateFields()
			.then(async (value) => {
				// Here make api call of something else

                const representative_email = value.email;
                let res = await checkExistedEmail(representative_email)
                switch (res.EC) {
                    case "SUCCESS_EMAIL":
                        toastSuccess(res.EM)
                        setCurrent(current + 1);
                        console.log({ value });
                        setRepresentativeData({ ...value });
                        break;
                    case "ERR_EMAIL_EXISTED": 
                        toastError(res.EM)
                        break;
                    default:
                        toastError('Xin lỗi có vấn đề về đường truyền, vui lòng thử lại!')
                        break;
                }
			})
			.catch((err) => console.log(err));
	};
	const prev = () => {
		setCurrent(current - 1);
	};

	const steps = [
		{
			title: "Bước 1",
			content: (
				<>
					<Form.Item
						label="Email người đại diện"
						name="email"
						rules={[
							{
								type: "email",
								message: "Email chưa hợp lệ!",
							},
							{
								required: true,
								message: "Vui lòng nhập email của người đại diện!",
							},
						]}
					>
						<Input />
					</Form.Item>

                    <Form.Item
						label="Họ và tên"
						name="username"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tên của người đại diện!",
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
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Xác nhận mật khẩu"
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
										getFieldValue("password") === value
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
				</>
			),
		},
		{
			title: "Bước 2",
			content: <>
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
                                name="center_email"
                                label="Địa chỉ mail"
                                rules={[
                                        {
                                            type: 'email',
                                            message: 'Email chưa hợp lệ!',
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email trung tâm!',
                                        },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập địa chỉ mail của trung tâm"
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
            </>,
		},
	];

	const items = steps.map((item) => ({ key: item.title, title: item.title }));

	const done = () => {
		form.validateFields()
			.then(async (values) => {
                let name = values.name;
                let established_date = values.established.$d; // DD/MM/YYYY : 02/04/2023
                let province = values.province;
                let district = values.district;
                let address = values.address;
                let center_email = values.center_email;
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
                const center_info = {
                    name,established_date,province,district,address, center_email, phone_number, website, bank_list
                }
				console.log({ representativeData, center_info });
                let response = await registerNewUser(representativeData, center_info);
                console.log({response})
                switch (response.EC) {
                    case "REGISTER_NEW_CENTER_SUCCESS":
                        toastSuccess(response.EM)
                        navigate('/login')
                        break;
                    case "ERR_CENTER_EMAIL_EXISTED": 
                        toastError(response.EM)
                        break;
                    case "ERR_CENTER_PHONE_EXISTED": 
                        toastError(response.EM)
                        break;
                    default:
                        toastSuccess('Lỗi đăng ký, vui lòng thử lại!')
                        break;
                }

			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="register">
			<div className="register_container">
				<Row style={{justifyContent : "center"}}>
					<Col span={20} className="login_form">
						<span className="login_form__logo">
							<MenuShortLogo />
						</span>
						<h2>
							<p style={{ marginBottom: "8px" }}>
								Happy Children
							</p>
							Xin chào bạn
						</h2>
						<Steps current={current} items={items} />
						<div
							style={{
								textAlign: "center",
								color: token.colorTextTertiary,
								backgroundColor: "#FEE8C2",
								borderRadius: token.borderRadiusLG,
								border: `1px dashed #F89A85`,
								marginTop: 16,
                                width: '60vw'
							}}
						>
							{current === 0 && (
								<div className="title--center_representative">
									Tạo tài khoản 
								</div>
							)}
							{current === 1 && (
								<div className="title--center_info">
									Thông tin trung tâm 
								</div>
							)}
							<Form
								name="normal_donate"
								labelCol={{ span: 6 }}
								wrapperCol={{ span: 14 }}
								// style={{ maxWidth: '60vw' }}
								form={form}
								className="m-auto pt-10 pb-5 px-5 mb-8 rounded-xl bg-white shadow-md"
							>
								{steps[current].content}
							</Form>
						</div>
						<div
							style={{
								marginTop: 24,
							}}
						>
							{current < 1 && (
								<Button
									type="primary"
									className="bg-mainPink hover:!bg-[#ffb09e]"
									onClick={() => next()}
								>
									Tiếp
								</Button>
							)}
							{current === 1 && (
								<Button
									type="primary"
									className="bg-mainPink hover:!bg-[#ffb09e]"
									onClick={() => done()}
								>
									Hoàn Thành
								</Button>
							)}
							{current > 0 && (
								<Button
									style={{
										margin: "0 8px",
									}}
									onClick={() => prev()}
								>
									Trước
								</Button>
							)}
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Register;
