<div align="center">

# Cossmos · 服务状态监测器

一个使用 **[COSS UI](https://coss.com/ui)** 构建前端、**Go** 编写后端的轻量级服务状态监测器。
界面美观、功能丰富、内存占用低，同时适配 **Docker 长期运行** 与 **GitHub Actions 定时运行** 两种模式。

[![CI](https://github.com/NORMAL-EX/Cossmos/actions/workflows/ci.yml/badge.svg)](https://github.com/NORMAL-EX/Cossmos/actions/workflows/ci.yml)
[![Docker](https://github.com/NORMAL-EX/Cossmos/actions/workflows/docker.yml/badge.svg)](https://github.com/NORMAL-EX/Cossmos/actions/workflows/docker.yml)
[![Demo](https://github.com/NORMAL-EX/Cossmos/actions/workflows/pages.yml/badge.svg)](https://github.com/NORMAL-EX/Cossmos/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

**[🌐 在线演示 / Live Demo](https://normal-ex.github.io/Cossmos/)**

</div>

---

## ✨ 特性

- 🎨 **COSS UI 设计体系** —— 基于 [Base UI](https://base-ui.com) + Tailwind CSS v4 的 new-york 风格组件（Button / Badge / Card / 弹出菜单 / Tooltip 等），全部按钮采用 **outline** 描边风格。
- 🌗 **深 / 浅 / 跟随系统** 三态主题切换，切换按钮 + 弹出设置菜单（参考 Cloud-PE-Website 交互），无闪烁。
- 🌍 **中英双语** i18n，一键切换。
- 📊 **状态总览 + 指标卡片 + 历史柱状图** —— 总体状态横幅、正常 / 降级 / 故障 / 平均可用率统计、每个服务的可用率、响应时间与最近 N 次检查可视化。
- 🔎 **搜索与筛选** —— 按名称/分组检索，按「全部 / 正常 / 异常」过滤。
- 🩺 **多种探测** —— HTTP/HTTPS（状态码、关键字、响应时长降级判定）与 TCP 端口。
- 🐳 **两种运行模式，一套数据契约**
  - `serve`：持续运行的守护进程，定时检查 + 提供 REST API + 内嵌前端（单文件二进制），**适配 Docker**。
  - `once`：单次运行，生成 `status.json` 后退出、**不启动前端服务器**，**适配 GitHub Actions** 定时任务。
- 📄 **备案号支持** —— ICP 备案号与公安备案号均可配置并展示在页脚。
- 📱 **响应式设计**，移动端友好。
- 🪶 **低内存** —— 纯 Go 标准库实现（仅依赖 `yaml`），静态二进制约 7 MB，并发检查、内存占用极低。

## 🧭 架构

```
                ┌──────────────────── 一套数据契约 (status.json) ────────────────────┐
                │                                                                    │
   config.yaml ─┤                                                                    ├─ COSS UI 前端 (React + Vite)
                │                                                                    │   读取 ./status.json
                ▼                                                                    ▼
        ┌───────────────┐  serve 模式（持续运行 / Docker） ┌───────────────────────────────┐
        │  Go 监测内核   │ ──────────────────────────────▶ │ HTTP API + 内嵌前端（单二进制） │
        │ checker/store │                                 │ GET /api/status · /status.json │
        │   monitor     │  once 模式（单次运行 / Actions）  └───────────────────────────────┘
        └───────────────┘ ──────────────────────────────▶  写出 web/dist/status.json → GitHub Pages
```

两种模式产出**完全相同**的 `status.json`，因此同一份前端在「Docker 动态服务」与「GitHub Pages 静态托管」下都能直接工作。

## 🚀 快速开始

### 方式一：Docker（推荐，serve 持续模式）

```bash
# 使用预构建镜像（GHCR）
docker run -d --name cossmos -p 8080:8080 \
  -v cossmos-data:/app/data \
  ghcr.io/normal-ex/cossmos:latest

# 打开 http://localhost:8080
```

挂载自定义配置：

```bash
docker run -d --name cossmos -p 8080:8080 \
  -v "$PWD/config.yaml:/app/config.yaml:ro" \
  -v cossmos-data:/app/data \
  ghcr.io/normal-ex/cossmos:latest
```

或使用 Docker Compose：

```bash
docker compose up -d
```

### 方式二：从源码构建（serve 模式）

需要 Go ≥ 1.24 与 Node ≥ 20。

```bash
cp config.example.yaml config.yaml      # 按需编辑
make build                              # 构建前端 + 内嵌的 Go 二进制
./cossmos -mode serve -config config.yaml
# 打开 http://localhost:8080
```

### 方式三：单次运行（once 模式，适配 CI / 静态托管）

```bash
make build-go                            # 仅构建 Go（前端 dist 需已存在）
./cossmos -mode once -config config.demo.yaml -out web/dist -data data/history.json
# 将检查结果写入 web/dist/status.json，不启动任何服务器
```

> 运行在 GitHub Actions 中（`GITHUB_ACTIONS=true`）时，未显式指定 `-mode` 会**自动选择 `once`**。

## ⚙️ 配置

完整示例见 [`config.example.yaml`](config.example.yaml)。核心字段：

```yaml
site:
  title: "Cossmos 服务状态"
  description: "..."
  github: "https://github.com/NORMAL-EX/Cossmos"
  refreshInterval: 60                 # 前端自动刷新间隔（秒，serve 模式）
  icp: "京ICP备12345678号"            # ICP 备案号（留空则不显示）
  icpLink: "https://beian.miit.gov.cn/"
  policeIcp: "京公网安备 11010802000000号"  # 公安备案号
  policeIcpLink: "https://beian.mps.gov.cn/"

monitor:
  interval: 60        # serve 模式两轮检查间隔（秒）
  timeout: 10         # 每个检查默认超时（秒）
  historySize: 60     # 每个服务保留的历史点数
  concurrency: 8      # 最大并发检查数

server:
  listen: ":8080"

services:
  - name: "官网"
    group: "网站"
    type: http                        # http | tcp
    url: "https://example.com"
    expectStatus: [200, 301, 302]     # 允许的状态码
    keyword: ""                       # 响应体须包含的关键字（可选）
    degradedMs: 1500                  # 慢于此毫秒数 => 降级
  - name: "数据库"
    group: "服务"
    type: tcp
    host: "db.example.com"
    port: 5432
```

### 环境变量

| 变量 | 说明 | 默认 |
| --- | --- | --- |
| `COSSMOS_MODE` | `serve` 或 `once` | serve（CI 中自动 once） |
| `COSSMOS_CONFIG` | 配置文件路径 | `config.yaml` |
| `COSSMOS_OUT` | once 模式输出目录 | `public` |
| `COSSMOS_DATA` | 历史持久化文件 | `data/history.json` |
| `COSSMOS_LISTEN` | serve 监听地址 | `:8080` |

## 🌐 GitHub Pages 演示

仓库内置 [`pages.yml`](.github/workflows/pages.yml) 工作流：定时（默认每 15 分钟）以 `once` 模式运行检查、构建前端、将 `status.json` 一并发布到 GitHub Pages；并用 `actions/cache` 在多次运行间保留历史。

**启用步骤：**

1. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
2. 在 **Actions** 页手动触发一次 `Demo (GitHub Pages)`，或等待定时任务。
3. 访问 `https://<用户名>.github.io/<仓库名>/`。

> 编辑 [`config.demo.yaml`](config.demo.yaml) 即可自定义演示监控的服务。

## 🔌 HTTP API（serve 模式）

| 端点 | 说明 |
| --- | --- |
| `GET /` | 内嵌的前端单页应用 |
| `GET /api/status`、`GET /status.json` | 当前状态快照（JSON） |
| `GET /api/healthz` | 健康检查 |

## 🧱 技术栈

| 层 | 技术 |
| --- | --- |
| 前端 | React 19 · Vite 7 · TypeScript · Tailwind CSS v4 · **COSS UI**（Base UI）· lucide-react |
| 后端 | Go 1.24（标准库 + `gopkg.in/yaml.v3`） |
| 容器 | 多阶段构建、多架构（amd64 / arm64）、Alpine 运行时 |
| CI/CD | GitHub Actions（CI · GHCR 镜像 · Pages 演示） |

## 📁 项目结构

```
.
├── main.go                  # CLI 入口（serve / once 两种模式）
├── internal/
│   ├── model/               # 共享数据契约 (Snapshot)
│   ├── config/              # YAML 配置加载与校验
│   ├── monitor/             # 检查器 / 历史存储 / 调度
│   └── server/              # HTTP API + 内嵌前端
├── web/                     # COSS UI 前端 (Vite + React)
│   ├── embed.go             # go:embed 前端产物
│   └── src/                 # 组件 / 上下文 / hooks / lib
├── config.example.yaml      # 配置示例
├── config.demo.yaml         # 演示配置（用于 Pages）
├── Dockerfile               # 多阶段、多架构镜像
└── .github/workflows/       # ci · docker · pages
```

## 🛠️ 开发

```bash
# 前端开发服务器（热更新；需另开一个 serve 提供 status.json）
cd web && npm install && npm run dev

# 后端测试 / 校验
go test ./... -race
go vet ./...

# 一键命令
make test      # go test + 前端 typecheck
make lint      # go vet + eslint
make build     # 前端 + 内嵌二进制
make docker    # 构建镜像
```

## 📝 备案号

页脚的 ICP 备案号与公安备案号通过配置 `site.icp` / `site.policeIcp`（及对应链接）展示，留空则不显示。请填写你自己合法的备案信息。

## 🙏 致谢 / Acknowledgements

前端使用 **[COSS UI](https://coss.com/ui)**(基于 [Base UI](https://base-ui.com) 的开源 React 组件库,MIT),组件接入方式与「深浅色切换按钮 / 弹出菜单」的交互参考了 **[Cloud-PE-Website](https://github.com/Cloud-PE/Cloud-PE-Website)**(MIT)。详见 [ATTRIBUTION.md](ATTRIBUTION.md)。

`web/src/components/ui/` 下的 COSS UI 组件与 `CircleHalf` 图标均来自上述开源项目,许可证声明已一并保留。

## 📄 许可证

[MIT](LICENSE) © NORMAL-EX
