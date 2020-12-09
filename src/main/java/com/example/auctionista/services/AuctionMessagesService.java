package com.example.auctionista.services;

import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.entities.AuctionMessages;
import com.example.auctionista.repositories.AuctionMessagesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionMessagesService {
    @Autowired
    AuctionMessagesRepo auctionMessagesRepo;

    public AuctionMessages getOneAuctionMessages(int id) {
        return auctionMessagesRepo.findById(id);
    }

    public List<AuctionMessages> getAllAuctionsMessagesByAuctionId(int auction_id, int user_id){
        return auctionMessagesRepo.findAllAuctionMessagesByAuctionId(auction_id, user_id);
    }

    public List<AuctionMessages> getAllAuctionsMessagesByUserId(int user_id){
        return auctionMessagesRepo.findAllAuctionMessagesByUserId(user_id);
    }

}
