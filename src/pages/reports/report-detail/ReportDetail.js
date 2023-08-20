import React from 'react';
import './ReportDetail.scss'
import { Button, Col, ConfigProvider, DatePicker, Divider, Form, Input, InputNumber, Modal, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectReceiptData, SelectReportItem, SelectRequestDataFromReport, acceptOrRejectReport, getSpecificReport, updateReport } from '../../../services/slicer/ReportSlicer';
import RequestInformation from '../../../components/RequestInformation';
import { useNavigate } from 'react-router-dom';
import { FcFolder } from "react-icons/fc";
import children_playing from '../../../assets/img/children_playing.svg';

import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/vi_VN';
import { useState } from 'react';
import moment from 'moment';
import convertVNDMoney from '../../../utils/format/money-format';
import { toastError, toastWarning } from '../../../utils/toast-popup';
import { formatRequestCreate, formatTimeData } from '../../../utils/format/date-format';
import { compareTwoArrayOfObjects } from '../../../utils/compareTwoObject';
import { selectUserRole } from '../../../services/slicer/AuthSlicer';
import ButtonWrapper from '../../../components/button/ButtonWrapper';
import ReportStatusTag from '../../../components/tags/ReportStatusTag';


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
    }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
        {editing ? (
            <ConfigProvider locale={locale}>
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                    required: true,
                    message: `Vui lòng nhập ${title}!`,
                    },
                ]}
                >
                {
                    dataIndex === 'pay_date' ? <DatePicker/> : inputNode
                }
            </Form.Item>
            </ConfigProvider>
        ) : (
            children
        )}
        </td>
    );
};


