import Modal from 'antd/es/modal/Modal';
const CustomModal = ({title, children,open,onClose}) => {  
  return (
    <>
      <Modal
        footer={null} 
        title={title} 
        open={open} 
        onCancel={onClose}>
        {children}
      </Modal>
    </>
  );
};
export default CustomModal;