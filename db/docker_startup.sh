#!/bin/bash

# カレントディレクトリをプロジェクトルートに変更する。
script_directory="$(dirname "$(readlink -f "$0")")"
cd $script_directory/../

# 引数を受け取る。
if [ "$1" = "production" ] ; then
  # DBの初期値を本番用のものに設定する。
  SAMPLE_DATA=sample_production
else
  # DBの初期値を開発用のものに設定する。
  SAMPLE_DATA=sample_dev
fi

# .envが存在する場合には削除し、作り直す。
if [ -f .env ] ; then
  rm .env
fi

cat << EOF > .env
POSTGRES_PORT=5432
POSTGRES_PASSWORD=secret
POSTGRES_DB=template
SAMPLE_DATA=$SAMPLE_DATA
EOF

echo "Starting Container for $SAMPLE_DATA"

# docker composeからコンテナを起動する。
docker compose up -d