package xyz.ssbracket.Controller;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.Accounts;
import xyz.ssbracket.Model.LogInResult;
import xyz.ssbracket.Model.AccountSubmission;
import xyz.ssbracket.Repository.AccountsRepository;
import xyz.ssbracket.Repository.UserRepository;
import static xyz.ssbracket.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static xyz.ssbracket.Constants.ApiConstants.REGEX_FOR_NUMBERS;

import xyz.ssbracket.Results.ResponseWrapper;
import xyz.ssbracket.Service.AccountService;


@Validated
@RestController
@RequestMapping("/api/v1/Accounts")

public class AccountsController{

    @Autowired
    AccountsRepository accountsLog;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private AccountService accountMainService;

    // Login check
   // @PostMapping("/login")
   // public boolean

    // Test get request
    @CrossOrigin
    @GetMapping("/friends/{id}")
    public Accounts getFriends(@PathVariable String id){
        System.out.println("String ID is : " + id);
        return accountsLog.findAccountsByName(id);
    }

    @CrossOrigin
    @PostMapping("/register")
    public LogInResult registerAccount(@RequestBody AccountSubmission registerAttempt){
      //  return registerAttempt;
        // Check if the username exists

        String username = registerAttempt.getUsername();
        String password = registerAttempt.getPassword();
        System.out.println("Username: " + username + " | Password: " + password);

        Accounts existingUser = accountsLog.findAccountsByName(username);
        System.out.println("Existing user result: " + existingUser);

        if(existingUser == null){
            User newUser = new User(username, 0,0,0,0,0);
            Accounts newAccount = new Accounts(username, password, newUser);
            accountsLog.save(newAccount);
            LogInResult response = new LogInResult(newUser.getId(), newAccount.getId(), true);
            return response;
        }

        else{
            return new LogInResult(-1, -1, false);
        }


    }

    @CrossOrigin
    @PostMapping("/test")
    public Accounts debuggingMethod(@RequestBody AccountSubmission signInAttempt){
        String username = signInAttempt.getUsername();
        String password = signInAttempt.getPassword();

        Accounts existingUser = accountsLog.findAccountsByName(username);
        if(existingUser == null){
            User newUser = new User(username, 1,1,0,1,1);
            Accounts newAccount = new Accounts(username, password, newUser);
            accountsLog.save(newAccount);
            return newAccount;
        }

        else{
            return existingUser;
        }
    }

    @CrossOrigin
    @PostMapping("/signin")
    public LogInResult signInAccount(@RequestBody AccountSubmission signInAttempt){
        String username = signInAttempt.getUsername();
        String password = signInAttempt.getPassword();

        Accounts existingUser = accountsLog.findAccountsByName(username);
        System.out.println(existingUser);

        if(existingUser == null){
            return new LogInResult(-1, -1, false);

        }

        else{
            boolean attemptStatus = existingUser.getPassword().equals(password);

            // Get associated User object
            User linkedUser = userRepository.findByUsername(username);
            System.out.println(linkedUser);
            int Id = linkedUser.getId();
            int accId = existingUser.getId();
            return new LogInResult(Id, accId, attemptStatus);


        }
    }



    @CrossOrigin
    @PatchMapping(value = "/updatePass/{id}")
    public ResponseWrapper<Integer> updatePassword(@Valid @RequestBody AccountSubmission userId,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( accountMainService.updatePassword(Integer.parseInt(id), userId.getPassword()), HttpStatus.OK );
    }

}
