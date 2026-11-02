import { Card, Col, Row } from 'antd';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: string;
  trendType?: 'up' | 'down';
}

export function StatCard({ label, value, trend, trendType = 'up' }: StatCardProps) {
  return (
    <Card className="stat-card" bordered={false}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="meta">
        <span>较上周</span>
        <span className={`trend ${trendType}`}>{trend}</span>
      </div>
    </Card>
  );
}
