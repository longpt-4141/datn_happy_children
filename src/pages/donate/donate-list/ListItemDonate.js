import { Button, Checkbox, Descriptions, Divider, Form, Input, Modal, Space, Table, Tooltip } from 'antd';
import React, { useState } from 'react'
import { formatRequestCreate } from '../../../utils/format/date-format';
import DonateStatus from '../../../components/tags/DonateStatus';
import { CheckOutlined, CloseOutlined} from '@ant-design/icons';
import SyncLoading from '../../../components/spinners/SyncLoading';
import { useDispatch, useSelector } from 'react-redux';
import { confirmItemDonation, getAllItemDonates, rejectItemDonation, selectAllItemDonates, selectDonateLoading } from '../../../services/slicer/DonateSlicer';
import { useEffect } from 'react';


export const ListItemDonate = () => {
    const dispatch = useDispatch()    
    const [form] = Form.useForm();

    const DonateLoading = useSelector(selectDonateLoading)
    const ListItemDonate = useSelector(selectAllItemDonates)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
    const [actionId, setActionId] = useState('');
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
                type : 'donate/item',
                status : 'rejected',
                transactionID : actionId,
                note_reject : value.note_reject
            }
            try {
                await dispatch(rejectItemDonation({reject_data})).unwrap()
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

    const showAgreeModal = (id) => {
        setActionId(id)
        setIsAgreeModalOpen(true);
    };
    const onFinishAgree = async (value) => {
        console.log({value})
        // let requestId = requestItem.id
        const confirm_data = {
            status : 'confirmed',
            transactionID : actionId,
        }
        console.log({confirm_data})
        try {
            await dispatch(confirmItemDonation({confirm_data})).unwrap()
            setIsAgreeModalOpen(false)
        } catch (error) {
            console.log('accept report failed', error)
        }
    };
    
    const handleCancelAgree = () => {
        setIsAgreeModalOpen(false);
    };

    useEffect(() => {
        dispatch(getAllItemDonates())
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
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            width: "15%",
            ellipsis: {
                showTitle: true,
            },
            render: (description) => (
                <>
                    <Tooltip placement="topLeft" title={description}>
                    {description}
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
                                onClick={() => showAgreeModal(record.id)}
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
                        dataSource={ListItemDonate} 
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
                                    <Descriptions.Item label="Hỗ trợ cho quỹ">{record.fund_name ? record.fund_name : 'Không có'}</Descriptions.Item>
                                </Descriptions>
                            ),
                            rowExpandable: (record) => record.address || record.phone_number  ,
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
                        onOk={onFinishAgree}
                        onCancel={handleCancelAgree}
                        okText='Xác nhận yêu cầu'
                        cancelText='Bỏ qua'
                    >
                        <Divider
                            style={{
                                margin: "5px 0 15px 0",
                            }}
                        />
                        <p>
                            Bạn có chắc chắn xác nhận duyệt yêu cầu này không ?
                        </p>
                    </Modal>
                </>
                :
                <SyncLoading />
            }
        </React.Fragment>
    </div>
  )
}
