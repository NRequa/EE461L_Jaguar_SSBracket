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

import xyz.ssbracket.Model.LogInResult;
import xyz.ssbracket.Model.AccountSubmission;
import static xyz.ssbracket.Constants.ApiConstants.MESSAGE_FOR_REGEX_NUMBER_MISMATCH;
import static xyz.ssbracket.Constants.ApiConstants.REGEX_FOR_NUMBERS;

import xyz.ssbracket.Results.ResponseWrapper;
import xyz.ssbracket.Service.AccountService;


@Validated
@RestController
@RequestMapping("/api/v1/Accounts")

public class AccountsController{

    @Autowired
    private AccountService accountMainService;

    @CrossOrigin
    @PostMapping(value = "/register")
    public ResponseWrapper<LogInResult> registerAccount(@RequestBody AccountSubmission registerAttempt){
        return new ResponseWrapper<>( accountMainService.registerAccount( registerAttempt ), HttpStatus.OK );
    }

    @CrossOrigin
    @PostMapping(value = "/signin")
    public ResponseWrapper<LogInResult> signInAccount( @RequestBody AccountSubmission signInAttempt ){
        return new ResponseWrapper<>( accountMainService.attemptSignIn( signInAttempt ), HttpStatus.OK );
    }

    @CrossOrigin
    @PatchMapping(value = "/updatePass/{id}")
    public ResponseWrapper<Integer> updatePassword(@Valid @RequestBody AccountSubmission userId,
                                               @Valid @Pattern(regexp = REGEX_FOR_NUMBERS, message = MESSAGE_FOR_REGEX_NUMBER_MISMATCH) @PathVariable(value = "id") String id )
    {
        return new ResponseWrapper<>( accountMainService.updatePassword( Integer.parseInt(id), userId ), HttpStatus.OK );
    }

}
