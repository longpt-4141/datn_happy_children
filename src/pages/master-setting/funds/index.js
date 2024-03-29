import {
	Button,
	Col,
	Descriptions,
	Modal,
	Row,
	Space,
	Table,
	Tooltip,
} from "antd";
import React, { useEffect } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { VscListFilter } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	deleteFund,
	getAllFunds,
	selectAllFunds,
	selectFundLoading,
} from "../../../services/slicer/FundSlicer";
import SyncLoading from "../../../components/spinners/SyncLoading";
import FundStatus from "../../../components/tags/FundStatus";
import convertVNDMoney from "../../../utils/format/money-format";
import {
	formatDate,
	formatDateSendDB,
	formatRequestCreate,
} from "../../../utils/format/date-format";
import dayjs from "dayjs";
import {
	DeleteOutlined,
	FileExcelOutlined,
	EditOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./index.scss";

function FundsPage() {
	const navigate = useNavigate();
	const fundsLoading = useSelector(selectFundLoading);
	const listFunds = useSelector(selectAllFunds);
	const dispatch = useDispatch();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [fundId, setActionId] = useState("");
	/* reject fund */
	const showRejectModal = (fundId) => {
		console.log({ fundId });
		setIsRejectModalOpen(true);
		setActionId(fundId);
	}

	const handleRejectFund = async (value) => {
		console.log({ value });
		try {
			await dispatch(deleteFund({ fundId })).unwrap();
		} catch (error) {
			console.log({ error });
		}

		setIsDeleteModalOpen(false);
	};

	const handleCancelRejectFund = () => {
		setIsDeleteModalOpen(false);
	};
	/*  */
	/* delete fund */
	const showDeleteModal = (fundId) => {
		console.log({ fundId });
		setIsDeleteModalOpen(true);
		setActionId(fundId);
	};

	const handleDeleteFund = async (value) => {
		console.log({ value });
		try {
			await dispatch(deleteFund({ fundId })).unwrap();
		} catch (error) {
			console.log({ error });
		}

		setIsDeleteModalOpen(false);
	};

	const handleCancel = () => {
		setIsDeleteModalOpen(false);
	};

	/*  */
	const handleEditFund = (fundId) => {
		console.log({ fundId });
		navigate(`funds/${fundId}`);
	};

	const columns = [
		{
			title: "STT",
			dataIndex: "stt",
			key: "STT",
			width: "5%",
		},
		{
			title: "Tên quỹ",
			dataIndex: "name",
			key: "name",
			width: "25%",
			ellipsis: {
				showTitle: true,
			},
			render: (name, record) => (
				<Tooltip placement="topLeft" title={name}>
					{name}
				</Tooltip>
			),
		},
		{
			title: "Số tiền cần gây quỹ",
			dataIndex: "sponsor_estimate_amount",
			key: "sponsor_estimate_amount",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			render: (amount, record) => (
				<Tooltip
					placement="topLeft"
					title={
						amount === "Không giới hạn"
							? amount
							: convertVNDMoney(amount)
					}
				>
					<p
						style={{
							color: "rgb(14 160 97)",
							fontWeight: "500",
							fontSize: "16px",
						}}
					>
						{amount === "Không giới hạn"
							? amount
							: convertVNDMoney(amount)}
					</p>
				</Tooltip>
			),
		},
		{
			title: "Số tiền đã nhận",
			dataIndex: "received_amount",
			key: "received_amount",
			width: "15%",
			ellipsis: {
				showTitle: true,
			},
			render: (amount, record) => (
				<Tooltip
					placement="topLeft"
					title={
						amount === "Không giới hạn"
							? amount
							: convertVNDMoney(amount)
					}
				>
					<p
						style={{
							color: "#FFC347",
							fontWeight: "500",
							fontSize: "16px",
						}}
					>
						{convertVNDMoney(amount)}
					</p>
				</Tooltip>
			),
		},
		{
			title: "Ngày tạo",
			dataIndex: "start_at",
			key: "start_at",
			width: "12%",
			ellipsis: {
				showTitle: true,
			},
			render: (date) => (
				<Tooltip placement="topLeft" title={formatDate(date)}>
					{formatDate(date)}
				</Tooltip>
			),
		},
		{
			title: "Ngày đóng quỹ",
			dataIndex: "end_at",
			key: "end_at",
			width: "12%",
			ellipsis: {
				showTitle: true,
			},
			render: (date) => (
				<Tooltip
					placement="topLeft"
					title={date !== "Vô thời hạn" ? formatDate(date) : date}
				>
					{date !== "Vô thời hạn" ? formatDate(date) : date}
				</Tooltip>
			),
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			width: "11%",
			ellipsis: {
				showTitle: true,
			},
			render: (status, record) => <FundStatus value={status} />,
		},
		{
			title: () => (
				<p
					style={{
						textAlign: "center",
					}}
				>
					Thao tác
				</p>
			),
			key: "action",
			width: "15%",
			render: (action, record) => (
				<>
					{record.status === 0 ? (
						<div
							style={{
								textAlign: "center",
							}}
						>
							<Space size="middle">
								<Button
									onClick={() => handleEditFund(record.id)}
									className="report-list__table--button__edit"
									icon={<EditOutlined />}
									shape="circle"
									size="default"
								></Button>
								{
									dayjs().endOf('day') < dayjs(record.start_at)
									?
									<Button
										onClick={() => showDeleteModal(record.id)}
										className="report-list__table--button__delete"
										icon={<DeleteOutlined />}
										shape="circle"
										size="default"
										disabled={
											dayjs().endOf('day') > dayjs(record.start_at)
										}
									></Button>
									:
									null
								}
								{
									dayjs().endOf('day') > dayjs(record.start_at)
									?
									<Button
										onClick={() => showRejectModal(record.id)}
										className="report-list__table--button__cancel"
										icon={<FileExcelOutlined />}
										shape="circle"
										size="default"
									></Button>
									:
									null
								}
							</Space>
						</div>
					) : null}
				</>
			),
		},
	];

	const handleAddFund = (e) => {
		e.preventDefault();
		navigate("/master-setting/funds/add");
	};

	useEffect(() => {
		dispatch(getAllFunds());
	}, []);

	return (
		<div className="funds-page">
			<div
				className="funds-page--filter"
				style={{
					marginTop: "10px",
					marginBottom: "20px",
				}}
			>
				<Row>
					<Col
						span={1}
						style={{
							display: "flex",
							justifyContent: "space-evenly",
							alignItems: "center",
						}}
					>
						<VscListFilter
							style={{
								fontSize: "22px",
								color: "var(--mainColor)",
							}}
						/>
					</Col>
					<Col span={4}>
					</Col>
					<Col span={4} offset={15}>
						<Button
							className="button__add--fund"
							type="primary"
							icon={<HiOutlinePlusCircle />}
							onClick={handleAddFund}
						>
							Thêm mới quỹ
						</Button>
					</Col>
				</Row>
			</div>
			<div className="funds-list--table">
				<React.Fragment>
					{fundsLoading === false ? (
						<>
							<Table
								columns={columns}
								dataSource={listFunds}
								pagination={{
									showSizeChanger: true,
								}}
								expandable={{
									expandedRowRender: (record) => (
										<Descriptions
											title="Thông tin bổ sung"
											className="sub_description"
										>
											<Descriptions.Item label="Mô tả">
												{record.description}
											</Descriptions.Item>
											<Descriptions.Item label="Số tiền bù">
												{record.fund_name
													? record.fund_name
													: "Không có"}
											</Descriptions.Item>
										</Descriptions>
									),
									rowExpandable: (record) =>
										record.description || record.end_at,
								}}
							></Table>
						</>
					) : (
						<SyncLoading />
					)}
				</React.Fragment>
			</div>
			<Modal
				title="Xác nhận xóa quỹ"
				open={isDeleteModalOpen}
				onOk={handleDeleteFund}
				onCancel={handleCancel}
			>
				<p>Bạn có thực sự muốn xóa trung tâm này không ?</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
			<Modal
				title="Xác nhận tạm dừng quỹ"
				open={isDeleteModalOpen}
				onOk={handleDeleteFund}
				onCancel={handleCancel}
			>
				<p>Bạn có thực sự muốn xóa trung tâm này không ?</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</div>
	);
}

export default FundsPage;
