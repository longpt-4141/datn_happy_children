import { Tabs } from "antd";
import React from "react";
import FundsPage from "./funds";
import TopicsPage from "./topics";

function MasterSettingPage() {
	const items = [
		{
			key: "1",
			label: `Quỹ`,
			children: <FundsPage />,
		},
		{
			key: "2",
			label: `Chủ đề`,
			children: <TopicsPage />,
		},
	];
	return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />;
        </div>
    );
}

export default MasterSettingPage;
