package com.example.auctionista.controllers;

import com.example.auctionista.services.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuctionController {

    @Autowired
    AuctionService auctionService;
}
