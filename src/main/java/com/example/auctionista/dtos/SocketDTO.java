package com.example.auctionista.dtos;

import com.example.auctionista.entities.Message;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class SocketDTO {
    public String action;
    public Object payload;

    public SocketDTO(String message, Message savedMessage) {
    }
}
