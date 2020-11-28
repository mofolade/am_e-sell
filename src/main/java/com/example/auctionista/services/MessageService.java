package com.example.auctionista.services;


import com.example.auctionista.dtos.SocketDTO;
import com.example.auctionista.entities.Message;
import com.example.auctionista.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    MessageRepo messageRepo;

    @Autowired
    SocketService socketService;

    public List<Message> getAllMessages() {
        return messageRepo.findAll();
    }

    public List<Message> getAllMessagesByUserId(int user_id){
        return messageRepo.findAllByUserId(user_id);
    }

    public boolean postNewMessage(Message message) {

        message.setTimestamp(Instant.now().toEpochMilli()); // Date.now()

        Message savedMessage = messageRepo.save(message);

        SocketDTO socketMessage = new SocketDTO("message", savedMessage);
        socketMessage.action = "message";
        socketMessage.payload = savedMessage;

        socketService.sendToAll(socketMessage);

        return savedMessage.getId() > 0;
    }
}
