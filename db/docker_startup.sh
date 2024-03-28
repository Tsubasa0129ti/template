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

# 引数を受け取る。
if [ "$1" = "production" ] ; then
  # DBの初期値を本番用のものに設定する。
  sample_data=sample_production
else
  # DBの初期値を開発用のものに設定する。
  sample_data=sample_dev
fi

# .envが存在する場合には削除し、作り直す。
if [ -f .env ] ; then
  rm .env
fi

cat << EOF > .env
POSTGRES_PORT=5432
POSTGRES_PASSWORD=secret
POSTGRES_DB=template
SAMPLE_DATA=$sample_data
ENVIRONMENT=$1
EOF

# sample_dataのディレクトリを作成する。
sql_directory=./db/sql

if [ -d ${sql_directory}/sample_data ]; then
  rm -rf "${sql_directory}/sample_data"
fi

mkdir db/sql/sample_data

# 必要なファイルを追加する。
cp -r ${sql_directory}/sample_common/* ${sql_directory}/sample_data/
cp -r ${sql_directory}/${sample_data}/* ${sql_directory}/sample_data/

echo "Starting Container for $sample_data"

# docker composeからコンテナを起動する。
if [ "$3" = "rebuild" ] ; then
  docker compose up --build
else
  docker compose up
fi
