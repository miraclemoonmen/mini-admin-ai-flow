# CONVENTIONS.md

## 目的
这个文件用于约定项目的开发流程、记录方式和日常执行规则。

## 任务流程
每次任务默认按以下顺序执行：
1. 确认任务目标
2. 确认任务范围
3. 查阅已有文档
4. 补充必要上下文
5. 开始实现
6. 完成后更新记录

## 执行规则
- 需求还在讨论时，先整理问题和范围，不直接进入编码
- 任务明确后，先补当前任务背景，再开始修改
- 优先小步推进，不一次改很多无关内容
- 如果实现和原计划不一致，需要补充原因
- 提交前完成基础检查和格式整理
- 不提交明显未完成的临时代码

## 文档规则
项目当前维护以下文档：
- `AGENTS.md`：AI 助手协作规则
- `docs/CONVENTIONS.md`：项目开发流程和执行规范
- `docs/WORKING_CONTEXT.md`：当前项目状态、已确认事项和当前下一步

文档更新方式：
- `AGENTS.md` 采用覆盖式更新，保持最新协作规则
- `docs/CONVENTIONS.md` 采用覆盖式更新，保持最新项目规范
- `docs/WORKING_CONTEXT.md` 采用滚动更新，保留固定结构并持续刷新当前状态，不作为纯追加日志使用

## 上下文规则
以下内容必须写入文档：
- 已确认的项目事实
- 当前阶段目标
- 当前任务
- 当前任务目标
- 关键决定
- 阻塞项
- 当前下一步

## 任务记录要求
当前阶段不单独新增任务日志文件。

开始一个任务时，相关记录统一写入 `docs/WORKING_CONTEXT.md`，至少包含：
- 当前任务名称
- 当前任务目标
- 任务范围
- 已知约束
- 当前下一步

完成一个任务时，相关记录统一写入 `docs/WORKING_CONTEXT.md`，至少更新：
- 实际完成内容
- 关键变更点
- 遗留问题
- 当前下一步

## 任务完成规则
一个明确任务完成后，应先更新相关文档，再决定是否提交 Git。

默认要求：
- 更新 `docs/WORKING_CONTEXT.md`，记录当前结果、遗留问题和当前下一步
- 如果本次任务修改了协作方式或项目规则，同时更新相关规范文档
- 有明确产出时，文档和代码应尽量一起提交到 Git
- 如果当前线程只有讨论，没有形成实际产出，可以只更新文档，不强制提交 Git

## 包管理与初始化命令
项目默认使用 `pnpm` 作为包管理工具。

项目初始化命令默认使用：
```bash
pnpm create vite . --template vue-ts
```

## 项目初始化最小范围
项目初始化阶段默认只做到以下范围：
- 使用 Vue 3 + TypeScript 创建项目基础脚手架
- 接入 Vue Router、Pinia、Element Plus、Tailwind CSS、Axios
- 配置 ESLint 和 Prettier
- 建立基础目录结构、路径别名和全局样式入口
- 建立基础路由、基础布局和请求封装骨架

项目初始化阶段默认不包含以下内容：
- 具体业务页面实现
- 真实接口联调
- 权限体系完整实现
- 多语言、主题系统、复杂工程优化
- 单元测试、E2E、CI/CD、Docker

## 初始化后首批基础文件范围
项目初始化完成后，首批基础文件默认至少包含：
- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/stores/index.ts`
- `src/api/request.ts`
- `src/layouts/AppLayout.vue`
- `src/views/dashboard/index.vue`
- `src/styles/index.css`
- `src/types/`
- `src/utils/`

## 目录结构约定
项目初始化后默认采用以下目录结构：

```text
src/
  api/
    modules/
  assets/
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

目录职责：
- `api/`：接口请求封装和接口模块
- `api/modules/`：按业务域拆分的接口文件
- `components/`：可复用通用组件
- `composables/`：组合式逻辑
- `layouts/`：全局布局组件
- `router/`：路由入口和路由模块
- `stores/`：Pinia 状态管理入口
- `stores/modules/`：按模块拆分的 store
- `styles/`：全局样式、变量和 Tailwind 入口
- `types/`：全局共享类型
- `utils/`：纯工具函数
- `views/`：页面级组件

## 命名规则
默认命名规则如下：
- Vue 组件文件和布局文件使用 `PascalCase`，例如 `AppLayout.vue`、`PageHeader.vue`
- 页面目录使用 `kebab-case`，页面入口统一使用 `index.vue`，例如 `views/user-management/index.vue`
- `composables` 使用 `useXxx.ts`，例如 `useTable.ts`
- `stores/modules` 使用 `xxx.ts` 文件名，导出统一使用 `useXxxStore`
- `api/modules` 使用 `xxx.ts` 文件名，按业务域组织接口
- `router/modules` 使用 `xxx.ts` 文件名，按业务域组织路由
- 普通 TypeScript 文件默认使用 `kebab-case`
- 常量文件可使用 `UPPER_SNAKE_CASE` 常量名，文件名仍使用 `kebab-case`
- 路由路径使用 `kebab-case`
- 路由 `name` 使用 `PascalCase`

## 工程规范
- 保持代码风格一致
- 默认遵循 ESLint 和 Prettier 约定
- 新增规则和长期约定应同步更新文档

## 禁止事项
- 不要把聊天记录当作长期上下文
- 不要把建议直接当成最终决定
- 不要在没有记录背景的情况下推进复杂任务
