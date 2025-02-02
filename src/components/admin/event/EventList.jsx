import TitleBar from '../../shared/TitleBar';
import CommonRepository from '../../../repositories/CommonRepository';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, notification, Space, Table, Typography,Spin } from 'antd';
const { Text } = Typography;
const EventList = ({title}) => {
  let is_api_call=false;
  const [notificationApi, contextHolder] = notification.useNotification();
  const [data,setData]=useState(null);
  const [errorCmp, setErrorCmp] = useState(null);
  const columns = [
    {
      title: 'ID',
      key:'id',
      render: (text, record,id) => <a>{id + 1}</a>,      
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button  href={`/event/${record.slug}`} color="primary" variant="link">
            View
          </Button>
          <Link  to={`/admin/event/create?id=${record.id}`}>
            <Button color="volcano" variant="link">
              Edit
            </Button>
          </Link>
          <Button onClick={()=>deleteEvent(record.id)} color="danger" variant="link">
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key:'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key:'type',
    },
    {
      title: 'Capacity',
      key:'capacity',
      dataIndex: 'capacity',
    },
    {
      title: 'Date',
      key:'date',
      dataIndex: 'date',
    },
    {
      title: 'Description',
      key:'description',
      dataIndex: 'description',
    },
    {
      title: 'Is Publish',
      key:'is_publish',
      render: (_, record) => record.is_publish == 1 ? <Text type="success">Yes</Text> : <Text type="danger">No</Text>,
    },
  ];
  const deleteEvent=async(id)=>{
    console.log('id=',id);

    const result = window.confirm("Are you sure you want to delete this event?");
    if (!result)
        return;

    const api=await CommonRepository.post('/event/delete/'+id);
    if(api.error != undefined){
        const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
        setErrorCmp(errors);
    }
    else{
        notificationApi['success']({
            message: 'Success',
            description:api.message
        });
        get();
    }
  }
  const get=async()=>{
    const api=await CommonRepository.get('/admin/events',{});    
    if(api.error != undefined){
        const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
        setErrorCmp(errors);
    }
    else{
        setData(api.data);
    }
  }
  useEffect(()=>{
    if(!is_api_call){
        is_api_call=true;
        get();
    }
  },[])
  return (
    <>
        {contextHolder}
        <TitleBar title={title}/>
        <div>
            {errorCmp}
            {
                data ? (<Table columns={columns} dataSource={data} />) : (
                  <div className="flex w-full items-center justify-center"><Spin size="large" /></div>
                )
            }
            
        </div>
    </>
  );
}
export default EventList;