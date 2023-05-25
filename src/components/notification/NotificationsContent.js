import { List } from 'antd';
import React from 'react';
import { formatRequestCreate } from '../../utils/format/date-format';

const NotificationsContent = ({data}) => {
    return (
            <>
                {
                    data.type === 'request/new' ? 
                    <List.Item key={data.id}>
                        <span>
                            {data.center.name} đã tạo yêu cầu mới, hãy bấm vào đế xem chi tiết yêu cầu
                        </span>
                        <p>
                            {formatRequestCreate(data.createdAt)}
                        </p>
                    </List.Item>
                        :
                    <></>
                }
            </>
    );
}

export default NotificationsContent;
