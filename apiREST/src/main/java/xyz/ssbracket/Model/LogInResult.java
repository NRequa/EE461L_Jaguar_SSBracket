package xyz.ssbracket.Model;

public class LogInResult{
    private int Id;
    private boolean status;


    public LogInResult(int Id, boolean status){
        this.Id = Id;
        this.status = status;
    }
    public int getId(){
        return this.Id;
    }

    public boolean getStatus(){
        return this.status;
    }

}