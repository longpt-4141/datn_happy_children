import React from 'react';
    import {  UploadOutlined} from '@ant-design/icons';
import { message, Upload , Button} from 'antd';
import { useState , useEffect} from 'react';
import './FileUpload.scss'
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

const FileUpload = ({getUrl, getStatus}) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState();

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/PDF file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Bạn hãy chọn file có kích thước dưới 5MB!');
      getStatus('error')
    }
    return isJpgOrPng && isLt2M ;
  };
//   const handleChange = (info) => {
//     console.log("file",info.file);
//     console.log("file",info.file.status);
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//         // props.getUrl(url)
//       });
//     }
//   };
  
const props = {
    name: 'file',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        getStatus('pending')
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} upload thành công`);
        getBase64(info.file.originFileObj, (url) => {
            getUrl(url)
            getStatus('done')
            });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}  upload thất bại.`);
            getStatus('error')
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <Upload
        maxCount={1}
        {...props}
        customRequest={dummyRequest}
        name="payment_file"
        // listType="picture-card"
        className="payment-uploader"
        showUploadList={true}
        beforeUpload={beforeUpload}
        // onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
export default FileUpload;