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

## 当前进行中需求
- 需求编号：REQ-20260307-02
- 摘要：基础骨架整理与下一阶段基础设施准备，当前状态为进行中 [ ]

## 关键决定
- `docs/CONVENTIONS.md` 是规则来源
- `docs/WORKING_CONTEXT.md` 是状态来源
- 未经用户明确确认的技术选择、工具选择和初始化命令，不得写入既定事实
- 任何写入文件的动作，必须先给出步骤，并获得用户明确同意
- 项目初始化阶段的目录结构、命名规则和边界以 `docs/CONVENTIONS.md` 为准

## 阻塞项
- 当前无阻塞项

## 当前下一步
- [ ] REQ-20260307-02：补齐基础模块目录骨架
- [ ] REQ-20260307-02：进入登录态、路由守卫、请求拦截等基础设施建设
- [ ] REQ-20260307-02：评估 Element Plus 全量引入带来的构建体积问题并制定收敛方案

## 需求记录

### REQ-20260307-01 Dashboard 演示页调整为 Element Plus 后台页面
- 需求编号：REQ-20260307-01
- 需求名称：Dashboard 演示页调整为 Element Plus 后台页面
- 需求目标：将 dashboard 页面调整为 Element Plus 风格的后台演示页面，并让菜单、头部和首页内容更接近后台系统展示
- 需求范围：调整 `src/layouts/AppLayout.vue` 和 `src/views/dashboard/index.vue`，暂不拆分子组件
- 已知约束：页面以演示为主，不接真实接口；保持现有技术栈不变；优先让页面效果可见
- 当前状态：已完成 [x]
- 已确认方案：保留单页演示方式，在现有布局上补充后台常见的菜单、头部和首页信息区
- 计划改动点：补充侧边菜单、顶部栏、面包屑、统计卡片、状态区、任务表格和快捷入口
- 预计涉及文件：`src/layouts/AppLayout.vue`、`src/views/dashboard/index.vue`
- 实际改动文件：`src/layouts/AppLayout.vue`、`src/views/dashboard/index.vue`
- 验证结果：已通过 `vue-tsc --build` 和 `vite build`；`vite build` 仍提示产物体积偏大，该问题已记录在 `REQ-20260307-02` 的遗留问题中
- 遗留问题：暂无单独遗留问题；产物体积问题已纳入基础骨架阶段后续处理项
- 记录：
  - 2026-03-07 需求确认：用户确认将 dashboard 页面做成后台演示页，并说明先不拆分组件，以看到效果为主。
  - 2026-03-07 开始实现：确认保留单页演示方式，计划补充侧边菜单、顶部栏、面包屑、统计卡片、状态区、任务表格和快捷入口。
  - 2026-03-07 完成：已调整 `src/layouts/AppLayout.vue`，补充侧边菜单、顶部栏和面包屑；已调整 `src/views/dashboard/index.vue`，补充统计卡片、状态区、任务表格和快捷入口。
  - 2026-03-07 验证：已通过 `vue-tsc --build` 和 `vite build`；`vite build` 仍提示产物体积偏大，该问题已记录在 `REQ-20260307-02` 的遗留问题中。

