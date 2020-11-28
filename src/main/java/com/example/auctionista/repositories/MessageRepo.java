package com.example.auctionista.repositories;

import com.example.auctionista.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {

    public static final String FIND_USERBYID = "SELECT distinct me.id, \n" +
            "           me.content, \n" +
            "           me.auction_id, \n" +
            "           me.sender_user_id, \n" +
            "           me.recipient_user_id, \n" +
            "           me.timestamp \n" +
            "       FROM messages me \n" +
            "      WHERE ((me.sender_user_id = :user_id) OR (me.recipient_user_id = :user_id))";
    @Query(value = FIND_USERBYID, nativeQuery = true)
    public List<Message> findAllByUserId(int user_id);
}
