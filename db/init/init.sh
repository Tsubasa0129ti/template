#!/bin/bash

# 共通のSQLを読み込む
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f ./initdb/create_table.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f ./initdb/grant_user_access.sql
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f ./initdb/insert_record.sql

# 開発・本番のいずれかのSQLを読み込む
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f ./initdb/insert_${SAMPLE_DATA}.sql