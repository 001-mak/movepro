
SELECT CONCAT('ALTER TABLE ', table_name, ' ENGINE=InnoDB;') AS alter_statement
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'moventrycrm' AND ENGINE != 'InnoDB';


ALTER TABLE square_payment ENGINE=InnoDB;
ALTER TABLE tbl_alerts ENGINE=InnoDB;
ALTER TABLE tbl_company ENGINE=InnoDB;
ALTER TABLE tbl_discounts ENGINE=InnoDB;
ALTER TABLE tbl_email_open_track ENGINE=InnoDB;
ALTER TABLE tbl_email_template_names ENGINE=InnoDB;
ALTER TABLE tbl_email_templates ENGINE=InnoDB;
ALTER TABLE tbl_embedded_forms ENGINE=InnoDB;
ALTER TABLE tbl_estimate_open_track ENGINE=InnoDB;
ALTER TABLE tbl_internal_chat ENGINE=InnoDB;
ALTER TABLE tbl_inventory_group ENGINE=InnoDB;
ALTER TABLE tbl_inventory_groups_item ENGINE=InnoDB;
ALTER TABLE tbl_lead_feed ENGINE=InnoDB;
ALTER TABLE tbl_leads ENGINE=InnoDB;
ALTER TABLE tbl_logs ENGINE=InnoDB;
ALTER TABLE tbl_materials ENGINE=InnoDB;
ALTER TABLE tbl_moving_reminder_sent ENGINE=InnoDB;
ALTER TABLE tbl_notifications ENGINE=InnoDB;
ALTER TABLE tbl_outgoing_email ENGINE=InnoDB;
ALTER TABLE tbl_payment ENGINE=InnoDB;
ALTER TABLE tbl_payment_processing_fee ENGINE=InnoDB;
ALTER TABLE tbl_payment_requests ENGINE=InnoDB;
ALTER TABLE tbl_payment_setting ENGINE=InnoDB;
ALTER TABLE tbl_plan_purchased ENGINE=InnoDB;
ALTER TABLE tbl_plans ENGINE=InnoDB;
ALTER TABLE tbl_provider ENGINE=InnoDB;
ALTER TABLE tbl_quotation ENGINE=InnoDB;
ALTER TABLE tbl_roles ENGINE=InnoDB;
ALTER TABLE tbl_services ENGINE=InnoDB;
ALTER TABLE tbl_sms_templates ENGINE=InnoDB;
ALTER TABLE tbl_subscription_history ENGINE=InnoDB;
ALTER TABLE tbl_tax ENGINE=InnoDB;
ALTER TABLE tbl_text_messaging ENGINE=InnoDB;
ALTER TABLE tbl_trucks ENGINE=InnoDB;
ALTER TABLE tbl_valuation ENGINE=InnoDB;

/*** ----------- Added User_id FOREIGN key constraints ******/
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=0;   

ALTER TABLE lead_square_transaction ADD CONSTRAINT fk_lead_square_transaction_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE square_transaction ADD CONSTRAINT fk_square_transaction_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_additional_services ADD CONSTRAINT fk_additional_services_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_alerts ADD CONSTRAINT fk_alerts_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_company ADD CONSTRAINT fk_company_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_deposit ADD CONSTRAINT fk_deposit_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_discounts ADD CONSTRAINT fk_discounts_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_email_templates ADD CONSTRAINT fk_email_templates_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_email_template_names ADD CONSTRAINT fk_email_template_names_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_embedded_forms ADD CONSTRAINT fk_embedded_forms_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_inventory_group ADD CONSTRAINT fk_inventory_group_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_leads ADD CONSTRAINT fk_leads_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_lead_feed ADD CONSTRAINT fk_lead_feed_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_logs ADD CONSTRAINT fk_logs_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_materials ADD CONSTRAINT fk_materials_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_moving_reminder_sent ADD CONSTRAINT fk_moving_reminder_sent_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_notifications ADD CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_outgoing_email ADD CONSTRAINT fk_outgoing_email_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_payment ADD CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_payment_processing_fee ADD CONSTRAINT fk_payment_processing_fee_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_payment_setting ADD CONSTRAINT fk_payment_setting_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_plan_purchased ADD CONSTRAINT fk_plan_purchased_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_provider ADD CONSTRAINT fk_provider_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_services ADD CONSTRAINT fk_services_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_sms_templates ADD CONSTRAINT fk_sms_templates_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_subscription_history ADD CONSTRAINT fk_subscription_history_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_tax ADD CONSTRAINT fk_tax_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_text_messaging ADD CONSTRAINT fk_text_messaging_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_trucks ADD CONSTRAINT fk_trucks_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_valuation ADD CONSTRAINT fk_valuation_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
/*** ----------- End User_id FOREIGN key constraints ******/


