import React from 'react'
import { Tabs } from 'antd';
import CenterProfile from './center-introduce/CenterProfile';


const onChange = (key) => {
    console.log(key);
  };

const items = [
    {
        key: '1',
        label: `Hồ sơ`,
        children: 
        <CenterProfile
        />,
    },
    {
      key: '2',
      label: `Tab 2`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ];

export default function CenterDetail() {
  return (
    <div className='center__info--container'>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
