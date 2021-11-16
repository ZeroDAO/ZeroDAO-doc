---
category: 快速开始
---

# 快速开始

## 环境配置

### 安装 Rust

```rus
curl https://sh.rustup.rs -sSf | sh
rustup update stable
```

### 安装依赖

#### Mac

```rus
brew install cmake pkg-config openssl git llvm
```

#### Linux

```rus
sudo apt install cmake pkg-config libssl-dev git clang libclang-dev
```

::: tip 更多

ZeroDAO 基于 Substrate 开发，了解更多请至 [Substrate](https://docs.substrate.io/v3/getting-started/overview/) 。

:::

## 安装

```rus
git clone https://github.com/ZeroDAO/ZeroDAO-node
cd ZeroDAO-node
make init
```

## 编译

```rust
make build-release
```

## 运行节点

```rust
make run-dev
```

## 清除开发链

```rust
make purge-dev
```
