## Purpose

for application template and develop new application quickly.

## Vite

画面レイアウトの確認のために、Docker を起動するのは少しオーバーとなる。
Vite からフロントエンドの簡易的なサーバーを立ち上げることができる。

web プロジェクトから以下のコマンドを実行する。

```bash

$ yarn vite dev

```

## Docker

本プロジェクトでは、Docker を使用している。
開発・本番環境にて、アプリケーションを起動する際には、以下に記載する方法に従うこと。

### イメージのビルド

本番環境では、アプリケーションのビルドから実行までを`Dockerfile`にて行っている。
Docker イメージをビルドすることで、`jar`ファイルの作成が行われる。

```bash

$ docker build --no-cache --tag template-app .

```

### 起動方法

Docker コンテナの起動は、専用のシェルスクリプトから行うことを想定している。
ディレクトリは、`./db/docker_startup.sh`に配置している。
開発環境・本番環境とで起動時に設定されるデータベースのレコードの初期値が異なる。

**開発環境**

開発環境は、APP コンテナに Watch モードを採用している。
第一引数に`dev`と指定することで、対象ファイルが監視モードで動作する。

```bash

# ボリュームを削除しない場合
$ ./db/docker_startup.sh dev

# ボリュームを削除する場合
$ ./db/docker_startup.sh dev clean

```

**本番環境**

```bash

# ボリュームを削除しない場合
$ ./db/docker_startup.sh production

# ボリュームを削除する場合
$ ./db/docker_startup.sh production clean

```

**Docker イメージを更新する場合**

Docker イメージを更新する場合には、第三引数に`rebuild`を指定すること。
開発環境・本番環境との切り替えを行う場合には、必ずイメージのビルドが必要になる。

```bash

# 開発環境の場合
$ ./db/docker_startup.sh dev clean rebuild

# 本番環境の場合
$ ./db/docker_startup.sh production clean rebuild

```
