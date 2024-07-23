import { Layout, Menu, Typography } from 'antd';
import { Outlet, Link, } from 'react-router-dom';
import { ShoppingOutlined, AppstoreOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to="/dashboard/categories">Categories</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />}>
            <Link to="/dashboard/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<AppstoreOutlined />}>
              <Link to="/dashboard/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingOutlined />}>
              <Link to="/dashboard/products">Products</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Title level={2}>Dashboard</Title>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
