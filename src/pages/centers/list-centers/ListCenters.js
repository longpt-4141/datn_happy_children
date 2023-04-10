import React , {useState , useEffect } from 'react'
import { Space, Table,  Tooltip, Avatar, Input } from "antd";
import { EyeOutlined, DeleteOutlined  } from '@ant-design/icons';
import {ReactComponent as AvatarDefault} from '../../../assets/img/icon/user_avatar_default.svg';
import "./center.scss";
import {useNavigate} from 'react-router-dom';
import { arrayBufferToBase64 } from '../../../utils/render-image';
import axios  from 'axios';
import removeVietnameseTones from '../../../utils/format/stringFomart';

const columns = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "STT",
        width: "7%",
    },
    {
        title: "Avatar",
        dataIndex: "avatar",
        key: "avatar",
        width: '10%',
    },
    {
        title: "Tên Trung Tâm",
        dataIndex: "name",
        key: "name",
        width:'20%',
        ellipsis: {
            showTitle: true,
        },
        render: (name) => (
        <Tooltip placement="topLeft" title={name}>
            {name}
        </Tooltip>
        ),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: '15%',
        ellipsis: {
            showTitle: true,
        },
        render: (email) => (
        <Tooltip placement="topLeft" title={email}>
            {email}
        </Tooltip>
        ),
    },
    {
        title: "Số Điện Thoại",
        dataIndex: "phone_number",
        key: "phone_number",
        width: '15%',
    },
    {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
        width: "30%",
        ellipsis: {
            showTitle: true,
        },
        render: (address) => (
        <Tooltip placement="topLeft" title={address}>
            {address}
        </Tooltip>
        ),
    },
    {
        title: "Action",
        key: "action",
        width: "10%",
        render: () => (
        <Space size="middle">
            <EyeOutlined />
            <DeleteOutlined />
        </Space>
        ),
    },
];

const Centers = () => {
    const [centerData, setCenterData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useState("");
    let navigate = useNavigate();

    const onSearch = (e) => {
        console.log(e.target.value);
        const searchText = removeVietnameseTones(e.target.value);
        if(searchText.length > 0) {
            let centersDataAfterSearch = searchParams.filter(center => {
                const centerName = removeVietnameseTones(center.name);
                console.log({centerName});
                return centerName.includes(searchText)
            });
            console.log({centersDataAfterSearch})
            setCenterData(centersDataAfterSearch)
        }else {
            setCenterData(searchParams)
        }
    }

    const getData = async () => {
        const res = await axios.get('http://localhost:8080/centers')
        console.log(res)
        // setLoading(false);

        const listCentersData = res.data.map((row, index) => (
            {
                id: row.id,
                stt: index +1,
                avatar: !row.avatar ? 
                        <AvatarDefault 
                            style={{width:'40px', height:'40px'}}
                        /> 
                        :       
                        <Avatar
                            size={40}
                            src={arrayBufferToBase64(row.avatar)}
                            className='profile__left--avatar'
                        />  ,
                name: row.name,
                email: row.user.email,
                phone_number: row.phone_number,
                address: row.address
            }
        ))
        setCenterData(listCentersData);
        setSearchParams(listCentersData);
    }

    useEffect(() => {
        getData()      
    }, [])

    return (
        <React.Fragment>
            <Input
                onChange={onSearch}
                type='search'
                placeholder="Search product"
            />
            <Table 
                columns={columns} 
                dataSource={centerData} 
                onRow={(record, rowIndex) => {
                return {
                onClick: event => {
                    event.preventDefault();
                    console.log('record', record.id)
                    navigate(`/centers/${record.id}`)
                    }
                    };
                }}
            />
        </React.Fragment>
    )

}
export default Centers;
