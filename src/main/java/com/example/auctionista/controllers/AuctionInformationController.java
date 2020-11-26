package com.example.auctionista.controllers;

import com.example.auctionista.entities.Auction;
import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.services.AuctionInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuctionInformationController {

    @Autowired
    AuctionInformationService auctionInformationService;

    @GetMapping("/rest/auctioninfo/{id}")
    public AuctionInformation getOneAuction(@PathVariable int id) {
        return auctionInformationService.getOneAuction(id);
    }

    @GetMapping("/rest/auctionsinfo")
    public List<AuctionInformation> getAllAuctions() {
        return auctionInformationService.getAllAuctions();
    }

    @GetMapping("/rest/auctionsbycategoryid/{category_id}")
    public List<AuctionInformation> getAllAuctionsByCategoryId(@PathVariable int category_id) {
        return auctionInformationService.getAllAuctionsByCategoryId(category_id);
    }

}
