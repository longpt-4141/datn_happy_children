import React from 'react';
import { Tag } from 'antd';
import { useState } from 'react';
import { ARTICLE_STATUS } from '../../constants/articles';

const ArticleStatusTag = ({value}) => {

    const [statusList, setStatusList] = useState(ARTICLE_STATUS)
    

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

export default ArticleStatusTag;