### REQ-20260307-02 基础骨架整理与下一阶段基础设施准备
- 需求编号：REQ-20260307-02
- 需求名称：基础骨架整理与下一阶段基础设施准备
- 需求目标：整理当前生成结构与既定规范的差异，并补齐下一阶段开发需要的基础骨架
- 需求范围：目录结构审视、基础模块骨架补齐、登录态/路由守卫/请求拦截等基础设施规划
- 已知约束：保持现有技术栈不变；遵守既定协作规则；优先小步推进
- 当前状态：进行中 [ ]
- 已确认方案：先完成最小文档体系和初始化骨架，再继续推进目录结构整理、基础模块补齐和基础设施建设
- 计划改动点：审视当前目录结构差异，补齐模块骨架，逐步进入认证、权限、路由守卫和请求拦截等基础设施工作
- 预计涉及文件：`src/` 下目录结构与基础设施相关文件
- 实际改动文件：截至目前累计包括 `docs/WORKING_CONTEXT.md`、`README.md`、`src/main.ts`、`src/layouts/AppLayout.vue`、`src/layouts/components/AppHeader.vue`、`src/layouts/components/AppSidebar.vue`、`src/router/index.ts`、`src/router/modules/dashboard.ts`、`src/router/modules/auth.ts`、`src/views/dashboard/index.vue`、`src/views/login/index.vue`、`src/styles/element-theme.css`、`src/styles/element-overrides.css`
- 验证结果：已完成最小文档体系、项目初始化、Element Plus、Tailwind CSS 4、Axios、基础布局与 dashboard 骨架；最近一次主题与样式分层收敛已通过 `npm run type-check`、`npm run build-only`
- 遗留问题：仍需补齐更完整的模块目录骨架，设计认证与权限基础设施，处理 Element Plus 全量引入带来的构建体积问题
- 记录：
  - 2026-03-07 需求确认：确认当前阶段主任务仍是整理基础骨架并进入基础设施阶段。
  - 2026-03-07 开始实现：已确认先完成最小文档体系和初始化骨架，再逐步推进目录结构整理、模块骨架补齐和基础设施建设。
  - 2026-03-07 当前进展：最小文档体系、项目初始化、Element Plus、Tailwind CSS 4、Axios、基础布局与 dashboard 骨架、`vue-tsc --build`、`vite build`、`README.md` 已完成。
  - 2026-03-07 当前待处理：补齐更完整的模块目录骨架，设计认证与权限基础设施，处理 Element Plus 全量引入带来的构建体积问题。
  - 2026-03-08 后续追加：确认将 Element Plus 的零散局部主色覆盖继续收敛为更完整的全局主题与样式分层方案，优先统一主色、圆角、基础边框，并减少页面和布局内可复用的 `:deep`。
  - 2026-03-08 开始实现：计划新增全局主题变量文件与通用组件覆盖层，逐步移除 `AppSidebar`、`AppHeader`、`dashboard` 和 `login` 中可由全局主题接管的非语义色强写，但暂不调整 `success / warning / danger / info`。
  - 2026-03-08 完成：已新增 `src/styles/element-theme.css` 收敛 Element Plus 主色、圆角、边框和阴影变量，并在 `src/main.ts` 接入；随后补充 `src/styles/element-overrides.css` 承载卡片、表单、输入框和表格等通用组件覆盖，主入口已按“默认样式 → 主题 token → 通用覆盖 → 项目样式”分层接入，并同步减少 `dashboard` 与 `login` 中可全局化的 `:deep`。
  - 2026-03-08 验证：主题与样式分层收敛已通过 `npm run type-check` 和 `npm run build-only`；构建仍提示 Element Plus 全量引入导致产物体积偏大。

