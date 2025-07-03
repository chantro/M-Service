package com.example.__task_2;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/api/**")
                .allowedOrigins("*")  //일단 정적 웹이 실행되는 포트가 다 다를 수 있으므로
                .allowedMethods("GET", "POST")
                .allowedHeaders("*");
    }
}
