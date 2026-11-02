# 需求管理平台

这是一个基于 React + Vite + TypeScript 的前端需求管理平台，适用于产品、运营和研发团队统一管理需求、评审、进度以及优先级。

## 功能特性

- 仪表盘：概览需求总量、风险、已发布与开发中状态
- 需求列表：支持搜索、状态筛选、优先级筛选
- 需求详情：展示需求说明、进度和关键统计信息
- 响应式布局：适配桌面端和中等宽度窗口
- 基于 Ant Design 的设计系统：快速搭建专业管理后台界面

## 技术栈

- React
- Vite
- TypeScript
- Ant Design
- React Router

## 本地运行

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发环境：
   ```bash
   npm run dev
   ```
3. 构建生产版本：
   ```bash
   npm run build
   ```

## 项目结构

```bash
src/
  components/
  data/
  pages/
  App.tsx
  main.tsx
  index.css
```

## 说明

这个项目是一个前端前台 DEMO，数据基于 mock 数据，适合后续接真实 API 或接入后端需求管理服务。
