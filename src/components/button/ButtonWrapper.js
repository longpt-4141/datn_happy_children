import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeTwoTone } from '@ant-design/icons';
import './index.scss'
const ButtonWrapper = ({link}) => {
    console.log(link)
    return (
            <a href={link} target="_blank" className="button--link" rel="noreferrer">
            <Button 
                type="primary" 
                icon={<EyeTwoTone twoToneColor='#fff' />}
            >
                    Bấm vào đây để xem tài liệu
            </Button>
        </a>
    );
}

export default ButtonWrapper;
