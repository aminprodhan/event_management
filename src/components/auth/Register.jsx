import { Button, Form, Input, notification } from 'antd';
import CommonRepository from '../../repositories/CommonRepository';
import Alert from 'antd/es/alert/Alert';
import {  useState } from 'react';
const Register = ({controlModal}) => {
    const [notificationApi, contextHolder] = notification.useNotification();
    const [loading,setLoading]=useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [errorCmp, setErrorCmp] = useState(null);
    const [form] = Form.useForm();
    const onFinish = async(values) => {
        setLoading(true);
        const api=await CommonRepository.post('/user/register',values);
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
            controlModal(false);
        }
        setLoading(false);
    }
    return (
        <>
            {contextHolder}
            <Form
                labelCol={{
                    span: 4,
                }}
                form={form}
                name="register"
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
                        label="Email"
                        name="email"
                        rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input your email!',
                        },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            min: 3,
                            message: 'Please input your password!',
                        },
                        ]}>
                        <Input.Password />
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
export default Register;