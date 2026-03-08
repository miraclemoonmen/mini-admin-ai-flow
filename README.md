# mini-admin-ai-flow

一个基于 Vue 3 的外贸后台演示站点，当前重点是展示一套由 mock 数据驱动的后台前端骨架，包括登录、动态菜单、动态路由、复杂查询页和详情页。

## 当前实现

目前已经具备：

- Mock 驱动的登录闭环
  - 账号密码校验
  - 登录态持久化
  - 路由守卫
  - 退出登录
- 基于登录返回菜单的动态侧栏和动态业务路由
- `403 / 404` 页面与访问分流
- 外贸家居经营看板
- 外贸订单履约追踪复杂查询页
  - 基础筛选 / 高级筛选
  - URL 状态同步
  - 本地分页与分页大小切换
  - 独立详情页
- Element Plus 中文化与统一主题覆盖

## 演示账号

当前内置两组演示账号：

- `mia.chen / Mia@2026`
  - 完整演示账号，包含经营看板、订单履约追踪及若干禁用占位菜单
- `dashboard.only / Dash@2026`
  - 仅保留经营看板菜单，用于验证菜单和动态路由收口效果

## 技术栈

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

仅构建：

```bash
npm run build-only
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

- [AGENTS.md](/Users/mirac/Desktop/mini-admin-ai-flow/AGENTS.md)：AI 助手协作规则
- [docs/CONVENTIONS.md](/Users/mirac/Desktop/mini-admin-ai-flow/docs/CONVENTIONS.md)：项目开发流程和执行规范
- [docs/WORKING_CONTEXT.md](/Users/mirac/Desktop/mini-admin-ai-flow/docs/WORKING_CONTEXT.md)：当前项目状态、关键决定、主线需求和滚动记录

## 当前目录结构

```text
src/
  api/
    modules/
  components/
  composables/
    order-fulfillment/
  layouts/
    components/
  mock/
  router/
    modules/
  stores/
    modules/
  styles/
  types/
  utils/
  views/
    403/
    404/
    dashboard/
    login/
    order-fulfillment/
```

## 当前说明

- 当前项目处于“基础框架收口阶段”
- 认证、菜单、路由和订单页均以本地 mock 数据驱动
- 后台菜单来源已统一为登录返回的用户菜单数据
- 订单列表与详情数据已统一为 `code / msg / data` 响应结构
- 当前构建可以通过，但主包 chunk 仍偏大，包体积优化尚未继续推进
- 当前没有自动化测试，稳定性主要依赖类型检查、构建校验和人工回归
