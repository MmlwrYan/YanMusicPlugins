# YanMusicPlugins

YanMusic 在线插件源。本仓库由 [hoowhoami/EchoMusicPlugins](https://github.com/hoowhoami/EchoMusicPlugins)（MIT）派生并重建，
作为 YanMusic 的**默认官方插件源**。

在 YanMusic 的「插件管理 → 插件源」中使用：

```text
https://github.com/MmlwrYan/YanMusicPlugins
```

仓库根目录的 [`echo-plugins.json`](echo-plugins.json) 只维护**插件索引**；名称、版本、作者、入口、能力与兼容性要求
一律以各插件目录中的 `manifest.json` 为准（客户端也是这么读的）。

## 目录结构

```text
echo-plugins.json                        索引（39 条）
<plugin-id>/                             上游自带插件（14 个，路径与上游一致）
third-party/<owner>/<repo>/[<plugin>]/   已授权第三方插件（10 个）
docs/                                    插件开发文档（沿用上游）
tests/                                   索引与插件用例（沿用上游 + 本仓库追加）
THIRD-PARTY.md                           第三方来源、许可证与**未镜像条目**清单
```

## 索引条目的三种状态

| `licenseStatus` | `repo` 指向 | 条数 | 含义 |
|---|---|---|---|
| `licensed`（自托管） | 本仓库 | **24** | 由本仓库提供文件，客户端从本仓库下载 |
| `licensed`（外链） | 上游来源 | 0 | — |
| `unlicensed` | **原始来源仓库** | **15** | **未镜像**：来源仓库无任何许可证文件，本仓库不复制其代码，仅保留索引指向 |

> **为什么保留 `unlicensed` 条目而不是删掉？**
> 直接删除会让现有用户的插件目录**凭空少掉 15 个条目**，且没有任何说明。
> 保留指向 + 显式标注 `licenseStatus: "unlicensed"` 与 `mirrored: false`，
> 既不影响客户端解析（未知字段被忽略，`repo` 仍是合法的 GitHub 仓库标识），
> 也让「这一条不是本仓库托管的」这件事在数据里可查。判定依据与逐条清单见 [`THIRD-PARTY.md`](THIRD-PARTY.md)。
>
> **这不是法律意见。** 若你要分发包含这 15 条的目录，请先自行取得授权。

## 开发文档

- [完整插件开发指南](docs/plugin-development.md)：Manifest、生命周期、宿主 API、安全模式与完整 UI 接入示例。
- [独立浮窗与 Now Playing](docs/floating-windows.md)：浮窗声明、播放快照、宿主窗口控制、拖动与缩放。
- [标题栏 API](docs/titlebar.md)：统一操作注册、默认位置、用户布局、Tooltip 与生命周期。
- [播放栏 API](docs/playerbar.md)：注册播放栏与歌词页底部控制操作，支持用户布局、更多菜单、徽标和交互语义。
- [任务中心 API](docs/tasks.md)：后台任务、进度、中止信号与终态保留策略。
- [备份与恢复 API](docs/backups.md)：命令式备份操作、存储提供方注册与 WebDAV 示例。
- [Graphics 绘图 API](docs/graphics.md)：为插件提供绘图能力。
- [本地 Web 服务与 WebSocket](docs/web-server.md)：本机 HTTP 页面/接口，以及同一端口上的 WebSocket。
- [TCP 网络 API](docs/tcp.md)：主进程 TCP 连接、AbortSignal、半关闭与 keepalive。

## 插件不是强沙盒

manifest 的 `capability` 用于能力声明、兼容性检查与宿主 API 开关，**不能替代对插件来源与代码的信任**。
请只安装可信插件；出现异常时可在 YanMusic 的插件管理中启用安全模式。

## 许可证

- 本仓库整体按 [MIT License](LICENSE) 分发（继承上游）。
- **例外一**：`apple-music-lyrics/` 因包含 `@applemusic-like-lyrics/core`，**按 `AGPL-3.0-only` 分发**，
  详见 [`apple-music-lyrics/LICENSE`](apple-music-lyrics/LICENSE) 与 [`NOTICE`](apple-music-lyrics/NOTICE.md)。
- **例外二**：`third-party/T-T2333/github-accelerator/` 按 **`GPL-3.0`** 分发，详见其目录下的 `LICENSE` 与 `NOTICE`。
- 其余镜像插件（`third-party/oneday5799/**`、`third-party/venti1112/**`）按各自目录中的 `LICENSE`（均为 MIT）分发。

逐条来源、版本与许可证见 [`THIRD-PARTY.md`](THIRD-PARTY.md)。
