import { Card, Divider, Progress, Tag, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import type { Requirement } from '../types';

const { Title, Text } = Typography;

interface RequirementDetailPageProps {
  requirements: Requirement[];
}

export function RequirementDetailPage({ requirements }: RequirementDetailPageProps) {
  const { id } = useParams();
  const requirement = requirements.find((item) => item.id === id);

  if (!requirement) {
    return (
      <Card bordered={false} className="content-panel">
        <Title level={3}>需求不存在</Title>
        <Text type="secondary">当前需求 ID 不存在或已被移除。</Text>
      </Card>
    );
  }

  return (
    <div className="requirement-detail">
      <Card bordered={false} className="content-panel">
        <div className="section-header">
          <div>
            <Title level={2} style={{ margin: 0 }}>{requirement.title}</Title>
            <Text type="secondary">{requirement.category}</Text>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Tag color="blue">{requirement.priority}</Tag>
            <Tag color="purple">{requirement.status}</Tag>
          </div>
        </div>

        <div className="summary-row">
          <div className="summary-box">
            <div className="label">负责人</div>
            <div className="value">{requirement.owner}</div>
          </div>
          <div className="summary-box">
            <div className="label">创建时间</div>
            <div className="value">{requirement.createdAt}</div>
          </div>
          <div className="summary-box">
            <div className="label">更新时间</div>
            <div className="value">{requirement.updatedAt}</div>
          </div>
          <div className="summary-box">
            <div className="label">迭代</div>
            <div className="value">{requirement.iteration}</div>
          </div>
        </div>

        <Divider />

        <div>
          <Title level={4}>需求说明</Title>
          <Text>{requirement.description}</Text>
        </div>
      </Card>

      <Card bordered={false} className="content-panel">
        <Title level={4}>实施进度</Title>
        <Progress percent={requirement.progress} status="active" strokeColor={{ '0%': '#5B8DEF', '100%': '#7C3AED' }} />

        <div className="summary-row" style={{ marginTop: 16 }}>
          <div className="summary-box">
            <div className="label">关联用户</div>
            <div className="value">{requirement.linkedUsers}</div>
          </div>
          <div className="summary-box">
            <div className="label">评论</div>
            <div className="value">{requirement.comments}</div>
          </div>
          <div className="summary-box">
            <div className="label">点赞</div>
            <div className="value">{requirement.votes}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