### REQ-20260308-01 协作文档工作流与编码规则收敛
- 需求编号：REQ-20260308-01
- 需求名称：协作文档工作流与编码规则收敛
- 需求目标：明确 `WORKING_CONTEXT.md` 的滚动更新工作流，收敛文档结构，并补充中文写入防乱码规则
- 需求范围：调整 `AGENTS.md`、`docs/CONVENTIONS.md`、`docs/WORKING_CONTEXT.md`
- 已知约束：仅调整协作规范和上下文记录方式，不改动业务代码；文档更新必须保持增量思路和可追溯性
- 当前状态：已完成 [x]
- 已确认方案：将 `WORKING_CONTEXT.md` 从状态面板改为需求生命周期记录，并同步更新规则文档
- 计划改动点：补充增量更新规则、中文写入规则、需求编号、固定模板、需求记录工作流和当前进行中需求展示方式
- 预计涉及文件：`AGENTS.md`、`docs/CONVENTIONS.md`、`docs/WORKING_CONTEXT.md`
- 实际改动文件：`AGENTS.md`、`docs/CONVENTIONS.md`、`docs/WORKING_CONTEXT.md`
- 验证结果：已复查三份文档结构、字段和规则一致性，当前需求记录、当前进行中需求、下一步和规则文档已经对齐
- 遗留问题：后续新需求需要继续按当前模板执行，避免回退到自由格式记录
- 记录：
  - 2026-03-08 需求确认：确认需要把 `WORKING_CONTEXT.md` 调整为需求开始、完成、后续追加都可追溯的滚动更新模式。
  - 2026-03-08 开始实现：确认同步调整 `AGENTS.md`、`docs/CONVENTIONS.md` 和 `docs/WORKING_CONTEXT.md`，统一工作流与字段模板。
  - 2026-03-08 完成：已完成需求生命周期工作流、编号规则、统一模板、中文写入规则和当前进行中需求摘要化调整。
  - 2026-03-08 验证：已再次审视三份文档，收敛了模板歧义、记录边界和需求归属问题。

### REQ-20260308-02 Dashboard 中文化与外贸家居视觉调整
- 需求编号：REQ-20260308-02
- 需求名称：Dashboard 中文化与外贸家居视觉调整
- 需求目标：将 dashboard 文案改为中文，并将页面内容和视觉风格调整为偏外贸家居方向的展示页
- 需求范围：调整 `src/layouts/AppLayout.vue` 和 `src/views/dashboard/index.vue` 的文案、数据和界面风格
- 已知约束：保持现有技术栈不变；页面仍以演示为主；优先小步推进，不拆分子组件
- 当前状态：已完成 [x]
- 已确认方案：保留现有后台结构，在此基础上改成中文、外贸家居主题内容，并统一更圆角、更活泼的视觉风格
- 计划改动点：替换菜单与头部中文文案；改写 dashboard 的卡片、表格、公告和快捷入口内容；调整圆角、配色和层次表现
- 预计涉及文件：`src/layouts/AppLayout.vue`、`src/views/dashboard/index.vue`、`docs/WORKING_CONTEXT.md`
- 实际改动文件：`src/layouts/AppLayout.vue`、`src/views/dashboard/index.vue`、`docs/WORKING_CONTEXT.md`
- 验证结果：已通过 `vue-tsc --build`、`npm run type-check` 和 `npm run build-only`；构建仍提示 Element Plus 全量引入导致产物体积偏大
- 遗留问题：当前无单独遗留问题；包体积优化仍归属于 `REQ-20260307-02` 持续处理
- 记录：
  - 2026-03-08 需求确认：用户确认将 dashboard 文案改为中文，主题偏向外贸家居类，并将整体 UI 调整为更圆角、更活泼的风格。
  - 2026-03-08 开始实现：确认保留现有后台骨架，重点调整 layout 和 dashboard 的文案、主题数据以及视觉圆角和配色表现。
  - 2026-03-08 完成：已将 layout 与 dashboard 文案改为中文，主题切换为外贸家居场景，并统一调整为更圆角、更活泼的视觉风格。
  - 2026-03-08 验证：已通过 `vue-tsc --build` 和 `vite build`；构建仍提示 Element Plus 全量引入导致产物体积偏大。
  - 2026-03-08 后续追加：优化首屏摘要卡的高潜市场布局，避免 `美国 / 德国 / 波兰` 在窄宽度下换行，并修正收起导航后的菜单折叠态样式。
  - 2026-03-08 追加验证：已通过 `npm run type-check` 和 `npm run build-only`；构建仍提示 Element Plus 全量引入导致产物体积偏大。
  - 2026-03-08 后续追加：为侧栏一级菜单和灵感中心标题补充折叠态可见图标，并收紧折叠态菜单项与 tooltip 触发区样式，避免收起导航后菜单失去视觉锚点。
  - 2026-03-08 追加验证：已通过 `npm run type-check`。
  - 2026-03-08 后续追加：调整后台布局滚动层，固定侧栏、头部和面包屑区域，只保留主内容区滚动，避免菜单和头部随页面内容一起移动。
  - 2026-03-08 追加验证：已通过 `npm run type-check`。
  - 2026-03-08 后续追加：移除后台 layout 中冗余的 breadcrumb 区块，直接由头部标题承接当前页面语义，并同步收紧主内容区间距。
  - 2026-03-08 追加验证：已通过 `npm run type-check`。

