# mini-admin-ai-flow

一个基于 Vue 3 的后台管理前端项目。

当前项目已经完成基础脚手架初始化，并接入了后台项目常用的核心依赖与基础骨架，后续会在此基础上继续完善认证、权限、页面模块和业务能力。

## 当前技术栈
- Vue 3
- TypeScript
- Vue Router
- Pinia
- Element Plus
- Tailwind CSS 4
- Axios
- Vite
- ESLint
- Prettier

## 项目阶段
当前处于基础结构整理阶段。

已完成：
- Vue 官方脚手架初始化
- Router、Pinia、Element Plus、Tailwind CSS、Axios 接入
- 基础后台布局和 Dashboard 骨架
- 基础请求封装入口
- 项目协作与上下文文档落地

## 常用命令
安装依赖：
```bash
npm install
```

启动开发环境：
```bash
npm run dev
```

类型检查：
```bash
npm run type-check
```

生产构建：
```bash
npm run build
```

代码检查：
```bash
npm run lint
```

代码格式化：
```bash
npm run format
```

## 文档入口
项目协作和上下文文档：
- `AGENTS.md`：AI 助手协作规则
- `docs/CONVENTIONS.md`：项目开发流程和执行规范
- `docs/WORKING_CONTEXT.md`：当前项目状态、关键决定、当前进行中需求和需求滚动记录

## 当前目录结构
```text
src/
  api/
    modules/
  components/
  composables/
  constants/
  layouts/
  router/
    modules/
  stores/
    modules/
  styles/
  types/
  utils/
  views/
    dashboard/
```

当前已经建立的核心入口包括：
- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/router/modules/dashboard.ts`
- `src/layouts/AppLayout.vue`
- `src/views/dashboard/index.vue`
- `src/api/request.ts`
- `src/styles/index.css`

## 当前说明
- 默认包管理工具：`npm`
- 默认脚手架初始化命令：`npm create vue@latest`
- 当前构建可通过
- Element Plus 目前为全量引入，构建体积优化问题已记录在 `REQ-20260307-02`
