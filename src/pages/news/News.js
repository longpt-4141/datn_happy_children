import React, { useEffect } from "react";
import { useState } from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteArticle,
	getAllArticles,
	getAllTopicAndFunds,
	selectAllArticles,
	selectAllTopicsAndFunds,
	selectArticlesLoading,
} from "../../services/slicer/ArticleSlicer";
import {
	Card,
	List,
	Row,
	Col,
	Button,
	Select,
	Input,
	Popover,
	Divider,
	Form,
	Tag,
	Modal,
} from "antd";
import "./index.scss";
import { TbPencilPlus } from "react-icons/tb";
import { VscListFilter } from "react-icons/vsc";
import { useNavigate, useSearchParams } from "react-router-dom";
import BadgeWrapper from "../../components/BadgeWrapper";
import { formatRequestCreate } from "../../utils/format/date-format";
import { TAG_COLOR } from "../../constants/Color";
import SyncLoading from "../../components/spinners/SyncLoading";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const News = () => {
	const { Meta } = Card;
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [articlesData, setArticlesData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(null);
	const [topicIsSuggest, setTopicIsSuggest] = useState(null);
	const getArticle = useSelector(selectAllArticles);
	const topicsAndFunds = useSelector(selectAllTopicsAndFunds);
	const articlesLoading = useSelector(selectArticlesLoading);
	let [searchParams, setSearchParams] = useSearchParams();

	const onFinish = (value) => {
		console.log(value);
	};

	const content = (
		<div className="filter__body">
			<Divider />
			<Form form={form} onFinish={onFinish} layout="vertical">
				<Form.Item className="topic" label="Chủ đề" name="topic">
					<Select
						placeholder="Chọn chủ đề"
						showSearch
						filterOption={(input, option) =>
							(option?.label ?? "")
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						options={topicsAndFunds.topics.map((topic) => ({
							label: topic.name,
							value: topic.id,
						}))}
					></Select>
				</Form.Item>
				<Form.Item className="funds" label="Quỹ" name="fund">
					<Select
						placeholder="Chọn quỹ"
						showSearch
						filterOption={(input, option) =>
							(option?.label ?? "")
								.toLowerCase()
								.includes(input.toLowerCase())
						}
						options={topicsAndFunds.funds.map((fund) => ({
							label: fund.name,
							value: fund.id,
						}))}
					></Select>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{
							float: "right",
						}}
					>
						Lọc
					</Button>
				</Form.Item>
			</Form>
		</div>
	);

	const renderTitle = (title) => {
		const lowerCaseTitle = title.toLowerCase();
		return (
			lowerCaseTitle[0].toUpperCase() +
			lowerCaseTitle.slice(1).toLowerCase()
		);
	};

	const renderContent = (content) => {
		// let sliceConent = `${content.slice(0,200)}...`
		return (
			<p
				className="mce-content-body"
				dangerouslySetInnerHTML={{
					__html: content,
				}}
			></p>
		);
	};

	const handleAddArticle = (e) => {
		e.preventDefault();
		navigate("/news/add");
	};

	const onSearch = (e) => {
		e.preventDefault();
		setTimeout(() => {
			console.log(e.target.value);
			// navigate(`/news?param=${e.target.value}`)
			setSearchParams({ param: e.target.value });
		}, 1000);
	};

	const showDeleteModal = (item) => {
		setDeleteId(item.id);
		setTopicIsSuggest(item.topic.isSuggest);
		console.log({ item });
		setIsModalOpen(true);
	};

	const handleDeleteArticle = async (value) => {
		console.log({ value });
		try {
			await dispatch(
				deleteArticle({ deleteId, topicIsSuggest })
			).unwrap();
		} catch (error) {
			console.log({ error });
		}
		// dispatch(getSpecificRequest(id))

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		console.log("a");
		console.log(searchParams.get("param"));
		const searchText = searchParams.get("param");
		dispatch(getAllArticles(searchText));
	}, [searchParams]);

	useEffect(() => {
		dispatch(getAllTopicAndFunds());
	}, []);

	useEffect(() => {
		setArticlesData(getArticle);
	}, [getArticle]);

	console.log(articlesData);

	return (
		<div className="list-article__page">
			<h3
				style={{
					color: "var(--mainColor)",
					fontSize: "20px",
					fontWeight: "500",
					marginBottom: "30px",
				}}
			>
				Danh sách bài viết
			</h3>
			<Row
				style={{
					paddingInline: "24px",
					marginBottom: "30px",
					justifyContent: "space-between",
				}}
			>
				<Col
					span={2}
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
					}}
				>
					<Popover
						placement="bottomLeft"
						title="Bộ lọc"
						content={content}
						trigger="click"
						overlayStyle={{
							width: "400px",
						}}
					>
						<>
							<VscListFilter
								className="icon-filter"
								style={{
									fontSize: "22px",
									color: "var(--mainColor)",
								}}
							/>
						</>
					</Popover>
				</Col>
				<Col span={6}>
					<Input
						allowClear
						onChange={onSearch}
						type="search"
						placeholder="Tìm kiếm theo tiêu đề bài viết"
					/>
				</Col>

				<Col span={4} offset={12}>
					<Button
						className="button__add--article"
						type="primary"
						icon={<TbPencilPlus />}
						onClick={handleAddArticle}
					>
						Thêm mới bài viết
					</Button>
				</Col>
			</Row>
			<div className="list-article__body">
				{articlesLoading ? (
					<SyncLoading />
				) : (
					<List
						grid={{
							gutter: [16, 16],
							xs: 1,
							sm: 2,
							md: 3,
							lg: 3,
							xl: 3,
							xxl: 4,
						}}
						dataSource={articlesData}
						renderItem={(item, index) => (
							<List.Item className="list-article__item">
								<BadgeWrapper status={item.status}>
									<Card
										className="list-article__item-card"
										// style={{
										//   height : 300,
										// }}
										cover={
											<img
												alt="thumbnail_image"
												src={item.thumbnail_url}
											/>
										}
										actions={[
											<EyeOutlined
												key="detail"
												onClick={() => {
													navigate(`${item.id}`);
												}}
											/>,
											<EditOutlined
												key="edit"
												onClick={() => {
													navigate(`${item.id}/edit`);
												}}
											/>,
											<DeleteOutlined
												key="ellipsis"
												onClick={() =>
													showDeleteModal(item)
												}
											/>,
										]}
									>
										<Meta
											title={renderTitle(item.title)}
											description={renderContent(
												item.content
											)}
										/>
										<div className="tag_information">
											<Row>
												<Col span={10}>
													<Tag
														color={TAG_COLOR[index]}
													>
														{item.topic.name}
													</Tag>
												</Col>
												<Col span={10}>
													<Tag
														color={
															TAG_COLOR[index + 1]
														}
													>
														{item.fund
															? item.fund.name
															: null}
													</Tag>
												</Col>
											</Row>
										</div>
										<div className="time_information">
											<Row>
												<Col span={10}>
													{item.read_minute} phút đọc
												</Col>
												<Col span={10}>
													{formatRequestCreate(
														item.createdAt
													)}
												</Col>
											</Row>
										</div>
									</Card>
								</BadgeWrapper>
							</List.Item>
						)}
					/>
				)}
			</div>
			<Modal
				title="Xác nhận xóa bài viết"
				open={isModalOpen}
				onOk={handleDeleteArticle}
				onCancel={handleCancel}
			>
				<p>Bạn có thực sự muốn xóa bài viết này không ?</p>
			</Modal>
		</div>
	);
};

export default News;
