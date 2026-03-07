# WORKING_CONTEXT.md

## 当前状态
项目已完成基础脚手架初始化和首批核心依赖接入，当前进入项目基础结构整理阶段。

## 已确认事项
- 这是一个后台管理前端项目
- 已确认技术栈：Vue 3、TypeScript、Pinia、Vue Router、Element Plus、Tailwind CSS、Axios
- 已确认工程工具：ESLint、Prettier
- 已确认默认包管理工具：`npm`
- 已确认默认脚手架初始化命令：`npm create vue@latest`
- 已落地协作规则文件：`AGENTS.md`
- 已落地开发规范文件：`docs/CONVENTIONS.md`
- 已确定项目初始化阶段的最小范围、目录结构、命名规则和首批基础文件范围
- 已在当前目录完成 Vue 官方脚手架初始化
- 已完成 Element Plus、Tailwind CSS、Axios 的基础接入

## 当前阶段目标
当前阶段的重点是基于已生成的项目骨架，继续整理目录结构并准备进入正式开发前的基础配置阶段。

## 当前任务
- 完成基础依赖接入、示例代码清理和项目骨架整理

## 当前任务目标
- 将 Element Plus、Tailwind CSS、Axios 接入当前项目
- 将默认示例替换为后台项目骨架
- 验证当前项目可以正常通过基础构建

## 任务范围
- 安装 `element-plus`、`tailwindcss`、`@tailwindcss/vite`、`axios`
- 修改 `src/main.ts`、`vite.config.ts`、`src/router/index.ts`、`src/App.vue`
- 新增 `src/api`、`src/layouts`、`src/router/modules`、`src/stores/index.ts`、`src/styles`、`src/types`、`src/utils`、`src/views/dashboard`
- 删除脚手架默认示例文件
- 更新 `docs/WORKING_CONTEXT.md`

## 已知约束
- 当前优先处理项目初始化准备
- 在需求未明确前，不进入业务页面开发
- 当前阶段所有任务记录统一写入本文件
- 项目初始化阶段只实现基础脚手架和工程骨架，不扩展到业务功能
- 任何写入文件的动作，都必须先给出步骤并获得用户明确同意

## 当前未确定事项
- 当前无未确定事项

## 关键决定
- 当前项目使用 `AGENTS.md`、`docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md` 作为最小文档集合
- `docs/WORKING_CONTEXT.md` 采用滚动更新，不作为纯追加日志使用
- 规则冲突时以 `docs/CONVENTIONS.md` 为准，状态信息以 `docs/WORKING_CONTEXT.md` 为准
- 项目初始化阶段的目录结构、命名规则和初始化边界以 `docs/CONVENTIONS.md` 为准
- 项目默认使用 `npm` 作为包管理工具
- 项目默认脚手架初始化命令为 `npm create vue@latest`
- 未经用户明确确认的技术选择、工具选择和初始化命令，不得写入既定事实

## 最近完成
- 已确认默认脚手架初始化命令为 `npm create vue@latest`
- 已在当前目录完成 Vue 官方脚手架初始化
- 已恢复被脚手架覆盖的规范文档
- 已接入 Element Plus、Tailwind CSS、Axios
- 已建立后台项目基础路由、布局、样式入口和请求封装骨架
- 已删除 Vue 默认示例页面和示例组件
- 已通过 `vue-tsc --build`
- 已通过 `vite build`

## 关键变更点
- 当前项目已经从官方默认模板切换为后台管理前端基础骨架
- `src/styles/index.css` 已切换为 Tailwind 4 入口
- `src/layouts/AppLayout.vue` 和 `src/views/dashboard/index.vue` 已建立基础页面骨架
- `src/api/request.ts` 已建立 Axios 实例封装
- 当前构建可通过，但 Element Plus 全量引入导致产物体积偏大，后续可再做按需优化

## 遗留问题
- 还未接入按需加载或构建优化策略
- 还未整理 `README.md`
- 还未建立更完整的模块目录骨架

## 阻塞项
- 当前无阻塞项

## 当前下一步
1. 审视当前生成结构与既定规范的差异
2. 继续补齐基础目录和模块骨架
3. 再进入登录、权限和布局细化等正式开发准备
