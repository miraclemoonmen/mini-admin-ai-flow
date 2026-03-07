# WORKING_CONTEXT.md

## 当前状态
项目处于启动准备阶段，当前还没有正式开始业务开发。

## 已确认事项
- 这是一个后台管理前端项目
- 已确认技术栈：Vue 3、TypeScript、Pinia、Vue Router、Element Plus、Tailwind CSS、Axios
- 已确认工程工具：ESLint、Prettier
- 已确认包管理工具：`pnpm`
- 已确认脚手架初始化命令：`pnpm create vite . --template vue-ts`
- 已落地协作规则文件：`AGENTS.md`
- 已落地开发规范文件：`docs/CONVENTIONS.md`
- 已确定项目初始化阶段的最小范围、目录结构、命名规则和首批基础文件范围

## 当前阶段目标
当前阶段的重点是完成项目初始化准备，并进入可开始搭建脚手架的状态。

## 当前任务
- 当前没有正在执行的实现类任务

## 当前任务目标
- 当前暂无已开始的任务目标

## 任务范围
- 当前暂无已开始的任务范围

## 已知约束
- 当前优先处理项目初始化准备
- 在需求未明确前，不进入业务页面开发
- 当前阶段所有任务记录统一写入本文件
- 项目初始化阶段只实现基础脚手架和工程骨架，不扩展到业务功能

## 当前未确定事项
- 当前无未确定事项

## 关键决定
- 当前项目使用 `AGENTS.md`、`docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md` 作为最小文档集合
- `docs/WORKING_CONTEXT.md` 采用滚动更新，不作为纯追加日志使用
- 规则冲突时以 `docs/CONVENTIONS.md` 为准，状态信息以 `docs/WORKING_CONTEXT.md` 为准
- 项目初始化阶段的目录结构、命名规则和初始化边界以 `docs/CONVENTIONS.md` 为准
- 项目默认使用 `pnpm` 进行安装和脚手架初始化

## 最近完成
- 已完成项目最小文档体系的首版落地
- 已完成 `AGENTS.md`、`docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md` 的职责拆分与歧义收紧
- 已明确当前阶段的任务记录方式、文档更新方式和任务完成后的 Git 提交流程
- 已明确项目初始化阶段的最小范围、目录结构、命名规则、包管理方式和初始化命令

## 关键变更点
- 已为当前阶段建立协作规则、开发规范和状态记录三份基础文档
- 已明确 `docs/WORKING_CONTEXT.md` 为当前阶段唯一任务记录落点
- 已明确 `docs/CONVENTIONS.md` 为规则来源，`docs/WORKING_CONTEXT.md` 为状态来源
- 已将项目初始化边界、目录命名规则、包管理方式和初始化命令正式写入规范文档

## 遗留问题
- 当前无遗留问题

## 阻塞项
- 当前无阻塞项

## 当前下一步
1. 执行 `pnpm create vite . --template vue-ts` 初始化项目
2. 按既定目录结构接入 Router、Pinia、Element Plus、Tailwind CSS、Axios、ESLint 和 Prettier
3. 建立首批基础文件骨架
