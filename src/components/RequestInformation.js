import { Row, Col } from 'antd';
import React from 'react';
import wallet_background from '../assets/img/wallet_background.svg'
import { IoWallet } from "react-icons/io5";
import convertVNDMoney from '../utils/format/money-format';
import RequestTypeTag from './tags/RequestTypeTag';
import ButtonWrapper from './button/ButtonWrapper';
import { formatRequestCreate } from '../utils/format/date-format';
import './RequestInformation.scss'
const RequestInformation = ({requestItem}) => {
    return (
            <div className="request--information">
                <Row>
                    <Col span={7}>
                        <div className="wallet_background">
                                <img src={wallet_background} alt="wallet" className='wallet_background--image'/>
                                <div className="wallet--body">
                                    <div className="wallet--icon__wrapper">
                                        <IoWallet className='wallet--icon'/>
                                    </div>
                                    <div className="wallet--money">
                                        <h4>Tiền dự án</h4>
                                        <div>{convertVNDMoney(requestItem.total_money)}</div>
                                    </div>
                                </div>
                        </div>
                    </Col>
                    <Col span={16} offset={1}>
                        <div className="request--information__inner">
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
                            </Row>
                            <div className="information__inner">
                                <Row>
                                    <Col span={10} className="inner--title">
                                        Loại yêu cầu :
                                    </Col>
                                    <Col span={14}>
                                        <RequestTypeTag value={requestItem.type_request}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10} className="inner--title">
                                        Ngày tạo :
                                    </Col>
                                    <Col span={14}>
                                        <p>
                                            {formatRequestCreate(requestItem.createdAt)}
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10} className="inner--title">
                                        Mô tả :
                                    </Col>
                                    <Col span={14}>
                                        <div className="description--inner">
                                            {requestItem.description}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10} className="inner--title"
                                        style={{
                                            padding: "0.5em 0"
                                        }}
                                    >
                                        Tài liệu dự toán :
                                    </Col>
                                    <Col span={14}>
                                        <ButtonWrapper link={requestItem.estimated_budget_url}/>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
    );
}

export default RequestInformation;
