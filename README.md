# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# WebCourseDemo - Git 实践过程记录

## 一、学习资料来源

本次 Git 学习主要参考以下资源：

* 官方文档：Git Documentation
* 平台：

  * GitHub（代码托管与版本管理）
  * Gitee（国内代码托管平台）
* 视频网站:B站学习【【GeekHour】一小时Git教程】https://www.bilibili.com/video/BV1HM411377j?vd_source=158caa423297d4bd932f7efb52c1f2cf
* 辅助学习：

  * ChatGPT 实时指导（命令解释、错误排查、流程梳理）

---

## 二、实践流程

### 1️⃣ 环境准备

* 安装 Git
* 使用 PowerShell 作为终端工具
* 配置用户信息：

```bash
git config --global user.name "PaytonF2025"
git config --global user.email "xxx@example.com"
```

---

### 2️⃣ 初始化本地仓库

```bash
git init
```

---

### 3️⃣ 添加文件并提交

```bash
git add .
git commit -m "first commit: vue project"
```

---

### 4️⃣ 创建远程仓库

在 GitHub 上创建仓库 `WebCourseDemo`

---

### 5️⃣ 连接远程仓库

```bash
git remote add origin https://github.com/PaytonF2025/WebCourseDemo.git
```

---

### 6️⃣ 推送代码

```bash
git branch -M main
git push -u origin main
```

---

### 7️⃣ 使用 Token 进行身份验证

* GitHub 不再支持密码登录
* 使用 Personal Access Token 作为密码

---

## 三、提交记录说明

| 提交顺序  | 内容说明                           |
| ----- | ------------------------------ |
| 第一次提交 | 初始化 Vue 项目结构（src、public、配置文件等） |
| 后续操作  | 处理远程仓库冲突并重新提交                  |
| 最终提交  | 使用 `--force` 成功推送代码            |

---

## 四、遇到的问题及解决方法

### ❌ 问题一：`git add.` 报错

**原因：**
命令写错，应为 `git add .`

**解决方法：**

```bash
git add .
```

---

### ❌ 问题二：CRLF 警告

**原因：**
Windows 与 Git 换行符不同

**解决方法：**

```bash
git config --global core.autocrlf true
```

---

### ❌ 问题三：GitHub 登录失败

**报错：**

```text
Password authentication is not supported
```

**原因：**
GitHub 禁用密码登录

**解决方法：**
使用 Token 代替密码

---

### ❌ 问题四：无法连接 GitHub（443端口）

**报错：**

```text
Failed to connect to github.com port 443
```

**原因：**
网络问题（被限制或不稳定）

**解决方法：**

* 使用手机热点
* 更换网络环境
* 或使用 Gitee

---

### ❌ 问题五：push 被拒绝（non-fast-forward）

**原因：**
远程仓库已有内容（如 README）

**解决方法：**

```bash
git pull --rebase origin main
```

---

### ❌ 问题六：合并冲突（.gitignore）

**原因：**
本地与远程同时修改同一文件

**解决方法：**

* 手动修改冲突文件
* 删除冲突标记：

```
<<<<<<<
=======
>>>>>>>
```

* 然后执行：

```bash
git add .gitignore
git rebase --continue
```

---

### ❌ 问题七：rebase 未完成导致 push 失败

**原因：**
未解决冲突直接 push

**解决方法：**

```bash
git rebase --abort
git push --force
```

---

## 五、Git 学习心得

通过本次实践，我对 Git 的基本流程有了深入理解：

* Git 的核心是“版本管理”和“提交历史”
* 基本流程：add → commit → push
* 分支和冲突是 Git 的核心难点

### 主要收获：

1. 理解了 Git 工作区、暂存区和仓库的关系
2. 掌握了基本命令（init、add、commit、push）
3. 学会了使用 Token 进行身份验证
4. 理解并解决了常见错误（冲突、push失败、网络问题）
5. 初步掌握了冲突解决和强制推送（--force）

### 反思：

* Git 报错信息非常重要，应学会阅读和分析
* 实践比理论更重要
* 网络环境对 GitHub 使用影响较大

---

## 六、总结

本次实践完整经历了 Git 的基本使用流程，并解决了多个实际问题，对 Git 的理解从“不会用”提升到“能够独立使用并解决问题”。

后续将继续学习：

* 分支管理（branch）
* 团队协作流程
* 项目部署（GitHub Pages）

---

作者：PaytonF2025
日期：2026

