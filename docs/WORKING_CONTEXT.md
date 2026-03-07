# WORKING_CONTEXT.md

## 当前状态
项目已完成基础脚手架初始化和首批核心依赖接入，当前处于基础结构整理阶段。

## 已确认事项
- 这是一个后台管理前端项目
- 已确认技术栈：Vue 3、TypeScript、Pinia、Vue Router、Element Plus、Tailwind CSS、Axios
- 已确认工程工具：ESLint、Prettier
- 已确认默认包管理工具：`npm`
- 已确认默认脚手架初始化命令：`npm create vue@latest`
- 已落地协作规则文件：`AGENTS.md`
- 已落地开发规范文件：`docs/CONVENTIONS.md`

## 当前阶段目标
- [x] 完成项目启动准备
- [x] 完成 Vue 官方脚手架初始化
- [x] 接入 Element Plus、Tailwind CSS、Axios
- [x] 建立基础后台布局、路由和请求封装骨架
- [ ] 补齐基础目录和模块骨架
- [ ] 进入正式开发前的基础设施阶段

## 当前任务
整理当前生成结构与既定规范的差异，并补齐下一阶段开发需要的基础骨架。

## 当前待办
- [x] 建立最小文档体系：`AGENTS.md`、`docs/CONVENTIONS.md`、`docs/WORKING_CONTEXT.md`
- [x] 确认默认包管理工具为 `npm`
- [x] 确认默认脚手架初始化命令为 `npm create vue@latest`
- [x] 在当前目录完成 Vue 官方脚手架初始化
- [x] 恢复被脚手架覆盖的规范文档
- [x] 接入 Element Plus
- [x] 接入 Tailwind CSS 4
- [x] 接入 Axios
- [x] 删除 Vue 默认示例页面和示例组件
- [x] 建立 `AppLayout`、`dashboard` 页面和 `request.ts` 基础骨架
- [x] 通过 `vue-tsc --build`
- [x] 通过 `vite build`
- [x] 整理 `README.md`
- [ ] 补齐更完整的模块目录骨架
- [ ] 设计认证与权限基础设施
- [ ] 处理 Element Plus 全量引入带来的构建体积问题

## 当前未确定事项
- 当前无未确定事项

## 关键决定
- `docs/CONVENTIONS.md` 是规则来源
- `docs/WORKING_CONTEXT.md` 是状态来源
- 未经用户明确确认的技术选择、工具选择和初始化命令，不得写入既定事实
- 任何写入文件的动作，必须先给出步骤，并获得用户明确同意
- 项目初始化阶段的目录结构、命名规则和边界以 `docs/CONVENTIONS.md` 为准

## 阻塞项
- 当前无阻塞项

## 当前下一步
- [ ] 审视当前目录结构与既定规范的差异
- [ ] 补齐基础模块目录骨架
- [ ] 进入登录态、路由守卫、请求拦截等基础设施建设
