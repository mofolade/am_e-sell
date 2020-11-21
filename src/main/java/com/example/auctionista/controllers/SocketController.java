package com.example.auctionista.controllers;

import com.example.auctionista.dtos.SocketDTO;
import com.example.auctionista.entities.Message;
import com.example.auctionista.services.SocketService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

@Controller
public class SocketController extends TextWebSocketHandler {

    ObjectMapper objectMapper = new ObjectMapper();

    // NOTE: Can not use @Autowired here due to WebSocketConfig instantiating the SocketController
    private SocketService socketService;
    public void setSocketService(SocketService socketService) {
        this.socketService = socketService;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        System.out.println("Received msg: " + message.getPayload());

        // gson.fromJson(), JSON.parse

        // we use a DTO (data transfer object) to handle action and payload
        SocketDTO socketDTO = objectMapper.readValue(message.getPayload(), SocketDTO.class);

        switch (socketDTO.action) {
            case "message":
                // call frankenstein to convert this payload
                Message msg = convertPayload(socketDTO.payload, Message.class);
                socketService.saveNewMessage(msg);
                break;
            case "connection":
                System.out.println("User connected");
                break;
            case "user-status":
                break;
            default:
                System.out.println("Could not read action: " + socketDTO.action);
        }

        // Demonstration purpose only: send back "Hello" + same message as received
//        socketService.sendToAll("Hello " + message.getPayload());

        // Example with a generic Map instead of converting the JSON to a specific class
        // Map keysAndValues = new Gson().fromJson(message.getPayload(), Map.class);
        // Get the value of a key named "firstname"
        // String firstname = keysAndValues.get("firstname");
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        socketService.addSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        socketService.removeSession(session);
    }

    // generic method to convert payload to target class
    private <T> T convertPayload(Object object, Class<T> type) {
        T t = null;
        try {
            // convert by first creating a json object, and the read it to target object
            t = objectMapper.readValue(objectMapper.writeValueAsString(object), type);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return t;
    }
}