import React from 'react';
import { Tag } from 'antd';
import { MONEY_TRANSFER_CONFIRM_STATUS } from '../../constants/requests';
import { useState } from 'react';


const MoneyTransferConfirmTag = ({value}) => {

    const [statusList, setStatusList] = useState(MONEY_TRANSFER_CONFIRM_STATUS)

    console.log(statusList)
    return (
        <>
            {
                statusList
                    .filter((statusItem) => statusItem.value === value)
                    .map((status) => (
                    <Tag            
                        key={status.value}
                        icon={status.icon}
                        color={status.color}
                        style={status.style}
                    >
                        {status.title}
                    </Tag>
                ))
            }
        </>
    );
}

export default MoneyTransferConfirmTag;
