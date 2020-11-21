package com.example.auctionista.controllers;

import com.example.auctionista.entities.Message;
import com.example.auctionista.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/messages")
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @PostMapping
    public ResponseEntity<Boolean> postNewMessage(@RequestBody Message message) {
        boolean didsave = messageService.postNewMessage(message);

        return ResponseEntity.ok(didsave);
    }
}
