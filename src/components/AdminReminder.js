import { Button, Card, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminReminder({ reminderData }) {
	const navigate = useNavigate();

	const handleReadReminder = (reminder) => {
		console.log({ reminder });
		const requestData = JSON.parse(reminder.data);
		switch (reminder.type) {
			case "request/new":
				navigate(`requests/${requestData.id}`);
				break;
			case "report/new":
				navigate(`reports/${requestData.id}`);
				break;
			default:
				break;
		}
	};

	return (
		<Space size={20} direction="vertical">
			{reminderData ? (
				reminderData.map((reminder) => (
					<Card
						key={reminder.id}
						size="small"
						title="Nhắc nhở"
						extra={
							<Button
								className=""
								onClick={() => handleReadReminder(reminder)}
							>
								Xem
							</Button>
						}
						style={{
							width: "90%",
							margin: "auto",
							border: "none",
						}}
					>
						{reminder.type === "request/new" ? (
							<p>
								Bạn có 1 yêu cầu chưa được được xét duyệt, hãy
								kiểm tra ngay nhé!
							</p>
						) : reminder.type === "report/new" ? (
							<p>
								Bạn có 1 báo cáo chưa được được xét duyệt, hãy
								kiểm tra ngay nhé!
							</p>
						) : (
							<></>
						)}
					</Card>
				))
			) : (
				<></>
			)}
		</Space>
	);
}

export default AdminReminder;
