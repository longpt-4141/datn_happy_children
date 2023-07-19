import React from 'react';
import { Tag } from 'antd';
import { useState } from 'react';
import { DONATE_STATUS } from '../../constants/donate';
import { FUND_STATUS } from '../../constants/funds';
const FundStatus = ({value}) => {
    const [statusList, setStatusList] = useState(FUND_STATUS)
    

    console.log(statusList)
    return (
        <>
            {
                statusList
                    .filter((statusItem) => statusItem.value === value)
                    .map((status) => {
                        console.log({value})
                        return( 
                            <Tag            
                                key={status.value}
                                color={status.color}
                                bordered='false'
                            >
                                {status.title}
                            </Tag>
                        )
                        }
                )
            }
        </>
    );
}

export default FundStatus;
