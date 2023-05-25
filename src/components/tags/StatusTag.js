import React from 'react';
import { Tag } from 'antd';
import { REQUEST_STATUS } from '../../constants/requests';
import { useEffect } from 'react';
import { useState } from 'react';
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const renderColorBasedValue = (value) => {
    return REQUEST_STATUS.filter((status) => status.value === value)
}

const StatusTag = ({value, confirm_money_status}) => {

    const [statusList, setStatusList] = useState(REQUEST_STATUS)
    

    console.log(statusList)
    return (
        <>
            {
                statusList
                    .filter((statusItem) => statusItem.value === value)
                    .map((status) => {
                        console.log({value})
                        if(value === 1 && confirm_money_status === 1) {
                            return (
                                <Tag            
                                    key={status.value}
                                    icon={<RiMoneyDollarCircleFill
                                        style={{
                                            fontSize: "14px",
                                            color: "rgb(255 183 14)",
                                            borderRadius: "50%",
                                            background: "rgb(255 239 122)",
                                        }}      
                                    />}
                                    color='#85bb65'
                                    bordered='false'
                                    style={{
                                        display: "flex",
                                        gap: "5px",
                                        alignItems: "center"
                                    }}
                                >
                                    Đã nhận tiền
                                </Tag>
                            )
                        }else {
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
                    }
                )
            }
        </>
    );
}

export default StatusTag;
