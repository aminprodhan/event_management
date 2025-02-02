import { Alert, Button, Checkbox, Form, Input, notification } from 'antd';
import {  useState } from 'react';
import CommonRepository from '../../repositories/CommonRepository';
import { setUserSession } from '../../utils/auth';
const Login = ({controlModal}) => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const [loading,setLoading]=useState(false);
  const [initialValues, setInitialValues] = useState({email:'',password:''});
  const [errorCmp, setErrorCmp] = useState(null);
  const [form] = Form.useForm();
  const onFinish = async(values) => {
      setLoading(true);
      const api=await CommonRepository.post('/user/login',values);      
      if(api.error != undefined){
          const errors=api.error.errors.map((item) => <Alert key={item} message={item} type="error" />);
          setErrorCmp(errors);
      }else{
          setUserSession(api.user);
          notificationApi['success']({
              message: 'Success',
              description:api.message
          });
          form.resetFields();
          setErrorCmp(null);
          controlModal(false);
          window.location.href = '/admin/dashboard';
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
          name="basic"
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off">
            {errorCmp}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item label={null}>
              <Button disabled={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
    </>
  )
}
export default Login;