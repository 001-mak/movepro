create database movepro

-- ------------------ ---
-- CREATEING USERS TABLE 
-- ------------------ ---

CREATE TABLE tbl_user (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  email_id VARCHAR(255) NOT NULL UNIQUE, 
  first_name VARCHAR(255) NOT NULL, 
  last_name VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL, 
  salt VARCHAR(255) NOT NULL, 
  phone_no VARCHAR(20) NOT NULL, 
  picture VARCHAR(500) DEFAULT NULL,
  bio MEDIUMTEXT DEFAULT NULL,
  cover_photo VARCHAR(500) DEFAULT NULL,
  street VARCHAR(255) DEFAULT NULL,
  city VARCHAR(255) DEFAULT NULL,
  state VARCHAR(255) DEFAULT NULL,
  zip VARCHAR(255) DEFAULT NULL,
  country VARCHAR(255) DEFAULT NULL,
  role VARCHAR(11) NOT NULL,
  plan_purchased VARCHAR(1) NOT NULL DEFAULT '1',
  ssn VARCHAR(20) NOT NULL,
  hire_date VARCHAR(20) DEFAULT NULL,
  current_pay VARCHAR(10) DEFAULT NULL
);

ALTER TABLE tbl_user
DROP COLUMN plan_purchased;

ALTER TABLE tbl_user
DROP COLUMN role;


-- ------------------ ---
-- CREATEING company TABLE 
-- ------------------ ---

CREATE TABLE `tbl_company` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` varchar(250) NOT NULL,
  `company_email` varchar(250) NOT NULL,
  `street` mediumtext NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `country` varchar(50) NOT NULL,
  `company_logo` varchar(250) NOT NULL,
  `website` varchar(250) NOT NULL,
  `social_fb` mediumtext NOT NULL,
  `social_tw` mediumtext NOT NULL,
  `social_in` mediumtext NOT NULL,
  `social_insta` mediumtext NOT NULL,
  `social_tube` mediumtext NOT NULL
);

----------------------------------------------
-- Adding company_Id as foreign key in tbl_user 
----------------------------------------------

ALTER TABLE tbl_user
ADD COLUMN company_id INT DEFAULT NULL,  -- Add the company_id column
ADD CONSTRAINT fk_company_user  -- Name of the foreign key constraint
FOREIGN KEY (company_id) REFERENCES tbl_company(id)  -- Define the foreign key relationship
ON DELETE SET NULL;  -- Optional: if the company is deleted, set company_id to NULL


----------------------------------------------
-- Adding user_Id, (owner of company) as foreign key in tbl_company
----------------------------------------------

ALTER TABLE tbl_company
ADD COLUMN user_id INT NOT NULL,  -- Add the user_id column (cannot be NULL)
ADD CONSTRAINT fk_user_company  -- Name of the foreign key constraint
FOREIGN KEY (user_id) REFERENCES tbl_user(id)  -- Define the foreign key relationship
ON DELETE RESTRICT;  -- Prevent deletion of a user if they own a company

----------------------------------------------
-- CREATE SUBSCRIPTION PLANS TABLE
----------------------------------------------

CREATE TABLE `tbl_subscription_plan` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subscription_plan_name` varchar(100) NOT NULL,
  `subscription_plan_price` varchar(50) NOT NULL
);

----------------------------------------------
-- Add subscription  foreign key to company table
----------------------------------------------

ALTER TABLE tbl_company
ADD COLUMN subscription_plan_id INT DEFAULT 1,
ADD CONSTRAINT fk_subscription_plan
FOREIGN KEY (subscription_plan_id) REFERENCES tbl_subscription_plan(id);

----------------------------------------------
-- insert data into subscription plan table
----------------------------------------------

INSERT INTO tbl_subscription_plan (subscription_plan_name, subscription_plan_price)
VALUES
('FREE', '0'),
('STANDARD', '99'),
('PREMIUM', '199');


-------------------
-- Create table USER ROLES
-------------------
CREATE TABLE tbl_role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(50) NOT NULL
);

INSERT INTO tbl_role (role)
VALUES
('SUPER_ADMIN'),
('TENANT_ADMIN'),
('DRIVER'),
('CREW');

ALTER TABLE tbl_user
ADD COLUMN role_id INT NOT NULL,
ADD CONSTRAINT fk_user_role
FOREIGN KEY (role_id) REFERENCES tbl_role(id);

ALTER TABLE tbl_user
MODIFY COLUMN role_id INT NOT NULL DEFAULT 2;

ALTER TABLE tbl_user
ADD COLUMN reset_key VARCHAR(255) DEFAULT NULL

ALTER TABLE tbl_user
ADD COLUMN reset_key_expiry VARCHAR(255) DEFAULT NULL

ALTER TABLE tbl_user
DROP COLUMN reset_key_expiry

ALTER TABLE tbl_user 
ADD COLUMN reset_key_expiry DATETIME DEFAULT NULL;
