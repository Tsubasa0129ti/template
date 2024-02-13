FROM arm64v8/postgres:16.1-alpine

# sample_commonをコピーする。
COPY ./sql/sample_common ./initdb

# 開発・本番のいずれかのディレクトリをコピーする。
ARG SAMPLE_DATA
COPY ./sql/${SAMPLE_DATA} ./initdb

# 本当はここで実行権限を付与したいが、不可能（代案を探す）
# RUN chmod +x ./docker-entrypoint-initdb.d/init.sh