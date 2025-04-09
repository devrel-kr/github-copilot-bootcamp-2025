package com.example.simplesnsapi.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Simple SNS API")
                        .description("간단한 SNS 앱 개발을 위한 CRUD API")
                        .version("1.0.0"));
    }
}
