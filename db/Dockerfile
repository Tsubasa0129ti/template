FROM arm64v8/postgres:16.1-alpine
COPY ./sql ./initdb
# 本当はここで実行権限を付与したいが、不可能（代案を探す）
# RUN chmod +x ./docker-entrypoint-initdb.d/init.sh