import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ReactComponent as Dashboard} from './image/Dashboard.svg';
import {ReactComponent as ChartFill} from './image/Chart_fill.svg';
// import {ReactComponent as News} from './image/News.svg';
import {ReactComponent as User} from './image/User.svg';
import {ReactComponent as Request} from './image/Request.svg';
import { TbReportSearch } from 'react-icons/tb';
import {BsClipboard2Check} from 'react-icons/bs';
import { HiOutlineChartSquareBar,  } from 'react-icons/hi';
import {  HiOutlineClipboardDocumentList,HiOutlineHome,HiOutlineUsers,HiOutlineNewspaper, HiOutlinePencilSquare} from 'react-icons/hi2';

import {Link} from 'react-router-dom'

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
    {
        label: (
            <Link to="statistic" > Thống kê </Link>
        ),
        key:5,
        icon: <HiOutlineChartSquareBar />,
        route : "/statistic"
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

