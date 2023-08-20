import { Col, Row, Space } from "antd";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCenterId, selectCurrentUser } from "../../services/slicer/AuthSlicer";
import { getAllCenterReminder, selectCenterReminders } from "../../services/slicer/NotificationSlicer";
import CenterReminder from "../../components/CenterReminder";
import dashboard_bg from "../.././assets/img/dashboard_bg.svg"

function CenterDashboard() {
	const dispatch = useDispatch();
	const centerId = useSelector(selectCenterId);
	const userData = useSelector(selectCurrentUser);
	const centerReminder = useSelector(selectCenterReminders);
	console.log({userData})
	useEffect(() => {
		dispatch(getAllCenterReminder({centerId}));
	},[centerId, dispatch])

	return (
		<div className="center-dashboard">
			<Row style={{ justifyContent: "space-between", height : '100%' }}>
				<Col span={17}>
					<div className="information-col">
						<div className="welcome">
							<Row  style={{ justifyContent: "space-between"}}>
								<Col span={16}>
									<Space size={30} direction="vertical">
										<div
											className="welcome-title"
										>
											Chào mừng bạn <span>{userData.username}</span>
										</div>
										<div className="welcome-content">
											Rất mong trung tâm bên bạn sẽ luôn phát triển, cùng nhau chúng ta sẽ hỗ trợ được thêm nhiều trẻ em.
										</div>
									</Space>
								</Col>
								<Col span={8}>
									<span className="dashboard_bg">
										<img src={dashboard_bg} alt="dashboard_bg" />
									</span>
								</Col>
							</Row>
						</div>
                    </div>
				</Col>
				<Col span={6} style={{height : '100%' }}>
					<div className="reminder-col">
						<CenterReminder reminderData={centerReminder}/>
                    </div>
				</Col>
			</Row>
		</div>
	);
}

export default CenterDashboard;
