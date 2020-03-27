//@ts-nocheck
import React, { Component, createRef } from 'react';
import { Button } from 'antd';
import './index.less';
//@ts-ignore
import SignaturePad from '../components/signatureCanvas';
import { useModel, history } from 'umi';

function rotateBase64(data: any) {   //传入需要旋转的base64图片
  return new Promise((resolve, reject) => {
    const imgView = new Image();
    imgView.src = data;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; // 裁剪坐标
    imgView.onload = () => {
      const imgW = imgView.width;
      const imgH = imgView.height;
      const size = imgH;
      canvas.width = size * 2;
      canvas.height = size * 2;
      cutCoor.sx = size;
      cutCoor.sy = size - imgW;
      cutCoor.ex = size + imgH;
      cutCoor.ey = size + imgW;
      context.translate(size, size);
      context.rotate(Math.PI / 2 * 3);
      context.drawImage(imgView, 0, 0);
      const imgData = context.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
      canvas.width = imgH;
      canvas.height = imgW;
      context.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL('image/png', 0.5));
    };
  });
}

const Sign = () => {
  const sigPad: any = createRef();
  const { setSign } = useModel('signName')
  const clear = () => {
    sigPad.current.clear();
  };


  const trim = () => {
    const urlData = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
    rotateBase64(urlData).then((img: any) => {
      setSign(img)
      history.goBack();
    })
  }

  function back() {
    history.goBack();
  }

  return (
    <div className={'container'}>
      <div className={'sigContainer'}>
        <SignaturePad
          canvasProps={{ className: 'sigPad' }}
          ref={sigPad}
        />
      </div>
      <div className="btn_div">
        <Button
          onClick={clear}
          style={{ marginRight: '10px' }}
          size="large" >
          重签
        </Button>
        <Button style={{ marginRight: '10px' }} onClick={trim} type="primary" size="large">
          提交
        </Button>
        <Button onClick={back} type="dashed" size="large">
          返回
        </Button>
      </div>
    </div>
  );
};

export default Sign;
