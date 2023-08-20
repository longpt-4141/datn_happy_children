import React, { useState } from 'react';
import './NewsDetail.scss'
import { Button, Col, Divider, Modal, Row, Tag} from 'antd';
// import { toastError, toastWarning } from '../../../utils/toast-popup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmArticleStatus, getSpecificArticle, selectSpecificArticle} from '../../../services/slicer/ArticleSlicer';
import {  useParams } from 'react-router-dom';
import { TAG_COLOR } from '../../../constants/Color';
import DOMPurify from 'dompurify';
import ArticleStatusTag from '../../../components/tags/ArticleStatus';

const NewsDetail = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const articleItem = useSelector(selectSpecificArticle)
    const {id} = useParams()
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleSubmit = () => {
        setConfirmModalOpen(true);
    }

    const handleConfirm = async () => {
        const topicId = articleItem.topicId
        try {
            await dispatch(confirmArticleStatus({id, topicId})).unwrap();
            
        } catch (error) {
            console.log(error);
        }
        setConfirmModalOpen(false);
    }

    const handleCancelConfirm = () => {
        setConfirmModalOpen(false);
    }


    useEffect(() => {
        dispatch(getSpecificArticle(id))
    }, [dispatch, id]);


    return (
        <div className="article--detail__page">
            <h3
                style={{
                    color : 'var(--mainColor)',
                    fontSize : '20px',
                    fontWeight: '500',
                    marginBottom: '30px',
                }}
                
            >
                Chi tiết bài viết
            </h3>
            <div className="article--detail__thumbnail">
                <img src={articleItem.thumbnail_url} alt="" />
            </div>
            <div className="article-detail--body">
                <div className="article-detail--title">
                    <p>
                        {articleItem.title}
                    </p>
                </div>
                <div
                        className='article-detail--information__body'
                >
                    <Row
                        className='article-detail--information'
                    >
                        <Col span={12} className="inner--title">
                            Chủ đề :
                        </Col>
                        <Col span={12}>
                            <Tag color={TAG_COLOR[1]}>
                                {articleItem.topic ? articleItem.topic.name : null}
                            </Tag>
                        </Col>
                    </Row>
                    <Row
                        className='article-detail--information'
                    >
                        <Col span={12} className="inner--title">
                            Quỹ :
                        </Col>
                        <Col span={12}>
                            {
                                articleItem.fund ? 
                                <Tag color={TAG_COLOR[1]}>
                                    {articleItem.fund.name}
                                </Tag> 
                                :
                                <span>
                                    Không có
                                </span>
                            }
                        </Col>
                    </Row>
                    <Row
                        className='article-detail--information'
                    >
                        <Col span={12} className="inner--title">
                            Trạng thái :
                        </Col>
                        <Col span={12}>
                            <ArticleStatusTag value={articleItem.status}/>
                        </Col>
                    </Row>
                </div>
                <p
                    className="article-detail__content"
                    dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(articleItem.content),
                    }}
                >

                </p>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        style={{
                            float: 'right',
                        }}
                        onClick={handleSubmit}
                    >
                        Duyệt bài viết
                    </Button>   
        </div>
        <Modal 
            className='modal--money_confirm'
            title='Xác nhận đã nhận tiền' 
            open={isConfirmModalOpen} 
            onOk={handleConfirm}
            // okButtonProps={{form:'reject-form', key: 'submit', htmlType: 'submit'}}
            onCancel={handleCancelConfirm}
            okText='Xác nhận đã nhận tiền'
            cancelText='Bỏ qua'
        >
            <Divider
                style={{
                    margin: "5px 0 15px 0",
                }}
            />
            <p>Bạn có chắc chắn xác nhận duyệt bài viết này không ?
                Nếu có hãy ghi chứ lời nhắn nhé
            </p>
        </Modal>
    </div>
    );
}

export default NewsDetail;
