# 第三方来源与许可证

本文件记录 [`echo-plugins.json`](echo-plugins.json) 里每一条**非本仓库自有**插件条目的来源与许可证判定结果。
所有结论均为**实测**（2026-10-03），判定方法与原始证据见文末「复核方法」。

## 一、概况

| 分类 | 条数 | 是否镜像 | `repo` 指向 |
|---|---|---|---|
| 上游自带插件 | **14** | 是（沿用上游路径，位于仓库根） | 本仓库 |
| 第三方 —— 来源仓库有许可证 | **10** | 是（复制到 `third-party/`） | 本仓库 |
| 第三方 —— 来源仓库**无**许可证 | **15** | **否** | 原始来源仓库 |
| 合计 | **39** | — | — |

> 索引中另有 2 条（`mv-enhancer`、`playback-control-order`）在上游索引里显式写了自己的仓库，
> 但它们**同时**给出了仓库内的 `path`，实为上游自带插件 —— 已计入「上游自带 14 条」，不重复计算。

## 二、18 个外部来源仓库的许可证判定

判定口径（三者取并集，**任一命中即视为有许可证**）：

1. `GET /repos/{owner}/{repo}` 的 `license.spdx_id`；
2. `GET /repos/{owner}/{repo}/git/trees/HEAD?recursive=1` 全量 blob 路径中匹配
   `(^|/)(licen[cs]e|copying|notice)(\.|$)`；
3. 仓库根 `manifest.json` 是否含 `license` / `copyright` 字段。

| # | 仓库 | 许可证文件 | SPDX | 结论 |
|---|---|---|---|---|
| 1 | `EchoMusic-org/Lyrics-bridge` | 无 | — | ❌ 无许可证 |
| 2 | `EchoMusic-org/Record-player` | 无 | — | ❌ 无许可证 |
| 3 | `EchoMusic-org/channel-wander` | 无 | — | ❌ 无许可证 |
| 4 | `EchoMusic-org/folia-style` | 无 | — | ❌ 无许可证 |
| 5 | `EchoMusic-org/music-card-share` | 无 | — | ❌ 无许可证 |
| 6 | `EchoMusic-org/player-frontend` | 无 | — | ❌ 无许可证 |
| 7 | `EchoMusic-org/tingfm-radio` | 无 | — | ❌ 无许可证 |
| 8 | `SkyShadowHero/echo-liquid-glass` | 无 | — | ❌ 无许可证 |
| 9 | `SkyShadowHero/echo-local-simple` | 无 | — | ❌ 无许可证 |
| 10 | `SkyShadowHero/echo-miuix-plugin` | 无 | — | ❌ 无许可证 |
| 11 | `T-T2333/github-accelerator` | `LICENSE` + `NOTICE` | **GPL-3.0** | ✅ 已镜像 |
| 12 | `easy-to-notice/Scripts` | 无 | — | ❌ 无许可证 |
| 13 | `oneday5799/EchoMusicPlugins` | `LICENSE`（根，MIT） | **MIT** | ✅ 已镜像 |
| 14 | `rinnki-L/cover-color-lyric` | 无 | — | ❌ 无许可证 |
| 15 | `venti1112/echo_music-blue_archive-theme` | `LICENSE` | **MIT** | ✅ 已镜像 |
| 16 | `yaoyaoprincess/plugin-panel` | 无 | — | ❌ 无许可证 |
| 17 | `yaoyaoprincess/taskbar-lyric` | 无 | — | ❌ 无许可证 |
| 18 | `yuanqian108/echo-remote` | 无 | — | ❌ 无许可证 |

**3 / 18 有许可证。** 许可证正文首行（实测）：

| 仓库 | 许可证正文首行 |
|---|---|
| `oneday5799/EchoMusicPlugins` | `MIT License` / `Copyright (c) 2026 hoowhoami` |
| `venti1112/echo_music-blue_archive-theme` | `MIT License` / `Copyright (c) 2026 Ventiの酒` |
| `T-T2333/github-accelerator` | `GNU GENERAL PUBLIC LICENSE` / `Version 3, 29 June 2007` |

## 三、已镜像的 10 个第三方插件

| 条目 id | 镜像路径 | 来源仓库 | 许可证 |
|---|---|---|---|
| `webdav-music` | `third-party/oneday5799/EchoMusicPlugins/webdav-music` | `oneday5799/EchoMusicPlugins` | MIT |
| `custom-icon` | `third-party/oneday5799/EchoMusicPlugins/custom-icon` | 同上 | MIT |
| `old-xiami-lyric-styles` | `third-party/oneday5799/EchoMusicPlugins/old-xiami-lyric-styles` | 同上 | MIT |
| `apple-music-style` | `third-party/oneday5799/EchoMusicPlugins/apple-music-style` | 同上 | MIT |
| `cloud-priority` | `third-party/oneday5799/EchoMusicPlugins/cloud-priority` | 同上 | MIT |
| `auto-team-vip` | `third-party/oneday5799/EchoMusicPlugins/auto-team-vip` | 同上 | MIT |
| `settings-simplifier` | `third-party/oneday5799/EchoMusicPlugins/settings-simplifier` | 同上 | MIT |
| `mouse-gesture` | `third-party/oneday5799/EchoMusicPlugins/mouse-gesture` | 同上 | MIT |
| `echo_music-blue_archive-theme` | `third-party/venti1112/echo_music-blue_archive-theme` | `venti1112/echo_music-blue_archive-theme` | MIT |
| `github-accelerator` | `third-party/T-T2333/github-accelerator` | `T-T2333/github-accelerator` | **GPL-3.0** |

**镜像保真度说明**：

