## Purpose
for application template and develop new application quickly.

## Docker

本プロジェクトでは、Dockerを使用している。
開発・本番環境にて、アプリケーションを起動する際には、以下に記載する方法に従うこと。

### イメージのビルド

アプリケーションのビルドから実行までを`Dockerfile`にて行っている。
Dockerイメージをビルドすることで、`jar`ファイルの作成が行われる。

```bash

$ docker build --no-cache --tag eclipse_jdk .

```

### 起動方法

Dockerコンテナの起動は、専用のシェルスクリプトから行うことを想定している。
ディレクトリは、`./db/docker_startup.sh`に配置している。
開発環境・本番環境とで起動時に設定されるデータベースのレコードの初期値が異なる。

**開発環境**

```bash

# ボリュームを削除しない場合
$ ./db/docker_startup.sh

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

**Dockerイメージを更新する場合**

Dockerイメージを更新する場合には、第三引数に`rebuild`を指定すること。
例えば、`application.properties`を更新した時など。

通常、`docker compose up`では、イメージの更新は行われない。
そのため、古いソースでコンテナが構築されてしまう。

```bash

# 第一引数はdevでも可
$ ./db/docker_startup.sh production clean rebuild

```