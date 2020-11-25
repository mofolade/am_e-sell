package com.example.auctionista.services;

import com.example.auctionista.entities.AuctionImages;
import com.example.auctionista.repositories.AuctionImagesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionImagesService {
    @Autowired
    private AuctionImagesRepo auctionImagesRepo;

    public List<AuctionImages> getAllAuctionImages() {

        return auctionImagesRepo.findAll();
    }

    public AuctionImages createAuctionImages(AuctionImages auctionImages) {
        return auctionImagesRepo.save(auctionImages);
    }
}
