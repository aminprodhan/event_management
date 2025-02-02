import { DownOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space ,Typography,notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import CommonRepository from '../../repositories/CommonRepository';
const { Title } = Typography;
const items = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: 'profile',
    icon: <ProfileOutlined />,
    label: 'Profile',
    extra: '⌘P',
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
];
const HeaderDropdown = ({title}) => {
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();
  const menuProps = {
    items,
    onClick: (e) => handleDropdown(e),
  }
  const handleDropdown=(e)=>{
    if(e.key == 'logout'){
        //api call
        const api=CommonRepository.post('/user/logout');
        if(api.error != undefined){
            notificationApi['error']({
                message: 'Error',
                description:"Something went wrong"
            })
        }
        else{
            notificationApi['success']({
                message: 'Success',
                description:api.message
            });
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        
    }
    else if(e.key == 'profile'){
        navigate('/admin/dashboard');
    }
  }
  return (
    <>
      {contextHolder}
      <Dropdown menu={menuProps}>
        <Button type="link" variant='danger'>
          <Space>
              {title}
              <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  )
}
export default HeaderDropdown;