### REQ-20260308-03 AppLayout 布局拆分与登录页接入
- 需求编号：REQ-20260308-03
- 需求名称：AppLayout 布局拆分与登录页接入
- 需求目标：将后台布局中的菜单和头部拆成独立布局组件，并调整路由结构以支持不包含菜单和头部的登录页
- 需求范围：调整布局组件与路由结构；新增登录页；同步更新需求记录
- 已知约束：保持现有技术栈和暖色家居风格；遵守增量记录规则；当前不扩展登录态、权限守卫和真实认证逻辑
- 当前状态：已完成 [x]
- 已确认方案：保留 `AppLayout` 作为后台壳容器，将侧栏与头部分拆到 `src/layouts/components/`；路由拆分为后台壳页面与独立认证页并存；新增一个延续当前视觉风格的登录页
- 计划改动点：新增 `AppSidebar` 与 `AppHeader` 组件；重构 `AppLayout`；新增认证路由模块与登录页；补充文档记录并完成基础验证
- 预计涉及文件：`docs/WORKING_CONTEXT.md`、`src/layouts/AppLayout.vue`、`src/layouts/components/`、`src/router/index.ts`、`src/router/modules/dashboard.ts`、`src/router/modules/auth.ts`、`src/views/login/index.vue`
- 实际改动文件：`docs/WORKING_CONTEXT.md`、`src/layouts/AppLayout.vue`、`src/layouts/components/AppSidebar.vue`、`src/layouts/components/AppHeader.vue`、`src/router/index.ts`、`src/router/modules/dashboard.ts`、`src/router/modules/auth.ts`、`src/views/login/index.vue`
- 验证结果：已通过 `npm run type-check` 和 `npm run build-only`；构建仍提示 Element Plus 全量引入导致产物体积偏大
- 遗留问题：登录页当前为静态演示页，尚未接入真实登录逻辑、路由守卫和认证状态管理；构建体积问题继续归属于 `REQ-20260307-02`
- 记录：
  - 2026-03-08 开始确认：用户提出拆分 `AppLayout`，并要求考虑未来存在不包含菜单和头部的页面，同时新增一个符合当前风格的登录页。
  - 2026-03-08 方案确认：确认采用后台壳路由与裸页面路由并存的方式，拆分侧栏和头部布局组件，新增独立登录页。
  - 2026-03-08 开始实现：先初始化本需求文档记录，再依次调整布局、路由和登录页，并在完成后补充验证结果与实际改动文件。
  - 2026-03-08 完成：已将后台壳拆分为 `AppLayout`、`AppSidebar` 和 `AppHeader`，并新增独立认证路由与登录页，使后台壳页面和裸页面可以并存。
  - 2026-03-08 验证：已通过 `npm run type-check` 和 `npm run build-only`；构建仍提示 Element Plus 全量引入导致产物体积偏大。
  - 2026-03-08 后续追加：精简登录页左侧信息区，移除冗余说明块并收紧整体间距与高度，避免登录页出现首屏滚动条。
  - 2026-03-08 后续追加：移除登录页左侧信息内容，保留原两栏布局比例并改为纯氛围背景，同时修正“进入看板”按钮的挤压换行问题。
  - 2026-03-08 后续追加：移除登录页左侧空白占位区，直接改为单栏居中的登录卡片布局，减少无效装饰结构。



