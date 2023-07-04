import { Button, Checkbox, Descriptions, Divider, Form, Input, Modal, Space, Table, Tooltip } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import convertVNDMoney from '../../../utils/format/money-format';
import { formatRequestCreate } from '../../../utils/format/date-format';
import DonateStatus from '../../../components/tags/DonateStatus';
import { CheckOutlined, CloseOutlined} from '@ant-design/icons';
import SyncLoading from '../../../components/spinners/SyncLoading';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDonation, getAllFundDonates, rejectDonation, selectAllFundDonates, selectDonateLoading } from '../../../services/slicer/DonateSlicer';
import { useEffect } from 'react';


export const ListFundDonate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()    
    const [form] = Form.useForm();

    const DonateLoading = useSelector(selectDonateLoading)
    const ListFundDonate = useSelector(selectAllFundDonates)

    const [componentDisabled, setComponentDisabled] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
    const [actionId, setActionId] = useState('');
    const [currentAmount, setCurrentAmount] = useState('')
    // const [actionId, setActionId] = useState('');
    const showRejectModal = (id) => {
        setActionId(id);
        console.log(id)
        setIsModalOpen(true);
    };
    const onFinish = async (value) => {
        console.log({value})
        // let requestId = requestItem.id
        if (value.note_reject.length > 0) {
            // let requestStatus = 1;
            const reject_data = {
                type : 'donate/fund',
                status : 'rejected',
                transactionID : actionId,
                note_reject : value.note_reject
            }
            try {
                await dispatch(rejectDonation({reject_data})).unwrap()
                setIsModalOpen(false)
            } catch (error) {
                console.log('accept report failed', error)
            }
        }
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /* agree modal */

    const showAgreeModal = (id, amount) => {
        setActionId(id)
        setCurrentAmount(amount)
        console.log(id, amount)
        setIsAgreeModalOpen(true);
    };
    const onFinishAgree = async (value) => {
        console.log({value})
        // let requestId = requestItem.id
        const confirm_data = {
            type : 'donate/fund',
            status : 'confirmed',
            transactionID : actionId,
            exact_amount : componentDisabled ? currentAmount : value.exact_amount
        }
        console.log({confirm_data})
        try {
            await dispatch(confirmDonation({confirm_data})).unwrap()
            setIsAgreeModalOpen(false)
        } catch (error) {
            console.log('accept report failed', error)
        }
    };
    
    const handleCancelAgree = () => {
        setIsAgreeModalOpen(false);
    };

    useEffect(() => {
        dispatch(getAllFundDonates())
    }, [dispatch]);


    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "STT",
            width: "5%",
        },
        {
            title: "Họ và tên",
            dataIndex: "username",
            key: "username",
            width:'15%',
            ellipsis: {
                showTitle: true,
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
            width:'15%',
            ellipsis: {
                showTitle: true,
            },
            render: (email,record) => (
                <Tooltip placement="topLeft" title={email}>
                    {email}
                </Tooltip>
            ),
        },
        {
            title: "Số tiền",
            dataIndex: "send_amount",
            key: "send_amount",
            width: '10%',
            ellipsis: {
                showTitle: true,
            },
            render: (send_amount) => (
                <>
                    <Tooltip placement="topLeft" title={convertVNDMoney(send_amount)}>
                        <p 
                            style={{
                                color: 'rgb(14 160 97)',
                                fontWeight: '500',
                                fontSize: '16px'
                            }}
                        >{convertVNDMoney(send_amount)}</p>
                    </Tooltip>
                </>
                ),
        },
        {
            title: "Lời nhắn",
            dataIndex: "message",
            key: "message",
            width: "15%",
            ellipsis: {
                showTitle: true,
            },
            render: (message) => (
                <>
                    <Tooltip placement="topLeft" title={message}>
                    {message}
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
            width: "15%",
            ellipsis: {
                showTitle: true,
            },
            render: (status, record) => (
                <DonateStatus value={status} />
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
                <>
                    {
                        record.status === 0 ? 
                        <div 
                        style={{
                            textAlign: "center"
                        }}
                    >
                        <Space size="middle">
                            <Button
                                onClick={() => showAgreeModal(record.id, record.send_amount)}
                                className='report-list__table--button__view'
                                icon={<CheckOutlined/>}
                                shape='circle'
                                size='default'
                            >    
                            </Button>
                            <Button
                                onClick={() => showRejectModal(record.id)}
                                className='report-list__table--button__delete'
                                icon={<CloseOutlined/>}
                                shape='circle'
                                size='default'
                            >    
                            </Button>
                        </Space>
                    </div>
                    :
                    null
                    }
                </>
            ),
        },
    ]

  return (
    <div>
        <React.Fragment>
            {
                DonateLoading === false ? 
                <>
                    <Table
                        columns={columns} 
                        dataSource={ListFundDonate} 
                        pagination={
                            {
                                showSizeChanger: true,
                            }
                        }
                        expandable={{
                            expandedRowRender: (record) => (
                                <Descriptions title="Thông tin bổ sung" className='sub_description'>
                                    <Descriptions.Item label="Địa chỉ">{record.address}</Descriptions.Item>
                                    <Descriptions.Item label="Số điện thoại">{record.phone_number}</Descriptions.Item>
                                    <Descriptions.Item label="Số tiền thực tế">
                                        <p 
                                            style={{
                                                color: 'rgb(14 160 97)',
                                                fontWeight: '500',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {convertVNDMoney(record.exact_amount)}
                                        </p>
                                    </Descriptions.Item>
                                </Descriptions>
                            ),
                            rowExpandable: (record) => record.address || record.phone_number || record.exact_amount ,
                        }}
                        // loading={listRequestData.isLoading}
                    >
                    </Table>
                    <Modal 
                        className='modal--reject_confirm'
                        title='Xác nhận từ chối yêu cầu' 
                        open={isModalOpen} 
                        onOk={form.submit}
                        // okButtonProps={{form:'reject-form', key: 'submit', htmlType: 'submit'}}
                        onCancel={handleCancel}
                        okText='Xác nhận từ chối'
                        cancelText='Bỏ qua'
                    >
                        <Divider
                            style={{
                                margin: "5px 0 15px 0",
                            }}
                        />
                        <p>Bạn có thực sự muốn từ chối yêu cầu này không ?
                            Nếu có hãy nêu rõ lý do nhé
                        </p>
                        <Form
                            id='reject-form'
                            form={form}
                            // name="nest-messages"
                            onFinish={onFinish}
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
                    <Modal 
                        className='modal--agree_confirm'
                        title='Xác nhận duyệt yêu cầu' 
                        open={isAgreeModalOpen} 
                        onOk={form.submit}
                        // okButtonProps={{form:'reject-form', key: 'submit', htmlType: 'submit'}}
                        onCancel={handleCancelAgree}
                        okText='Xác nhận yêu cầu'
                        cancelText='Bỏ qua'
                    >
                        <Divider
                            style={{
                                margin: "5px 0 15px 0",
                            }}
                        />
                        <p>Bạn có chắc chắn xác nhận duyệt yêu cầu này không ?
                            Nếu có hãy ghi chứ lời nhắn nhé
                        </p>
                        <Checkbox
                            checked={componentDisabled}
                            onChange={(e) => setComponentDisabled(e.target.checked)}
                        >
                            Duyệt số tiền chính xác
                        </Checkbox>
                        <Form
                            id='agree-form'
                            form={form}
                            disabled={componentDisabled}
                            // name="nest-messages"
                            onFinish={onFinishAgree}
                            style={{
                            maxWidth: 600,
                            marginTop: 20
                            }}
                            layout='vertical'
                        >
                            <Form.Item 
                                name='exact_amount' 
                                label={<div
                                    style={componentDisabled? {color: 'grey'} : null}
                                >
                                    Số tiền chính xác
                                </div>}
                                rules= {[
                                        {
                                            required: !componentDisabled,
                                            message: 'Bạn chưa ghi số tiền được nhận, nếu đã chính xác vui lòng tích phần duyệt số tiền',
                                        },
                                    ]}
                            >
                                <Input
                                    placeholder='Hãy ghi đúng số tiền được nhận'
                                    rows={4}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
                :
                <SyncLoading />
            }
        </React.Fragment>
    </div>
  )
}
