import { createContext, useState } from 'react';
const RootContext = createContext({
    isModalOpen: false,
    searchEventText:'',
});
const RootProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [searchEventText, setSearchEventText] = useState('');
    const handleLoginRegister = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    }
    const handleEventSearch=(search_text)=>{
        setSearchEventText(search_text);  
    }
 return (
   <RootContext.Provider value={{ searchEventText,handleEventSearch,isModalOpen, setIsModalOpen, modalType, setModalType, handleLoginRegister, handleModalClose }}>
     {children}
   </RootContext.Provider>
 );
};

export { RootContext, RootProvider };