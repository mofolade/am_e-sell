package com.example.auctionista.configs;

import com.example.auctionista.controllers.SocketController;
import com.example.auctionista.services.SocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    SocketService socketService;

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        SocketController sc = new SocketController();
        sc.setSocketService(socketService);
        registry.addHandler(sc, "/your-socket-route");
    }
}
