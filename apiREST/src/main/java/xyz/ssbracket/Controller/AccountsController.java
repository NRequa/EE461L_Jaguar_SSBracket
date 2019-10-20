package xyz.ssbracket.Controller;

import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.Accounts;
import xyz.ssbracket.Model.RegistrationSubmission;


import xyz.ssbracket.Results.ResponseWrapper;
import xyz.ssbracket.Repository.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

import static xyz.ssbracket.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static xyz.ssbracket.Constants.ApiConstants.REGEX_FOR_NUMBERS;

@Validated
@RestController
@RequestMapping("/api/v1/Accounts")

public class AccountsController{

    @Autowired
    AccountsRepository accountsLog;

    // Login check
   // @PostMapping("/login")
   // public boolean 

    // Test get request
    @GetMapping("/friends/{id}")
    public Accounts getFriends(@PathVariable String id){
        return accountsLog.findAccountsByName(id);
    } 

    @PostMapping("/register")
    public String registerAccount(@RequestBody RegistrationSubmission registerAttempt){
        
        // Check if the username exists
        String username = registerAttempt.username;
        String password = registerAttempt.password;
        Accounts existingUser = accountsLog.findAccountsByName(username);

        if(existingUser.isEmpty()){
            // Make new user and add to table
            Accounts newUser = new Accounts(username, password);
            accountsLog.save(newUser);
            return "true";
        }

        else{
            return "false";
        }


    }

}