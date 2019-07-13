DROP DATABASE IF EXISTS topsongs_DB; 

CREATE database topsongs_DB; 
USE topsongs_DB; 

CREATE TABLE topAlbums (
	id INT NOT NULL, 
    artist VARCHAR (255), 
    album VARCHAR (255), 
    years INT, 
    raw_total DECIMAL (10, 5),
    raw_usa DECIMAL (10, 5), 
    raw_uk DECIMAL (10, 5), 
    raw_eur DECIMAL (10, 5), 
    raw_row DECIMAL (10, 5)
);

CREATE TABLE top5000 (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  song VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);

SELECT * FROM topAlbums 