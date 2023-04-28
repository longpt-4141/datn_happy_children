import React from 'react';
import { Tag } from 'antd';
import { REQUEST_STATUS } from '../../constants/requests';
import { useEffect } from 'react';
import { useState } from 'react';

const renderColorBasedValue = (value) => {
    return REQUEST_STATUS.filter((status) => status.value === value)
}

const StatusTag = ({value}) => {

    const [statusList, setStatusList] = useState(REQUEST_STATUS)

    console.log(statusList)
    return (
        <>
            {
                statusList
                    .filter((statusItem) => statusItem.value === value)
                    .map((status) => (
                    <Tag            
                                    key={status.value}
                                    color={status.color}
                                    bordered='false'
                                >
                                    {status.title}
                    </Tag>
                ))
            }
        </>
    );
}

export default StatusTag;
