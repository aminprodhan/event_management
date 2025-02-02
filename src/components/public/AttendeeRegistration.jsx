import {  useContext, useState } from 'react';
import { Alert, Button, Form, Input, InputNumber, notification } from 'antd';
import CommonRepository from '../../repositories/CommonRepository';
import { RootContext } from '../../contexts/RootContext';
import { useNavigate } from 'react-router-dom';
const AttendeeRegistration = ({event_id}) => {
    const [notificationApi, contextHolder] = notification.useNotification();
    const [loading,setLoading]=useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [errorCmp, setErrorCmp] = useState(null);
    const [form] = Form.useForm();
    const { handleModalClose} = useContext(RootContext);
    const navigate = useNavigate();

    const onFinish = async(values) => {
        values.event_id=event_id;
        setLoading(true);
        const api=await CommonRepository.post('/event/attendee/register',values);
        if(api.error != undefined){
            const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
            setErrorCmp(errors);
        }else{
            notificationApi['success']({
                message: 'Success',
                description:api.message
            });
            form.resetFields();
            setErrorCmp(null);
            handleModalClose();
            navigate('/');
        }
        setLoading(false);
    }
    
    
    return (
        <>
            {contextHolder}
            <Form
                labelCol={{
                    span: 5,
                }}
                form={form}
                name={`attendee_resgistration_${event_id}`}
                initialValues={initialValues}
                onFinish={onFinish}
                autoComplete="off">
                    {errorCmp}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}>
                        <InputNumber style={{width:'100%'}} />
                    </Form.Item>
                    <Form.Item
                        label="Reason"
                        name="main_reason"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your main reason for attending!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
            </Form>
        </>
    )
}
export default AttendeeRegistration