package com.hrportal.service;

import com.hrportal.entity.User;
import com.hrportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    // Login without password hashing
    public boolean login(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    // Register a new HR user (simple database insert)
    public String register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "User already exists";
        }
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password); 
        userRepository.save(newUser);
        return "User registered successfully";
    }
}