- 复制时**保留**了各来源仓库的 `LICENSE`（`T-T2333` 另含 `NOTICE`）；
- `T-T2333/github-accelerator/.github/`（该插件自己的 CI 工作流）**未镜像** —— 子目录下的 `.github`
  对 GitHub 不生效，且其内容引用上游仓库，属噪声而非插件运行时的一部分；
- `oneday5799/EchoMusicPlugins` 的根 `LICENSE` 为 MIT（`Copyright (c) 2026 hoowhoami`）；
  该仓库内另有一个 `apple-music-lyrics/LICENSE`（AGPL-3.0-only）**仅覆盖它自己的目录**，
  而本次镜像的 8 个目录均不在其覆盖范围内，故按根 MIT 处理。

> ⚠️ **许可证混合提示**：`github-accelerator` 是 GPL-3.0，本仓库其余部分为 MIT。
> 二者在**同一仓库内分目录共存**是允许的（聚合分发），但再分发时
> **该目录必须继续遵守 GPL-3.0**（保留 `LICENSE`/`NOTICE`、提供对应源码）。
> 换句话说：**本仓库不能整体被描述为纯 MIT。**

## 四、未镜像的 15 条（来源仓库无任何许可证）

**不复制理由**：来源仓库在没有许可证的情况下，默认保留全部权利；复制其代码到本仓库再分发**没有法律依据**。
因此这 15 条**只保留索引指向**（客户端仍会从原仓库下载，本仓库不承担分发），并在条目上标注
`"licenseStatus": "unlicensed"` 与 `"mirrored": false`。

| 条目 id | 来源仓库 | 条目内路径 |
|---|---|---|
| `Lyrics-bridge` | [github.com/EchoMusic-org/Lyrics-bridge](https://github.com/EchoMusic-org/Lyrics-bridge) | 仓库根 |
| `echo-miuix-plugin` | [github.com/SkyShadowHero/echo-miuix-plugin](https://github.com/SkyShadowHero/echo-miuix-plugin) | 仓库根 |
| `echo-liquid-glass` | [github.com/SkyShadowHero/echo-liquid-glass](https://github.com/SkyShadowHero/echo-liquid-glass) | 仓库根 |
| `taskbar-lyric` | [github.com/yaoyaoprincess/taskbar-lyric](https://github.com/yaoyaoprincess/taskbar-lyric) | 仓库根 |
| `plugin-panel` | [github.com/yaoyaoprincess/plugin-panel](https://github.com/yaoyaoprincess/plugin-panel) | 仓库根 |
| `cover-color-lyric` | [github.com/rinnki-L/cover-color-lyric](https://github.com/rinnki-L/cover-color-lyric) | 仓库根 |
| `echo-local-simple` | [github.com/SkyShadowHero/echo-local-simple](https://github.com/SkyShadowHero/echo-local-simple) | 仓库根 |
| `Record-player` | [github.com/EchoMusic-org/Record-player](https://github.com/EchoMusic-org/Record-player) | 仓库根 |
| `channel-wander` | [github.com/EchoMusic-org/channel-wander](https://github.com/EchoMusic-org/channel-wander) | 仓库根 |
| `player-frontend` | [github.com/EchoMusic-org/player-frontend](https://github.com/EchoMusic-org/player-frontend) | 仓库根 |
| `folia-style` | [github.com/EchoMusic-org/folia-style](https://github.com/EchoMusic-org/folia-style) | 仓库根 |
| `tingfm-radio` | [github.com/EchoMusic-org/tingfm-radio](https://github.com/EchoMusic-org/tingfm-radio) | 仓库根 |
| `echo-remote` | [github.com/yuanqian108/echo-remote](https://github.com/yuanqian108/echo-remote) | 仓库根 |
| `taskbar-lyric-with-spectrum-visualizer` | [github.com/easy-to-notice/Scripts](https://github.com/easy-to-notice/Scripts) | `taskbar-lyric-with-spectrum-visualizer` |
| `music-card-share` | [github.com/EchoMusic-org/music-card-share](https://github.com/EchoMusic-org/music-card-share) | 仓库根 |

**若将来这些仓库补上了许可证**：把对应条目从「未镜像」升级为「已镜像」即可 ——
在 `third-party/<owner>/<repo>/` 下复制目录，并把条目的 `repo` 改为本仓库、`path` 改成镜像路径、
`licenseStatus` 改为 `licensed`。索引形态与已镜像条目完全一致，无需改客户端。

## 五、复核方法

```bash
# 1) API 层的 SPDX 判定
gh api repos/<owner>/<repo> --jq '.license.spdx_id'

# 2) 许可证文件是否存在（注意：tree 输出是「大小 \t 路径」，不要对整行做 ^ 锚定匹配）
gh api "repos/<owner>/<repo>/git/trees/HEAD?recursive=1" \
  --jq '.tree[] | select(.type=="blob") | "\(.size)\t\(.path)"' \
  | cut -f2 | grep -iE '(^|/)(licen[cs]e|copying|notice)(\.|$)'

# 3) 许可证正文
gh api repos/<owner>/<repo>/contents/LICENSE --jq '.content' | base64 -d | head -6

# 4) manifest 内是否声明许可证
gh api repos/<owner>/<repo>/contents/manifest.json --jq '.content' | base64 -d
```

> **踩过的坑（留档）**：先用 `grep -iE '(^|/)(licen[cs]e|copying|notice)'` 直接匹配 `gh` 的整行输出，
> 因为路径前是**制表符**而不是行首，`^` 永远匹配不上，导致 `T-T2333`、`venti1112`、
> `oneday5799` 三个**有**许可证的仓库被误判为「无许可证」。**改为先 `cut -f2` 取路径字段再匹配**才是对的。
