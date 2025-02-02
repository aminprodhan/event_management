import { useEffect } from "react"
import Login from "../auth/Login"
import Register from "../auth/Register"
import AttenddeRegistration from "../public/AttendeeRegistration"
import CustomModal from "./Modal"
let event_id=null;
const ModalInclude = ({modalType,handleModalClose,isModalOpen,...props}) => {
    if(props.event_id != undefined){
        event_id=props.event_id;
    } 
    if(modalType == 3 && props.event_id == undefined)
        return null;

    const modal_info={
        1:{
            title:'Register',
            children:<Register key={"register"} controlModal={handleModalClose}/>
        },
        2:{
            title:'Login',
            children:<Login key="login" controlModal={handleModalClose}/>
        },
        3:{
            title:'Attendee Registration',
            children:<AttenddeRegistration
                key="attendee-registration"
                event_id={event_id}
                controlModal={handleModalClose}/>
        }
        
    }
    
    return (
        <CustomModal
            key={modalType} 
            title={modal_info[modalType]?.title} 
            open={isModalOpen} 
            onClose={handleModalClose}>
            {modal_info[modalType]?.children}
        </CustomModal>
    )

}
export default ModalInclude