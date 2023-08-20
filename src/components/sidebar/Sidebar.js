import React from 'react';
import './sidebar.scss';
import Logo from '../../assets/img/happy_children_logo'
import {  item, centerItem } from './MenuItemData'
import { Menu, Layout } from 'antd';
import {ReactComponent as MenuShortLogo} from '../../assets/img/short_logo/Menu_short_logo.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {  getLastEstLocationKey } from '../../utils/matchRoute';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../services/slicer/AuthSlicer.js';

const { Sider } = Layout;

const Sidebar = () => {
    const dispatch = useDispatch();
    const currentRole = useSelector(selectUserRole)
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState(0);
    const location = useLocation()
    console.log({location})
    const key = currentRole === 1 ? getLastEstLocationKey(item, location) : getLastEstLocationKey(centerItem, location) 
    console.log({key})


    const handleSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
                console.log({ item, key, keyPath, selectedKeys, domEvent })
                // setSelected({selected : index})
                // console.log({location})
            }

    const handleCollapse = () => {
                    setCollapsed(!collapsed);
                }

    return (
        <>  
            <Sider className='sidebar' collapsible collapsed={collapsed} onCollapse={handleCollapse}>
                    <span className={collapsed ? 'short_logo' : 'logo'}>
                        {collapsed ?<MenuShortLogo/> : <Logo /> }
                    </span>
                {console.log(item)}
                    <div className="menu">
                        <Menu
                        defaultSelectedKeys={[key.toString()]}
                        // defaultOpenKeys={['users']}
                        mode="inline"
                        inlineCollapsed={collapsed}
                        items={
                            currentRole === 1 ? 
                            item :
                            currentRole === 2 ?
                            centerItem
                            :
                            null
                        }
                        onSelect={handleSelect}
                    />
                </div>
            </Sider>
        </>
    );
}

export default Sidebar;
