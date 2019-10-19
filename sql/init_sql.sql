# testing accountsS
use ssbracket;
show tables;
create table accounts (
ID int not null auto_increment primary key,
tname VARCHAR(64) not null,
tpassword VARCHAR(64) not null,
tfriends int not null,
ttournament_wins int not null);

SELECT * FROM accounts;
INSERT INTO accounts (ID, tname, tpassword, tfriends, ttournament_wins) VALUE (1, "John", "thisisjohn", 3, 34);
