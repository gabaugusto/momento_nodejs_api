-- Criando o Modelo Físico
DROP DATABASE IF EXISTS momento;
CREATE DATABASE IF NOT EXISTS momento;
USE momento;

DROP TABLE IF EXISTS regions;
CREATE TABLE regions (
  region_id INT AUTO_INCREMENT PRIMARY KEY,
  region_name VARCHAR(25) NOT NULL
);

DROP TABLE IF EXISTS countries;
CREATE TABLE countries (
  country_id CHAR(2) PRIMARY KEY,
  country_name VARCHAR(48) NOT NULL,
  region_id INT NOT NULL, 
  FOREIGN KEY (region_id) REFERENCES regions (region_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS offices;
CREATE TABLE offices (
  office_id INT AUTO_INCREMENT PRIMARY KEY,
  office_name VARCHAR(48) DEFAULT NULL,
  adress VARCHAR(48) NOT NULL,
  zip VARCHAR(12) DEFAULT NULL,
  city VARCHAR(48) NOT NULL,
  state_province VARCHAR(24) NOT NULL,
  country_id CHAR(2) NOT NULL,
  FOREIGN KEY (country_id) REFERENCES countries (country_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS departaments;
CREATE TABLE departaments (
  departament_id INT AUTO_INCREMENT PRIMARY KEY,
  departament_name VARCHAR(30) NOT NULL,
  office_id INT DEFAULT NULL,
  FOREIGN KEY (office_id) REFERENCES offices (office_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS positions;
CREATE TABLE positions (
  position_id INT AUTO_INCREMENT PRIMARY KEY,
  position_name VARCHAR(64) NOT NULL,
  min_salary DECIMAL(8, 2) DEFAULT NULL,
  max_salary DECIMAL(8, 2) DEFAULT NULL
);

DROP TABLE IF EXISTS employees; 
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(24) DEFAULT NULL,
  last_name VARCHAR(24) NOT NULL,
  email VARCHAR(128) NOT NULL,
  phone VARCHAR(24) DEFAULT NULL,
  date_contract DATE NOT NULL,
  position_id INT NOT NULL,
  salary DECIMAL(8, 2) NOT NULL,
  manager_id INT DEFAULT NULL,
  departament_id INT NOT NULL,
  FOREIGN KEY (position_id) REFERENCES positions (position_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (departament_id) REFERENCES departaments (departament_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employees (employee_id)
);

DROP TABLE IF EXISTS relatives; 
CREATE TABLE relatives (
  relative_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(24) NOT NULL,
  last_name VARCHAR(24) NOT NULL,
  relationship VARCHAR(24) NOT NULL,
  employee_id INT NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Inserindo Dados

INSERT INTO regions(region_id,region_name) VALUES (1,'Europa');
INSERT INTO regions(region_id,region_name) VALUES (2,'Americas');
INSERT INTO regions(region_id,region_name) VALUES (3,'Asia');
INSERT INTO regions(region_id,region_name) VALUES (4,'Sul da Asia ou Africa');

INSERT INTO countries(country_id,country_name,region_id) VALUES ('AR','Argentina',2);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('AU','Australia',3);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('BE','Belgium',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('BR','Brazil',2);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('CA','Canada',2);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('CH','Switzerland',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('CN','China',3);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('DE','Germany',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('DK','Denmark',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('EG','Egypt',4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('FR','France',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('HK','HongKong',3);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('IL','Israel',4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('IN','India',3);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('IT','Italy',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('KK','Krakoa',2);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('JP','Japan',3);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('KW','Kuwait',4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('LE','Latveria',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('MI','Markovia',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('MX','Mexico',2);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('NG','Nigeria',4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('NL','Netherlands',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('QU','Qurac',4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('TY','Themyscira',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('SG','Singapore',3);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('UK','United Kingdom',1);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('US','United States of America',2);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('WA','Wakanda', 4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('ZM','Zambia', 4);
INSERT INTO countries(country_id,country_name,region_id) VALUES ('ZW','Zimbabwe',4);

INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (1400,'Wayne Offices', '2014 Jabberwocky Rd','26192','Gotham','New York','US');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (1500,'Stark Tower','2011 Interiors Blvd','99236','South San Francisco','California','US');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (1700,'Sala Winter','2004 Charade Rd','98199','Seattle','Washington','US');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (1800,'Arkham Base','147 Spadina Ave','M5V 2L7','Toronto','Ontario','CA');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (2400,"Shuri's Palace",'8204 Arthur St',NULL,'Jabari Village','Birnin Zana','WA');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (2500,'Umbrella Corp','Magdalen Centre, The Oxford Science Park','OX9 9ZB','Oxford','Oxford','UK');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (2700,'Baxter Building','Excelsior Rd. 7031','00616','London Below','Bavaria','DE');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (3900,'Baxter Building','Excelsior Rd. 7031','00616','London Below','London Above','UK');
INSERT INTO offices(office_id,office_name,adress,zip,city,state_province,country_id) VALUES (1900,"House of Mystery Offices",'The Trickster Rd. 42','80925','Newcastle','North East England','UK');

INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (1,'Administration',1700);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (2,'Marketing',1800);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (3,'Resources',1700);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (4,'Human Resources',2400);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (5,'Transports',1500);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (6,'Tecnology',1400);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (7,'Public Relations',2700);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (8,'Sales',2500);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (9,'Executive',1700);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (10,'Finance',1700);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (11,'Accounting',1700);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (12,'Biotechnologies',3900);
INSERT INTO departaments(departament_id,departament_name,office_id) VALUES (13,'Advanced Technologies',1900);

INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (1,'Junior Warehouse Assistant',4200.00,9000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (2,'Accounting Manager',8200.00,16000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (3,'Administrative Assistant',3000.00,6000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (4,'CEO',20000.00,40000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (5,'Director of Administration, Accounting and Resources',15000.00,30000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (6,'Accounting',4200.00,9000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (7,'CFO',8200.00,16000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (8,'Resources Representative',4000.00,9000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (9,'Web Developer',4000.00,10000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (10,'CMO',9000.00,15000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (11,'Sales Representative for Latin America',4000.00,9000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (12,'Public Relations',4500.00,10500.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (13,'Purchasing Clerk',2500.00,5500.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (14,'Resources Manager',8000.00,15000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (15,'Sales Manager',10000.00,20000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (16,'Sales Representative',6000.00,12000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (17,'Seller',2500.00,5500.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (18,'Stockist',2000.00,5000.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (19,'Stock Manager',5500.00,8500.00);
INSERT INTO positions(position_id,position_name,min_salary,max_salary) VALUES (20,'Scientist',14200.00,35000.00);

INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (100,'Steven','Wayne','steven.wayne@momento.org','515.123.4567','1987-06-17',4,24000.00,NULL,9);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (101,'Neena','Kochhar','neena.kochhar@momento.org','515.123.4568','1989-09-21',5,17000.00,100,9);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (102,'Lex',"T'Challa",'lex.tchalla@momento.org','515.123.4569','1993-01-13',5,17000.00,100,9);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (103,'Alexander','Hunold','alexander.hunold@momento.org','590.423.4567','1990-01-03',9,9000.00,102,6);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (104,'Bruce','Ernst','bruce.ernst@momento.org','590.423.4568','1991-05-21',9,6000.00,103,6);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (105,'David','Austin','david.austin@momento.org','590.423.4569','1997-06-25',9,4800.00,103,6);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (106,'Valli','Stark','valli.stark@momento.org','590.423.4560','1998-02-05',9,4800.00,103,6);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (107,'Diana','Lorentz','diana.lorentz@momento.org','590.423.5567','1999-02-07',9,4200.00,103,6);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (108,'Nancy','Constantine','nancy.constantine@momento.org','515.124.4569','1994-08-17',20,12000.00,101,13);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (109,'Daniel','Faviet','daniel.faviet@momento.org','515.124.4169','1994-08-16',6,9000.00,108,10);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (110,'John','Chen','john.chen@momento.org','515.124.4269','1997-09-28',6,8200.00,108,10);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (111,'Ismael','Sciarra','ismael.sciarra@momento.org','515.124.4369','1997-09-30',6,7700.00,108,10);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (112,'Jose Manuel','Urman','jose manuel.urman@momento.org','515.124.4469','1998-03-07',6,7800.00,108,10);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (113,'Luis','Popp','luis.popp@momento.org','515.124.4567','1999-12-07',6,6900.00,108,10);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (114,'Den','Raphaely','den.raphaely@momento.org','515.127.4561','1994-12-07',14,11000.00,100,3);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (115,'Normam','Osborn','alexander.osborn@momento.org','515.127.4562','1995-05-18',13,3100.00,114,3);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (116,'Shelli','Baida','shelli.baida@momento.org','515.127.4563','1997-12-24',13,2900.00,114,3);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (117,'Sigal','Tobias','sigal.tobias@momento.org','515.127.4564','1997-07-24',13,2800.00,114,3);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (118,'Guy','Himuro','guy.himuro@momento.org','515.127.4565','1998-11-15',13,2600.00,114,3);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (119,'Karen','Colmenares','karen.colmenares@momento.org','515.127.4566','1999-08-10',13,2500.00,114,3);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (120,'Matthew','Weiss','matthew.weiss@momento.org','650.123.1234','1996-07-18',19,8000.00,100,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (121,'Adam','Fripp','adam.fripp@momento.org','650.123.2234','1997-04-10',19,8200.00,100,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (122,'Payam','Kaufling','payam.kaufling@momento.org','650.123.3234','1995-05-01',19,7900.00,100,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (123,'Shanta','Vollman','shanta.vollman@momento.org','650.123.4234','1997-10-10',19,6500.00,100,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (126,'Irene','Mikkilineni','irene.mikkilineni@momento.org','650.124.1224','1998-09-28',18,2700.00,120,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (145,'John','Russell','john.russell@momento.org',NULL,'1996-10-01',15,14000.00,100,8);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (146,'Karen','Partners','karen.partners@momento.org',NULL,'1997-01-05',15,13500.00,100,8);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (176,'Jonathon','Taylor','jonathon.taylor@momento.org',NULL,'1998-03-24',16,8600.00,100,8);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (177,'Jack','Livingston','jack.livingston@momento.org',NULL,'1998-04-23',16,8400.00,100,8);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (178,'Kimberly','Grant','kimberely.grant@momento.org',NULL,'1999-05-24',16,7000.00,100,8);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (179,'Zatana','Zatara','zatana.zatara@momento.org',NULL,'2000-01-04',20,6200.00,100,13);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (192,'Sarah','Bell','sarah.bell@momento.org','650.501.1876','1996-02-04',17,4000.00,123,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (193,'Britney','Everett','britney.everett@momento.org','650.501.2876','1997-03-03',17,3900.00,123,5);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (200,'Jennifer','Whalen','jennifer.whalen@momento.org','515.123.4444','1987-09-17',3,4400.00,101,1);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (201,'Elisabeth','Braddock','michael.braddock@momento.org','515.123.5555','1996-02-17',10,13000.00,100,2);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (202,'Pat','Ferreira','pat.Ferreira@momento.org','603.123.6666','1997-08-17',11,6000.00,201,2);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (203,'Susan','Mavris','susan.mavris@momento.org','515.123.7777','1994-06-07',8,6500.00,101,4);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (204,'Hermann','Baer','hermann.baer@momento.org','515.123.8888','1994-06-07',12,10000.00,101,7);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (205,'Shelley','Higgins','shelley.higgins@momento.org','515.123.8080','1994-06-07',2,12000.00,101,11);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (206,'Susan','Storm','susan.storm@momento.org','515.123.8181','1994-06-07',20,18300.00,205,12);
INSERT INTO employees(employee_id,first_name,last_name,email,phone,date_contract,position_id,salary,manager_id,departament_id) VALUES (207,'Lucius','Fox','lucius.fox@momento.org','515.124.4569','1994-08-17',7,12000.00,101,10);

/*Data for the table relatives */
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (1,'Penelope','Wayne','Child',200);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (2,'Nick','Higgins','Child',205);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (3,'Ed','Whalen','Child',200);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (4,'Alice','Wayne','Child',100);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (5,'Johnny','Kochhar','Child',101);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (6,'Bette',"T'Challa",'Child',102);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (7,'Grace','Faviet','Child',109);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (8,'Matthew','Chen','Child',110);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (9,'Joe','Sciarra','Child',111);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (10,'Christian','Urman','Child',112);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (11,'Zero','Popp','Child',113);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (12,'John','Constantine','Child',108);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (13,'Duas','Mavris','Child',203);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (14,'Vivien','Hunold','Child',103);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (15,'Cuba','Ernst','Child',104);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (16,'Fred','Austin','Child',105);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (17,'Helen','Stark','Child',106);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (18,'Dan','Lorentz','Child',107);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (19,'Bob','Braddock ','Child',201);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (20,'Lucie','Ferreira','Child',202);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (21,'Kirsten','Baer','Child',204);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (22,'Harry','Osborn','Child',115);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (23,'Sandra','Baida','Child',116);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (24,'Cameron','Tobias','Child',117);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (25,'Kevin','Himuro','Child',118);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (26,'Rip','Colmenares','Child',119);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (27,'Julia','Raphaely','Child',114);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (28,'Woody','Russell','Child',145);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (29,'Alec','Partners','Child',146);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (30,'Sandra','Taylor','Child',176);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (31,'Franklin','Storm','Child',206);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (32,'Valeria','Storm','Child',206);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (33,'Reed','Storm','Partner',206);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (34,'Uma','Mavris','Partner',203);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (35,'Salvadora','Ernst','Partner',104);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (36,'Jennifer','Wayne','Partner',100);
INSERT INTO relatives(relative_id,first_name,last_name,relationship,employee_id) VALUES (37,'Zachary','Zatara','Father',179);

-- Criando a VIEW sobre funcionários 
CREATE OR REPLACE VIEW `data_employees` AS
SELECT 
  employees.employee_id AS employee_id, 
  employees.first_name AS first_name, 
  employees.last_name AS last_name, 
  employees.phone AS phone, 
  employees.date_contract AS date_contract, 
  employees.salary AS salary, 
  positions.position_name AS position, 
  positions.min_salary AS min_salary, 
  positions.max_salary AS max_salary, 
  departaments.departament_name AS departament, 
  offices.office_name AS office, 
  offices.adress AS adress, 
  countries.country_name AS country, 
  regions.region_name AS region

 FROM employees

INNER JOIN positions 
  ON employees.position_id = positions.position_id
INNER JOIN departaments 
  ON employees.departament_id = departaments.departament_id
INNER JOIN offices 
  ON departaments.office_id = offices.office_id
INNER JOIN countries 
  ON offices.country_id = countries.country_id
INNER JOIN regions 
  ON countries.region_id = regions.region_id;

-- Selecionando dados da VIEW
SELECT * From data_employees;

-- Criando a VIEW sobre relatives 
CREATE OR REPLACE VIEW `data_relatives` AS
SELECT 
  relatives.relative_id AS relative_id, 
  relatives.first_name AS first_name,
  relatives.last_name AS last_name,
  relatives.relationship AS relationship,
  employees.employee_id AS employee_id, 
  employees.first_name AS employee_first_name, 
  employees.last_name AS employee_last_name

 FROM relatives

INNER JOIN employees 
  ON relatives.employee_id = employees.employee_id;
