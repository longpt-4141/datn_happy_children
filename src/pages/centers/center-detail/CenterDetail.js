import React from 'react'
import { Tabs } from 'antd';
import CenterProfile from './center-introduce/CenterProfile';

const key = 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8'

const onChange = (key) => {
    console.log(key);
  };

const items = [
    {
        key: '1',
        label: `Hồ sơ`,
        children: 
        <CenterProfile
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
            mapElement={<div style={{ height: `100%` }} />}
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
