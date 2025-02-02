import { Link, Outlet, useNavigate } from "react-router-dom";
import Search from 'antd/es/input/Search';
import './style.css';
import { Button } from 'antd';
import { SearchOutlined,LoginOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import ModalInclude from "../components/shared/Modalnclude";
import { RootContext } from "../contexts/RootContext";
import { getUserSession } from "../utils/auth";
import HeaderDropdown from "../components/shared/HeaderDropdown";
const DeafultLayout=()=>{
    const { handleLoginRegister, handleModalClose, isModalOpen, modalType,handleEventSearch } = useContext(RootContext);
    const loggedUser = getUserSession();
    return(
        <>
            <div className='home'>
                <header>
                    <div className="flex justify-between p-2 border-b border-gray-300">
                        <div className="flex items-center gap-5">
                            <h1 className='margin_null'>
                                <Link style={{textDecoration:'none',color:'#ff1154'}} to={'/'}>MyEvent</Link>
                            </h1>
                            <div>
                                <Search
                                    placeholder="Search events"
                                    type='primary'
                                    allowClear
                                    onSearch={(e)=>handleEventSearch(e)}
                                />
                            </div>
                        </div>
                        <div style={{gap:'10px',display:'flex',alignItems:'center'}}>
                            {
                                loggedUser ? (
                                    <HeaderDropdown title={loggedUser.name}></HeaderDropdown>) : (
                                    <>
                                    <Button onClick={()=>handleLoginRegister(2)} type="link" variant='outlined' icon={<LoginOutlined />}>
                                        Log in
                                    </Button>
                                    <Button onClick={()=> handleLoginRegister(1)} type="primary" variant='' icon={<SearchOutlined />}>
                                        Sign up
                                    </Button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </header>
                <main><Outlet/></main>
            </div>
            <ModalInclude modalType={modalType} handleModalClose={handleModalClose} isModalOpen={isModalOpen} />
        </>
    )
}
export default DeafultLayout;