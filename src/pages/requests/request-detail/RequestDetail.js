import React from 'react';
import { Row, Col, Divider, Button, Modal, Form, Input } from 'antd';
import './RequestDetail.scss'
import { getSpecificRequest, selectAgreeNote, selectCenterAvatar, selectCenterData, selectIsLoading, selectRejectNote, selectRequestItem, updateMoneyConfirmStatus, updateStatusRequest } from '../../../services/slicer/RequestSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import RequestTypeTag from '../../../components/tags/RequestTypeTag';
import { formatRequestCreate } from '../../../utils/format/date-format';
import convertVNDMoney from '../../../utils/format/money-format';
import ButtonWrapper from '../../../components/button/ButtonWrapper';
import card_image from './images/card_image.svg';
import children_waiting from './images/children_waiting.svg';
import UserAvatar from '../../../components/upload-image/UserAvatar';
import { TiHome,TiMail, TiPhoneOutline } from "react-icons/ti";
import StatusTag from '../../../components/tags/StatusTag';
import SyncLoading from '../../../components/spinners/SyncLoading';
import MoneyTransferConfirmTag from '../../../components/tags/MoneyTrasnferConfirmTag';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { selectUserRole } from '../../../services/slicer/AuthSlicer';
// import {SyncLoader} from "react-spinners";

