package com.example.demo.service;

import com.example.demo.model.User;
import com.google.firebase.auth.UserRecord;

public interface AuthService {
    UserRecord signUp(User user) throws Exception;

    UserRecord login(String email) throws Exception;
}
