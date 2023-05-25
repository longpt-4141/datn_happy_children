import { Button, Popover , Row, Col, Space, Divider} from 'antd';
import React from 'react';
import { QuestionCircleOutlined,EyeOutlined,DeleteOutlined  } from '@ant-design/icons';
import { TbPencilPlus, TbReport } from 'react-icons/tb';
import { HiOutlineClipboardCheck } from 'react-icons/hi';
const ActionTablePopover = ({children}) => {
    const content = (
        <div>
            <Divider 
                style={{
                    margin : '10px 0 15px 0'
                }}
            />
            <Space direction="vertical" size="middle">
            <Row
                style={{
                    alignItems: "center",
                }}
            >
                <Col span={4}>
                    <EyeOutlined className='report--detail'
                        style={{
                            padding : '8px',
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: '50%',
                            background : '#fff',
                            fontSize : '18px',
                            color : '#2FC7EB',

                        }}
                    /> 
                </Col>
                <Col span={18}>
                    Xem chi tiết yêu cầu
                </Col>
            </Row>
            <Row
                style={{
                    alignItems: "center",
                }}
            >
                <Col span={4}>
                    <DeleteOutlined 
                        className='report--delete'
                        style={{
                            padding : '8px',
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: '50%',
                            background : '#fff',
                            color : 'var(--strongPink)',
                            fontSize : '18px'
                        }}
                    /> 
                </Col>
                <Col span={18}>
                    Xóa yêu cầu
                </Col>
            </Row>
            <Row
                style={{
                    alignItems: "center",
                }}
            >
                <Col span={4}>
                    <TbPencilPlus className='report--add'
                    style={{
                            padding : '8px',
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: '50%',
                            background : '#fff',
                            color : '#ff9c00',
                            fontSize : '18px'
                        }}
                    /> 
                </Col>
                <Col span={18}>
                    Viết báo cáo cho yêu cầu 
                </Col>
            </Row>
            <Row
                style={{
                    alignItems: "center",
                }}
            >
                <Col span={4}>
                    <TbReport className='report--waiting'
                        style={{
                            padding : '8px',
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: '50%',
                            background : '#fff',
                            color : 'var(--mainColor)',
                            fontSize : '18px'
                        }}
                    /> 
                </Col>
                <Col span={18}>
                    Báo cáo đang chờ xác nhận, bấm vào để xem báo cáo
                </Col>
            </Row>
            <Row
                style={{
                    alignItems: "center",
                }}
            >
                <Col span={4}>
                    <HiOutlineClipboardCheck className='report--accepted'
                        style={{
                            padding : '8px',
                            boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                            borderRadius: '50%',
                            background : '#fff',
                            color : '#3F9E46',
                            fontSize : '18px'
                        }}
                    /> 
                </Col>
                <Col span={18}>
                    Báo cáo đã được xác nhận, bấm vào để xem báo cáo
                </Col>
            </Row>
            </Space>
        </div>
      );
    return (
        <Popover placement="bottomLeft" title='Chú thích ký hiệu' content={content} trigger="click">
            <Button
                style={{
                    backgroundColor: 'transparent',
                    border : 'none',
                    padding : '0 5px',
                }}
            ><QuestionCircleOutlined /></Button>
        </Popover>
    );
}

export default ActionTablePopover;
