import './ListReport.scss'
import React , {useState , useEffect } from 'react'
import { Space, Table,  Tooltip,  Button, Modal } from "antd";
import { EyeOutlined, DeleteOutlined} from '@ant-design/icons';
import {useNavigate,Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import convertVNDMoney from '../../../utils/format/money-format';
import { formatRequestCreate } from '../../../utils/format/date-format';
import SyncLoading from '../../../components/spinners/SyncLoading';
import ReportStatusTag from '../../../components/tags/ReportStatusTag';
import { SelectReportLoading, deleteReport, getAllReports, selectFilteredReportData, selectReportData } from '../../../services/slicer/ReportSlicer';
// import { selectCenterId } from '../../../services/slicer/AuthSlicer';

const RequestList = ({ hiddenColumn, currentRole,centerId, filterData}) => {
    const [deleteId, setDeleteId] = useState('');
    // const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    let selectReportList = useSelector(selectReportData)
    let selectFilteredReportList = useSelector(selectFilteredReportData)
    let ReportLoading = useSelector(SelectReportLoading)
    console.log({centerId})
    console.log(convertVNDMoney(100675575))

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (reportId) => {
        setDeleteId(reportId)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        console.log(deleteId)
        dispatch(deleteReport(deleteId))
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
                        navigate(`/reports/${id}`)
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
                        navigate(`/reports/${id}`)
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
            title: "Mô tả hỗ trợ",
            dataIndex: "request_description",
            key: "request_description",
            width: '25%',
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/reports/${id}`)
                        }
                    };
            },
            render: (description) => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
                ),
        },
        {
            title: "Số tiền đã trợ cấp",
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
                        navigate(`/reports/${id}`)
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
            title: "Số tiền đã chi",
            dataIndex: "total_pay_money",
            key: "total_pay_money",
            width: "15%",
            ellipsis: {
                showTitle: true,
            },
            onCell: ({id}) => {
                return {
                    onClick: event => {
                        event.preventDefault();
                        console.log('record', id)
                        navigate(`/reports/${id}`)
                        }
                    };
            },
            render: (money) => (
                <>
                    <Tooltip placement="topLeft" title={convertVNDMoney(money)}>
                        <p 
                            style={{
                                color: 'rgb(14 160 97)',
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
                        navigate(`/reports/${id}`)
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
                        navigate(`/reports/${id}`)
                        }
                    };
            },
            render: (status, record) => (
                <ReportStatusTag value={status} />
            ),
        },
        {
            title: () =>
                    <p 
                        style={{
                            textAlign: "center"
                        }}
                    >
                        Thao tác
                    </p>,
            key: "action",
            width: "10%",
            render: (action,record) => (
            <div 
                style={{
                    textAlign: "center"
                }}
            >
                <Space size="middle">
                    <Link to={`/reports/${record.id}`}>
                        <Button
                            className='report-list__table--button__view'
                            icon={<EyeOutlined/>}
                            shape='circle'
                            size='default'
                        >    
                        </Button>
                    </Link>
                    {
                        record.status === 0 && currentRole === 2
                            ? 
                        <Button
                            onClick={() => showModal(record.id)}
                            className='report-list__table--button__delete'
                            icon={<DeleteOutlined/>}
                            shape='circle'
                            size='default'
                        >    
                        </Button>
                            :
                        <></>
                    }
                </Space>
            </div>
            ),
        },
    ].filter(item => !item.hidden);



    useEffect(() => {
            dispatch(getAllReports({currentRole, centerId}))
            console.log('vaof lít report')   
    }, [centerId, currentRole, dispatch])

    return (
        <React.Fragment>
            {
                ReportLoading === false ? 
                <>
                    <Table 
                        columns={columns} 
                        dataSource={filterData.searchText === null && filterData.reportStatus === null ? selectReportList : selectFilteredReportList} 
                        pagination={
                            {
                                showSizeChanger: true,
                            }
                        }
                        // loading={listRequestData.isLoading}
                    >
                    </Table>
                    <Modal title='Xác nhận xóa trung tâm' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <p>Bạn có thực sự muốn xóa báo cáo này không ?</p>
                            {/* <p>Some contents...</p>
                            <p>Some contents...</p> */}
                    </Modal>
                </>
                :
                <SyncLoading />
            }
        </React.Fragment>
    )
}

export default RequestList;
