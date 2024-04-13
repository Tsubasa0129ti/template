#!/bin/bash

# コンテナが起動している場合には、停止する。
if [ "$(docker ps -aq -f name=app_container)" ] ; then
  if [ "$2" = "clean" ] ; then
    docker compose down -v
  else
    docker compose down
  fi
fi

# カレントディレクトリをプロジェクトルートに変更する。
script_directory="$(dirname "$(readlink -f "$0")")"
cd $script_directory/../

# sample_dataのディレクトリを作成する。
sql_directory=./db/sql

if [ -d ${sql_directory}/sample_data ]; then
  rm -rf "${sql_directory}/sample_data"
fi

mkdir db/sql/sample_data

# 必要なファイルを追加する。
cp -r ${sql_directory}/sample_common/* ${sql_directory}/sample_data/
cp -r ${sql_directory}/sample_$1/* ${sql_directory}/sample_data/

echo "Starting Container for sample_$1"

# Dockerイメージをビルドする。
if [ "$3" = "rebuild" ] ; then
  docker compose build
fi

# Dockerコンテナを起動する。
if [ "$1" = "dev" ] ; then
  docker compose --env-file .env.dev watch
else
  docker compose up
fi
