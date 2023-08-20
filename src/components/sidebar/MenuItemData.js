import {ReactComponent as ChartFill} from './image/Chart_fill.svg';
import { HiOutlineChartSquareBar,  } from 'react-icons/hi';
import {  HiOutlineClipboardDocumentList,HiOutlineHome,HiOutlineUsers,HiOutlineNewspaper, HiOutlinePencilSquare, HiOutlineHeart, HiOutlineCog6Tooth, HiOutlineBuildingLibrary} from 'react-icons/hi2';
import { useSelector } from 'react-redux';

import {Link} from 'react-router-dom'
import { selectCurrentUser } from '../../services/slicer/AuthSlicer';
import { Popover } from 'antd';

// const currentRole = useSelector(selectCurrentUser)

export const item = [
    {
        label: (
            <Link to="" > Trang chủ </Link>
        ),
        key:1,
        // icon: <Dashboard style={{width: '20px'}}/>,
        icon: <HiOutlineHome/>,
        route: '/dashboard'
    },
    {
        label: (
            <Link to="requests" > Yêu cầu </Link>
        ),
        key:2,
        icon: <HiOutlinePencilSquare/>,
        route: '/requests'
    },
    {
        label: (
            <Link to="donate" > Donate </Link>
        ),
        key:6,
        icon: <HiOutlineHeart />,
        route: '/donate'
    },
    {
        label: (
            <Link to="reports" > Báo cáo </Link>
        ),
        key:3,
        icon: <HiOutlineClipboardDocumentList />,
        route: '/reports'
    },
    {
        label: 'Người dùng',
        key:'users',
        icon: <HiOutlineUsers/>,
        children: [
            {
                label: (
                    <Link to="profile" > Thông tin cá nhân </Link>
                ),
                key:'users-profile',
                route: "/profile"
            },
            {
                label: (
                    <Link to="admins" > Quản trị viên </Link>
                ),
                key:'users-admin',
                route: "/admins"
            },
            {
                label: (
                    <Link to="centers" > Quản lý trung tâm </Link>
                ),
                key:'users-center',
                route: "/centers"
            }
        ]
    },
    {
        label: (
            <Link to="news" > Tin tức </Link>
        ),
        key:4,
        // icon: <FontAwesomeIcon icon="fas fa-newspaper" style={{width: '20px'}} />,
        icon: <HiOutlineNewspaper />,
        route: "/news"
    },
    // {
    //     label: (
    //         <Link to="statistic" > Thống kê </Link>
    //     ),
    //     key:5,
    //     icon: <HiOutlineChartSquareBar />,
    //     route : "/statistic"
    // },
    {
        label: (
            <Link to="master-setting" > Cài đặt chung </Link>
        ),
        key:7,
        icon: <HiOutlineCog6Tooth />,
        route : "/master-setting"
    },
]

export const centerItem = [
    {
        label: (
            <Link to="" > Trang chủ </Link>
        ),
        key:1,
        // icon: <Dashboard style={{width: '20px'}}/>,
        icon: <HiOutlineHome/>,
        route: '/dashboard'
    },
    {
        label: (
            <Link to="requests" > Yêu cầu </Link>
        ),
        key:2,
        icon: <HiOutlinePencilSquare/>,
        route: '/requests'
    },
    {
        label: (
            <Link to="reports" > Báo cáo </Link>
        ),
        key:3,
        icon: <HiOutlineClipboardDocumentList />,
        route: '/reports'
    },
    {
        label: (
            <Link to="representative-profile" > 
                Hồ sơ đại diện
            </Link>
        ),
        key:'representative-profile',
        icon: <HiOutlineUsers />,
        route: '/representative-profile'
    },
    {
        label: (
            <Link to="center-profile" > 
                Hồ sơ trung tâm
            </Link>
        ),
        key:'center-profile',
        icon: <HiOutlineBuildingLibrary />,
        route: '/center-profile'
    },


]

export const MenuItemData = [
    {
        heading : "Trang chủ",
        route: '/dashboard'
    },
    {
        heading : "Yêu cầu",
        route : '/requests'
    },
    {
        heading : "Quản trị viên",
        route: "/admins"
    },
    {
        heading: "Quản lý trung tâm",
        route: "/centers"
    },
    {
        heading : "Tin tức",
        route: "/news"
    },
    {
        icon : <ChartFill/>,
        heading : "Thống kê"
    }
];

