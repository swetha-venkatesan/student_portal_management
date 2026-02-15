package service;

import org.springframework.stereotype.Service;

import model.User;
import model.Student;
import repository.UserRepository;
import repository.StudentRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public AuthService(UserRepository userRepository, StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
    }

    public User login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public User register(Student student, String username, String password) {
        // Check if username already exists
        User existingUser = userRepository.findByUsername(username);
        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        // Save student first
        Student savedStudent = studentRepository.save(student);

        // Create user account
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole("STUDENT");
        user.setStudentId(savedStudent.getId());

        return userRepository.save(user);
    }

    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username) != null;
    }
}




//package service;
//
//import org.springframework.stereotype.Service;
//
//import model.User;
//import repository.UserRepository;
//
//@Service
//public class AuthService {
//
//    private final UserRepository repository;
//
//    public AuthService(UserRepository repository) {
//        this.repository = repository;
//    }
//
//    public User login(String username, String password) {
//        System.out.println("Looking for user: " + username + " with password: " + password);
//        User user= repository.findByUsernameAndPassword(username, password);
//        if (user != null) {
//            System.out.println("Found user: " + user.getUsername() + " with role: " + user.getRole());
//        } else {
//            System.out.println("User not found in database");
//        }
//        return user;
//        
//    }
//}
