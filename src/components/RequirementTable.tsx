import { Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import type { Requirement } from '../types';

const { Text } = Typography;

interface RequirementTableProps {
  requirements: Requirement[];
}

const priorityColorMap: Record<Requirement['priority'], string> = {
  低: 'blue',
  中: 'gold',
  高: 'orange',
  紧急: 'red',
};

const statusColorMap: Record<Requirement['status'], string> = {
  待评审: 'default',
  已确认: 'processing',
  开发中: 'purple',
  已发布: 'success',
};

export function RequirementTable({ requirements }: RequirementTableProps) {
  const columns: ColumnsType<Requirement> = [
    {
      title: '需求名称',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Link to={`/requirements/${record.id}`}>
          <Text strong>{record.title}</Text>
        </Link>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: Requirement['priority']) => (
        <Tag color={priorityColorMap[priority]}>{priority}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Requirement['status']) => (
        <Tag color={statusColorMap[status]}>{status}</Tag>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '更新',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
  ];

  return <Table columns={columns} dataSource={requirements} rowKey="id" pagination={{ pageSize: 8 }} />;
}
