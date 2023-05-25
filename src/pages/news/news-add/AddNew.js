import React, { useState } from 'react';
import './AddNew.scss'
import { Button, Col, Form, Input, Row, Select ,Divider, Space, Upload, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextEditor from '../../../components/editor/TextEditor';
import { toastError, toastWarning } from '../../../utils/toast-popup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewArticle, getAllTopicAndFunds, selectAllTopicsAndFunds } from '../../../services/slicer/ArticleSlicer';
import ImgCrop from 'antd-img-crop';
import storage from '../../../configs/firebaseConfig';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
import { countReadMinutes } from '../../../utils/countReadMinute';
import { useNavigate } from 'react-router-dom';

const AddNew = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const topicsAndFunds = useSelector(selectAllTopicsAndFunds)
    console.log({topicsAndFunds})

    const [form] = Form.useForm();
    const {Option} = Select
    const [contentData, setContentData] = useState({});
    const [topicData, setTopicData] = useState([]);
    const [fundData, setFundData] = useState([]);

    const [name, setName] = useState('');
    const [count, setCount] = useState(0);

    const [imageUrl, setImageUrl] = useState();

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
    const handleChange = (info) => {
        console.log("file",info.file);
        if (info.file.status === 'uploading') {
        }
        if (info.file.status === 'done') {
        setFile(info.fileList)
        console.log(info.file)
        }
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
                const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
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
        if(contentData.content === '' || contentData.count_word === 0) {
            toastWarning('Bạn chưa viết bài, vui lòng thêm bài viết trước khi đăng')
        } else {
            if (!imageUrl) {
                toastWarning('Bạn chưa thêm ảnh thumbnail cho bài viết, vui lòng thêm ảnh thumbnail')
            } else {
                const articleData = {
                    thumbnail_url : imageUrl,
                    content : contentData.content,
                    fundId : value.fund,
                    topicId : value.topic === 'new' ?
                    {
                        id: 'new',
                        name: name
                    } 
                    : 
                    value.topic,
                    word_count: contentData.word_count,
                    title : value.title,
                    read_minute : countReadMinutes(contentData.word_count)

                }
                try {
                    dispatch(createNewArticle({articleData})).unwrap();
                    navigate('/news')
                }
                catch (err) {
                    toastError('Xảy ra lỗi, vui lòng tải lại trang và thử lại')
                }
                console.log({articleData})
            }
        }
    }

    useEffect(() => {
        dispatch(getAllTopicAndFunds())
        setFundData(topicsAndFunds.funds)
        setTopicData(topicsAndFunds.topics)
    }, [dispatch]);
    return (
        <div className="article--add__page">
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
            <div className="article-add--body">
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
                            onChange={handleChange}
                            onPreview={onPreview}
                            beforeUpload={beforeUpload}
                            customRequest={customUpload}
                            className='article-add__thumbnail-upload'
                        >
                            {
                            fileList.length >=1 ? '' : '+ Upload' 
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
                                        Add item
                                        </Button>
                                    </Space>
                                    </>
                                )}
                                options={topicData.map((topic) => ({
                                    label: topic.name,
                                    value: topic.id,
                                }))}
                            >
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
                <TextEditor setContentData={setContentData} />
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

export default AddNew;
