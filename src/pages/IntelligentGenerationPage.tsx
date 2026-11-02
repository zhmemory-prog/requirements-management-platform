import { useMemo, useState } from 'react';
import { Button, Card, Form, Input, Select, Space, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

type InputField = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const { Title, Text } = Typography;
const { TextArea } = Input;

const defaultDraft = {
  title: '面向团队协作的需求管理智能提效方案',
  category: '产品规划',
  priority: '高',
  owner: '产品经理',
  description:
    '基于业务场景与痛点分析，自动生成清晰的需求表达，帮助团队快速识别价值、优先级和实施边界，提升需求协同效率。',
  acceptanceCriteria: [
    '支持一键生成需求初稿并编辑修订',
    '需求具备明确目标、优先级与验收标准',
    '生成结果可一键进入需求评审列表',
    '可覆盖主流业务场景与部门协同场景',
  ],
  risks: ['范围边界需要人工确认', '跨部门协作角色需提前对齐'],
  timeline: '2 周',
};

function buildDraft(input: {
  scenario: string;
  user: string;
  pain: string;
  goal: string;
  constraints: string;
}) {
  const title = `面向 ${input.user} 的 ${input.goal} 优化需求`;
  const category = input.scenario.includes('运营') ? '运营管理' : input.scenario.includes('审批') ? '流程优化' : '产品规划';
  const priority = input.constraints.toLowerCase().includes('紧急') || input.pain.toLowerCase().includes('阻塞') ? '紧急' : input.goal.toLowerCase().includes('效率') ? '高' : '中';

  return {
    title,
    category,
    priority,
    owner: '产品经理',
    description: `为 ${input.user} 提供一套基于 ${input.scenario} 的能力，解决 ${input.pain}，帮助团队提升 ${input.goal} 的效率与可控性，并在限制条件 ${input.constraints} 下保证实施落地。`,
    acceptanceCriteria: [
      '用户能够根据场景快速生成初始需求文案',
      '输出内容包含目标、优先级、验收标准和风险提示',
      '生成结果可直接进入需求评审流程',
      '支持根据反馈继续修订并保存为正式需求',
    ],
    risks: [
      '需求边界需要业务负责人最终确认',
      '系统集成依赖需提前梳理与评估',
    ],
    timeline: priority === '紧急' ? '1 周' : priority === '高' ? '2 周' : '3 周',
  };
}

export function IntelligentGenerationPage() {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState('业务运营与需求评审');
  const [user, setUser] = useState('产品经理和运营负责人');
  const [pain, setPain] = useState('需求输入不统一、评审过程缺少结构化描述，导致跨团队沟通低效');
  const [goal, setGoal] = useState('提升需求孵化效率和评审一致性');
  const [constraints, setConstraints] = useState('需兼容现有流程、支持最小可用版本上线');
  const [draft, setDraft] = useState(defaultDraft);

  const onGenerate = () => {
    const nextDraft = buildDraft({ scenario, user, pain, goal, constraints });
    setDraft(nextDraft);
  };

  const onSave = () => {
    navigate('/requirements');
  };

  const fields: InputField[] = [
    { label: '业务场景', value: scenario, onChange: setScenario },
    { label: '目标用户', value: user, onChange: setUser },
    { label: '痛点描述', value: pain, onChange: setPain },
    { label: '核心目标', value: goal, onChange: setGoal },
    { label: '约束条件', value: constraints, onChange: setConstraints },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <Title level={2} style={{ margin: 0 }}>智能生成需求</Title>
          <Text type="secondary">基于业务场景自动输出可评审的需求草稿</Text>
        </div>
        <Space>
          <Button onClick={onGenerate}>生成草稿</Button>
          <Button type="primary" onClick={onSave}>保存到需求池</Button>
        </Space>
      </div>

      <div className="generate-grid">
        <Card className="content-panel" bordered={false}>
          <Title level={4} style={{ marginTop: 0 }}>需求输入</Title>
          <Form layout="vertical">
            {fields.map((field) => (
              <Form.Item key={field.label} label={field.label}>
                <Input value={field.value} onChange={(e) => field.onChange(e.target.value)} />
              </Form.Item>
            ))}
            <Form.Item label="补充说明">
              <TextArea rows={4} placeholder="可补充用户故事、业务背景、操作流程或目标指标" />
            </Form.Item>
          </Form>
        </Card>

        <Card className="content-panel" bordered={false}>
          <Title level={4} style={{ marginTop: 0 }}>生成结果</Title>
          <div className="preview-box">
            <h4>{draft.title}</h4>
            <div className="meta-row">
              <Tag color="blue">{draft.category}</Tag>
              <Tag color={draft.priority === '紧急' ? 'red' : draft.priority === '高' ? 'orange' : 'gold'}>{draft.priority}</Tag>
              <Tag color="purple">{draft.owner}</Tag>
              <Tag color="green">预计 {draft.timeline}</Tag>
            </div>

            <Text>{draft.description}</Text>

            <div style={{ marginTop: 16 }}>
              <Text strong>验收标准</Text>
              <ul>
                {draft.acceptanceCriteria.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 16 }}>
              <Text strong>风险提示</Text>
              <ul>
                {draft.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
