package com.hrportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.hrportal") 
public class HrPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(HrPortalApplication.class, args);
    }
}
