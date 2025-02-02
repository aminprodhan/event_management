import { useContext, useEffect, useState } from "react";
import CommonRepository from "../../repositories/CommonRepository";
import { Alert, Avatar, Button, Card, notification, Spin,Typography } from 'antd';
const { Text } = Typography;
import { useParams } from 'react-router-dom';
import Meta from "antd/es/card/Meta";
import { getUserSession } from "../../utils/auth";
import ModalInclude from "../shared/Modalnclude";
import { RootContext } from "../../contexts/RootContext";
import { FieldTimeOutlined } from '@ant-design/icons';
const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;
const EventDetails=()=>{
    let is_api_call=false;
    const { slug } = useParams();
    const [notificationApi, contextHolder] = notification.useNotification();
    const [loading,setLoading]=useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [errorCmp, setErrorCmp] = useState(null);
    const [data,setData]=useState(null);
    const { handleLoginRegister, handleModalClose, isModalOpen, modalType } = useContext(RootContext);
    const user_id=getUserSession('id') ?? null;
    useEffect(()=>{
        if(!is_api_call && slug){
            is_api_call=true;
            get(slug);
        }
    },[slug]);
    const get=async(slug)=>{
        setLoading(true);
        const api=await CommonRepository.get('/event-details/'+slug,{});
        if(api.error != undefined){            
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);      
        }else{
            setData(api.data);
            setLoading(false);
        }
    }
    const handleAttend=()=>{
        handleLoginRegister(3);
        // const isAuthenticated= getUserSession('token');
        // if(!isAuthenticated){
        //     handleLoginRegister(2);  
        // }
        // else{
        //     handleLoginRegister(3);
        // }
        
    }
    const event_button= data  && (<Button
                        onClick={handleAttend} 
                        style={{width:'100%'}} 
                        type="primary" danger size="large" key="register">Attend</Button>)
    

    const cmp=data && data.is_registration_open?(
        <div className="event-details">
            <div>
                <Card
                    style={{
                        width: '100%',
                    }}>
                        <h1 className="text-4xl">{data.title}</h1>
                    <Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title={data.hosted_by.name}
                        description={data.hosted_by.role}
                    />
                </Card>
            </div>
            <div className="w-full p-5 sm:w-2/3 lg:w-2/3 mx-auto">    
                <h5 className="text-3xl">{data.description}</h5>          
            </div>
            <div>
                <div className="sm:absolute lg:absolute lg:bottom-0 sm:bottom-0 w-full">
                    <div className="w-full flex-col flex sm:flex-row lg:flex-row">
                        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center">
                            <h1 className="sm:text-2xl bg-sky-50"><FieldTimeOutlined /> {data.date}</h1>
                            <h1 className="sm:text-2xl">{data.title}</h1>
                        </div>
                        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center">
                            {event_button}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ):(
        <Alert
            message="Registration is closed"
            type="error"
        />
    )
    //console.log(data?.id,Math.random());
    
    return(
        <>
            {contextHolder}
            <div>
                {
                    loading?(
                        <Spin tip="Loading" size="large">
                            {content}
                        </Spin>
                    ):(cmp)
                }     
            </div>
            {
                modalType && data && (
                    <ModalInclude 
                        modalType={modalType} 
                        handleModalClose={handleModalClose} 
                        isModalOpen={isModalOpen}
                        event_id={data.id} 
                        event_creator_id={data.created_by} 
                    />
                )
            }
            

        </>
    )
}
export default EventDetails;