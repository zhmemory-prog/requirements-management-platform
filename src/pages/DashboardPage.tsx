import { Card, Empty, Progress, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { requirementSummary } from '../data/mockData';
import type { Requirement } from '../types';

const { Title, Text } = Typography;

interface DashboardPageProps {
  requirements: Requirement[];
}

export function DashboardPage({ requirements }: DashboardPageProps) {
  const total = requirements.length;
  const published = requirements.filter((item) => item.status === '已发布').length;
  const inProgress = requirements.filter((item) => item.status === '开发中').length;
  const priorityUrgent = requirements.filter((item) => item.priority === '紧急').length;

  return (
    <>
      <div className="page-header">
        <div>
          <Title level={2} style={{ margin: 0 }}>工作台</Title>
          <Text type="secondary">聚焦项目的需求进展与交付状态</Text>
        </div>
        <Link to="/requirements">
          <Text strong>查看全部需求</Text>
        </Link>
      </div>

      <div className="summary-grid">
        <Card className="stat-card" bordered={false}>
          <div className="label">总需求数</div>
          <div className="value">{total}</div>
          <div className="meta">
            <span>本月新增</span>
            <span className="trend up">+12%</span>
          </div>
        </Card>

        <Card className="stat-card" bordered={false}>
          <div className="label">已发布</div>
          <div className="value">{published}</div>
          <div className="meta">
            <span>达成率</span>
            <span className="trend up">82%</span>
          </div>
        </Card>

        <Card className="stat-card" bordered={false}>
          <div className="label">开发中</div>
          <div className="value">{inProgress}</div>
          <div className="meta">
            <span>需跟进</span>
            <span className="trend down">3 个阻塞</span>
          </div>
        </Card>

        <Card className="stat-card" bordered={false}>
          <div className="label">紧急需求</div>
          <div className="value">{priorityUrgent}</div>
          <div className="meta">
            <span>风险等级</span>
            <span className="trend down">偏高</span>
          </div>
        </Card>
      </div>

      <div className="quick-grid">
        <Card bordered={false} className="content-panel">
          <div className="section-header">
            <Title level={4} style={{ margin: 0 }}>本周交付概览</Title>
            <Tag color="processing">7 项待验收</Tag>
          </div>
          {requirementSummary.length > 0 ? (
            <ul className="ring-list">
              {requirementSummary.map((item) => (
                <li key={item.name}>
                  <div>
                    <Text strong>{item.name}</Text>
                    <div className="muted">{item.owner}</div>
                  </div>
                  <div style={{ minWidth: 160 }}>
                    <Progress percent={item.progress} size={[160, 8]} status="active" />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty description="暂无需求数据" />
          )}
        </Card>

        <Card bordered={false} className="content-panel">
          <div className="section-header">
            <Title level={4} style={{ margin: 0 }}>优先级分布</Title>
          </div>
          <div className="summary-row">
            <div className="summary-box">
              <div className="label">高优先级</div>
              <div className="value">5</div>
            </div>
            <div className="summary-box">
              <div className="label">中优先级</div>
              <div className="value">12</div>
            </div>
            <div className="summary-box">
              <div className="label">低优先级</div>
              <div className="value">8</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
