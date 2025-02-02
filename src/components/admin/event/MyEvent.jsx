import { Alert, Button, DatePicker, Form, Input, InputNumber, notification, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import TitleBar from '../../shared/TitleBar';
import { useEffect, useState } from 'react';
import CommonRepository from '../../../repositories/CommonRepository';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const MyEvent = ({title}) => {
    let is_api_call=false;
    const [notificationApi, contextHolder] = notification.useNotification();
    const [loading,setLoading]=useState(false);
    const [initialValues, setInitialValues] = useState({type:'online'});
    const [errorCmp, setErrorCmp] = useState(null);
    const [form] = Form.useForm();
    const [isPublish, setIsPublish] = useState(2);

    const [searchParams] = useSearchParams();
    const event_id = searchParams.get('id');
    //console.log('event_id=',event_id);
    
    const get=async(event_id)=>{
        setLoading(true);
        const api=await CommonRepository.get('/event/'+event_id,{});
        if(api.error != undefined){            
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);
            
        }else{
            setIsPublish(api.data.is_publish);
            //api.data.date=dayjs.utc(api.data.date, "DD-MM-YYYY HH:mm:ss").tz("Asia/Dhaka");
            api.data.date=dayjs(api.data.date, "DD-MM-YYYY HH:mm:ss");
            console.log(api.data);
            
            form.setFieldsValue(api.data);
            setLoading(false);
        }
    }

    useEffect(()=>{
        //console.log(is_api_call,event_id);
        if(!is_api_call && event_id){
            is_api_call=true;
            get(event_id);
        }
    },[event_id]);    

    const onFinish = async(values) => {
        let route='/event/store';
        if(event_id)
            route='/event/update/'+event_id;
        setLoading(true);
        const date=dayjs(values.date).tz("Asia/Dhaka").format("YYYY-MM-DD HH:mm:ss");
        values.date=date;
        const api=await CommonRepository.post(route,values);      
        if(api.error != undefined){
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);
        }else{
            notificationApi['success']({
                message: 'Success',
                description:api.message
            });
            if(!event_id)
                form.resetFields();
            setErrorCmp(null);
        }
        setLoading(false);
    }
    return(
        <>
            {contextHolder}
            <TitleBar title={title}/>
            <div className='w-full sm:w-2/3 lg:w-2/3 mx-auto'>             
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    form={form}
                    name="basic"
                    initialValues={initialValues}
                    onFinish={onFinish}
                    autoComplete="off">
                        {errorCmp}
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                            {
                                required: true,
                                message: 'Title is required!',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                            {
                                required: true,
                                message: 'Type is required!',
                            },
                        ]}>
                            <Select
                                allowClear
                                key="day"
                                placeholder="Please select"
                                defaultValue={"online"}
                                options={[
                                    {
                                        value: 'online',
                                        label: 'Online',
                                    },
                                    {
                                        value: 'offline',
                                        label: 'Offline',
                                    }
                                ]}
                            />
                    
                        </Form.Item>
                        <Form.Item
                            label="Capacity"
                            name="capacity"
                            rules={[
                            {
                                required: true,
                                message: 'Capacity is required!',
                            },
                            {
                                validator: (_, value) => {
                                  if (value > 0) {                 
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The number must be greater than 0!'));
                                }
                            }
                        ]}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Event Date"
                            name="date"
                            rules={[
                            {
                                required: true,
                                message: 'Event date is required!',
                            },
                        ]}>
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description">
                            <TextArea
                                showCount
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }} 
                            />
                        </Form.Item>
                        <Form.Item name="is_publish" label="Is Publish" valuePropName={isPublish == 1 ? 'checked' : 'unchecked'}>
                            <Switch />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default MyEvent;