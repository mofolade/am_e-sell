package com.example.auctionista.controllers;


import com.example.auctionista.entities.User;
import com.example.auctionista.services.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.io.IOException;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@RestController
public class UserController {
    final String CLIENT_ID = "743084776020-tfjb9peu4bqcgg5p1c0ialehvfmruivo.apps.googleusercontent.com";
    final String CLIENT_SECRET = "q0Y1fCaX-e9tBVUh09MHQCWz";
    final String passwordSalt = "keyboard-kitten";

    @Autowired
    UserService userService;

    // access Spring Security's auth manager to
    // handle manual authentication and set session
    @Resource(name="authenticationManager")
    private AuthenticationManager authManager;

    @GetMapping("/whoami")
    public ResponseEntity<User> whoAmI() {
        User user = userService.findCurrentUser();
        if(user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND); // 404
        }

        return ResponseEntity.ok(user);
    }

    @PostMapping("/storeauthcode")
    public String storeauthcode(@RequestBody String code, @RequestHeader("X-Requested-With") String encoding, HttpServletRequest req) {
        if (encoding == null || encoding.isEmpty()) {
            // Without the `X-Requested-With` header, this request could be forged. Aborts.
            return "Error, wrong headers";
        }

        GoogleTokenResponse tokenResponse = null;
        try {
            tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance(),
                    "https://www.googleapis.com/oauth2/v4/token",
                    CLIENT_ID,
                    CLIENT_SECRET,
                    code,
                    "http://localhost:4000") // Make sure you set the correct port
                    .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Store these 3 in your DB
        String accessToken = tokenResponse.getAccessToken();
        String refreshToken = tokenResponse.getRefreshToken();
        Long expiresAt = System.currentTimeMillis() + (tokenResponse.getExpiresInSeconds() * 1000);

        // Debug purpose only
        System.out.println("accessToken: " + accessToken);
        System.out.println("refreshToken: " + refreshToken);
        System.out.println("expiresAt: " + expiresAt);

        // Get profile info from ID token (Obtained at the last step of OAuth2)
        GoogleIdToken idToken = null;
        try {
            idToken = tokenResponse.parseIdToken();
        } catch (IOException e) {
            e.printStackTrace();
        }
        GoogleIdToken.Payload payload = idToken.getPayload();

        // Use THIS ID as a key to identify a google user-account.
        String userId = payload.getSubject();

        String email = payload.getEmail();
        boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String familyName = (String) payload.get("family_name");
        String givenName = (String) payload.get("given_name");
        String organize_number = (String) payload.get("organize_number");

        // Debugging purposes, should probably be stored in the database instead (At least "givenName").
        System.out.println("userId: " + userId);
        System.out.println("email: " + email);
        System.out.println("emailVerified: " + emailVerified);
        System.out.println("name: " + name);
        System.out.println("pictureUrl: " + pictureUrl);
        System.out.println("locale: " + locale);
        System.out.println("familyName: " + familyName);
        System.out.println("givenName: " + givenName);
        System.out.println("organize_number: "+ organize_number);

        // generate custom password with unique info
        // from the user and a secret salt
        String password = email + passwordSalt + userId;
        userService.registerUser(name, email, password, pictureUrl, organize_number);

        // manual login with session
        securityLogin(email, password, req);

        return "OK";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletRequest req) {
        // validate user fields

        securityLogin(user.getEmail(), user.getPassword(), req);

        return ResponseEntity.ok("ok");
    }

    // manually set logged in session for authenticated user
    // with Spring Security
    private void securityLogin(String email, String password, HttpServletRequest req) {
        UsernamePasswordAuthenticationToken authReq
                = new UsernamePasswordAuthenticationToken(email, password);
        Authentication auth = authManager.authenticate(authReq);

        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        HttpSession session = req.getSession(true);
        session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
    }
}
