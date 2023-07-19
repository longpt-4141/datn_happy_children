// import React, { Component } from 'react';
// import './sidebar.scss';
// import Logo from '../../assets/img/happy_children_logo'
// import {  item } from './MenuItemData'
// import { Menu, Layout } from 'antd';
// import {ReactComponent as MenuShortLogo} from '../../assets/img/short_logo/Menu_short_logo.svg';
// const { Sider } = Layout;

// // import rootReducers from '../../store/reducers/rootReducers';
// class Sidebar extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             selected : 0,
//             collapsed : false,
//         };
//         this.handleSelect = this.handleSelect.bind(this);
//         this.handleCollapse = this.handleCollapse.bind(this);
//     }

//     handleSelect(e,index) {
//         e.preventDefault();
//         console.log('ok')
//         this.setState({selected : index})
//     }

//     handleCollapse() {
//         this.setState({collapsed : !this.state.collapsed})
//     }

//     render() {
//         return (
//             <>  
//                 <Sider className='sidebar' collapsible collapsed={this.state.collapsed} onCollapse={this.handleCollapse}>
//                     <span className={this.state.collapsed ? 'short_logo' : 'logo'}>
//                         {this.state.collapsed ?<MenuShortLogo/> : <Logo /> }
//                     </span>
//                     {console.log(item)}
//                     <div className="menu">
//                         <Menu
//                             defaultSelectedKeys={['1']}
//                             defaultOpenKeys={['submenu']}
//                             mode="inline"
//                             inlineCollapsed={this.state.collapsed}
//                             items={item}
//                         />
//                     </div>
//                 </Sider>
//             </>
//         );
//     }
// }

// // const mapStateToProps = (state) =>{
// //     return {
// //         user: state.users
// //     }
// // }

// export default Sidebar
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
    const key = getLastEstLocationKey(item, location);
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
                        defaultOpenKeys={['users']}
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