/***
Changes made:
1. lead_id is now refering to tbl_lead id column
2. renamed n_id of tbl_newsletter, chat_id and chat_system to id
3. tbl_support forigne keys added
***/

START TRANSACTION;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS; 
SET FOREIGN_KEY_CHECKS=0;  

ALTER TABLE tbl_card_details MODIFY id int(11) NOT NULL;

ALTER TABLE tbl_support ADD CONSTRAINT fk_support_sender FOREIGN KEY (sender_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

ALTER TABLE tbl_support_reply ADD CONSTRAINT fk_support_reply_sender FOREIGN KEY (sender_id) REFERENCES tbl_user(id) ON DELETE CASCADE;

update tbl_claim_form t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);

ALTER TABLE tbl_claim_form MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_claim_form
ADD CONSTRAINT fk_claim_form_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_email_open_track t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);

ALTER TABLE tbl_email_open_track MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_email_open_track
ADD CONSTRAINT fk_email_open_track_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_estimate_open_track t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_estimate_open_track MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_estimate_open_track
ADD CONSTRAINT fk_estimate_open_track_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_invoice_sign t set lead_id=(select id from tbl_leads tl where tl.lead_id=CONVERT(t.lead_id USING utf8mb3) COLLATE utf8mb3_unicode_ci ORDER BY id limit 1);
ALTER TABLE tbl_invoice_sign MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_invoice_sign
ADD CONSTRAINT fk_invoice_sign_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_lead_feed t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_lead_feed MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_lead_feed
ADD CONSTRAINT fk_lead_feed_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_moving_reminder_sent t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_moving_reminder_sent MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_moving_reminder_sent
ADD CONSTRAINT fk_moving_reminder_sent_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_outgoing_email t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_outgoing_email MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_outgoing_email
ADD CONSTRAINT fk_outgoing_email_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_payment_requests t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_payment_requests MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_payment_requests
ADD CONSTRAINT fk_payment_requests_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_quotation t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_quotation MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_quotation
ADD CONSTRAINT fk_quotation_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_quote_acceptance t set lead_id=(select id from tbl_leads tl where tl.lead_id=CONVERT(t.lead_id USING utf8mb3) COLLATE utf8mb3_unicode_ci ORDER BY id limit 1);
ALTER TABLE tbl_quote_acceptance MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_quote_acceptance
ADD CONSTRAINT fk_quote_acceptance_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_service_completion_form t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_service_completion_form MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_service_completion_form
ADD CONSTRAINT fk_service_completion_form_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_text_messaging t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_text_messaging MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_text_messaging
ADD CONSTRAINT fk_text_messaging_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

update tbl_waiver_form t set lead_id=(select id from tbl_leads tl where tl.lead_id=t.lead_id ORDER BY id limit 1);
ALTER TABLE tbl_waiver_form MODIFY lead_id int(11) NOT NULL;

ALTER TABLE tbl_waiver_form
ADD CONSTRAINT fk_waiver_form_lead
FOREIGN KEY (lead_id) REFERENCES tbl_leads(id)
ON DELETE CASCADE;

ALTER TABLE tbl_support_reply
ADD CONSTRAINT fk_support_reply_support
FOREIGN KEY (support_id) REFERENCES tbl_support(id)
ON DELETE CASCADE;

ALTER TABLE tbl_claim_items
ADD CONSTRAINT fk_claim_item_claim
FOREIGN KEY (claim_id) REFERENCES tbl_claim_form(id)
ON DELETE CASCADE;

ALTER TABLE all_aggrement
ADD CONSTRAINT fk_aggrement_company
FOREIGN KEY (company_id) REFERENCES tbl_company(id)
ON DELETE CASCADE;

