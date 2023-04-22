import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ReactComponent as Dashboard} from './image/Dashboard.svg';
import {ReactComponent as ChartFill} from './image/Chart_fill.svg';
// import {ReactComponent as News} from './image/News.svg';
import {ReactComponent as User} from './image/User.svg';
import {ReactComponent as Request} from './image/Request.svg';

import {Link} from 'react-router-dom'

export const item = [
    {
        label: (
            <Link to="" > Trang chủ </Link>
        ),
        key:1,
        icon: <Dashboard style={{width: '20px'}}/>
    },
    {
        label: (
            <Link to="requests" > Yêu cầu </Link>
        ),
        key:2,
        icon: <Request/>
    },
    {
        label: 'Người dùng',
        key:'submenu',
        icon: <User/>,
        children: [
            {
                label: (
                    <Link to="admins" > Quản trị viên </Link>
                ),
                key:'sub-item-1',
            },
            {
                label: (
                    <Link to="centers" > Quản lý trung tâm </Link>
                ),
                key:'sub-item-2',
            }
        ]
    },
    {
        label: (
            <Link to="news" > Tin tức </Link>
        ),
        key:3,
        icon: <FontAwesomeIcon icon="fas fa-newspaper" style={{width: '20px'}} />
    },
    {
        label: (
            <Link to="statistic" > Thống kê </Link>
        ),
        key:4,
        icon: <ChartFill />
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

