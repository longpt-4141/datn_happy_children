import { Tabs } from "antd";
import React from "react";
import FundsPage from "./funds";

function MasterSettingPage() {
	const items = [
		{
			key: "1",
			label: `Chủ đề`,
			children: <FundsPage />,
		},
		{
			key: "2",
			label: `Quỹ`,
			children: `Content of Tab Pane 2`,
		},
		{
			key: "3",
			label: `Tab 3`,
			children: `Content of Tab Pane 3`,
		},
	];
	return (
        <div>
            <Tabs defaultActiveKey="1" items={items} />;
        </div>
    );
}

export default MasterSettingPage;
