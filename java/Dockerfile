FROM eclipse-temurin:17-jre-alpine

# Create app directory
WORKDIR /app

# Copy the pre-built JAR file
COPY target/simple-sns-api-0.0.1-SNAPSHOT.jar app.jar

# Create a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Expose port 8080 (changed from 8000)
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=8080"]