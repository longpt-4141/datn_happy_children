import { Avatar } from "antd";
import React from 'react';
import { arrayBufferToBase64 } from "../../utils/render-image";
import {ReactComponent as AvatarDefault} from '../../assets/img/icon/user_avatar_default.svg'


const UserAvatar = ({avatar}) => {
    return (
        <>
            {
                avatar=== null || avatar === undefined ? 
                <AvatarDefault 
                    style={{width:'100px', height:'100px'}}
                /> 
                    :       
                <Avatar
                    size={100}
                    src={arrayBufferToBase64(avatar.data)}
                    className='profile__left--avatar'
                    style={{
                        display: "block",
                        margin: '0 auto'
                    }}
                />
            }
        </>
    );
}

export default UserAvatar;
