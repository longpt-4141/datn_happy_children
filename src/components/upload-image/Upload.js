import React from 'react';
    import { LoadingOutlined, CameraOutlined} from '@ant-design/icons';
import { message, Upload , Avatar} from 'antd';
import { useState , useEffect} from 'react';
import './Upload.scss';
const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const UploadImage = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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
      setLoading(true);
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        props.getUrl(url)
      });
    }
  };
  
  useEffect(() => {
    setImageUrl(props.avatarUrl)
  }, [props.avatarUrl]);

  const uploadButton = (
    <div>
        <Avatar size={120} icon={<CameraOutlined />} />
    </div>
  );
  return (
    <Upload
        style={{width: '120px', height: '120px'}}
        customRequest={dummyRequest}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
      {imageUrl ? (
        <Avatar
            size={120}
            src={imageUrl}
            className='profile__left--avatar'
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default UploadImage;