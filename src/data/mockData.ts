export type RequirementStatus = '待评审' | '已确认' | '开发中' | '已发布';
export type RequirementPriority = '低' | '中' | '高' | '紧急';

export interface Requirement {
  id: string;
  title: string;
  category: string;
  owner: string;
  priority: RequirementPriority;
  status: RequirementStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  iteration: string;
  linkedUsers: number;
  comments: number;
  votes: number;
}

export interface RequirementSummary {
  name: string;
  owner: string;
  progress: number;
}

export interface GeneratedRequirementDraft {
  title: string;
  category: string;
  priority: RequirementPriority;
  owner: string;
  description: string;
  acceptanceCriteria: string[];
  risks: string[];
  timeline: string;
}

export function generateRequirementDraft(input: {
  scenario: string;
  user: string;
  pain: string;
  goal: string;
  constraints: string;
}): GeneratedRequirementDraft {
  const title = `面向 ${input.user} 的 ${input.goal} 优化需求`;
  const category = input.scenario.includes('运营')
    ? '运营管理'
    : input.scenario.includes('审批')
      ? '流程优化'
      : '产品规划';
  const priority = input.constraints.toLowerCase().includes('紧急') || input.pain.toLowerCase().includes('阻塞')
    ? '紧急'
    : input.goal.toLowerCase().includes('效率')
      ? '高'
      : '中';

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

export const requirements: Requirement[] = [
  {
    id: 'REQ-101',
    title: '智能需求分组与标签管理',
    category: '产品规划',
    owner: '王凌',
    priority: '高',
    status: '开发中',
    progress: 68,
    createdAt: '2026-10-05',
    updatedAt: '2026-11-02',
    description:
      '支持按业务线、用户场景和优先级自动归类需求，并允许用户给需求贴标签，以提升需求检索效率与协作透明度。',
    iteration: 'Sprint 18',
    linkedUsers: 12,
    comments: 24,
    votes: 88,
  },
  {
    id: 'REQ-102',
    title: '需求评审流程可视化',
    category: '流程优化',
    owner: '李晓晴',
    priority: '中',
    status: '已确认',
    progress: 52,
    createdAt: '2026-09-18',
    updatedAt: '2026-11-01',
    description:
      '为需求评审增加流程状态展示与关键决策记录，让评审人能够直观看到当前阶段、风险点和待解决问题。',
    iteration: 'Sprint 18',
    linkedUsers: 9,
    comments: 16,
    votes: 63,
  },
  {
    id: 'REQ-103',
    title: '跨部门协作审批',
    category: '组织协同',
    owner: '周海',
    priority: '紧急',
    status: '待评审',
    progress: 22,
    createdAt: '2026-10-28',
    updatedAt: '2026-11-03',
    description:
      '支持产品、研发、设计和运营多角色审批，明确每个决策节点的回退条件和审批责任。',
    iteration: 'Sprint 19',
    linkedUsers: 18,
    comments: 31,
    votes: 134,
  },
  {
    id: 'REQ-104',
    title: '后台任务关联与依赖追踪',
    category: '数据管理',
    owner: '赵微',
    priority: '高',
    status: '开发中',
    progress: 74,
    createdAt: '2026-08-29',
    updatedAt: '2026-11-02',
    description:
      '让需求能够关联研发任务、测试任务和缺陷事件，支持研发链路可跟踪与依赖关系查看。',
    iteration: 'Sprint 17',
    linkedUsers: 14,
    comments: 26,
    votes: 92,
  },
  {
    id: 'REQ-105',
    title: '需求质量评估与风险预警',
    category: '运营分析',
    owner: '陈杰',
    priority: '中',
    status: '已发布',
    progress: 100,
    createdAt: '2026-07-12',
    updatedAt: '2026-10-08',
    description:
      '通过需求完整度、可实现性和影响范围分析，为项目负责人提供风险预警和质量评分。',
    iteration: 'Sprint 16',
    linkedUsers: 21,
    comments: 18,
    votes: 110,
  },
  {
    id: 'REQ-106',
    title: '需求优先级排序建议',
    category: '执行管理',
    owner: '林可',
    priority: '低',
    status: '待评审',
    progress: 18,
    createdAt: '2026-10-15',
    updatedAt: '2026-11-01',
    description:
      '基于业务价值、成本和交付风险，提供智能排序建议，帮助团队更快决策待办项顺序。',
    iteration: 'Sprint 19',
    linkedUsers: 7,
    comments: 12,
    votes: 44,
  },
];

export const requirementSummary = [
  { name: '智能需求分组与标签管理', owner: '王凌', progress: 68 },
  { name: '后台任务关联与依赖追踪', owner: '赵微', progress: 74 },
  { name: '需求评审流程可视化', owner: '李晓晴', progress: 52 },
  { name: '需求优先级排序建议', owner: '林可', progress: 18 },
];
