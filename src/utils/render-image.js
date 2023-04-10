import {Buffer} from 'buffer';

export const arrayBufferToBase64 = image => {
    let imageUrl = '';
    if(image) {
        imageUrl = new Buffer(image, 'base64').toString('binary');
    }
    return imageUrl
  };
