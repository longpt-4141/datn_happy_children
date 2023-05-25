import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';

import tinymce from 'tinymce/tinymce';
import Compressor from 'compressorjs';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";
import storage from '../../configs/firebaseConfig';

const TextEditor = ({setContentData,initialContent}) => {
    const editorRef = useRef(null);
    const [content, setContent] = useState('')
    const log = () => {
        if (editorRef.current) {
            var wordcount = editorRef.current.plugins.wordcount;
            console.log(wordcount.body.getWordCount());
            console.log(editorRef.current.getContent());
            setContent(editorRef.current.getContent())
            setContentData({
                content : editorRef.current.getContent(),
                word_count : wordcount.body.getWordCount()
            })
            // tinymce.activeEditor.execCommand('mceWordCount');

        }
    };
    const fileCompress = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.5,
                maxWidth: 640,
                maxHeight: 640,
                success(file) {
                    return resolve({
                        success: true,
                        file: file
                    })
                },
                error(err) {
                    return resolve({
                        success: false,
                        message: err.message
                    })
                }
            })
        })
    }

    const handleUploadImage = (cb, value, meta) => {
        console.log('aaaa')
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            console.log({file});
            const compressState = await fileCompress(file)
            if(compressState.success) {
                const newFile = compressState.file
                if (!newFile) {
                    alert("Hãy chọn ảnh để đăng")
                    }
                    const storageRef = ref(storage, `/news/${newFile.name}`)
                    const uploadTask = uploadBytesResumable(storageRef, newFile);
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
                                    cb(url, {alt: file.name, title: file.name})
                                });
                            }
                    ); 
                }
        }
    }

    const handleChangeContent = () => {
        if (editorRef.current) {
            var wordcount = editorRef.current.plugins.wordcount;
            console.log(wordcount.body.getWordCount());
            console.log(editorRef.current.getContent());
            setContent(editorRef.current.getContent())
            setContentData({
                content : editorRef.current.getContent(),
                word_count : wordcount.body.getWordCount()
            })
        }
    }

    return (
        <div>
            <Editor
                tinymceScriptSrc="/path/to/tinymce.min.js"
                apiKey='yauabebvre65im47ditiziqgxfsqo96xw5r0lsptr9xtuxw9'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialContent}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'emoticons', 'charmap'
                    ],
                    toolbar:  "insertfile undo redo | styleselect | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor removeformat | charmap emoticons | link image",
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    placeholder :"Hãy viết bài ở đây",
                    font_size_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px 30px 36px 48px',
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    file_picker_callback : handleUploadImage
                    
                }}
                onChange={handleChangeContent}
            />
            {/* <button onClick={log}>Log editor content</button> */}
            <p
                className="mce-content-body"
                dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content),
                }}
            >

            </p>
        </div>
    );
}

export default TextEditor;
