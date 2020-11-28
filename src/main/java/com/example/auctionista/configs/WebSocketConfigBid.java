package com.example.auctionista.configs;

import com.example.auctionista.controllers.SocketController;
import com.example.auctionista.controllers.SocketControllerBid;
import com.example.auctionista.services.SocketService;
import com.example.auctionista.services.SocketServiceBid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfigBid implements WebSocketConfigurer {
    @Autowired
    SocketServiceBid socketServiceBid;

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        SocketControllerBid sc = new SocketControllerBid();
        sc.setSocketServiceBid(socketServiceBid);
        registry.addHandler(sc, "/bids");
    }
}
