import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { getUserSession } from '../utils/auth';
import HeaderDropdown from '../components/shared/HeaderDropdown';
const { Header, Sider, Content } = Layout;
const AuthLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const loggedUser = getUserSession();
  return (
    <div className='h-screen'>
        <Layout>
            <Sider 
                breakpoint="lg"
                collapsedWidth="0"
                collapsed={collapsed}
                onBreakpoint={(broken) => {
                  console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type,'collapsed');
                  setCollapsed(collapsed);
                }}
                >
                <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                              key: '5',
                              icon: <UserOutlined />,
                              label: <Link to={'/'}>Visit Site</Link>,
                            },
                            {
                              key: '1',
                              icon: <UserOutlined />,
                              label: <Link to={'/admin/dashboard'}>Dashboard</Link>,
                            },
                            {
                              key: '2',
                              icon: <VideoCameraOutlined />,
                              label: <Link to={'/admin/event/create'}>New Event</Link>,
                            },
                            {
                              key: '3',
                              icon: <UploadOutlined />,
                              label: <Link to={'/admin/events'}>Event List</Link>,
                            },
                            {
                              key: '4',
                              icon: <UploadOutlined />,
                              label: <Link to={'/admin/events/attendees'}>Attendee List</Link>,
                            },
                        ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: '#FFF',
                        width: `calc(100vw - ${collapsed ? 0 : 200}px)`,
                    }}>
                        <div className='w-full flex justify-between'>
                            <Button
                              type="text"
                              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                              onClick={() => setCollapsed(!collapsed)}
                              style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                              }}
                            />
                            <div>
                                {
                                  loggedUser && (
                                    <HeaderDropdown title={loggedUser.name}></HeaderDropdown>)
                                }
                            </div>
                        </div>
                </Header>
                <div
                    style={{
                        minHeight: '90vh',
                        width: `calc(100vw - ${collapsed ? 0 : 200}px)`,
                    }}>
                    <div className='p-1'>
                      <Outlet />  
                    </div>  
                </div>
            </Layout>
        </Layout>
    </div>
  );
};
export default AuthLayout;