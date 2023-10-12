import React from 'react';
import Modal from 'react-modal';

interface UploadImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onUploadFromPC: () => void;
  onUploadFromServer: () => void;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({
  isOpen,
  onRequestClose,
  onUploadFromPC,
  onUploadFromServer,
}) => {
  return (
    <div></div>
  );
};

export default UploadImageModal;
