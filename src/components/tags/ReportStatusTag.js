import React from 'react';
import { Tag } from 'antd';
import { useState } from 'react';
import { REPORT_STATUS } from '../../constants/reports';


const ReportStatusTag = ({value}) => {

    const [statusList, setStatusList] = useState(REPORT_STATUS)
    

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

export default ReportStatusTag;
