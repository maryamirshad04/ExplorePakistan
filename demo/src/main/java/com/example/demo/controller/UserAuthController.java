package com.example.demo.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserAuthController {

    // 🔹 User Sign-Up (Register)
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Map<String, String> user) {
        try {
            // Validate input
            if (user.get("email") == null || user.get("password") == null || user.get("name") == null || user.get("age") == null ||
                    user.get("email").isEmpty() || user.get("password").isEmpty() || user.get("name").isEmpty() || user.get("age").isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Fields cannot be empty (email, password, name, age)");
            }

            if (user.get("password").length() < 6) {
                return ResponseEntity.badRequest().body("Error: Password must be at least 6 characters long");
            }

            int age;
            try {
                age = Integer.parseInt(user.get("age"));
                if (age <= 15 && age > 80) {
                    return ResponseEntity.badRequest().body("Error: Age must be a positive number");
                }
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Error: Age must be a valid number");
            }

            // Create user in Firebase Auth
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(user.get("email"))
                    .setPassword(user.get("password"))
                    .setDisplayName(user.get("name"));

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

            // Prepare response
            Map<String, String> response = new HashMap<>();
            response.put("message", "User created successfully");
            response.put("uid", userRecord.getUid());
            response.put("email", userRecord.getEmail());
            response.put("name", userRecord.getDisplayName());
            response.put("age", String.valueOf(age));

            // Here, you would typically store the age in your database along with the user details.
            // For example:
            // userRepository.save(new User(userRecord.getUid(), user.get("name"), user.get("email"), age));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // 🔹 User Sign-In (Login)
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                return ResponseEntity.badRequest().body("Error: Fields cannot be empty (email, password)");
            }

            // Firebase Admin SDK doesn't verify passwords, so this needs to be handled on the client-side.
            // Here, we will simply check if the user exists using their email.
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            
            if (userRecord != null) {
                // Simulate successful login (you would typically validate the password via Firebase Client SDK on the frontend)
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("uid", userRecord.getUid());
                response.put("email", userRecord.getEmail());
                response.put("name", userRecord.getDisplayName());

                // Retrieve age from your database if stored
                // For example:
                // int age = userRepository.findByUid(userRecord.getUid()).getAge();
                // response.put("age", String.valueOf(age));

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("Error: User not found");
            }

        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
