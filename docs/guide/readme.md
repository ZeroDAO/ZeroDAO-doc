---
category: Quick start
---

# Quick start

## Initial Setup

### Setup rust

```base
curl https://sh.rustup.rs -sSf | sh
rustup update stable
```

### You will also need to install the following packages:

#### Mac

```base
brew install cmake pkg-config openssl git llvm
```

#### Linux

```base
sudo apt install cmake pkg-config libssl-dev git clang libclang-dev
```

::: tip More

ZeroDAO is based on Substrate, for more information please go to [Substrate](https://docs.substrate.io/v3/getting-started/overview/) 。

:::

## Installation

```base
git clone https://github.com/ZeroDAO/ZeroDAO-node
cd ZeroDAO-node
make init
```

## Compilation

```base
make build-release
```

## Run node

```base
make run-dev
```

## Purge the development chain

```base
make purge-dev
```
