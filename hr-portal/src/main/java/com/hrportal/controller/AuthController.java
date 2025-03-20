package com.hrportal.controller;

import com.hrportal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")  // Base URL
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")  // URL: /api/auth/login
    public String login(@RequestBody Map<String, String> credentials) {
        boolean isAuthenticated = authService.login(credentials.get("username"), credentials.get("password"));
        return isAuthenticated ? "Login successful" : "Invalid credentials";
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> credentials) {
        return authService.register(credentials.get("username"), credentials.get("password"));
    }
}
