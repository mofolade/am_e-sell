package com.example.auctionista.controllers;

import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.entities.AuctionMessages;
import com.example.auctionista.services.AuctionInformationService;
import com.example.auctionista.services.AuctionMessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuctionMessagesController {
    @Autowired
    AuctionMessagesService auctionMessagesService;

    @GetMapping("/rest/auctionmessages/{id}")
    public AuctionMessages getOneAuctionMessages(@PathVariable int id) {
        return auctionMessagesService.getOneAuctionMessages(id);
    }

    @GetMapping("/rest/auctionmessagesbyauctionid/{auction_id}/{user_id}")
    public List<AuctionMessages> getAllAuctionsMessagesByAuctionId(@PathVariable int auction_id, @PathVariable int user_id) {
        return auctionMessagesService.getAllAuctionsMessagesByAuctionId(auction_id, user_id);
    }

    @GetMapping("/rest/auctionmessagesbyuserid/{user_id}")
    public List<AuctionMessages> getAllAuctionsMessagesByUserId(@PathVariable int user_id) {
        return auctionMessagesService.getAllAuctionsMessagesByUserId(user_id);
    }

}
