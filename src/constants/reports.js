import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
  } from '@ant-design/icons';

export const REPORT_STATUS = [
    {
        value: 0,
        color : '#FFC347',
        title: 'Đang chờ'
    },
    {
        value: 1,
        color : '#53C292',
        title: 'Đã xác nhận'
    },
    {
        value: 2,
        color: "#8EA895",
        title: "Từ chối"
    },
];

// export const MONEY_TRANSFER_CONFIRM_STATUS = [
//     {
//         value: 0,
//         color : '#ffffba',
//         title: 'Đang chờ',
//         icon : <ClockCircleOutlined style={{color:'#FFC347'}}/>,
//         style: {
//             color: '#FFC347',
//             border: '1px solid #FFC347',
//             fontSize : '14px'
//         }
//     },
//     {
//         value: 1,
//         color : '#baffc9',
//         title: 'Đã xác nhận',
//         icon : <CheckCircleOutlined style={{color:'#53C292'}}/>,
//         style: {
//             color: '#53C292',
//             border: '1px solid #53C292',
//             fontSize : '14px'
//         }
//     },
//     {
//         value: -1,
//         color: "#8EA895",
//         title: "Chưa nhận được ",
//         icon : <CloseCircleOutlined />
//     },
// ]