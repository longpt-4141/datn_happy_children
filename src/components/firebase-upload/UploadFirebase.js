import { Avatar, Upload, message } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import storage from "../../configs/firebaseConfig";
import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { useEffect } from "react";

function UploadFirebase({avatarUrl, getUrl} ) {
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState(false);
	// const [fileList, setFile] = useState([]);
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
		const isJpgOrPng =
			file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error("Bạn chỉ có thể upload JPG/PNG file!");
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error("Ảnh không thể quá 2MB!");
		}
		return isJpgOrPng && isLt2M;
	};
	const handleChange = (info) => {
		console.log("file", info.file);
		if (info.file.status === "uploading") {
		}
		if (info.file.status === "done") {
			setLoading(true);
			console.log(info.file);
		}
	};

	const customUpload = async ({ onError, onSuccess, file }) => {
		if (!file) {
			alert("Please choose a file first!");
		}
		const storageRef = ref(storage, `/center_avatar/${file.name}`);
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
					getUrl(url)
					onSuccess(null, url);
				});
			}
		);
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div
				style={{
					marginTop: 8,
				}}
			>
				Tải avatar
			</div>
		</div>
	);

	useEffect(() => {
		console.log({avatarUrl})
		setImageUrl(avatarUrl)
	  }, [avatarUrl]);

	return (
		<div>
			<ImgCrop rotationSlider>
				<Upload
					style={{width: '120px', height: '120px'}}
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					onChange={handleChange}
					onPreview={onPreview}
					beforeUpload={beforeUpload}
					customRequest={customUpload}
				>
					{imageUrl ? (
						<Avatar
							alt="avatar"
							size={120}
							src={imageUrl}
							className='profile__left--avatar'
						/>
					) : (
						uploadButton
					)}
				</Upload>
			</ImgCrop>
		</div>
	);
}

export default UploadFirebase;
