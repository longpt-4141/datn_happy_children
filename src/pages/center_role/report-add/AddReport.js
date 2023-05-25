import React from 'react';
import './AddReport.scss'
import { Col, Row , Input, InputNumber, Form, Button, Popconfirm, Typography, Table, Tooltip, DatePicker, ConfigProvider, Space} from 'antd';
import {useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecificRequest, selectRequestItem } from '../../../services/slicer/RequestSlicer';
import convertVNDMoney from '../../../utils/format/money-format';
import { formatDateSendDB } from '../../../utils/format/date-format';
import moment from 'moment';
// import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/vi_VN';
import { createNewReport } from '../../../services/slicer/ReportSlicer';
// import FileUpload from '../../../components/upload-image/FileUpload';
import { toastError, toastWarning } from '../../../utils/toast-popup';
import RequestInformation from '../../../components/RequestInformation';
import { FcFolder } from "react-icons/fc";

const originData = [];

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

const AddReport = () => {
    const [searchParams] = useSearchParams(); 
    console.log(searchParams.get('requestId'))
    const requestId = searchParams.get('requestId')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requestItem = useSelector(selectRequestItem)
    const [count, setCount] = useState(1);
    const [totalMoney, setTotalMoney] = useState('')

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [editingStatus, setEditing] = useState(false)

    const [paymentFileURL, setPaymentFileURL] = useState('')
    

    const handleChangeFileURL = (e) => {
        console.log(e.target.value)
        setPaymentFileURL(e.target.value)
    }

    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
        receipt_name: '',
        pay_date:  (record.pay_date) ? moment(record.pay_date) : "",
        tax: '',
        pay_money: '',
        total: record.pay_money + record.pay_money * ( record.tax / 100 ),
        ...record,
        });
        setEditing(true)
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
            console.log({row})
            setData(newData);
            setEditingKey('');
            setEditing(false)
        } else {
            newData.push(row);
            setData(newData);
            setEditing(false)
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
        render: (_, record) => {
            const editable = isEditing(record);
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
    ];

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
        // let reportData;
        const checkEmptyRow = data.find((item) => item.pay_date === '' || item.tax === '' || item.pay_money === '');
            if(checkEmptyRow !== undefined) {
                toastWarning('Bạn đừng để hóa đơn nào bị trống nha')
            }
        console.log({checkEmptyRow})
        const filteredData = data.filter((item) => item.pay_date !== '' || item.tax !== '' || item.pay_money !== '');
        let reportData;
        let receiptData;
            if(filteredData.length <= 0) {
                toastError('Bạn chưa thêm hóa đơn nào cả, vui lòng thêm ít nhất 1 hóa đơn')
            }
            else {
                    receiptData = filteredData.map((item) => ({
                        ...item,
                        pay_date: formatDateSendDB(item.pay_date.$d),
                    }))
                        await form.validateFields(['payment_file_url'])
                        reportData = {
                            receiptData,
                            total_pay_money : totalMoney,
                            payment_file_url : paymentFileURL
                        }
                    try {
                        dispatch(createNewReport({reportData, requestId})).unwrap();
                        navigate('/reports')
                    }
                    catch (err) {
                        toastError('Xảy ra lỗi, vui lòng tải lại trang và thử lại')
                    }
                }
                console.log({reportData})
    }

    const summaryMoney = (record) => {
        const sum = record.reduce((accumulator, object) => {
            console.log(accumulator, object.total)
            return accumulator + parseInt(object.total);
        }, 0);
        setTotalMoney(sum)
        return convertVNDMoney(sum)
    }


    useEffect(() => {
        dispatch(getSpecificRequest(requestId))
    }, [dispatch, requestId]);

    console.log( {requestItem})
    return (
        <div className="report--add__page">
            <h3
                style={{
                    color : 'var(--mainColor)',
                    fontSize : '20px',
                    fontWeight: '500',
                    marginBottom: '30px',
                }}
                
            >
                Viết báo cáo
            </h3>
            {/*  RequestInformation */}
                <RequestInformation requestItem={requestItem} />
            {/*  */}
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
                    {/* <Col span={4}>
                        <Button onClick={onButtonClick}>
                            Tải xuống
                        </Button>
                    </Col> */}
                </Row>
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
                                    <Table.Summary.Cell index={0}>Tổng tiền chi</Table.Summary.Cell>
                                    <Table.Summary.Cell    
                                        index={1} 
                                        colSpan={5} 
                                        style={{    
                                            textAlign: "end",
                                            }}
                                    >
                                        {summaryMoney(data)}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
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
                                        href={requestItem.report_folder_url}
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
                                </div>
                        </div>
                        <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{
                                float: 'right',
                            }}
                            onClick={handleSubmit}
                            disabled={editingStatus}
                        >
                            Tạo mới yêu cầu
                        </Button>
                        </Form.Item>
                </Form>
                
                </div>
            </div>
        </div>
);
}

export default AddReport;
