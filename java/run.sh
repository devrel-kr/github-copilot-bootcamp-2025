#!/bin/bash

# Navigate to project root directory
cd "$(dirname "$0")"

# Build the project
./mvnw clean package -DskipTests

# Run the application
java -jar target/simple-sns-api-0.0.1-SNAPSHOT.jar
