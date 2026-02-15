package controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import model.User;
import model.Student;
import service.AuthService;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User foundUser = service.login(user.getUsername(), user.getPassword());
            if (foundUser == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
            }
            return ResponseEntity.ok(foundUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Login failed"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> registrationData) {
        try {
            // Extract student data
            Student student = new Student();
            student.setName((String) registrationData.get("name"));
            student.setEmail((String) registrationData.get("email"));
            student.setDepartment((String) registrationData.get("department"));
            student.setPhone((String) registrationData.get("phone"));
            student.setAddress((String) registrationData.get("address"));

            // Extract credentials
            String username = (String) registrationData.get("username");
            String password = (String) registrationData.get("password");

            // Register
            User user = service.register(student, username, password);

            return ResponseEntity.ok(Map.of(
                "message", "Registration successful",
                "user", user
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Registration failed"));
        }
    }

    @GetMapping("/check-username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        boolean exists = service.usernameExists(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
}




//package controller;
//
//import org.springframework.web.bind.annotation.*;
//
//import model.User;
//import service.AuthService;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000")
//public class AuthController {
//
//    private final AuthService service;
//
//    public AuthController(AuthService service) {
//        this.service = service;
//    }
//
//    @PostMapping("/login")
//    public User login(@RequestBody User user) {
//        User foundUser = service.login(user.getUsername(), user.getPassword());
//        if (foundUser == null) {
//            System.out.println("User not found: " + user.getUsername());
//        } else {
//            System.out.println("User found: " + foundUser.getUsername());
//        }
//        return foundUser;
//    }
//}

