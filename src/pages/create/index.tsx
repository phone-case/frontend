import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './style.css';

const Create: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPcUploadModalOpen, setIsPcUploadModalOpen] = useState(false);
  const [isServerUploadModalOpen, setIsServerUploadModalOpen] = useState(false);
  const [isPcLoadModalOpen, setIsPcLoadModalOpen] = useState(false);
  const [isServerLoadModalOpen, setIsServerLoadModalOpen] = useState(false);

  const [isImageClickModalOpen, setIsImageClickModalOpen] = useState(false);

  const [content, setContent] = useState<string>('');

  const [customFilename, setCustomFilename] = useState<string>('');
  const [isServerButtonEnabled, setIsServerButtonEnabled] = useState<boolean>(false);
  const [isServerLoadButtonEnabled, setIsServerLoadButtonEnabled] = useState<boolean>(false);

  const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);

  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(false);

  const [responseData, setResponseData] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  

  
  useEffect(() => {
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerText;
      setPlaceholderVisible(text === '');
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // 파일 선택 후 모달 닫기
      setIsPcLoadModalOpen(false);
      setIsServerLoadModalOpen(false);
      setIsImageModalOpen(false);

      setImageName('');
    }
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const openPcUploadModal = () => {
    setIsPcUploadModalOpen(true);
  };

  const closePcUploadModal = () => {
    setIsPcUploadModalOpen(false);
  };

  const openServerUploadModal = () => {
    setIsServerUploadModalOpen(true);
  };

  const closeServerUploadModal = () => {
    setIsServerUploadModalOpen(false);
  };

  const openPcLoadModal = () => {
    setIsPcLoadModalOpen(true);
  };

  const closePcLoadModal = () => {
    setIsPcLoadModalOpen(false);
  };

  const openServerLoadModal = () => {
    setIsServerLoadModalOpen(true);
  };

  const closeServerLoadModal = () => {
    setIsServerLoadModalOpen(false);
  };

  const openImageClickModal = () => {
    setIsImageClickModalOpen(true);
  };


  const closeImageClickModal = () => {
    setIsImageClickModalOpen(false);
  };

  const handleDownload = () => {
    if (imagePreview) {
      const filename = customFilename || imageName; // Use custom filename if provided, else use the original image name
      const downloadLink = document.createElement('a');
      downloadLink.href = imagePreview;
      downloadLink.download = filename;
      downloadLink.click();
      setCustomFilename(''); // Reset custom filename
    }
  };

  const handleImageSubmit = async () => {
    if (image) {
      
      const formData = new FormData();
      formData.append('image', image);
      formData.append('imageName', imageName);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Image uploaded successfully');
          // 이미지 업로드 후 이미지 미리보기 초기화
          setImagePreview(null);
          setIsIdTaken(null);
          setImage(null);
          setResponseData([]);
          //!!
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setIsServerUploadModalOpen(false);
    setIsUploadModalOpen(false);

  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerText;
      setContent(text);
      setResponseData([]);
      setIsLoading(true);
  
      try {
        // 텍스트 데이터를 서버로 전송
        const response = await axios.post('/api/submit_text', { content: text });
  
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setResponseData(data);
          setIsLoading(false);
        } else {
          console.error('폼 데이터 제출에 실패했습니다.');
        }
      } catch (error) {
        console.error('오류 발생:', error);
        setIsLoading(false);
      }
    }
  };

  const handleTextImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (contentEditableRef.current) {
      const text = contentEditableRef.current.innerText;
      setContent(text);
      setResponseData([]);
      setIsImageClickModalOpen(false);
      setIsLoading(true);
      try {
        // 텍스트 데이터를 서버로 전송
        const response = await axios.post('/api/create_text', { content: text });
  
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setResponseData(data);
          setIsLoading(false);
        } else {
          console.error('폼 데이터 제출에 실패했습니다.');
        }
      } catch (error) {
        console.error('오류 발생:', error);
        setIsLoading(false);
      }
    }
  };

  const handleImageClick = async (imageUrl: string) => {
    try {
      const response = await axios.get(imageUrl, { responseType: 'blob' });
      const blobUrl = URL.createObjectURL(response.data);
      setImagePreview(blobUrl);

      const fileName = 'your_filename_here.png'; // 원하는 파일 이름 설정
      const imageFile = new File([response.data], fileName, { type: response.data.type });
      setImage(imageFile);

    } catch (error) {
      console.error('이미지 불러오기에 실패했습니다.', error);
    }
  };

  const checkImageName = async (imageName: string) => {
    try {
      const response = await fetch(`/api/check_imagename/${imageName}`);
      const data = await response.json();
  
      if (!data.isTaken) {
        setIsIdTaken(false); // 이미지 이름 사용 가능
        setIsServerButtonEnabled(true); // 이미지 업로드 버튼 활성화
        setIsServerLoadButtonEnabled(false);
      } else {
        setIsIdTaken(true); // 이미지 이름 중복
        setIsServerButtonEnabled(false); // 이미지 업로드 버튼 비활성화
        setIsServerLoadButtonEnabled(true);
      }
    } catch (error) {
      console.error('Error checking image name');
    }
  };

  const getImageFromServer = async () => {
    try {
      const response = await fetch('/api/get_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageName }),
      });
  
      if (response.ok) {
        const blob = await response.blob();
  
        // 이미지 URL로 미리보기 업데이트
        setImagePreview(URL.createObjectURL(blob));
  
        // 이미지 blob을 상태에 저장 (image 상태는 File 객체여야 함)
        // File 객체를 만들 때는 File 생성자를 사용
        const fileName = 'your_filename_here.png'; // 원하는 파일 이름 설정
        const imageFile = new File([blob], fileName, { type: blob.type });
        setImage(imageFile);
  
        setIsServerLoadModalOpen(false);
        setIsImageModalOpen(false);
        setIsIdTaken(null);
      } else {
        console.error('Failed to fetch image from the server.');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };


  return (
    <div>
      <div className='header-div'>
        <Header />
      </div>
      <div className='mid'>
        <div className='left-box'>
          <div className='image-box'>
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>
          <div className='button-container'>
            <button onClick={openImageModal}><span>이미지 불러오기</span></button>
            <button onClick={openUploadModal} disabled={!imagePreview}><span>이미지 저장하기</span></button>
          </div>
        </div>
        <div className='right-box'>
          <form onSubmit={handleTextSubmit}>
            <div className="chat-box">
              <div
                className="text"
                ref={contentEditableRef}
                contentEditable={true}
              >
              </div>
            </div>
            <div className='button-box'>
            {isLoading ? (
              <div className="loading-spinner"><img className='loading_image' src="./img/loading.gif" alt="로딩" /></div>
            ) : (
              <button type="submit" className='image-change'></button>
            )}
            {/* 
            {!imagePreview ? (
            <div>
              <button type="submit" className='noimage'></button>
            </div>
            ) : (
              <button type="submit" className='image-change'></button>
            )}*/}
              <div className='choice'>
                {responseData && responseData.length > 0 &&(
                  <button type='button' onClick={openImageClickModal}>이미지 선택하기</button>
                )}
              </div>
            </div>
          </form>
        </div>
        <Link to="/design">
          <button type="button" className="register-button">
            <span>디자인하러 가기</span>
          </button>
        </Link>
      </div>

      {isImageClickModalOpen && (
        <div className='image-modal'>
          <div className="image-list">
            {responseData.map((url, index) => (
              <button onClick={() => handleImageClick(url)}>
                <img
                  key={index}
                  src={url}
                  alt=""
                />
              </button>
            ))}
            <br />
            <div className='image-close-button'>
              <button onClick={closeImageClickModal}><span>닫기</span></button>
              <button onClick={handleTextImageSubmit} className='create-image-button'><span>이미지 생성하기</span></button>
              <div className="info-tooltip">약 1분 정도 소요 됩니다.</div>
            </div>
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 불러오기</h2>
            <button onClick={openPcLoadModal}><span>내PC에서 불러오기</span></button>
            &nbsp;
            <button onClick={openServerLoadModal}><span>서버에서 불러오기</span></button>
            <br /> <br />
            <div className='close1'>
              <button onClick={closeImageModal}><span>닫기</span></button>
            </div>
          </div>
        </div>
      )}

      {isPcLoadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>내PC에서 불러오기</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className='close2'>
              <button onClick={closePcLoadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {isServerLoadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>서버에서 불러오기</h2>
            <input
              type="text"
              placeholder="image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            /> &nbsp;
            <button onClick={() => checkImageName(imageName)}>이름 확인</button>
            <p>
              <button
                disabled={!isServerLoadButtonEnabled}
                onClick={getImageFromServer}
              >
                이미지 불러오기
              </button>
            </p>
            {isIdTaken === true && <p>입력하신 이름의 이미지가 있습니다.</p>}
            {isIdTaken === false && <p>입력하신 이름의 이미지가 없습니다.</p>}
            <div className='close3'>
              <button onClick={closeServerLoadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>이미지 저장하기</h2>
            <button onClick={openPcUploadModal}>내PC에 저장하기</button>
            &nbsp;
            <button onClick={openServerUploadModal}>서버에 저장하기</button>
            <br /> <br />
            <div className='close4'>
              <button onClick={closeUploadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {isPcUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>내PC에 저장하기</h2>
            <input
              type="text"
              placeholder="이미지 이름"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
            /> &nbsp;
            <button onClick={handleDownload}>이미지 저장하기</button>
            <br /><br />
            <div className='close5'>
              <button onClick={closePcUploadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {isServerUploadModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>서버에 저장하기</h2>
            <input
              type="text"
              placeholder="image name"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            /> &nbsp;
            <button onClick={() => checkImageName(imageName)}>중복 확인</button>
            <p>
              <button
                disabled={!isServerButtonEnabled}
                onClick={handleImageSubmit}
              >
                이미지 저장하기
              </button>
            </p>
            {isIdTaken === true && <p>이미 사용 중인 이름입니다.</p>}
            {isIdTaken === false && <p>사용 가능한 이름입니다.</p>}
            <div className='close6'>
              <button onClick={closeServerUploadModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Create;