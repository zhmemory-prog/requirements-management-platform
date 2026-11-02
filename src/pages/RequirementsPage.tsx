import { Button, Card, Input, Select, Space, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { RequirementTable } from '../components/RequirementTable';
import type { Requirement } from '../types';

const { Search } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

interface RequirementsPageProps {
  requirements: Requirement[];
}

export function RequirementsPage({ requirements }: RequirementsPageProps) {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'全部' | Requirement['status']>('全部');
  const [priorityFilter, setPriorityFilter] = useState<'全部' | Requirement['priority']>('全部');

  const filteredRequirements = useMemo(() => {
    return requirements.filter((item) => {
      const matchText = `${item.title} ${item.owner} ${item.category}`
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchStatus = statusFilter === '全部' || item.status === statusFilter;
      const matchPriority = priorityFilter === '全部' || item.priority === priorityFilter;
      return matchText && matchStatus && matchPriority;
    });
  }, [requirements, searchValue, statusFilter, priorityFilter]);

  return (
    <>
      <div className="page-header">
        <div>
          <Title level={2} style={{ margin: 0 }}>需求列表</Title>
          <Text type="secondary">追踪需求状态、负责人和交付进度</Text>
        </div>
        <Space>
          <Button type="primary">导出列表</Button>
        </Space>
      </div>

      <Card bordered={false} className="content-panel">
        <div className="section-header">
          <div className="page-tools" style={{ width: '100%' }}>
            <Search
              placeholder="搜索需求名称或负责人"
              allowClear
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              style={{ maxWidth: 320 }}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 160 }}
            >
              <Option value="全部">全部状态</Option>
              <Option value="待评审">待评审</Option>
              <Option value="已确认">已确认</Option>
              <Option value="开发中">开发中</Option>
              <Option value="已发布">已发布</Option>
            </Select>
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              style={{ width: 140 }}
            >
              <Option value="全部">全部优先级</Option>
              <Option value="低">低</Option>
              <Option value="中">中</Option>
              <Option value="高">高</Option>
              <Option value="紧急">紧急</Option>
            </Select>
          </div>
        </div>

        <RequirementTable requirements={filteredRequirements} />
      </Card>
    </>
  );
}
