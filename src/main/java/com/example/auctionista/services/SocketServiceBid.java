package com.example.auctionista.services;


import com.example.auctionista.entities.Bid;
import com.example.auctionista.entities.Message;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SocketServiceBid {
    //    Gson gson = new Gson();
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    BidService bidService;

    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    public void sendToOne(WebSocketSession webSocketSession, String message) throws IOException {
        webSocketSession.sendMessage(new TextMessage(message));
    }

    public void sendToOne(WebSocketSession webSocketSession, Object obj) throws IOException {
//        String json = gson.toJson(obj, klass);
        String json = objectMapper.writeValueAsString(obj);
        sendToOne(webSocketSession, json);
    }

    public void sendToAll(Object obj) {
        try {
            sendToAll(objectMapper.writeValueAsString(obj));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void sendToAll(String message) {
        TextMessage msg = new TextMessage(message);
        for (WebSocketSession webSocketSession : sessions) {
            try {
                webSocketSession.sendMessage(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void addSession(WebSocketSession session) {
        sessions.add(session);
    }

    public void removeSession(WebSocketSession session) {
        sessions.remove(session);
    }

    public void saveNewBid(Bid bid) {
        bidService.postNewBid(bid);
    }
}
