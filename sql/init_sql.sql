# testing accountsS
use ssbracket;
show tables;
create table accounts (
ID int not null auto_increment primary key,
tname VARCHAR(64) not null,
tpassword VARCHAR(64) not null,
tfriends int not null,
ttournament_wins int not null);

INSERT INTO accounts (ID, tname, tpassword, tfriends, ttournament_wins) VALUE (1, "John", "thisisjohn", 3, 34);
INSERT INTO accounts (ID, tname, tpassword, tfriends, ttournament_wins) VALUE (2, "Sally", "thisissally", 600, 2);
INSERT INTO accounts (ID, tname, tpassword, tfriends, ttournament_wins) VALUE (3, "Me", "thisisme", 50, 1000);

ALTER TABLE accounts
ADD timageID int not null;

UPDATE accounts 
SET 
    timageID = 3
WHERE
    ID = 3;

SELECT * FROM accounts;