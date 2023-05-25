import { Badge } from 'antd';
import React from 'react';
import { ARTICLE_STATUS } from '../constants/articles';
import { useState } from 'react';
const BadgeWrapper = ({children, status}) => {
    const [statusList, setStatusList] = useState(ARTICLE_STATUS)

    return (
            <>
            {
                statusList
                    .filter((statusItem) => statusItem.value === status)
                    .map((status) => {
                        console.log({status})
                        return( 
                            <Badge.Ribbon 
                                text={status.title} 
                                color={status.color}
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                {children}
                            </Badge.Ribbon>
                        )
                        }
                )
            }
        </>
    );
}

export default BadgeWrapper;
