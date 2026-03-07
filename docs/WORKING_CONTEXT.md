# WORKING_CONTEXT.md

## 当前状态
项目处于启动准备阶段，当前还没有正式开始业务开发。

## 已确认事项
- 这是一个后台管理前端项目
- 已确认技术栈：Vue 3、TypeScript、Pinia、Vue Router、Element Plus、Tailwind CSS、Axios
- 已确认工程工具：ESLint、Prettier
- 已确认默认包管理工具：`npm`
- 已确认默认脚手架初始化命令：`npm create vue@latest`
- 已落地协作规则文件：`AGENTS.md`
- 已落地开发规范文件：`docs/CONVENTIONS.md`
- 已确定项目初始化阶段的最小范围、目录结构、命名规则和首批基础文件范围

## 当前阶段目标
当前阶段的重点是完成项目初始化准备，并进入可开始搭建脚手架的状态。

## 当前任务
- 同步已确认的脚手架初始化命令，并准备开始项目初始化

## 当前任务目标
- 将 `npm create vue@latest` 写入规范和上下文
- 清除脚手架初始化命令这项未确定事项
- 为下一步执行项目初始化做好准备

## 任务范围
- 更新 `docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md`
- 提交并推送本次文档同步结果
- 执行项目脚手架初始化命令

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
- 已撤回文档中未获确认的 `pnpm` 与初始化命令表述
- 已在规范中补充“未经确认不得写入既定事实”的硬规则
- 已将默认包管理工具更新为 `npm`
- 已重新收紧三份文档中的冗余和过期表述
- 已同步三份文档当前状态，使其与最新确认事项保持一致
- 已确认默认脚手架初始化命令为 `npm create vue@latest`

## 关键变更点
- 已将默认脚手架初始化命令写入 `docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md`
- 已清理 `docs/WORKING_CONTEXT.md` 中与当前状态不一致的旧内容
- 已保持三份文档的职责分工不变

## 遗留问题
- 当前无遗留问题

## 阻塞项
- 当前无阻塞项

## 当前下一步
1. 提交并推送本次文档更新
2. 执行 `npm create vue@latest` 初始化项目
3. 初始化后按既定规范补齐基础目录和首批基础文件