ALTER TABLE tbl_newsletter CHANGE n_id id INT AUTO_INCREMENT NOT NULL;

ALTER TABLE chat_system CHANGE chat_id id INT AUTO_INCREMENT NOT NULL;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
COMMIT;

/** Added New **/
ALTER TABLE tbl_inventory_groups_item ADD CONSTRAINT fk_inventory_group_item_group FOREIGN KEY (group_id) REFERENCES tbl_inventory_group(id) ON DELETE CASCADE;

/****** fixed company id schema ******/

ALTER table tbl_user add COLUMN company_id int(11) NULL;

Update tbl_user t SET company_id =(SELECT tc.id from tbl_company tc where tc.user_id=t.id LIMIT 1);

DELETE from tbl_company where user_id in (SELECT DISTINCT u1.added_by
FROM tbl_user u1
LEFT JOIN tbl_user u2 ON u1.added_by = u2.id
WHERE u1.added_by IS NOT NULL and u1.added_by > 0 AND u2.id IS NULL);

WITH UserToDelete AS (
    SELECT u1.id
    FROM tbl_user u1
    LEFT JOIN tbl_user u2 ON u1.added_by = u2.id
    WHERE u1.added_by IS NOT NULL AND u1.added_by > 0 AND u2.id IS NULL
)
DELETE FROM tbl_user
WHERE id IN (SELECT id FROM UserToDelete);

WITH UserCompany AS (
    SELECT t.id AS user_id, tc.company_id
    FROM tbl_user t
    JOIN tbl_user tc ON t.added_by = tc.id
    WHERE t.added_by > 0
)
UPDATE tbl_user t
JOIN UserCompany uc ON t.id = uc.user_id
SET t.company_id = uc.company_id;

/****** fixed company id schema ******/


ALTER TABLE tbl_package
    CHANGE COLUMN text1 users_limit INT(11) NULL,
    CHANGE COLUMN text2 leads_limit INT(11) NULL,
    CHANGE COLUMN text5 sms_limit INT(11) NULL;

ALTER TABLE tbl_package
    DROP COLUMN bg_image;

ALTER TABLE tbl_user ADD CONSTRAINT fk_user_company FOREIGN KEY (company_id) REFERENCES tbl_company(id);


