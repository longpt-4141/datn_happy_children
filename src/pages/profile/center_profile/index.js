import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
	Row,
	Col,
	Input,
	Form,
	Button,
	DatePicker,
	ConfigProvider,
	Divider,
	Select,
	Card,
	Tag,
	Avatar,
	Space,
} from "antd";
import "./index.scss";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import locale from "antd/locale/vi_VN";
import { regexPhone } from "../../../utils/Regex";
import banklist from "../../../constants/bank.json"
import UploadFirebase from "../../../components/firebase-upload/UploadFirebase";
import { toastError, toastSuccess, toastWarning } from "../../../utils/toast-popup";
import { useSelector } from "react-redux";
import { selectCenterId } from "../../../services/slicer/AuthSlicer";
import { getDistrictData, getProvinceData } from "../../../utils/province-city-data";

const provinceData = getProvinceData();
const districtData = getDistrictData();

const CenterProfilePage = () => {
	// let { id } = useParams();
  let id = useSelector(selectCenterId)
	const [centerData, setCenterData] = useState([]);
	const [centerName, setCenterName] = useState("");
	const [centerEstablished, setCenterEstablished] = useState("");
	const [centerProvince, setCenterProvince] = useState("");
	const [centerDistrict, setCenterDistrict] = useState("");
	const [centerEmail, setCenterEmail] = useState("");
	const [centerPhone, setCenterPhone] = useState("");
	const [centerAddress, setCenterAddress] = useState("");
	const [avatar, setAvatarFile] = useState("");
	const [representative, setRepresentative] = useState(null);
	const [bankList, setBankList] = useState([]);

	const [fittedDistrict, setFittedDistrict] = useState([]);

	const [form] = Form.useForm();

	//call center data

	const handleGetAvatar = (avatarUrl) => {
		setAvatarFile(avatarUrl);
	};

	const onCityChange = (value) => {
		if (value === centerData.district) {
			setCenterDistrict("");
		} else {
			setCenterDistrict(value);
		}
	};

	const handleProvinceChange = (value) => {
		// const a = getProvinceName(value);
		console.log({ value });
		if (value === centerData.province) {
			setCenterProvince("");
		} else {
			setCenterProvince(value);
		}
		let newArr = [];
		districtData.forEach((item) => {
			if (item.name_code === value) {
				newArr.push(item);
			}
		});
		setFittedDistrict(newArr[0].districts);
	};

	const handleChangePhoneNumber = (e) => {
		console.log("phone", e.target.value);
		if (e.target.value === centerData.phone_number) {
			setCenterPhone("");
		} else {
			setCenterPhone(e.target.value);
		}
	};

	// put data

	const editCenterData = async () => {
		if (
			centerName === "" &&
			centerEstablished === "" &&
			centerPhone === "" &&
			centerAddress === "" &&
			centerEmail === "" &&
			centerProvince === "" &&
			centerDistrict === "" &&
			avatar === ""
		) {
			toastWarning('Xin lỗi hệ thống không thể cập nhật vì bạn chưa thay đổi thông tin nào cả!')
		} else {
			const center = {
				name : centerName,
				province : centerProvince,
				district : centerDistrict,
				avatar,
				center_email : centerEmail,
				phone_number : centerPhone,
				address : centerAddress,
				// bankList,
				established_date : centerEstablished,
			};
			console.log(center);
			try {
				const res = await axios({
					method: "PUT",
					url: `http://localhost:8080/centers/${id}`,
					data: center,
				});
				console.log('kết quả sau cập nhật nè',res.data);
        switch (res.data.EC) {
          case 'SUCCESS_UPDATE_CENTER':
              toastSuccess(res.data.EM)
              break;
          default:
              toastError('có lỗi xảy ra vui lòng tải lại trang và thử lại')
              break;
      }
			} catch (err) {
				if (err.response.status === 404) {
					console.log("Resource could not be found!");
				} else {
					console.log(err.message);
				}
			}
		}
	};

	const onFinish = () => {
		editCenterData();
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const handleChangeDate = (e) => {
		console.log(e.target.value);
	};

	const handleChangeBankName = (value) => {
		console.log("bank new value", value);
	};

	const handleChangeBankData = (changedValues, allValues) => {
		console.log("bank data: ", allValues);
	};

	useEffect(() => {
		const getData = async () => {
			await axios
				.get(`http://localhost:8080/centers/${id}`)
				.then((res) => {
					const formattedDate = moment(
						res.data.established_date
					).format("YYYY-MM-DD");
					const inputBankImage = (rawBankData) => {
						let newArr = [];
						rawBankData.forEach((bank) => {
							let newArr2 = banklist.filter((bankItem) => {
								return bankItem.shortName === bank.name;
							});
							bank["logo"] = newArr2[0].logo;
							newArr.push(bank);
						});
						return newArr;
					};
					form.setFieldsValue({
						name: res.data.name,
						established_date: dayjs(formattedDate, "YYYY-MM-DD"),
						province: res.data.province,
						district: res.data.district,
						email: res.data.center_email,
						phone_number: res.data.phone_number,
						address: res.data.address,
						bank_data: inputBankImage(res.data.bank_informations),
					});

					setCenterData({
						name: res.data.name,
						established_date: formattedDate,
						province: res.data.province,
						district: res.data.district,
						avatar:
							res.data.avatar === null
								? null
								: res.data.avatar,
						email: res.data.center_email,
						phone_number: res.data.phone_number,
						address: res.data.address,
					});
					// check nguoi dai dien
					if (res.data.user === null) {
						setRepresentative(null);
					} else if (res.data.user !== null) {
						setRepresentative(res.data.user);
					}
					// set bank
					setBankList(inputBankImage(res.data.bank_informations));
					console.log("use in effect");
				})
				.catch((error) => console.log({ error }));
		};
		getData();
	}, [form, id]);

	console.log(bankList);
	console.log(centerData.established_date);
	return (
		<div className="profile--container">
			{centerData ? (
				<Row className="inner--container">
					<Col md={8}>
						<div className="avatar">
							{/* <UploadImage
								getUrl={handleGetAvatar}
								avatarUrl={centerData.avatar}
							/> */}
							<UploadFirebase
								getUrl={handleGetAvatar}
								avatarUrl={centerData.avatar}
							/>
						</div>
						<div
							className="bank_information"
							style={{ marginTop: "15px" }}
						>
							<Card
								className="bank_information--card"
								title="Tài khoản ngân hàng"
								bordered={false}
								style={{
									width: 350,
								}}
							>
								<Form
									form={form}
									name="dynamic_form_nest_item"
									onValuesChange={handleChangeBankData}
								>
									<Form.List name="bank_data">
										{(fields) => {
											return (
												<>
													{fields.map(
														(
															{
																key,
																name,
																...restField
															},
															index,
															value
														) => {
															return (
																<Space
																	key={key}
																>
																	<Row>
																		<Col
																			span={
																				4
																			}
																		>
																			<Avatar
																				className="bank-logo"
																				style={{
																					border: "none !important",
																					backgroundColor:
																						"transparent !important",
																				}}
																				size={{
																					xs: 24,
																					sm: 40,
																					md: 60,
																				}}
																				src={
																					form.getFieldValue(
																						"bank_data"
																					)[
																						index
																					]
																						.logo
																				}
																			/>
																		</Col>
																		<Col
																			span={
																				20
																			}
																		>
																			<Row>
																				<Col
																					span={
																						16
																					}
																				>
																					<Form.Item
																						{...restField}
																						name={[
																							name,
																							"name",
																						]}
																						rules={[
																							{
																								required: true,
																								message:
																									"Missing first name",
																							},
																						]}
																						style={{
																							marginBottom: 0,
																						}}
																					>
																						<Select
																							className="bank--search"
																							showArrow={
																								false
																							}
																							placeholder="Borderless"
																							bordered={
																								false
																							}
																							showSearch
																							filterOption={(
																								input,
																								option
																							) =>
																								(
																									option?.label ??
																									""
																								)
																									.toLowerCase()
																									.includes(
																										input.toLowerCase()
																									)
																							}
																							filterSort={(
																								optionA,
																								optionB
																							) =>
																								(
																									optionA?.label ??
																									""
																								)
																									.toLowerCase()
																									.localeCompare(
																										(
																											optionB?.label ??
																											""
																										).toLowerCase()
																									)
																							}
																							options={banklist.map(
																								(
																									bankitem
																								) => ({
																									label: bankitem.shortName,
																									value: bankitem.shortName,
																								})
																							)}
																							// onChange={handleChangeBankName}
																						></Select>
																					</Form.Item>
																				</Col>
																				<Col
																					span={
																						4
																					}
																					offset={
																						4
																					}
																				>
																					{bankList.length >
																					1 ? (
																						<Tag
																							style={{
																								border: "none",
																							}}
																							color="magenta"
																						>
																							Số{" "}
																							{index +
																								1}
																						</Tag>
																					) : (
																						<Tag
																							style={{
																								border: "none",
																							}}
																							color="magenta"
																						>
																							Duy
																							nhất
																						</Tag>
																					)}
																				</Col>
																			</Row>
																			<Form.Item
																				{...restField}
																				name={[
																					name,
																					"account_number",
																				]}
																				rules={[
																					{
																						required: true,
																						message:
																							"Missing last name",
																					},
																				]}
																				className="bank--account-form"
																				labelCol={
																					4
																				}
																				wrapperCol={
																					14
																				}
																				label="Số tài khoản :"
																				colon={
																					true
																				}
																			>
																				<Input
																					bordered={
																						false
																					}
																				/>
																			</Form.Item>
																		</Col>
																	</Row>
																	<Divider></Divider>
																</Space>
															);
														}
													)}
												</>
											);
										}}
									</Form.List>
								</Form>
							</Card>
						</div>
					</Col>
					<Col md={14} offset={0}>
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
											message:
												"Vui lòng nhập tên trung tâm",
										},
									]}
								>
									<Input
										type="text"
										bordered={false}
										allowClear={true}
										className="input--text"
										onChange={(e) => {
											if (
												e.target.value ===
												centerData.name
											) {
												setCenterName("");
											} else {
												setCenterName(e.target.value);
											}
										}}
									/>
								</Form.Item>
								<ConfigProvider locale={locale}>
									<Form.Item
										name="established_date"
										label="Ngày thành lập"
										rules={[
											{
												required: true,
												message:
													"Vui lòng không để trống ngày thành lập",
											},
										]}
									>
										<DatePicker
											placeholder="Hãy chọn ngày thành lập"
											onChange={(value, dateString) => {
												console.log({ dateString });
												if (
													dateString ===
													centerData.established_date
												) {
													setCenterEstablished("");
												} else {
													setCenterEstablished(value);
												}
											}}
										/>
									</Form.Item>
								</ConfigProvider>
								<Divider className="contact__information">
									Thông tin liên lạc
								</Divider>
								<Form.Item
									name="province"
									label="Tỉnh thành phố"
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn tỉnh thành phố!",
										},
									]}
								>
									<Select
										placeholder="Hãy chọn tỉnh thành"
										showSearch
										onChange={handleProvinceChange}
										options={provinceData.map(
											(province) => ({
												label: province.name,
												value: province.name_code,
											})
										)}
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
									></Select>
								</Form.Item>
								<Form.Item
									name="district"
									label="Quận huyện"
									rules={[
										{
											required: true,
											message:
												"Vui lòng chọn quận huyện!",
										},
									]}
								>
									<Select
										placeholder="Hãy chọn quận huyện"
										showSearch
										onChange={onCityChange}
										filterOption={(input, option) =>
											(option?.label ?? "")
												.toLowerCase()
												.includes(input.toLowerCase())
										}
										options={fittedDistrict.map((city) => ({
											label: city.name,
											value: city.name,
										}))}
									/>
								</Form.Item>
								<Form.Item
									name="address"
									label="Địa chỉ"
									rules={[
										{
											required: true,
											message:
												"Vui lòng nhập địa chỉ trung tâm!",
										},
									]}
								>
									<Input
										type="text"
										bordered={false}
										allowClear={true}
										className="input--text"
										onChange={(e) => {
											if (
												e.target.value ===
												centerData.address
											) {
												setCenterAddress("");
											} else {
												setCenterAddress(
													e.target.value
												);
											}
										}}
									/>
								</Form.Item>
								<Form.Item
									name="email"
									label="E-mail"
									rules={[
										{
											type: "email",
											message:
												"The input is not valid E-mail!",
										},
										{
											required: true,
											message:
												"Please input your E-mail!",
										},
									]}
								>
									<Input
										type="email"
										bordered={false}
										allowClear={true}
										className="input--text"
										onChange={(e) => {
											if (
												e.target.value ===
												centerData.email
											) {
												setCenterEmail("");
											} else {
												setCenterEmail(e.target.value);
											}
										}}
									/>
								</Form.Item>
								<Form.Item
									name="phone_number"
									label="Số điện thoại"
									rules={[
										{
											pattern: regexPhone,
											message: () => (
												<>
													<p>
														Số điện thoại hợp lệ chỉ
														bao gồm chữ số
													</p>
													<i>Ví dụ: 0866157708</i>
												</>
											),
										},
										{
											required: true,
											message:
												"Vui lòng nhập số điện thoại!",
										},
									]}
								>
									<Input
										addonBefore="+84"
										placeholder="ví dụ: 866157708"
										onChange={handleChangePhoneNumber}
										style={{
											width: "100%",
										}}
									/>
								</Form.Item>
								<Divider className="representative__information">
									Nguời đại diện
								</Divider>
								{representative === null ? (
									<div>Chưa có người đại diện</div>
								) : (
									<Card
										title={representative.username}
										bordered={false}
										style={{
											width: 300,
										}}
									>
										<Row>
											<Col span={6}>Email :</Col>
											<Col span={18}>
												{representative.email}
											</Col>
										</Row>
									</Card>
								)}
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
			) : null}
		</div>
	);
};

export default CenterProfilePage;
