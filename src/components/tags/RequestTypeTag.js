import React from 'react';
import { Tag } from 'antd';
import { REQUEST_TYPE } from '../../constants/requests';
import { useState } from 'react';

const RequestTypeTag = ({value}) => {

    const [statusList, setStatusList] = useState(REQUEST_TYPE)

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

export default RequestTypeTag;
