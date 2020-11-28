package com.example.auctionista.controllers;

import com.example.auctionista.entities.Message;
import com.example.auctionista.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping("/rest/messages")
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/rest/messagesbyuserid/{user_id}")
    public List<Message> getAllMessagesByUserId(@PathVariable int user_id) {
        return messageService.getAllMessagesByUserId(user_id);
    }

    @PostMapping("/rest/messages")
    public ResponseEntity<Boolean> postNewMessage(@RequestBody Message message) {
        boolean didsave = messageService.postNewMessage(message);

        return ResponseEntity.ok(didsave);
    }
}
