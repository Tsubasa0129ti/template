## Purpose
for application template and develop new application quickly.

## Dockerコンテナの起動

Dockerコンテナの起動は、専用のシェルスクリプトから行うことを想定している。
ディレクトリは、`./db/docker_startup.sh`に配置している。

### 起動方法

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