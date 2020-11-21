package com.example.auctionista.controllers;


import com.example.auctionista.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    final String CLIENT_ID = "743084776020-tfjb9peu4bqcgg5p1c0ialehvfmruivo.apps.googleusercontent.com";
    final String CLIENT_SECRET = "q0Y1fCaX-e9tBVUh09MHQCWz";
    final String passwordSalt = "keyboard-kitten";

    @Autowired
    UserService userService;
}
