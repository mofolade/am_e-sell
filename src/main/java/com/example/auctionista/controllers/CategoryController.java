package com.example.auctionista.controllers;

import com.example.auctionista.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;
}
