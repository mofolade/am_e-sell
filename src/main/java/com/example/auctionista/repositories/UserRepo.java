package com.example.auctionista.repositories;


import com.example.auctionista.entities.AuctionMessages;
import com.example.auctionista.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);

    public static final String FIND_USERBYID = "SELECT distinct u.id, \n" +
            "            u.name, \n" +
            "            u.email, \n" +
            "            '' password, \n" +
            "            u.picture_url, \n" +
            "            u.organize_number \n" +
            "       FROM users u \n" +
            "      WHERE u.id = :id";
    @Query(value = FIND_USERBYID, nativeQuery = true)
    public User findOneUser(long id);
}