const ReportDetail = () => {
    const dispatch = useDispatch();
    const requestItem = useSelector(SelectRequestDataFromReport)
    const reportItem = useSelector(SelectReportItem)
    const receiptData = useSelector(SelectReceiptData);
    const currentRole = useSelector(selectUserRole);

    const requestId = requestItem ? requestItem.id : null
    let { id } = useParams(); 
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [totalMoney, setTotalMoney] = useState('')

    const [form] = Form.useForm();
    const [data, setData] = useState(receiptData);
    const [editingKey, setEditingKey] = useState('');
    // const [editingStatus, setEditing] = useState(false)
    const [paymentFileURL, setPaymentFileURL] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [expireAt, setExpireAt] = useState('')

    /* accept report */
    const showAgreeModal = () => {
        setIsModalOpen(true);
    };
    const handleAcceptReport = async() => {
        try {
            await dispatch(acceptOrRejectReport({
                reportId : id,
                centerId : requestItem.centerId,
                actionData : {
                    note_reject: null,
                    status : 'accepted',
                    id : id
                },
                currentRole
            })).unwrap()
            setIsModalOpen(false);
        } catch (error) {
            console.log('accept report failed', error)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    /* reject report */
    const handleRejectReport = async (value) => {
        console.log(value);
        try {
            await dispatch(acceptOrRejectReport({
                reportId : id,
                centerId : requestItem.centerId,
                actionData : {
                    ...value,
                    status : 'rejected',
                    id : id
                },
                currentRole
            })).unwrap()
            setIsRejectModalOpen(false)
        } catch (error) {
            console.log('accept report failed', error)
        }
    }

    const showRejectModal = () => {
        setIsRejectModalOpen(true);
    };

    const handleCancelReject = () => {
        setIsRejectModalOpen(false);
    };

    /*  */
    const handleChangeFileURL = (e) => {
        console.log(e.target.value)
        setPaymentFileURL(e.target.value)
    }

    console.log({paymentFileURL })

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        const formattedDate = moment(record.pay_date).format('YYYY-MM-DD')
        console.log('formattedDate',formattedDate)
        form.setFieldsValue({
            receipt_name: record.receipt_name,
            pay_date:  (record.pay_date) ? dayjs(record.pay_date, 'YYYY-MM-DD') : "",
            tax: record.tax,
            pay_money: record.pay_money,
            total: record.pay_money + record.pay_money * ( record.tax / 100 ),
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
        const row = await form.validateFields(['receipt_name','pay_date', 'tax','pay_money' ]);
        row['total'] = row.pay_money + row.pay_money * ( row.tax / 100 )
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
            ...item,
            ...row,
            });
            setData(newData);
            setEditingKey('');
        } else {
            console.log('khong thay doi gi ca')
            newData.push(row);
            setData(newData);
            setEditingKey('');
        }
        } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key)
        const mapData = newData.map((item, index) => ({
            ...item,
            stt : index+1,
            receipt_name: `hóa đơn thứ ${index+1}`
        }))
        console.log({mapData});
        console.log({newData})
        setData(mapData);
    };


    const handleAdd = () => {
        
        const newData = {
        stt: data.length + 1,
        key: count,
        receipt_name: `hóa đơn thứ ${data.length + 1}`,
        pay_date: '',
        tax: '',
        pay_money: '',
        total: 0,
        };
        setData([...data, newData]);
        setCount(count + 1);
    };

    console.log({data})

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: '10%',
        },
        {
        title: 'Tên hóa đơn',
        dataIndex: 'receipt_name',
        width: '20%',
        editable: true,
        },
        {
        title: 'Ngày chi tiền',
        dataIndex: 'pay_date',
        width: '15%',
        editable: true,
        render : (date, record) => {
            return <span>{moment(date.$d).format('DD/MM/YYYY')}</span>
        }
        },
        {
        title: 'Thuế (%)',
        dataIndex: 'tax',
        width: '8%',
        editable: true,
        },
        {
            title: 'Tổng tiền hàng',
            dataIndex: 'pay_money',
            width: '15%',
            editable: true,
            ender : (pay_money, record) => {
                return (
                    <Tooltip title={convertVNDMoney(pay_money)}>
                        <span>{pay_money}</span>
                    </Tooltip>
                )
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total',
            width: '15%',
            // editable: true,
            render : (total, record) => {
                let totalMoney = record.pay_money + record.pay_money * ( record.tax / 100 );
                return (
                    <span>{convertVNDMoney(totalMoney)}</span>
                )
            }
        },
        {
        title: 'Thao tác',
        dataIndex: 'operation',
        hidden : currentRole === 1 || reportItem.status === 1 || reportItem.status ===2 ? true : false,
        render: (_, record) => {
            const editable = isEditing(record);
            console.log('record laf cai d j', record)
            return editable ? (
            <span>
                <Typography.Link
                    onClick={() => save(record.key)}
                    style={{
                        marginRight: 8,
                    }}
                >
                    Lưu
                </Typography.Link>
                <Popconfirm title="Bạn có chắc chắn muốn hủy?" onConfirm={cancel}>
                    <a>Hủy</a>
                </Popconfirm>
            </span>
            ) : (
            <>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Sửa
                </Typography.Link>
                {
                    data.length >= 1 ? (
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.key)}>
                            <a>Xóa</a>
                        </Popconfirm>
                    ) : null
                }
            </>
            
            );
        },
        },
    ].filter(item => !item.hidden);

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
        return col;
        }
        return {
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'tax' ||  col.dataIndex === 'pay_money' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });

    

    const handleSubmit = async () => {
        console.log('submit value', )
        console.log(totalMoney)
        console.log(data);
        const formatedReceiptData = formatTimeData(data);
        const checkHaveChangedReceiptData = compareTwoArrayOfObjects(formatTimeData(receiptData),formatTimeData(data))
        const checkHaveChangeUploadData = paymentFileURL === reportItem.payment_file_url;
        const checkEmptyRow = data.find((item) => item.pay_date === '' || item.tax === '' || item.pay_money === '');
        console.log('so sah',checkHaveChangedReceiptData, {data}, {receiptData})
        if(checkHaveChangedReceiptData === true && checkHaveChangeUploadData === true) {
            toastWarning('Hình như bạn chưa thay đổi thông tin nào cả, Hãy kiểm tra lại nhé')
        } else if(checkEmptyRow !== undefined) {
            toastWarning('Bạn đừng để hóa đơn nào bị trống nha')
        } else if(data.length === 0) {
            toastWarning('Bạn chưa có hóa đơn nào cả, hãy thêm hóa đơn để báo cáo nhé')
        } else {
            await form.validateFields(['payment_file_url', 'expire_at'])
            let newReportData = {
                requestId : requestId,
                receiptData : formatedReceiptData.map((item) => ({
                    receipt_name: item.receipt_name,
                    pay_date:  item.pay_date,
                    tax: item.tax,
                    pay_money: item.pay_money,
                })),
                payment_file_url : paymentFileURL,
                total_pay_money : totalMoney,
                expire_at : expireAt
            }
            try {
                await dispatch(updateReport({
                    reportId : id,
                    reportData : newReportData
                })).unwrap();
                navigate('/reports')
            }
            catch (err) {
                        toastError('Xảy ra lỗi, vui lòng tải lại trang và thử lại')
                    }
            console.log({newReportData})
        }
    }


    const summaryMoney = (record) => {
        const sum = record.reduce((accumulator, object) => {
            let totalMoney = object.pay_money + object.pay_money * ( object.tax / 100 );
            console.log(accumulator, totalMoney)
            return accumulator + parseInt(totalMoney);
        }, 0);
        setTotalMoney(sum)
        return convertVNDMoney(sum)
    }

    useEffect(() => {
        dispatch(getSpecificReport(id))
        form.setFieldsValue({
            payment_file_url : reportItem.payment_file_url,
            expire_at : (reportItem.expire_at) ? dayjs(reportItem.expire_at, 'YYYY-MM-DD') : ""
        })
    }, [dispatch, form, id, reportItem.expire_at, reportItem.payment_file_url]);

    useEffect(() => {
        setData(receiptData)
        setPaymentFileURL(reportItem.payment_file_url)
    },[receiptData])

    return (
        <div className="report-detail__page">
            <h3
                style={{
                    color : 'var(--mainColor)',
                    fontSize : '20px',
                    fontWeight: '500',
                    marginBottom: '30px',
                }}
                
            >
                Chi tiết báo cáo
            </h3>
            <RequestInformation requestItem={requestItem} />
            
            <div className="report--body">
                <div className="report--title">
                <h3
                    style={{
                        color : 'var(--mainColor)',
                        fontSize : '16px',
                        fontWeight: '600',
                        marginBottom: '30px',
                        textTransform: 'uppercase',
                        textAlign: 'center'
                    }}
                    
                >
                    Nội dung báo cáo
                </h3>
                {
                    currentRole === 2 && reportItem.status === 0? 
                    <Row>
                        <Col span={6}>
                            <Button
                                onClick={handleAdd}
                                type="primary"
                                style={{
                                marginBottom: 16,
                                }}
                            >
                                Thêm hóa đơn
                            </Button>
                        </Col>
                    </Row>
                    :
                    <></>
                }
                <Form form={form} component={false}>
                        <Table
                            components={{
                            body: {
                                cell: EditableCell,
                            },
                            }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                            onChange: cancel,
                            }}
                            summary={() => (
                                <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>
                                        <p
                                            style={{
                                                fontWeight: '500'
                                            }}
                                        >
                                            Tổng tiền chi
                                        </p>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell    
                                        index={1} 
                                        colSpan={5} 
                                        style={{    
                                            textAlign: "end",
                                            }}
                                    >
                                    <p
                                        style={{
                                            fontWeight: '500'
                                        }}
                                    >
                                        {summaryMoney(data)}
                                    </p>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                            <Row
                                style={{
                                    justifyContent: "space-between",
                                }}
                            >
                                <Col span={12}>
                                    <div className="report__file">
                                        <h4
                                            style={{
                                                marginTop: '5px',
                                                fontSize : '16px',
                                            }}
                                        >
                                            Tài liệu báo cáo
                                        </h4>
                                        <div className="report__file--body">
                                            <h4
                                                style={{
                                                    marginTop: '20px',
                                                    fontWeight: '500',
                                                    fontSize : '14px',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                Thư mục tài liệu báo cáo
                                            </h4>
                                            <a
                                                target="_blank"
                                                href={requestItem ? requestItem.report_folder_url : ''}
                                                rel="noreferrer"
                                            >
                                                <Button 
                                                
                                                    type="dashed"
                                                    icon={<FcFolder 
                                                            style={{
                                                                fontSize : '20px',
                                                                marginRight: '10px'
                                                            }}
                                                        />}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-evenly",
                                                        }}          
                                                    >
                                                    Bấm vào đây
                                                </Button>
                                            </a>
                                            {
                                                currentRole === 2 && reportItem.status === 0? 
                                                <>
                                                    <h4
                                                        style={{
                                                            marginTop: '20px',
                                                            fontWeight: '500',
                                                            fontSize : '14px',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        Bạn hãy dán link dẫn đến tài liệu báo cáo vào ô dưới đây
                                                    </h4>
                                                    <Form.Item
                                                        name="payment_file_url"
                                                        label="Link hóa đơn"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Bạn cần gửi tài liệu để chúng tôi kiểm chứng'
                                                            },
                                                            {
                                                                type: 'url',
                                                                warningOnly: true,
                                                                message: 'đường link hợp lệ sẽ như sau : https/long.com'
                                                            },
                                                        ]}
                                                    >
                                                        <Input 
                                                            placeholder="Hãy nhập link tài liệu" 
                                                            onChange={handleChangeFileURL}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="expire_at"
                                                        label="Ngày mong muốn xác nhận báo cáo"
                                                        rules={[
                                                            ({ getFieldValue }) => ({
                                                                validator(rule, value) {
                                                                    // from 'getFieldValue("fieldName")' we can get the current value of that field.
                                                                    if (
                                                                        value <
                                                                        dayjs().startOf('day')
                                                                    ) {
                                                                        // value = currentValue of this field. with that we can do validations with other values in form fields
                                                                        return Promise.reject(
                                                                            "Ngày hết hạn phải bắt đầu từ hôm này"
                                                                        ); // The validator should always return a promise on both success and error
                                                                    } if (
                                                                        value === undefined || null
                                                                    ) {
                                                                        return Promise.resolve();

                                                                    }
                                                                    else {
                                                                        return Promise.resolve();
                                                                    }
                                                                },
                                                            }),
                                                        ]}
                                                    >
                                                        <DatePicker
                                                            placeholder="Hãy chọn ngày hết hạn"
                                                            onChange={(value, dateString) => {
                                                                console.log({ dateString });
                                                                setExpireAt(dateString)
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </>
                                                : 
                                                <>
                                                    <h4
                                                        style={{
                                                            marginTop: '20px',
                                                            fontWeight: '500',
                                                            fontSize : '14px',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        Bấm vào đường link dưới đây để dẫn đến tài liệu
                                                    </h4>
                                                    <ButtonWrapper link={reportItem.payment_file_url} />
                                                    <Divider />
                                                    <Row
                                                        style={{
                                                            marginTop: '20px',
                                                        }}
                                                    >
                                                        <Col span={12} className="inner--title">
                                                            Mong muốn được duyệt vào ngày :
                                                        </Col>
                                                        <Col span={12}>
                                                            {
                                                                reportItem.expire_at === null ? 
                                                                <p>Vô thời hạn</p>
                                                                :
                                                                <p>{formatRequestCreate(reportItem.expire_at)}</p>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </Col>
                                <Col span={11}>
                                    <div className="report-detail__status">
                                        <Row>
                                            <Col span={12}>
                                                <h3
                                                    style={{
                                                        fontSize : '16px',
                                                        fontWeight: '500'
                                                    }} 
                                                >
                                                    Trạng thái của báo cáo
                                                </h3>
                                            </Col>
                                        </Row>
                                        <Divider/>
                                        <Row>
                                            <Col span={12} className="inner--title">
                                                Trạng thái :
                                            </Col>
                                            <Col span={12}>
                                                <ReportStatusTag value={reportItem.status} />
                                            </Col>
                                        </Row>
                                        {
                                            reportItem.status === 2 ?
                                            <>
                                                <Row
                                                    style={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <Col span={12} className="inner--title">
                                                        Lý do từ chối :
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>{reportItem.note_reject ? reportItem.note_reject : ''}</p>
                                                    </Col>
                                                </Row>
                                                <Row
                                                    style={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <Col span={12} className="inner--title">
                                                        Xác nhận vào ngày :
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>{formatRequestCreate(reportItem.updatedAt)}</p>
                                                    </Col>
                                                </Row>
                                            </>
                                            :
                                            <></>
                                        }
                                        {
                                            reportItem.status === 1 ?
                                            <>
                                                <Row
                                                    style={{
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    <Col span={12} className="inner--title">
                                                        Xác nhận vào ngày :
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>{formatRequestCreate(reportItem.updatedAt)}</p>
                                                    </Col>
                                                </Row>
                                            </>
                                            :
                                            <></>
                                        }
                                        {
                                            reportItem.status === 0 && currentRole === 1?
                                            
                                            <div
                                                style={{
                                                        marginTop: '20px',
                                                        paddingInline: '20px'
                                                    }}>
                                                <i
                                                    style={{
                                                        color: '#FE807E'
                                                    }}
                                                >
                                                    Yêu cầu chưa được xác nhận hoặc từ chối, hãy xem xét và đưa ra kết luận sớm nhé
                                                </i>
                                            </div>
                                            :
                                            <></>
                                        }
                                        {
                                            reportItem.status === 0 && currentRole === 2? 
                                            <Row>
                                                <img 
                                                    style={{
                                                        width:" 39%",
                                                        margin: "24px auto 0",
                                                        borderRadius: "10px",
                                                    }}
                                                    src={children_playing}
                                                    alt='chờ'
                                                />
                                            </Row>
                                            :
                                            <></>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        {
                            currentRole === 1 && reportItem.status === 0? 
                            <>
                            <div className="report-detail__action">
                                <Row>
                                    <Col span={4} offset={17}>
                                        <Button
                                            onClick={showRejectModal}
                                            className='button--reject'
                                            style={{
                                                float : 'right',
                                            }}
                                        >Từ chối báo cáo</Button>
                                    </Col>
                                    <Col span={3} >
                                        <Button
                                            onClick={showAgreeModal}
                                            type='primary'
                                            style={{
                                                float : 'right',
                                            }}
                                        >Duyệt báo cáo</Button>
                                    </Col>
                                </Row>
                            </div>
                            </>
                            : currentRole === 2 && reportItem.status === 0 ?
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit"
                                    style={{
                                        float: 'right',
                                    }}
                                    onClick={handleSubmit}
                                    // disabled={editingStatus}
                                >
                                    Sửa báo cáo
                                </Button>
                            </Form.Item>
                            :
                            <></>
                        }
                </Form>
                <Modal 
                    title='Xác nhận duyệt báo cáo' 
                    open={isModalOpen} 
                    onOk={handleAcceptReport} 
                    onCancel={handleCancel}
                    okText='Duyệt báo cáo'
                    cancelText='Quay lại'
                    className='modal--agree_confirm'
                    >
                            <p>Bạn đã kiểm tra kỹ các thông tin rồi chứ</p>
                            <p>Xét duyệt sẽ đồng nghĩa với việc các hóa đơn đã hợp lệ</p>
                </Modal>
                <Modal 
                        className='modal--reject_confirm'
                        title='Xác nhận từ chối yêu cầu' 
                        open={isRejectModalOpen} 
                        onOk={form.submit}
                        // okButtonProps={{form:'reject-form', key: 'submit', htmlType: 'submit'}}
                        onCancel={handleCancelReject}
                        okText='Xác nhận từ chối'
                        cancelText='Bỏ qua'
                    >
                        <Divider
                            style={{
                                margin: "5px 0 15px 0",
                            }}
                        />
                        <p>Bạn có thực sự muốn từ chối báo cáo này không ?
                            Nếu có hãy nêu rõ lý do nhé
                        </p>
                        <Form
                            id='reject-form'
                            form={form}
                            onFinish={handleRejectReport}
                            style={{
                            maxWidth: 600,
                            marginTop: 20
                            }}
                            layout='vertical'
                        >
                            <Form.Item 
                                name='note_reject' 
                                label="Lý do từ chối :"
                                placeholder='Hãy ghi lý do từ chối'
                                rules={[
                                        {
                                            required: true,
                                            message: 'Bạn chưa ghi rõ lý do từ chối',
                                        },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ReportDetail;
