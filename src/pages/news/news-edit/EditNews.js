import React, { useState } from 'react';
import './EditNews.scss'
import { Button, Col, Form, Input, Row, Select ,Divider, Space, Upload, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextEditor from '../../../components/editor/TextEditor';
import { toastError, toastWarning } from '../../../utils/toast-popup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTopicAndFunds, getSpecificArticle, selectAllTopicsAndFunds, selectSpecificArticle, updateArticle } from '../../../services/slicer/ArticleSlicer';
import ImgCrop from 'antd-img-crop';
import storage from '../../../configs/firebaseConfig';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
import { countReadMinutes } from '../../../utils/countReadMinute';
import { useNavigate, useParams } from 'react-router-dom';
import { shallowEqual } from '../../../utils/compareTwoObject';

const EditNews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const topicsAndFunds = useSelector(selectAllTopicsAndFunds)
    const articleItem = useSelector(selectSpecificArticle)
    const {id} = useParams()
    console.log({topicsAndFunds})

    const [form] = Form.useForm();
    const {Option} = Select;

    const [articleItemData, setArticleItemData] = useState({});

    const [contentData, setContentData] = useState({});
    const [topicData, setTopicData] = useState([]);
    const [fundData, setFundData] = useState([]);

    const [name, setName] = useState('');
    const [count, setCount] = useState(0);

    const [imageUrl, setImageUrl] = useState('');

    const [fileList, setFile] = useState([]);
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M ;
    }; 

    const handleChange = ({ fileList: newFileList }) => {
        // console.log({newFileList})
        if(newFileList.length === 0) {
            setImageUrl(null)
        }
        return setFile(newFileList)
    };

    const customUpload = async ({ onError, onSuccess, file }) => {
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/news/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // const percent = Math.round(
                // (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
            },
            (err) => console.log(err),
            () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setImageUrl(url);
                    onSuccess(null, url);
            });
            }
        ); 
    };

    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        if(name.length <= 0 || count >= 1 || count <0) {
            console.log('deo')
        } else {
            setCount(count + 1)
            setTopicData([{id: 'new',name: name},...topicData ]);
        }
    };

    const handleSubmit = (value) => {
        console.log(value);
        console.log(contentData);
        let articleData = {
            ...articleItem,
            thumbnail_url : imageUrl,
            content : contentData.content,
            fundId : value.fund === 'none' ? null : value.fund,
            topicId : value.topic === 'new' ?
            {
                id: 'new',
                name: name
            } 
            : 
            value.topic,
            word_count: contentData.word_count,
            title : value.title,
            read_minute : +countReadMinutes(contentData.word_count)
        }
        console.log({articleData});

        if(shallowEqual(articleData, articleItem) === true) {
            toastWarning('Bạn chưa thay đổi thông tin nào cả nên không thể cập nhật mới')
        }
        else {
            if(contentData.content === '' || contentData.count_word === 0) {
                toastWarning('Bạn chưa viết bài, vui lòng thêm bài viết trước khi đăng')
            } else {
                if (fileList.length <= 0) {
                    toastWarning('Bạn chưa thêm ảnh thumbnail cho bài viết, vui lòng thêm ảnh thumbnail')
                } else { 
                    try {
                    console.log({articleData});
                        articleData = {
                            ...articleData,
                            fundId : articleData.fundId === null ? 'none' : articleData.fundId
                        }
                        dispatch(updateArticle({id,articleData})).unwrap();
                        navigate('/news')
                    } catch (error) {
                        toastError(error)
                    }
                }
        }
    }
}

    useEffect(() => {
        dispatch(getSpecificArticle(id))
    }, [dispatch, id]);

    useEffect(() => {
        setArticleItemData(articleItem)
        setContentData({
            content : articleItem.content,
            word_count : articleItem.word_count
        })
        setImageUrl(articleItem.thumbnail_url)
        form.setFieldsValue({
            title : articleItem.title,
            topic : articleItem.topicId,
            fund : articleItem.fundId === null ? 'none' : articleItem.fundId,
        })
        setFile([{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: articleItem.thumbnail_url,
        }])
    }, [articleItem]);

    useEffect(() => {
        dispatch(getAllTopicAndFunds())
        setFundData(topicsAndFunds.funds)
        setTopicData(topicsAndFunds.topics)
    }, [dispatch]);
    return (
        <div className="article--edit__page">
            <h3
                style={{
                    color : 'var(--mainColor)',
                    fontSize : '20px',
                    fontWeight: '500',
                    marginBottom: '30px',
                }}
                
            >
                Thêm bài viết
            </h3>
            <div className="article-edit--body">
            <Form 
                layout="vertical"
                form={form} 
                onFinish={handleSubmit}
                scrollToFirstError={true}
                >
                <Form.Item
                    name="title"
                    label=""
                    rules={[
                        {
                            required: true,
                            message: 'Bạn hãy nhập tiêu đề bài viết'
                        },
                    ]}
                >
                    <Input 
                        style={{
                            fontSize: '20px',
                            fontWeight: '500',
                        }}
                        placeholder="Hãy nhập tiêu đề bài viết" 
                        bordered={false}
                        size='large'
                    />
                </Form.Item>
                <div>
                    <label
                        style={{
                            fontSize: '15px',
                            fontWeight: '500',
                        }}
                    >
                        Chọn ảnh thumbnail :
                    </label>
                    <ImgCrop 
                        rotationSlider
                        aspect={16/9}
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleChange}
                            onPreview={onPreview}
                            beforeUpload={beforeUpload}
                            customRequest={customUpload}
                            className='article-edit__thumbnail-upload'
                            maxCount={1}
                        >
                            {
                            fileList.length >=1 ? null : '+ Upload' 
                            }
                        </Upload>
                    </ImgCrop>
                </div>
                <Row
                    style={{
                        justifyContent: "space-between"
                    }}
                >
                    <Col span={10}>
                        <Form.Item
                            className="topic"
                            rules={[
                                {
                                    required: true,
                                    message: () => 
                                    <span>
                                        Bạn cần chọn chủ đề
                                    </span>,
                                },
                                ]}
                            label='Chủ đề'
                            name='topic'
                        >
                            <Select 
                                placeholder="Chọn chủ đề" 
                                showSearch
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                    {menu}
                                    <Divider
                                        style={{
                                        margin: '8px 0',
                                        }}
                                    />
                                    <Space
                                        style={{
                                        padding: '0 8px 4px',
                                        }}
                                    >
                                        <Input
                                        placeholder="Please enter item"
                                        value={name}
                                        onChange={onNameChange}
                                        />
                                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                        edit item
                                        </Button>
                                    </Space>
                                    </>
                                )}
                                // options={topicData.map((topic) => ({
                                //     label: topic.name,
                                //     value: topic.id,
                                // }))}
                            >
                                {
                                    topicData.map((topic) => (
                                        <Option value={topic.id} key={topic.id}>
                                            {topic.name}
                                        </Option>
                                    ))
                                }
                                {
                                    articleItem.topic && articleItem.topic.isSuggest === 1 ? 
                                    <Option value={articleItem.topicId}>
                                        {articleItem.topic.name}
                                    </Option>
                                    :
                                    null
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            className="funds"
                            rules={[
                                {
                                    required: true,
                                    message: () => 
                                    <span>
                                        Bạn cần chọn chủ đề
                                    </span>,
                                },
                                ]}
                            label='Tên quỹ muốn viết về'
                            name='fund'
                        >
                            <Select 
                                placeholder="Chọn quỹ" 
                                showSearch
                                filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                // options={fundData.map((fund) => ({
                                //     label: fund.name,
                                //     value: fund.name,
                                // }))}
                            >
                                {
                                    fundData.map((fund) => (
                                        <Option value={fund.id} key={fund.id}>
                                            {fund.name}
                                        </Option>
                                    ))
                                }
                                <Option value='none'>
                                    Không có
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    
                </Row>
                <TextEditor setContentData={setContentData} initialContent={articleItemData.content} />
                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        style={{
                            float: 'right',
                        }}
                    >
                        Thêm mới bài viết
                    </Button>
                </Form.Item>
            </Form>      
        </div>
    </div>
    );
}

export default EditNews;
