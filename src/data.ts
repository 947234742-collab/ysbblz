export interface Step {
  title: string;
  description: string;
  role: string;
}

export interface WorkflowGroup {
  id: string;
  name: string;
  workflows: {
    id: string;
    title: string;
    steps: Step[];
  }[];
}

export const WORKFLOW_DATA: WorkflowGroup[] = [
  {
    id: 'county',
    name: '县级层级',
    workflows: [
      {
        id: 'county-default',
        title: '县级预算编报基础流程',
        steps: [
          { title: '填报、上报', role: '县级预算单位', description: '发起预算填报任务并初审上报' },
          { title: '审核、补填、上报', role: '县级对口业务处室', description: '核对业务数据，必要时补充录入' },
          { title: '汇总、上报', role: '县级牵头业务处室', description: '全县数据总体汇总及最终报送' },
        ]
      }
    ]
  },
  {
    id: 'municipal',
    name: '市级层级',
    workflows: [
      {
        id: 'municipal-default',
        title: '市级预算编报基础流程',
        steps: [
          { title: '填报、上报', role: '市级预算单位', description: '发起预算填报任务并初审上报' },
          { title: '审核、补填、上报', role: '市级对口业务处室', description: '核对业务数据，必要时补充录入' },
          { title: '汇总、上报', role: '市级牵头业务处室', description: '全市数据总体汇总及最终报送' },
        ]
      }
    ]
  },
  {
    id: 'provincial',
    name: '省级层级',
    workflows: [
      {
        id: 'central-investment',
        title: '中央预算内投资项目',
        steps: [
          { title: '填报、上报', role: '省级二级预算单位', description: '填报中央预算内投资专项数据' },
          { title: '审核、补填、上报', role: '经建处', description: '负责经济建设领域投资审核' },
          { title: '统筹汇总', role: '预算处', description: '纳入全省综合预算平衡' },
        ]
      },
      {
        id: 'ultra-long-new',
        title: '超长期特别国债 - “两新”项目',
        steps: [
          { title: '填报、上报', role: '省级二级预算单位', description: '填报设备更新与消费品以旧换新数据' },
          { title: '审核、补填、上报', role: '业务处', description: '对应行业主管业务处室初审' },
          { title: '复审、汇总、上报', role: '经建处', description: '牵头负责特别国债资金平衡' },
          { title: '统筹汇总', role: '预算处', description: '完成预算总集成' },
        ]
      },
      {
        id: 'ultra-long-major',
        title: '超长期特别国债 - “两重”项目',
        steps: [
          { title: '填报、上报', role: '省级二级预算单位', description: '填报国家重大战略和安全能力建设数据' },
          { title: '审核、补填、上报', role: '业务处', description: '行业主管业务处室关键性审核' },
          { title: '统筹汇总', role: '预算处', description: '国家级重大项目专项统筹' },
        ]
      },
      {
        id: 'bond-projects',
        title: '债券项目',
        steps: [
          { title: '填报、上报', role: '省级二级预算单位', description: '填报新增专项债/一般债项目数据' },
          { title: '审核、补填、上报', role: '业务处', description: '业务合规性初筛' },
          { title: '复审、汇总、上报', role: '市县债务部', description: '债务限额与还款能力穿透审核' },
          { title: '统筹汇总', role: '预算处', description: '纳入政府债务预算管理' },
        ]
      },
      {
        id: 'regular-help',
        title: '常态化帮扶资金项目',
        steps: [
          { title: '填报、上报', role: '省级二级预算单位', description: '不含债券安排部分的帮扶资金填报' },
          { title: '审核、补填、上报', role: '农业处', description: '对口农业农村与扶贫工作审核' },
          { title: '统筹汇总', role: '预算处', description: '跨部门帮扶资金综合协调' },
        ]
      }
    ]
  }
];
