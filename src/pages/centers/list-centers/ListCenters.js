import React , {useState , useEffect } from 'react'
import { Space, Table,  Tooltip, Avatar, Button, Modal, Pagination} from "antd";
import { EyeOutlined, DeleteOutlined  } from '@ant-design/icons';
import {ReactComponent as AvatarDefault} from '../../../assets/img/icon/user_avatar_default.svg';
import "./center.scss";
import {useNavigate,Link} from 'react-router-dom';
import { arrayBufferToBase64 } from '../../../utils/render-image';
import axios  from 'axios';
import removeVietnameseTones from '../../../utils/format/stringFomart';
import { deleteCenter } from '../../../services/centerService';
import { toastSuccess, toastError } from '../../../utils/toast-popup';


const CentersList = ({searchText}) => {
    const [centerData, setCenterData] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    // const [loading, setLoading] = useState(true);
    let navigate = useNavigate();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (centerId) => {
        setDeleteId(centerId)
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const setColumnData = (rawData) => {
            rawData.map((row,index) => ({
                key: row.id,
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
                email: row.center_email,
                phone_number: row.phone_number,
                address: row.address
            }))
        }
        let dataResponse =  await deleteCenter(deleteId)
        switch (dataResponse.EC) {
            case "DELETE_CENTER_SUCCESS":
                toastSuccess(dataResponse.EM)
                const res = await axios.get('http://localhost:8080/centers')  
                const listCentersData = setColumnData(res.data)
                setCenterData(listCentersData)
                break;
            default:
                toastError('Lỗi đăng nhập, vui lòng thử lại!')
                break;
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "STT",
            width: "7%",
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/centers/${id}`)
                        }
                    };
            },
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            width: '10%',
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/centers/${id}`)
                        }
                    };
            },
        },
        {
            title: "Tên Trung Tâm",
            dataIndex: "name",
            key: "name",
            width:'20%',
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/centers/${id}`)
                        }
                    };
            },
            render: (name,record) => (
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
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/centers/${id}`)
                        }
                    };
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
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/centers/${id}`)
                        }
                    };
            },
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: "25%",
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/centers/${id}`)
                        }
                    };
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
            render: (action,record) => (
            <Space size="middle">
                <Link to={`/centers/${record.id}`}>
                    <Button
                        className='center-list__table--button__view'
                        icon={<EyeOutlined/>}
                        shape='circle'
                        size='default'
                    >    
                    </Button>
                </Link>
                <Button
                    onClick={() => showModal(record.id)}
                    className='center-list__table--button__delete'
                    icon={<DeleteOutlined/>}
                    shape='circle'
                    size='default'
                >    
                </Button>
            </Space>
            ),
        },
    ];

    useEffect(() => {
        const handleSearch = (listCentersData) => {
            if(searchText.length > 0) {
                let centersDataAfterSearch = listCentersData.filter(center => {
                    const centerName = removeVietnameseTones(center.name);
                    console.log({centerName});
                    return centerName.toLowerCase().includes(searchText)
                });
                console.log({centersDataAfterSearch})
                setCenterData(centersDataAfterSearch)
            }else {
                setCenterData(listCentersData)
            }
        }
        const getData = async () => {
            const res = await axios.get('http://localhost:8080/centers')
            console.log(res)
            // setLoading(false);
    
            const listCentersData = res.data.map((row, index) => (
                {   
                    key: row.id,
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
                    email: row.center_email,
                    phone_number: row.phone_number,
                    address: row.address
                }
            ))
            handleSearch(listCentersData)
        }
    getData();     
    }, [searchText])

    return (
        <React.Fragment>
            <Table 
                columns={columns} 
                dataSource={centerData} 
                pagination={
                    {
                        showSizeChanger: true,
                    }
                }
            >
            </Table>
            <Pagination
                    showSizeChanger
                    showQuickJumper
                ></Pagination>
            <Modal title='Xác nhận xóa trung tâm' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Bạn có thực sự muốn xóa trung tâm này không ?</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
            </Modal>
        </React.Fragment>
    )

}
export default CentersList;
