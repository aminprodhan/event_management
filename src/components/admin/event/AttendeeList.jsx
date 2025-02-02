import { Alert, Button ,Select,Table,Typography,Spin} from "antd";
import CommonRepository from "../../../repositories/CommonRepository";
import { useEffect, useState } from "react";
import { getUserSession } from "../../../utils/auth";
import TitleBar from "../../shared/TitleBar";
const { Text } = Typography;
const AttendeeList = () => {
    let is_api_call=false;
    const [selectedEventId,setSelectedEventId]=useState(null);
    const [data,setData]=useState([]);
    const[attendees,setAttendees]=useState([]);
    const [errorCmp, setErrorCmp] = useState(null);
    const loggedUser = getUserSession();
    const [loading,setLoading]=useState(false);
    
    const downloadCsv = async() => {
        setLoading(true);
        const api=await CommonRepository.downloadFile('/event/attendees/download?event_id='+selectedEventId);
        setLoading(false);
    }
    const getEventList = async() => {
        setLoading(true);
        const api=await CommonRepository.get('/admin/attendees/events',{});    
        if(api.error != undefined){
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);
        }
        else{
            setData(api.data);
            if(api.data.length > 0){
                setSelectedEventId(api.data[0].id);
            }
        }
        setLoading(false);
    }
    const handleAttendees = async() => {
        setLoading(true);
        const api=await CommonRepository.get('/event/attendees?event_id='+selectedEventId,{});    
        if(api.error != undefined){
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);
        }
        else{
            setAttendees(api.data);
            setErrorCmp(null);
        }
        setLoading(false);
    }
    useEffect(()=>{
        if(!is_api_call){
            is_api_call=true;
            getEventList();
        }
    },[]);

    const columns = [
        {
          title: 'ID',
          key:'id',
          render: (text, record,id) => <a>{id + 1}</a>,      
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key:'name',
        },
        {
          title: 'Phone',
          key:'phone',
          dataIndex: 'phone',
        },
        {
          title: 'Reason',
          key:'main_reason',
          dataIndex: 'main_reason',
        },
        {
          title: 'Created At',
          key:'created_at',
          dataIndex: 'created_at',
        },
    ];

    return(
        <>
            <div className="w-full flex justify-between items-center">
                <TitleBar title="Attendee List"/>
                <Button type="primary" disabled={attendees.length === 0 ? true : false} danger onClick={downloadCsv}>Download CSV</Button>
                {/* {
                    loggedUser && loggedUser.role === 'admin' &&
                    (<Button type="primary" danger onClick={downloadCsv}>Download CSV</Button>)
                } */}
            </div>
            <div>
                <div style={{display:'flex'}}>
                    <div className="w-full gap-2 flex items-end justify-end">
                        {/* <h1 className="text-lg font-bold text-black">Event List</h1> */}
                        <Select
                            className="w-1/4"
                            value={selectedEventId}
                            onChange={(value) => setSelectedEventId(value)}
                            options={data && data.map((item) => ({ label: item.title, value: item.id }))}
                        />
                        <Button type="primary" onClick={handleAttendees}>Search</Button>
                    </div>
                </div>
            </div>
            <div>
                {errorCmp && errorCmp}
                {
                    !loading ? (<Table columns={columns} dataSource={attendees} />) : (
                        <div className="flex w-full items-center justify-center"><Spin size="large" /></div>
                    )
                }
            </div>
        </>
    )
}
export default AttendeeList;