ALTER TABLE tbl_leads
CHANGE COLUMN `2ndLoadingDwellingSize` `secLoadingDwellingSize` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndLoadingPlaceName` `secLoadingPlaceName` VARCHAR(100) NOT NULL,
CHANGE COLUMN `2ndLoadingApartment` `secLoadingApartment` VARCHAR(200) NOT NULL,
CHANGE COLUMN `2ndLoadingAddress` `secLoadingAddress` VARCHAR(50) NOT NULL,
CHANGE COLUMN `2ndLoadingZip` `secLoadingZip` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndLoadingLat` `secLoadingLat` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndLoadingLong` `secLoadingLong` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndLoadingCity` `secLoadingCity` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndLoadingState` `secLoadingState` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndLoadingStairs` `secLoadingStairs` VARCHAR(5) NOT NULL,
CHANGE COLUMN `2ndLoadingNeedHelpPacking` `secLoadingNeedHelpPacking` VARCHAR(1) NOT NULL,
CHANGE COLUMN `2ndLoadingPackingDate` `secLoadingPackingDate` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndLoadingPackingTime` `secLoadingPackingTime` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndLoadingElevator` `secLoadingElevator` VARCHAR(1) NOT NULL,
CHANGE COLUMN `2ndLoadingGarage` `secLoadingGarage` VARCHAR(1) NOT NULL,
CHANGE COLUMN `2ndLoadingNotes` `secLoadingNotes` MEDIUMTEXT NOT NULL,
CHANGE COLUMN `2ndUnloadingDwellingSize` `secUnloadingDwellingSize` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndUnloadingPlaceName` `secUnloadingPlaceName` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndUnloadingApartment` `secUnloadingApartment` VARCHAR(100) NOT NULL,
CHANGE COLUMN `2ndUnloadingAddress` `secUnloadingAddress` VARCHAR(50) NOT NULL,
CHANGE COLUMN `2ndUnloadingZip` `secUnloadingZip` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndUnoadingLat` `secUnloadingLat` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndUnoadingLong` `secUnloadingLong` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndUnloadingCity` `secUnloadingCity` VARCHAR(10) NOT NULL,
CHANGE COLUMN `2ndUnloadingState` `secUnloadingState` VARCHAR(20) NOT NULL,
CHANGE COLUMN `2ndUnloadingStairs` `secUnloadingStairs` VARCHAR(5) NOT NULL,
CHANGE COLUMN `2ndUnloadingNeedHelpPacking` `secUnloadingNeedHelpPacking` VARCHAR(1) NOT NULL,
CHANGE COLUMN `2ndUnloadingElevator` `secUnloadingElevator` VARCHAR(1) NOT NULL,
CHANGE COLUMN `2ndLeadUnloadingNotes` `secLeadUnloadingNotes` MEDIUMTEXT NOT NULL;

update tbl_user set role='6' where role='2';
update tbl_user set role='7' where role='4';

ALTER TABLE tbl_leads MODIFY COLUMN assigned_date DATETIME NULL;

UPDATE tbl_leads
SET assigned_date = '2021-01-04 03:27:29'
WHERE assigned_date is NULL;

ALTER TABLE tbl_leads MODIFY COLUMN assigned_date DATETIME NULL;

UPDATE tbl_leads
SET assigned_date= NULL
WHERE assigned_date = '2021-01-04 03:27:29';


update tbl_user set hire_date='1975-01-01 03:27:29';

SET FOREIGN_KEY_CHECKS=0;

ALTER TABLE tbl_user
MODIFY COLUMN hire_date DATETIME,
DROP COLUMN company_name;
SET FOREIGN_KEY_CHECKS=1;

ALTER TABLE tbl_company
ADD COLUMN plan_purchased INT(11),
ADD COLUMN plan_purchased_status VARCHAR(1) NOT NULL DEFAULT '1';

UPDATE tbl_company c
JOIN tbl_user u ON c.user_id = u.id
SET c.plan_purchased_status = u.plan_purchased_status,
    c.plan_purchased = u.plan_purchased
WHERE c.user_id IS NOT NULL;

ALTER TABLE tbl_user
DROP COLUMN plan_purchased_status,
DROP COLUMN plan_purchased;


-- Add unique constraint to username column
ALTER TABLE tbl_user
ADD CONSTRAINT unique_username UNIQUE (username);

-- Add unique constraint to email column
ALTER TABLE tbl_user
ADD CONSTRAINT unique_email UNIQUE (email_id);

ALTER TABLE tbl_user
  MODIFY COLUMN alter_phone_no VARCHAR(20) NULL,
  MODIFY COLUMN picture VARCHAR(500) NULL,
  MODIFY COLUMN bio MEDIUMTEXT NULL,
  MODIFY COLUMN cover_photo VARCHAR(500) NULL,
  MODIFY COLUMN added_by INT NULL,
  MODIFY COLUMN validation_id VARCHAR(250) NULL,
  MODIFY COLUMN reset_key VARCHAR(250) NULL,
  MODIFY COLUMN ssn VARCHAR(20) NULL,
  MODIFY COLUMN starting_pay VARCHAR(10) NULL,
  MODIFY COLUMN current_pay VARCHAR(10) NULL,
  MODIFY COLUMN eligible_sales INT NULL,
  MODIFY COLUMN lead_commision VARCHAR(10) NULL,
  MODIFY COLUMN annual_sale VARCHAR(10) NULL,
  MODIFY COLUMN lifetime_sale VARCHAR(10) NULL,
  MODIFY COLUMN lifetime_commision VARCHAR(10) NULL,
  MODIFY COLUMN employee_type INT NULL,
  MODIFY COLUMN notes MEDIUMTEXT NULL,
  MODIFY COLUMN Agreement MEDIUMTEXT NULL;

ALTER TABLE tbl_company ADD CONSTRAINT fk_company_owner_user FOREIGN KEY (user_id) REFERENCES tbl_user(id) ON DELETE CASCADE;
ALTER TABLE tbl_company ADD CONSTRAINT fk_company_planid FOREIGN KEY (plan_purchased) REFERENCES tbl_package(id);

ALTER TABLE tbl_package add column code VARCHAR(25);

-- tbl_trucks
ALTER TABLE tbl_trucks add column `company_id` int(11);
ALTER TABLE tbl_trucks ADD CONSTRAINT fk_truck_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_trucks tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

DELETE from tbl_trucks where company_id is null;
ALTER TABLE tbl_trucks MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_trucks DROP FOREIGN KEY fk_trucks_user;
ALTER TABLE tbl_trucks DROP COLUMN user_id;

-- tbl_trucks
ALTER TABLE tbl_trucks add column `company_id` int(11);
ALTER TABLE tbl_trucks ADD CONSTRAINT fk_truck_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_trucks tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

DELETE from tbl_trucks where company_id is null;
ALTER TABLE tbl_trucks MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_trucks DROP FOREIGN KEY fk_trucks_user;
ALTER TABLE tbl_trucks DROP COLUMN user_id;

-- lead_square_transaction
ALTER TABLE lead_square_transaction add column `company_id` int(11);
ALTER TABLE lead_square_transaction ADD CONSTRAINT fk_lead_square_transaction_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE lead_square_transaction tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from lead_square_transaction where company_id is null;

ALTER TABLE lead_square_transaction
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE lead_square_transaction DROP FOREIGN KEY fk_lead_square_transaction_user;

ALTER TABLE lead_square_transaction DROP COLUMN user_id;

-- square_transaction
ALTER TABLE square_transaction add column `company_id` int(11);
ALTER TABLE square_transaction ADD CONSTRAINT fk_square_transaction_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE square_transaction tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from square_transaction where company_id is null;

ALTER TABLE square_transaction
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE square_transaction DROP FOREIGN KEY fk_square_transaction_user;

ALTER TABLE square_transaction DROP COLUMN user_id;

-- tbl_additional_services
ALTER TABLE tbl_additional_services add column `company_id` int(11);
ALTER TABLE tbl_additional_services ADD CONSTRAINT fk_tbl_additional_services_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_additional_services tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_additional_services where company_id is null;

ALTER TABLE tbl_additional_services
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_additional_services DROP FOREIGN KEY fk_additional_services_user;

ALTER TABLE tbl_additional_services DROP COLUMN user_id;

-- tbl_alerts
ALTER TABLE tbl_alerts add column `company_id` int(11);
ALTER TABLE tbl_alerts ADD CONSTRAINT fk_tbl_alerts_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_alerts tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_alerts where company_id is null;

ALTER TABLE tbl_alerts
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_alerts DROP FOREIGN KEY fk_alerts_user;

ALTER TABLE tbl_alerts DROP COLUMN user_id;

-- tbl_deposit
ALTER TABLE tbl_deposit add column `company_id` int(11);
ALTER TABLE tbl_deposit ADD CONSTRAINT fk_tbl_deposit_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_deposit tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_deposit where company_id is null;

ALTER TABLE tbl_deposit
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_deposit DROP FOREIGN KEY fk_deposit_user;

ALTER TABLE tbl_deposit DROP COLUMN user_id;

-- tbl_discounts
ALTER TABLE tbl_discounts add column `company_id` int(11);
ALTER TABLE tbl_discounts ADD CONSTRAINT fk_tbl_discounts_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_discounts tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_discounts where company_id is null;

ALTER TABLE tbl_discounts
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_discounts DROP FOREIGN KEY fk_discounts_user;

ALTER TABLE tbl_discounts DROP COLUMN user_id;

-- tbl_email_templates
ALTER TABLE tbl_email_templates add column `company_id` int(11);
ALTER TABLE tbl_email_templates ADD CONSTRAINT fk_tbl_email_templates_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_email_templates tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_email_templates where company_id is null;

ALTER TABLE tbl_email_templates
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_email_templates DROP FOREIGN KEY fk_email_templates_user;

ALTER TABLE tbl_email_templates DROP COLUMN user_id;

-- tbl_email_template_names
ALTER TABLE tbl_email_template_names add column `company_id` int(11);
ALTER TABLE tbl_email_template_names ADD CONSTRAINT fk_tbl_email_template_names_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_email_template_names tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_email_template_names where company_id is null;

ALTER TABLE tbl_email_template_names
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_email_template_names DROP FOREIGN KEY fk_email_template_names_user;

ALTER TABLE tbl_email_template_names DROP COLUMN user_id;

-- tbl_embedded_forms
ALTER TABLE tbl_embedded_forms add column `company_id` int(11);
ALTER TABLE tbl_embedded_forms ADD CONSTRAINT fk_tbl_embedded_forms_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_embedded_forms tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_embedded_forms where company_id is null;

ALTER TABLE tbl_embedded_forms
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_embedded_forms DROP FOREIGN KEY fk_embedded_forms_user;

ALTER TABLE tbl_embedded_forms DROP COLUMN user_id;

-- tbl_inventory_group
ALTER TABLE tbl_inventory_group add column `company_id` int(11);
ALTER TABLE tbl_inventory_group ADD CONSTRAINT fk_tbl_inventory_group_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_inventory_group tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_inventory_group where company_id is null;

ALTER TABLE tbl_inventory_group
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_inventory_group DROP FOREIGN KEY fk_inventory_group_user;

ALTER TABLE tbl_inventory_group DROP COLUMN user_id;

-- tbl_leads
ALTER TABLE tbl_leads add column `company_id` int(11);
ALTER TABLE tbl_leads ADD CONSTRAINT fk_tbl_leads_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_leads tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_leads where company_id is null;

ALTER TABLE tbl_leads
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_leads DROP FOREIGN KEY fk_leads_user;

ALTER TABLE tbl_leads DROP COLUMN user_id;

-- tbl_lead_feed
ALTER TABLE tbl_lead_feed add column `company_id` int(11);
ALTER TABLE tbl_lead_feed ADD CONSTRAINT fk_tbl_lead_feed_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_lead_feed tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_lead_feed where company_id is null;

ALTER TABLE tbl_lead_feed
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_lead_feed DROP FOREIGN KEY fk_lead_feed_user;

ALTER TABLE tbl_lead_feed DROP COLUMN user_id;

-- tbl_logs
ALTER TABLE tbl_logs add column `company_id` int(11);
ALTER TABLE tbl_logs ADD CONSTRAINT fk_tbl_logs_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_logs tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_logs where company_id is null;

ALTER TABLE tbl_logs
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_logs DROP FOREIGN KEY fk_logs_user;

ALTER TABLE tbl_logs DROP COLUMN user_id;

-- tbl_materials
ALTER TABLE tbl_materials add column `company_id` int(11);
ALTER TABLE tbl_materials ADD CONSTRAINT fk_tbl_materials_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_materials tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_materials where company_id is null;

ALTER TABLE tbl_materials
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_materials DROP FOREIGN KEY fk_materials_user;

ALTER TABLE tbl_materials DROP COLUMN user_id;

-- tbl_moving_reminder_sent
ALTER TABLE tbl_moving_reminder_sent add column `company_id` int(11);
ALTER TABLE tbl_moving_reminder_sent ADD CONSTRAINT fk_tbl_moving_reminder_sent_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_moving_reminder_sent tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_moving_reminder_sent where company_id is null;

ALTER TABLE tbl_moving_reminder_sent
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_moving_reminder_sent DROP FOREIGN KEY fk_moving_reminder_sent_user;

ALTER TABLE tbl_moving_reminder_sent DROP COLUMN user_id;

-- tbl_notifications
ALTER TABLE tbl_notifications add column `company_id` int(11);
ALTER TABLE tbl_notifications ADD CONSTRAINT fk_tbl_notifications_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_notifications tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_notifications where company_id is null;

ALTER TABLE tbl_notifications
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_notifications DROP FOREIGN KEY fk_notifications_user;

ALTER TABLE tbl_notifications DROP COLUMN user_id;

-- tbl_outgoing_email
ALTER TABLE tbl_outgoing_email add column `company_id` int(11);
ALTER TABLE tbl_outgoing_email ADD CONSTRAINT fk_tbl_outgoing_email_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_outgoing_email tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_outgoing_email where company_id is null;

ALTER TABLE tbl_outgoing_email
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_outgoing_email DROP FOREIGN KEY fk_outgoing_email_user;

ALTER TABLE tbl_outgoing_email DROP COLUMN user_id;

-- tbl_payment
ALTER TABLE tbl_payment add column `company_id` int(11);
ALTER TABLE tbl_payment ADD CONSTRAINT fk_tbl_payment_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_payment tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_payment where company_id is null;

ALTER TABLE tbl_payment
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_payment DROP FOREIGN KEY fk_payment_user;

ALTER TABLE tbl_payment DROP COLUMN user_id;

-- tbl_payment_processing_fee
ALTER TABLE tbl_payment_processing_fee add column `company_id` int(11);
ALTER TABLE tbl_payment_processing_fee ADD CONSTRAINT fk_tbl_payment_processing_fee_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_payment_processing_fee tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_payment_processing_fee where company_id is null;

ALTER TABLE tbl_payment_processing_fee
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_payment_processing_fee DROP FOREIGN KEY fk_payment_processing_fee_user;

ALTER TABLE tbl_payment_processing_fee DROP COLUMN user_id;

-- tbl_payment_setting
ALTER TABLE tbl_payment_setting add column `company_id` int(11);
ALTER TABLE tbl_payment_setting ADD CONSTRAINT fk_tbl_payment_setting_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_payment_setting tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_payment_setting where company_id is null;

ALTER TABLE tbl_payment_setting
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_payment_setting DROP FOREIGN KEY fk_payment_setting_user;

ALTER TABLE tbl_payment_setting DROP COLUMN user_id;

-- tbl_plan_purchased
ALTER TABLE tbl_plan_purchased add column `company_id` int(11);
ALTER TABLE tbl_plan_purchased ADD CONSTRAINT fk_tbl_plan_purchased_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_plan_purchased tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_plan_purchased where company_id is null;

ALTER TABLE tbl_plan_purchased
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_plan_purchased DROP FOREIGN KEY fk_plan_purchased_user;

ALTER TABLE tbl_plan_purchased DROP COLUMN user_id;

-- tbl_provider
ALTER TABLE tbl_provider add column `company_id` int(11);
ALTER TABLE tbl_provider ADD CONSTRAINT fk_tbl_provider_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_provider tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_provider where company_id is null;

ALTER TABLE tbl_provider
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_provider DROP FOREIGN KEY fk_provider_user;

ALTER TABLE tbl_provider DROP COLUMN user_id;

-- tbl_services
ALTER TABLE tbl_services add column `company_id` int(11);
ALTER TABLE tbl_services ADD CONSTRAINT fk_tbl_services_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_services tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_services where company_id is null;

ALTER TABLE tbl_services
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_services DROP FOREIGN KEY fk_services_user;

ALTER TABLE tbl_services DROP COLUMN user_id;

-- tbl_sms_templates
ALTER TABLE tbl_sms_templates add column `company_id` int(11);
ALTER TABLE tbl_sms_templates ADD CONSTRAINT fk_tbl_sms_templates_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_sms_templates tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_sms_templates where company_id is null;

ALTER TABLE tbl_sms_templates
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_sms_templates DROP FOREIGN KEY fk_sms_templates_user;

ALTER TABLE tbl_sms_templates DROP COLUMN user_id;

-- tbl_subscription_history
ALTER TABLE tbl_subscription_history add column `company_id` int(11);
ALTER TABLE tbl_subscription_history ADD CONSTRAINT fk_tbl_subscription_history_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_subscription_history tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_subscription_history where company_id is null;

ALTER TABLE tbl_subscription_history
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_subscription_history DROP FOREIGN KEY fk_subscription_history_user;

ALTER TABLE tbl_subscription_history DROP COLUMN user_id;

-- tbl_tax
ALTER TABLE tbl_tax add column `company_id` int(11);
ALTER TABLE tbl_tax ADD CONSTRAINT fk_tbl_tax_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_tax tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_tax where company_id is null;

ALTER TABLE tbl_tax
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_tax DROP FOREIGN KEY fk_tax_user;

ALTER TABLE tbl_tax DROP COLUMN user_id;

-- tbl_text_messaging
ALTER TABLE tbl_text_messaging add column `company_id` int(11);
ALTER TABLE tbl_text_messaging ADD CONSTRAINT fk_tbl_text_messaging_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_text_messaging tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_text_messaging where company_id is null;

ALTER TABLE tbl_text_messaging
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_text_messaging DROP FOREIGN KEY fk_text_messaging_user;

ALTER TABLE tbl_text_messaging DROP COLUMN user_id;

-- tbl_valuation
ALTER TABLE tbl_valuation add column `company_id` int(11);
ALTER TABLE tbl_valuation ADD CONSTRAINT fk_tbl_valuation_company FOREIGN KEY (company_id) REFERENCES tbl_company(id) ON DELETE CASCADE;

UPDATE tbl_valuation tr
SET tr.company_id = (
    SELECT c.id 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
)
WHERE EXISTS (
    SELECT 1 
    FROM tbl_company c 
    WHERE c.user_id = tr.user_id
);

delete from tbl_valuation where company_id is null;

ALTER TABLE tbl_valuation
MODIFY COLUMN company_id int(11) NOT NULL;

ALTER TABLE tbl_valuation DROP FOREIGN KEY fk_valuation_user;

ALTER TABLE tbl_valuation DROP COLUMN user_id;


---- NEw Changes from 7/14/2024 

ALTER TABLE tbl_company
MODIFY COLUMN social_fb VARCHAR(255) NULL,
MODIFY COLUMN social_tw VARCHAR(255) NULL,
MODIFY COLUMN social_in VARCHAR(255) NULL,
MODIFY COLUMN social_insta VARCHAR(255) NULL,
MODIFY COLUMN social_tube VARCHAR(255) NULL,
MODIFY COLUMN social_pin VARCHAR(255) NULL,
MODIFY COLUMN street VARCHAR(255) NULL;

ALTER TABLE tbl_company
MODIFY COLUMN company_logo VARCHAR(255) NULL,
MODIFY COLUMN minimum_hour VARCHAR(100) NULL,
MODIFY COLUMN slogan VARCHAR(100) NULL,
MODIFY COLUMN tax_id VARCHAR(100) NULL,
MODIFY COLUMN us_dot VARCHAR(100) NULL,
MODIFY COLUMN company_mc VARCHAR(100) NULL,
MODIFY COLUMN website VARCHAR(255) NULL;


ALTER TABLE email_template
ADD COLUMN code VARCHAR(255);

UPDATE email_template set code=template;

ALTER TABLE email_template
MODIFY COLUMN code VARCHAR(255) not null UNIQUE;


-- New Changes after 7/18/2024
ALTER TABLE tbl_materials
MODIFY COLUMN material_price FLOAT(10,2) not null;

ALTER TABLE tbl_materials
MODIFY COLUMN material_description VARCHAR(500) null;

ALTER TABLE tbl_deposit
MODIFY COLUMN deposit_price FLOAT(10,2) not null;

ALTER TABLE tbl_deposit
MODIFY COLUMN deposit_description VARCHAR(500) null;

ALTER TABLE tbl_discounts
MODIFY COLUMN discount_price FLOAT(10,2) not null;

ALTER TABLE tbl_discounts
MODIFY COLUMN discount_description VARCHAR(500) null;

ALTER TABLE tbl_additional_services
ADD COLUMN description VARCHAR(500) null;

ALTER TABLE tbl_additional_services
MODIFY COLUMN cost FLOAT(10,2) not null;

ALTER TABLE tbl_valuation
ADD COLUMN description VARCHAR(500) null;

ALTER TABLE tbl_valuation
MODIFY COLUMN storage VARCHAR(250) null;

UPDATE tbl_valuation
SET cost = CAST(REPLACE(cost, '$', '') AS DECIMAL(10, 2));

ALTER TABLE tbl_valuation
MODIFY COLUMN cost FLOAT(10,2) not null;

UPDATE tbl_valuation
SET deductable = CAST(REPLACE(deductable, '$', '') AS DECIMAL(10, 2));

ALTER TABLE tbl_valuation
MODIFY COLUMN deductable FLOAT(10,2) not null;

UPDATE tbl_valuation
SET maximum_rate = CAST(REPLACE(maximum_rate, '$', '') AS DECIMAL(10, 2));

ALTER TABLE tbl_valuation
MODIFY COLUMN maximum_rate FLOAT(10,2) not null;

ALTER TABLE tbl_inventory_group RENAME tbl_inventory_groups;
ALTER TABLE tbl_inventory_groups_item RENAME tbl_inventory_group_items;

-- executed on dev