import { useMemo } from 'react';
import { Button, Layout, Menu, Space, Typography } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const navItems = [
  { key: '/', label: <Link to="/">仪表盘</Link> },
  { key: '/requirements', label: <Link to="/requirements">需求列表</Link> },
  { key: '/generate', label: <Link to="/generate">智能生成</Link> },
];

export function LayoutShell() {
  const location = useLocation();
  const activeKey = useMemo(() => {
    if (location.pathname.startsWith('/requirements')) {
      return '/requirements';
    }
    if (location.pathname.startsWith('/generate')) {
      return '/generate';
    }
    return location.pathname;
  }, [location.pathname]);

  return (
    <Layout className="app-shell">
      <Sider width={220} theme="light" style={{ borderRight: '1px solid #edf1f7' }}>
        <div style={{ padding: '20px 18px', borderBottom: '1px solid #edf1f7' }}>
          <div className="app-brand">
            <div className="app-brand-mark">RM</div>
            <span>需求平台</span>
          </div>
        </div>
        <Menu
          mode="inline"
          items={navItems}
          selectedKeys={[activeKey]}
          style={{ borderInlineEnd: 0, paddingTop: 12 }}
        />
      </Sider>

      <Layout>
        <Header className="app-header">
          <Title level={4} style={{ margin: 0 }}>
            需求管理中心
          </Title>
          <div className="app-tools">
            <Space>
              <Button type="primary">
                <Link to="/generate">智能生成需求</Link>
              </Button>
            </Space>
          </div>
        </Header>

        <Content className="page-shell">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
