package com.example.auctionista.dtos;

import com.example.auctionista.entities.Bid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class SocketDTOBid {
    public String action;
    public Object payload;

    public SocketDTOBid(String bdi, Bid savedBid) {
    }
}
