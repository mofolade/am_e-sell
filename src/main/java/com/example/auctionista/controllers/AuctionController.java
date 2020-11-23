package com.example.auctionista.controllers;

import com.example.auctionista.entities.Auction;
import com.example.auctionista.services.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/auctions")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @GetMapping
    public List<Auction> getAllAuctions() {
        return auctionService.getAllAuctions();
    }

    @PostMapping
    public Auction createAuction(@RequestBody Auction auction) {
        return auctionService.createAuction(auction);
    }
}
