package com.example.auctionista.controllers;

import com.example.auctionista.entities.AuctionImages;
import com.example.auctionista.services.AuctionImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/auctionimages")
public class AuctionImagesController {
    @Autowired
    AuctionImagesService auctionImagesService;

    @GetMapping
    public List<AuctionImages> getAllAuctionImages() {
        return auctionImagesService.getAllAuctionImages();
    }

    @PostMapping
    public AuctionImages createAuction(@RequestBody AuctionImages auctionImages) {
        return auctionImagesService.createAuctionImages(auctionImages);
    }
}
