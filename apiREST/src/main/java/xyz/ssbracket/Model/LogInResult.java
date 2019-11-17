package xyz.ssbracket.Model;

public class LogInResult{
    private int Id;
    private boolean status;
    private int accId;

    public LogInResult(int Id, int accId, boolean status){
        this.Id = Id;
        this.accId = accId;
        this.status = status;
    }
    public int getId(){
        return this.Id;
    }

    public int getAccId(){
        return this.accId;
    }

    public boolean getStatus(){
        return this.status;
    }

}