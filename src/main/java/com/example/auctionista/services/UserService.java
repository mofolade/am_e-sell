package com.example.auctionista.services;

import com.example.auctionista.entities.User;
import com.example.auctionista.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    public User findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByEmail(email);
    }

    public User registerUser(String name, String email, String password, String picture_url, String organize_number) {
        return myUserDetailsService.addUser(name, email, password, picture_url, organize_number);
    }

    public User getOneUser(long id) {
        return userRepo.findOneUser(id);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public List<User> getAllUsersPictures() {
        return userRepo.findAllPictures();
    }

    public User createUser(User user) {
        // generate custom password with unique info
        // from the user and a secret salt
        User new_user = user;
        final String passwordSalt = "keyboard-kitten";
        String password = new_user.getEmail() + passwordSalt;
        System.out.println("createUser service");

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(new_user.getPassword());

        new_user = new User(new_user.getName(),
                            new_user.getEmail(),
                            hashedPassword,
                            new_user.getPicture_url(),
                            new_user.getOrganize_number());
        User dbUser = userRepo.findByEmail(new_user.getEmail());
        if(dbUser != null) {
            System.out.println("User exists: " + dbUser);
            return dbUser;
        }
        return userRepo.save(new_user);
    }

    public void deleteUser(long id) {
        userRepo.deleteById(id);
    }


}
