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

alter table tbl_user
drop foreign key fk_user_role

alter table tbl_user
drop column role_id

ALTER TABLE tbl_role
ADD CONSTRAINT unique_role UNIQUE (role);

ALTER TABLE tbl_user
ADD COLUMN user_role VARCHAR(50) NOT NULL;  -- Adjust the data type as needed

ALTER TABLE tbl_user
DROP COLUMN user_role 

drop table tbl_role

CREATE TABLE tbl_role (
    role VARCHAR(50) PRIMARY KEY
);

INSERT INTO tbl_role (role) VALUES
('super_admin'),
('tenant_admin'),
('driver'),
('crew');


ALTER TABLE tbl_user
ADD COLUMN user_role VARCHAR(50);

ALTER TABLE tbl_user
ADD CONSTRAINT fk_user_role  -- Name of the foreign key constraint
FOREIGN KEY (user_role) REFERENCES tbl_role(role)  -- Define the foreign key relationship
ON DELETE CASCADE;  -- Optional: this means if a role is deleted, related users will also be deleted


-- Step 1: Drop existing foreign key constraints
ALTER TABLE tbl_user
DROP FOREIGN KEY fk_company_user;

ALTER TABLE tbl_company
DROP FOREIGN KEY fk_user_company;

-- Step 2: Add foreign key constraints with ON DELETE CASCADE
ALTER TABLE tbl_user
ADD CONSTRAINT fk_company_user 
FOREIGN KEY (company_id) REFERENCES tbl_company(id) 
ON DELETE CASCADE;

ALTER TABLE tbl_company
ADD CONSTRAINT fk_user_company 
FOREIGN KEY (user_id) REFERENCES tbl_user(id) 
ON DELETE CASCADE;


