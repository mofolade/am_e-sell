package com.example.auctionista.services;

import com.example.auctionista.entities.Auction;
import com.example.auctionista.entities.AuctionInformation;
import com.example.auctionista.repositories.AuctionInformationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionInformationService {
    @Autowired
    AuctionInformationRepo auctionInformationRepo;

    public AuctionInformation getOneAuction(int id) {
        return auctionInformationRepo.findById(id);
    }

    public List<AuctionInformation> getAllAuctions() {
        return auctionInformationRepo.findAll();
    }


    public List<AuctionInformation> getAllAuctionsByCategoryId(int category_id) {
        return auctionInformationRepo.findByCategoryId(category_id);
    }

    public List<AuctionInformation> getAllAuctionsMessagesByUserId(int user_id) {
        return auctionInformationRepo.findAllAuctionMessagesByUserId(user_id);
    }

}
