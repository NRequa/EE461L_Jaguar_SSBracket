package xyz.ssbracket.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import xyz.ssbracket.Model.Accounts;
import xyz.ssbracket.Model.RegistrationSubmission;
import xyz.ssbracket.Repository.AccountsRepository;

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
        System.out.println("String ID is : " + id);
        return accountsLog.findAccountsByName(id);
    } 

    @PostMapping("/register")
    public boolean registerAccount(@RequestBody RegistrationSubmission registerAttempt){
      //  return registerAttempt;
        // Check if the username exists
        
        String username = registerAttempt.getUsername();
        String password = registerAttempt.getPassword();
        System.out.println("Username: " + username + " | Password: " + password);
        
        Accounts existingUser = accountsLog.findAccountsByName(username);
        System.out.println("Existing user result: " + existingUser);

        if(existingUser == null){
            // Make new user and add to table
            Accounts newUser = new Accounts(username, password);
            accountsLog.save(newUser);
            return true;
        }

        else{
            return false;
        }
        
        
    }

}