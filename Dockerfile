FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

COPY src ./src
COPY keystores ./keystores
RUN mvn -q -DskipTests clean package

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/mi-app-1.0-SNAPSHOT.jar app.jar
COPY --from=build /app/keystores ./keystores

EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