CREATE TABLE `tbl_leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `comments` MEDIUMTEXT DEFAULT NULL,
  `JobType` VARCHAR(50) NOT NULL,
  `ServiceType` VARCHAR(50) DEFAULT NULL,
  `MoveDate` VARCHAR(20) NOT NULL,
  `MoveTime` VARCHAR(20) NOT NULL,
  `EstimatedDate` VARCHAR(20) DEFAULT NULL,
  `EstimatedTime` VARCHAR(20) DEFAULT NULL,
  `LoadingDwellingSize` VARCHAR(20) DEFAULT NULL,
  `LoadingPlaceName` VARCHAR(20) DEFAULT NULL,
  `LeadLoadingApartment` VARCHAR(200) DEFAULT NULL,
  `LeadLoadingNotes` MEDIUMTEXT DEFAULT NULL,
  `LoadingAddress` VARCHAR(50) DEFAULT NULL,
  `LoadingZip` VARCHAR(10) DEFAULT NULL,
  `LoadingLat` VARCHAR(10) DEFAULT NULL,
  `LoadingLong` VARCHAR(10) DEFAULT NULL,
  `LoadingCity` VARCHAR(20) NOT NULL,
  `LoadingState` VARCHAR(20) DEFAULT NULL,
  `LoadingStairs` VARCHAR(5) DEFAULT NULL,
  `LoadingNeedHelpPacking` VARCHAR(1) DEFAULT NULL,
  `LoadingPackingDate` VARCHAR(20) DEFAULT NULL,
  `LoadingPackingTime` VARCHAR(20) DEFAULT NULL,
  `LoadingElevator` VARCHAR(1) DEFAULT NULL,
  `LoadingGarage` VARCHAR(1) DEFAULT NULL,
  `UnloadingDwellingSize` VARCHAR(20) DEFAULT NULL,
  `UnloadingPlaceName` VARCHAR(20) DEFAULT NULL,
  `UnloadingAddress` VARCHAR(50) DEFAULT NULL,
  `LeadUnloadingApartment` VARCHAR(200) DEFAULT NULL,
  `LeadUnloadingNotes` MEDIUMTEXT DEFAULT NULL,
  `UnloadingZip` VARCHAR(10) DEFAULT NULL,
  `UnloadingLat` VARCHAR(10) DEFAULT NULL,
  `UnloadingLong` VARCHAR(10) DEFAULT NULL,
  `UnloadingCity` VARCHAR(20) DEFAULT NULL,
  `UnloadingState` VARCHAR(20) DEFAULT NULL,
  `UnloadingStairs` VARCHAR(20) DEFAULT NULL,
  `UnloadingNeedHelpPacking` VARCHAR(1) DEFAULT NULL,
  `UnloadingElevator` VARCHAR(1) DEFAULT NULL,
  `2ndLoadingDwellingSize` VARCHAR(20) DEFAULT NULL,
  `2ndLoadingPlaceName` VARCHAR(100) DEFAULT NULL,
  `2ndLoadingApartment` VARCHAR(200) DEFAULT NULL,
  `2ndLoadingAddress` VARCHAR(50) DEFAULT NULL,
  `2ndLoadingZip` VARCHAR(10) DEFAULT NULL,
  `2ndLoadingLat` VARCHAR(10) DEFAULT NULL,
  `2ndLoadingLong` VARCHAR(10) DEFAULT NULL,
  `2ndLoadingCity` VARCHAR(10) DEFAULT NULL,
  `2ndLoadingState` VARCHAR(20) DEFAULT NULL,
  `2ndLoadingStairs` VARCHAR(5) DEFAULT NULL,
  `2ndLoadingNeedHelpPacking` VARCHAR(1) DEFAULT NULL,
  `2ndLoadingPackingDate` VARCHAR(20) DEFAULT NULL,
  `2ndLoadingPackingTime` VARCHAR(20) DEFAULT NULL,
  `2ndLoadingElevator` VARCHAR(1) DEFAULT NULL,
  `2ndLoadingGarage` VARCHAR(1) DEFAULT NULL,
  `2ndLoadingNotes` MEDIUMTEXT DEFAULT NULL,
  `2ndUnloadingDwellingSize` VARCHAR(20) DEFAULT NULL,
  `2ndUnloadingPlaceName` VARCHAR(20) DEFAULT NULL,
  `2ndUnloadingApartment` VARCHAR(100) DEFAULT NULL,
  `2ndUnloadingAddress` VARCHAR(50) DEFAULT NULL,
  `2ndUnloadingZip` VARCHAR(10) DEFAULT NULL,
  `2ndUnloadingLat` VARCHAR(10) DEFAULT NULL,
  `2ndUnloadingLong` VARCHAR(10) DEFAULT NULL,
  `2ndUnloadingCity` VARCHAR(10) DEFAULT NULL,
  `2ndUnloadingState` VARCHAR(20) DEFAULT NULL,
  `2ndUnloadingStairs` VARCHAR(5) DEFAULT NULL,
  `2ndUnloadingNeedHelpPacking` VARCHAR(1) DEFAULT NULL,
  `2ndUnloadingElevator` VARCHAR(1) DEFAULT NULL,
  `2ndLeadUnloadingNotes` MEDIUMTEXT DEFAULT NULL,
  `insert_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `distance` VARCHAR(250) DEFAULT NULL,
  `lead_status` VARCHAR(1) NOT NULL DEFAULT '1',
  `book_date` VARCHAR(20) DEFAULT NULL,
  `complete_date` VARCHAR(20) DEFAULT NULL,
  `accept_status` INT(1) DEFAULT 0,
  `reject_reason` VARCHAR(50) DEFAULT NULL
)


ALTER TABLE tbl_leads
ADD COLUMN company_id INT;

ALTER TABLE tbl_leads
ADD CONSTRAINT fk_company_id 
FOREIGN KEY (company_id) REFERENCES tbl_company(id)
ON DELETE CASCADE;

CREATE TABLE tbl_driver (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    license_expiry VARCHAR(100) NOT NULL,

    -- Foreign key constraints
    FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Index for the user_id field
CREATE INDEX fk_driver_user ON tbl_driver(user_id);


CREATE TABLE tbl_truck (
    truck_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id int NOT NULL,
    rented bit,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year_of_manufacture INT NOT NULL,
    vin VARCHAR(255) NOT NULL UNIQUE,
    license_plate_number VARCHAR(50) NOT NULL,
    license_plate_state_province VARCHAR(50) NOT NULL,
    truck_type VARCHAR(100) NOT NULL,
    truck_capacity VARCHAR(50),
    owner_name VARCHAR(255) NOT NULL,
    lease_details TEXT,
    insurance_provider VARCHAR(255),
    insurance_policy_number VARCHAR(255),
    fuel_efficiency varchar(100),
    tare_weight varchar(100), -- empty truck weight
    payload_capacity varchar(100),
    volume varchar(100) NOT NULL,
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    dot_compliance_number VARCHAR(50), -- USA-specific
    cvor_number VARCHAR(50), -- Canada-specific
    cargo_restrictions TEXT,
    vehicle_notes TEXT,
    special_permits TEXT,
    
     -- Foreign key constraints
    FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE ON UPDATE CASCADE 
);
