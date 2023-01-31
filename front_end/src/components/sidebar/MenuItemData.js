import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ReactComponent as Dashboard} from './image/Dashboard.svg';
import {ReactComponent as ChartFill} from './image/Chart_fill.svg';
// import {ReactComponent as News} from './image/News.svg';
import {ReactComponent as User} from './image/User.svg';
import {ReactComponent as Request} from './image/Request.svg';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
export const item = [
    getItem('Trang chủ', '1',<Dashboard/> ),
    getItem('Yêu cầu', '2', <Request/>),
    getItem('Người dùng', 'sub1', <User/>, [
        getItem('Quản trị viên', '5'),
        getItem('Quản lý trung tâm', '6'),
    ]),
    getItem('Tin tức', '7', <FontAwesomeIcon icon="fas fa-newspaper" />),
    getItem('Thống kê', '8', <ChartFill/>),

];
export const MenuItemData = [
    {
        icon :   <Dashboard/>,
        heading : "Trang chủ"
    },
    {
        icon : <Request/>,
        heading : "Yêu cầu"
    },
    {
        icon : <User/>,
        heading : "Người dùng"
    },
    {
        icon : <FontAwesomeIcon icon="fas fa-newspaper" />,
        heading : "Tin tức"
    },
    {
        icon : <ChartFill/>,
        heading : "Thống kê"
    }
];

