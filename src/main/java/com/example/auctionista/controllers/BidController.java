package com.example.auctionista.controllers;

import com.example.auctionista.entities.Bid;
import com.example.auctionista.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class BidController {
    @Autowired
    BidService bidService;

    @GetMapping("/rest/bids")
    public List<Bid> getAllBids() {
        return bidService.getAllBids();
    }

    @GetMapping("/rest/bidsbyauctionid/{auction_id}")
    public List<Bid> getAllBidssByAuctionId(@PathVariable int auction_id) {
        return bidService.getAllBidsByAuctionId(auction_id);
    }

    @PostMapping("/rest/bids")
    public ResponseEntity<Boolean> postNewBid(@RequestBody Bid bid) {
        boolean didsave = bidService.postNewBid(bid);

        return ResponseEntity.ok(didsave);
    }
}
