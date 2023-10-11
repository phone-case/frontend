import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ImagesUpload from '../../components/ImagesUpload/ImagesUpload'
import ChatBox from '../../components/ChatBox/chat';
import './style.css'


const Create: React.FC = () => {

  return (
  <div>
    <div>
      <Header />
    </div>
    <div>
      <ImagesUpload/>
    </div>
    <div>
      <ChatBox />
    </div>
  </div>
  );
};

export default Create;