const RequestDetail = () => {
    let { id } = useParams(); 
    const [form] = Form.useForm();

    const requestItem  = useSelector(selectRequestItem)
    const centerAvatar = useSelector(selectCenterAvatar)
    const centerData = useSelector(selectCenterData)
    // const centerId = useSelector(selectCenterId)
    const rejectNote = useSelector(selectRejectNote)
    const agreeNote = useSelector(selectAgreeNote)
    const isLoading = useSelector(selectIsLoading)

    const currentRole = useSelector(selectUserRole);


    const dispatch = useDispatch();
    // console.log(requestItem.center.avatar)

    //handle action request

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);
    const [isMoneyConfirmModalOpen, setMoneyConfirmModalOpen] = useState(false);
    // const [actionId, setActionId] = useState('');
    const showRejectModal = (requestId) => {
    // setDeleteId(centerId)
        console.log(requestId)
        setIsModalOpen(true);
    };
    const onFinish = (value) => {
        console.log({value})
        let requestId = requestItem.id
        if (value.note_reject.length > 0) {
            // let requestStatus = 1;
            const centerId = centerData.id
            let noteData = {
                text : value.note_reject,
                status : 2
            }
            dispatch(updateStatusRequest({requestId,noteData,centerId }))
            // dispatch(getSpecificRequest(id))
        }
        setIsModalOpen(false)
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /* agree modal */

    const showAgreeModal = (requestId) => {
        // setDeleteId(centerId)
        console.log(requestId)
        setIsAgreeModalOpen(true);
    };
    const onFinishAgree = (value) => {
        console.log({value})
        let requestId = requestItem.id
        setIsAgreeModalOpen(false)
        if (value.note_agree.length > 0) {
            // let requestStatus = 1;
            const centerId = centerData.id
            let noteData = {
                text : value.note_agree,
                status : 1
            }
            dispatch(updateStatusRequest({requestId,noteData ,centerId}))
            // dispatch(getSpecificRequest(id))
        }
    };
    
    const handleCancelAgree = () => {
        setIsAgreeModalOpen(false);
    };
    /*  */

    /* money confirm modal */

    const handleOpenConfirmMoneyModal = () => {
        setMoneyConfirmModalOpen(true);
    }

    const handleMoneyConfirm = () => {
        let requestId = requestItem.id
        let noteData = {
            status : requestItem.status
        }
        const centerId = centerData.id
        dispatch(updateMoneyConfirmStatus({requestId,noteData, centerId }))
        setMoneyConfirmModalOpen(false);
    }

    const handleCancelMoneyConfirm = () => {
        setMoneyConfirmModalOpen(false);
    }
    /*  */

    useEffect(() => {
        dispatch(getSpecificRequest(id))
    }, [dispatch, id]);
    console.log( isLoading)

    return (
        <>
            {
                isLoading === true ? 
                <SyncLoading />
                :
                <div className="request-detail__page">
                    <div className="request-detail__title">
                        <h3
                            style={{
                                color : 'var(--mainColor)',
                                fontSize : '20px',
                                fontWeight: '500'
                            }}
                            
                        >
                            Chi tiết yêu cầu
                        </h3>
                    </div>
                    <div className="request-detail__information">
                        <Row>
                            <Col span={10}>
                                <h4
                                    style={{
                                            // color : 'var(--mainColor)',
                                            fontSize : '16px',
                                            fontWeight: '500'
                                        }} 
                                        className="information__title"
                                >
                                    Thông tin yêu cầu
                                </h4>
                            </Col>
                            {
                                requestItem.money_transfer_confirm === 0 && currentRole === 2? 
                                <Col span={8} offset={6}>
                                    <Button
                                        className='confirm_money_button'
                                        // type='primary'
                                        icon={<RiMoneyDollarCircleFill />}
                                        onClick={handleOpenConfirmMoneyModal}
                                    >
                                        Xác nhận chuyển tiền
                                    </Button>
                                </Col>
                                :
                                <></>
                            }
                        </Row>
                        <div className="information__inner">
                                <Row>
                                    <Col span={6} className="inner--title">
                                        Loại yêu cầu :
                                    </Col>
                                    <Col span={18}>
                                        <RequestTypeTag value={requestItem.type_request}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="inner--title">
                                        Ngày tạo :
                                    </Col>
                                    <Col span={18}>
                                        <p>
                                            {formatRequestCreate(requestItem.createdAt)}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="inner--title">
                                        Mô tả :
                                    </Col>
                                    <Col span={18}>
                                        <div className="description--inner">
                                            {requestItem.description}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="inner--title">
                                        Số tiền cần hỗ trợ :
                                    </Col>
                                    <Col span={18}>
                                        <p 
                                            style={{
                                                color: 'var(--mainColor)',
                                                fontWeight: '500',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {convertVNDMoney(requestItem.total_money)}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={6} className="inner--title"
                                        style={{
                                            padding: "0.5em 0"
                                        }}
                                    >
                                        Tài liệu dự toán :
                                    </Col>
                                    <Col span={18}>
                                        <ButtonWrapper link={requestItem.estimated_budget_url}/>
                                    </Col>
                                </Row>
                        </div>
                    </div>
                    <div className="request-detail__information-2">
                        <Row>
                            <Col span={12}>
                                <div className="request-detail__center">
                                    <Row>
                                        <Col span={10}>
                                            <img
                                                style={{
                                                    width: '100%',
                                                    // marginLeft: '55%'
                                                }}
                                                src={card_image} alt="ảnh trẻ em" 
                                                
                                            />
                                        </Col>
                                        <Col span={14}
                                            style={{
                                                paddingInline: '15px'
                                            }}
                                        >
                                            <div className="center--avatar"
                                                style={{
                                                    marginBottom : '30px'
                                                }}
                                            >
                                                <span><UserAvatar avatar={centerAvatar} /></span>
                                            </div>
                                            <div className="center--name"
                                                style={{
                                                    marginBottom: "15px"
                                                }}
                                            >
                                                <Row>
                                                    <Col span={4}>
                                                        <TiHome 
                                                            style={{
                                                                width:"100%",
                                                                fontSize: "20px",
                                                                color: '#FE807E'
                                                            }}              
                                                        />
                                                    </Col>
                                                    <Col span={20}>{centerData.name}</Col>
                                                </Row>
                                            </div>
                                            <div className="center--email"
                                                style={{
                                                    marginBottom: "15px"
                                                }}
                                            >
                                                <Row>
                                                    <Col span={4}>
                                                        <TiMail
                                                        style={{
                                                                width:"100%",
                                                                fontSize: "20px",
                                                                color: '#FE807E'
                                                            }}    
                                                        />
                                                    </Col>
                                                    <Col span={20}>{centerData.center_email}</Col>
                                                </Row>
                                            </div>
                                            <div className="center--phone_number"
                                                style={{
                                                    marginBottom: "15px"
                                                }}
                                            >
                                                <Row>
                                                    <Col span={4}>
                                                        <TiPhoneOutline
                                                        style={{
                                                                width:"100%",
                                                                fontSize: "20px",
                                                                color: '#FE807E'
                                                            }}    
                                                        />
                                                    </Col>
                                                    <Col span={20}>{centerData.phone_number}</Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="request-detail__status">
                                    <Row>
                                        <Col span={12}>
                                            <h3
                                                style={{
                                                    // color : 'var(--mainColor)',
                                                    fontSize : '16px',
                                                    fontWeight: '500'
                                                }} 
                                            >
                                                Trạng thái của yêu cầu
                                            </h3>
                                        </Col>
                                    </Row>
                                    <Divider/>
                                    <Row>
                                        <Col span={12} className="inner--title">
                                            Trạng thái :
                                        </Col>
                                        <Col span={12}>
                                            <StatusTag value={requestItem.status} />
                                        </Col>
                                    </Row>

                                    {
                                        requestItem.status === 2 ?
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
                                                    <p>{rejectNote}</p>
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
                                                    <p>{formatRequestCreate(requestItem.updatedAt)}</p>
                                                </Col>
                                            </Row>
                                        </>
                                        :
                                        <></>
                                    }
                                    {
                                        requestItem.status === 1 ?
                                        <>
                                            <Row
                                                style={{
                                                    marginTop: '20px',
                                                }}
                                            >
                                                <Col span={12} className="inner--title">
                                                    Lời nhắn :
                                                </Col>
                                                <Col span={12}>
                                                    <p>{agreeNote}</p>
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
                                                    <p>{formatRequestCreate(requestItem.updatedAt)}</p>
                                                </Col>
                                            </Row>
                                            <Row
                                                style={{
                                                    marginTop: '20px',
                                                }}
                                            >
                                                <Col span={12} className="inner--title">
                                                    Xác nhận chuyển tiền :
                                                </Col>
                                                <Col span={12}>
                                                    <MoneyTransferConfirmTag value={requestItem.money_transfer_confirm} />
                                                </Col>
                                            </Row>
                                        </>
                                        :
                                        <></>
                                    }
                                    {
                                        requestItem.status === 0 && currentRole === 1?
                                        
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
                                        requestItem.status === 0 && currentRole === 2? 
                                        <Row>
                                            <img 
                                                style={{
                                                    width:" 39%",
                                                    margin: "24px auto 0",
                                                    borderRadius: "10px",
                                                }}
                                                src={children_waiting}
                                                alt='chờ'
                                            />
                                        </Row>
                                        :
                                        <></>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {
                        requestItem.status === 0 && currentRole === 1?
                        <div className="request-detail__action">
                        <Row>
                            <Col span={4} offset={16}>
                                <Button
                                    onClick={() => showRejectModal(requestItem.id)}
                                    className='button--reject'
                                    style={{
                                        float : 'right',
                                    }}
                                >Từ chối yêu cầu</Button>
                            </Col>
                            <Col span={4} >
                                <Button
                                    onClick={() => showAgreeModal(requestItem.id)}
                                    type='primary'
                                    style={{
                                        float : 'right',
                                    }}
                                >Chấp nhận yêu cầu</Button>
                            </Col>
                        </Row>
                    </div>
                    :
                    <></>
                    }
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
                        <Form
                            id='agree-form'
                            form={form}
                            // name="nest-messages"
                            onFinish={onFinishAgree}
                            style={{
                            maxWidth: 600,
                            marginTop: 20
                            }}
                            layout='vertical'
                        >
                            <Form.Item 
                                name='note_agree' 
                                label="Lời nhắn gửi :"
                                placeholder='Hãy ghi rõ lời nhắn'
                                rules={[
                                        {
                                            required: true,
                                            message: 'Bạn chưa ghi rõ lời nhắn',
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
                        className='modal--money_confirm'
                        title='Xác nhận đã nhận tiền' 
                        open={isMoneyConfirmModalOpen} 
                        onOk={handleMoneyConfirm}
                        // okButtonProps={{form:'reject-form', key: 'submit', htmlType: 'submit'}}
                        onCancel={handleCancelMoneyConfirm}
                        okText='Xác nhận đã nhận tiền'
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
                    </Modal>
                </div>
            }
        </>
    );
}

export default RequestDetail;
