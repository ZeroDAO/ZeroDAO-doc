---
category: 快速开始
---

# 快速开始

## 环境配置

### 安装 Rust

```bash
curl https://sh.rustup.rs -sSf | sh
rustup update stable
```

### 安装依赖

#### Mac

```bash
brew install cmake pkg-config openssl git llvm
```

#### Linux

```bash
sudo apt install cmake pkg-config libssl-dev git clang libclang-dev
```

::: tip 更多

ZeroDAO 基于 Substrate 开发，了解更多请至 [Substrate](https://docs.substrate.io/v3/getting-started/overview/) 。

:::

## 安装

```bash
git clone https://github.com/ZeroDAO/ZeroDAO-node
cd ZeroDAO-node
make init
```

## 编译

```bash
make build-release
```

## 运行节点

```bash
make run-dev
```

## 清除开发链

```bash
make purge-dev
```
