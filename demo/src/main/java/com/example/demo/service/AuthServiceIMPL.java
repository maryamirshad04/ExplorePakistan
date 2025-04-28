package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceIMPL implements AuthService {

    @Override
    public UserRecord signUp(User user) throws FirebaseAuthException {
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(user.getEmail())
                .setPassword(user.getPassword())
                .setDisplayName(user.getName());

        return FirebaseAuth.getInstance().createUser(request);
    }

    @Override
    public UserRecord login(String email) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().getUserByEmail(email);
    }
}
