import React , {useState , useEffect } from 'react'
import { Space, Table,  Tooltip,  Button, Modal } from "antd";
import { EyeOutlined, DeleteOutlined  } from '@ant-design/icons';
import "./RequestList.scss";
import {useNavigate,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequest, getAllRequests, selectIsLoading, selectRequestData } from '../../../services/slicer/RequestSlicer';
import StatusTag from '../../../components/tags/StatusTag';
import RequestTypeTag from '../../../components/tags/RequestTypeTag';
import convertVNDMoney from '../../../utils/format/money-format';
import { formatRequestCreate } from '../../../utils/format/date-format';
import SyncLoading from '../../../components/spinners/SyncLoading';

const RequestList = ({searchText, hiddenColumn}) => {
    const [deleteId, setDeleteId] = useState('');
    // const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let selectRequestList = useSelector(selectRequestData)
    let isLoading = useSelector(selectIsLoading)
    console.log({selectRequestList})
    console.log(convertVNDMoney(100675575))

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (requestId) => {
        setDeleteId(requestId)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        dispatch(deleteRequest(deleteId))
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
            width: "5%",
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
                        }
                    };
            },
        },
        {
            title: "Tên Trung Tâm",
            dataIndex: "center_name",
            key: "center_name",
            width:'15%',
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
                        }
                    };
            },
            hidden: hiddenColumn,
            render: (name,record) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: "Loại hỗ trợ",
            dataIndex: "type_request",
            key: "type_request",
            width: '15%',
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
                        }
                    };
            },
            render : (type_request) => (
                <RequestTypeTag value={type_request}/>
            )
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: '25%',
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
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
            title: "Số tiền cần trợ cấp",
            dataIndex: "total_money",
            key: "total_money",
            width: "15%",
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
                        }
                    };
            },
            render: (money) => (
                <>
                    <Tooltip placement="topLeft" title={convertVNDMoney(money)}>
                        <p 
                            style={{
                                color: 'var(--mainColor)',
                                fontWeight: '500',
                                fontSize: '16px'
                            }}
                        >{convertVNDMoney(money)}</p>
                    </Tooltip>
                </>
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "15%",
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
                        }
                    };
            },
            render: (date) => (
            <Tooltip placement="topLeft" title={formatRequestCreate(date)}>
                {formatRequestCreate(date)}
            </Tooltip>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: "10%",
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/requests/${id}`)
                        }
                    };
            },
            render: (status) => (
                <StatusTag value={status} />
            ),
        },
        {
            title: "Thao tác",
            key: "action",
            width: "10%",
            render: (action,record) => (
            <Space size="middle">
                <Link to={`/requests/${record.id}`}>
                    <Button
                        className='center-list__table--button__view'
                        icon={<EyeOutlined/>}
                        shape='circle'
                        size='default'
                    >    
                    </Button>
                </Link>
                {
                    record.status === 0 
                        ? 
                    <Button
                        onClick={() => showModal(record.id)}
                        className='center-list__table--button__delete'
                        icon={<DeleteOutlined/>}
                        shape='circle'
                        size='default'
                    >    
                    </Button>
                        :
                    <></>
                }
            </Space>
            ),
        },
    ].filter(item => !item.hidden);



    useEffect(() => {
        // const handleSearch = (listRequestData) => {
        //     if(searchText.length > 0) {
        //         let requestDataAfterSearch = listRequestData.filter(center => {
        //             const centerName = removeVietnameseTones(center.center_name);
        //             console.log('request tokoro',{centerName});
        //             return centerName.toLowerCase().includes(searchText)
        //         });
        //         console.log({requestDataAfterSearch})
        //         setRequestData(requestDataAfterSearch)
        //     }else {
        //         setRequestData(listRequestData)
        //     }
        // }
        // console.log(selectRequestList.isLoading)
                dispatch(getAllRequests())
            console.log('vaof')   
    }, [dispatch])

    return (
        <React.Fragment>
            {
                isLoading === false ? 
                <>
                    <Table 
                        columns={columns} 
                        dataSource={selectRequestList} 
                        pagination={
                            {
                                showSizeChanger: true,
                            }
                        }
                        // loading={listRequestData.isLoading}
                    >
                    </Table>
                    <Modal title='Xác nhận xóa trung tâm' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <p>Bạn có thực sự muốn xóa trung tâm này không ?</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                    </Modal>
                </>
                :
                <SyncLoading />
            }
        </React.Fragment>
    )
}

export default RequestList;
