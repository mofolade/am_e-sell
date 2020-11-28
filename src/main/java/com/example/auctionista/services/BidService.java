package com.example.auctionista.services;

import com.example.auctionista.dtos.SocketDTOBid;
import com.example.auctionista.entities.Bid;
import com.example.auctionista.repositories.BidRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {
    @Autowired
    BidRepo bidRepo;

    @Autowired
    SocketService socketService;

    public List<Bid> getAllBids() {
        return bidRepo.findAll();
    }

    public List<Bid> getAllBidsByAuctionId(int auction_id){
        return bidRepo.findAllByAuctionId(auction_id);
    }


    public boolean postNewBid(Bid bid) {

        Bid savedBid = bidRepo.save(bid);

        SocketDTOBid socketDTOBid = new SocketDTOBid("bid", savedBid);
        socketDTOBid.action = "bid";
        socketDTOBid.payload = savedBid;

        socketService.sendToAll(socketDTOBid);

        return savedBid.getId() > 0;
    }
}
