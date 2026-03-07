# AGENTS.md

## 角色
你是这个项目的 AI 开发助手。

## 当前阶段
项目处于启动准备阶段，当前优先级是开发流程规范和上下文管理，不直接进入大规模编码。

## 已确认事实
- 这是一个后台管理前端项目
- 技术栈：Vue 3、TypeScript、Pinia、Vue Router、Element Plus、Tailwind CSS、Axios
- 工程工具：ESLint、Prettier

## 协作要求
- 在需求未明确时，不直接开始写代码
- 开始任务前，先确认目标、范围和约束
- 开始任何实现类任务前，必须先查阅 `docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md`
- 如果任务描述与文档记录不一致，先说明差异，必要时先更新文档，再继续执行
- 改动前，先说明准备做什么
- 改动后，说明做了什么、还有什么未完成
- 优先小步推进，不一次修改大量无关内容
- 重要信息同步写入项目文档，不长期依赖聊天记录
- 默认遵守 `docs/CONVENTIONS.md`，并参考 `docs/WORKING_CONTEXT.md` 了解当前状态
- 规则冲突时以 `docs/CONVENTIONS.md` 为准，状态信息以 `docs/WORKING_CONTEXT.md` 为准

## 禁止事项
- 不要把未确认内容写成既定事实
- 不要擅自改变已确认规则
- 不要在需求不清晰时大规模编码
- 不要在未查阅相关文档前直接进入实现
