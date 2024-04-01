# 本番環境用のビルドステージ
FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app
COPY . .
RUN ./gradlew clean build

RUN apt update
RUN apt install zip unzip

RUN jlink \
    --module-path /opt/java/jmods \
    --strip-debug \
    --compress=2 \
    --add-modules $(./jdeps-spring-boot.sh ./build/libs/template-0.0.1-SNAPSHOT.jar 17) \
    --no-header-files \
    --no-man-pages \
    --vm server \
    --output /opt/jre

# 本番環境用の実行ステージ
FROM ubuntu:22.04 AS production
WORKDIR /app

ENV JAVA_HOME /opt/jre
ENV PATH "$PATH:$JAVA_HOME/bin"

COPY --from=builder /opt/jre $JAVA_HOME
COPY --from=builder /app/build/libs/template-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

# 開発環境用のホットリロードステージ
FROM eclipse-temurin:17-jdk-jammy AS dev
WORKDIR /app
COPY . .
RUN ./gradlew clean build
CMD ./gradlew bootRun
