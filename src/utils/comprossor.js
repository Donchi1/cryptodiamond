import Compressor from "compressorjs";




export const compressImg = (img,getImg) => {
    return new Compressor(img, {
      quality: 0.6,
      success: (file) => getImg(file),
    });
  };