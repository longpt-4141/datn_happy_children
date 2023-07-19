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
import { getAllTopics, selectAllTopics, selectTopicLoading } from "../../../services/slicer/TopicSlicer";

function TopicsPage() {
	const navigate = useNavigate();
	const topicLoading = useSelector(selectTopicLoading);
	const listTopics = useSelector(selectAllTopics);
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
	const handleEditTopic = (topicId) => {
		console.log({ topicId });
		navigate(`topics/${topicId}`);
	};

	const columns = [
		{
			title: "STT",
			dataIndex: "stt",
			key: "STT",
			width: "5%",
		},
		{
			title: "Tên chủ đề",
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
			title: "Ngày tạo",
			dataIndex: "createdAt",
			key: "createdAt",
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
			title: "Cập nhật",
			dataIndex: "updatedAt",
			key: "updatedAt",
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
						<div
							style={{
								textAlign: "center",
							}}
						>
							<Space size="middle">
								<Button
									onClick={() => handleEditTopic(record.id)}
									className="report-list__table--button__edit"
									icon={<EditOutlined />}
									shape="circle"
									size="default"
								></Button>
									<Button
										onClick={() => showDeleteModal(record.id)}
										className="report-list__table--button__delete"
										icon={<DeleteOutlined />}
										shape="circle"
										size="default"
									></Button>
							</Space>
						</div>
				</>
			),
		},
	];

	const handleAddTopic = (e) => {
		e.preventDefault();
		navigate("/master-setting/topics/add");
	};

	useEffect(() => {
		dispatch(getAllTopics());
	}, []);

	return (
		<div className="topics-page">
			<div
				className="topics-page--filter"
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
							onClick={handleAddTopic}
						>
							Thêm mới chủ đề
						</Button>
					</Col>
				</Row>
			</div>
			<div className="topics-list--table">
				<React.Fragment>
					{topicLoading === false ? (
						<>
							<Table
								columns={columns}
								dataSource={listTopics}
								pagination={{
									showSizeChanger: true,
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

export default TopicsPage;
