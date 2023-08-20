import React from 'react'
import { Tabs } from 'antd';
import CenterProfile from './center-introduce/CenterProfile';


const onChange = (key) => {
    console.log(key);
  };

const items = [
    {
        key: '1',
        label: `Hồ sơ trung tâm`,
        children: 
        <CenterProfile
        />,
    },
  ];

export default function CenterDetail() {
  return (
    <div className='center__info--container'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
