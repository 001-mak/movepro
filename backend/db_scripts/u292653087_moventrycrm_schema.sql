-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 28, 2024 at 08:08 AM
-- Server version: 10.6.17-MariaDB-cll-lve
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
-- SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u292653087_moventrycrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_aggrement`
--

CREATE TABLE `all_aggrement` (
  `id` int(11) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `moving_policy` text NOT NULL,
  `deposit_disclaimer` text NOT NULL,
  `final_payment` text NOT NULL,
  `claim` text NOT NULL,
  `waiver` text NOT NULL,
  `final_inspection` text NOT NULL,
  `wavier_release_abiltiy` text DEFAULT NULL,
  `wavier_risky_task` text DEFAULT NULL,
  `wavier_damage` text DEFAULT NULL,
  `wavier_absent` text DEFAULT NULL,
  `wavier_disclaimer` text DEFAULT NULL,
  `service_relase_comp` text DEFAULT NULL,
  `service_cus_sign` text DEFAULT NULL,
  `claim_damage_rep` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_system`
--

CREATE TABLE `chat_system` (
  `chat_id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `chat_type` varchar(255) NOT NULL,
  `read_status` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_template`
--

CREATE TABLE `email_template` (
  `id` int(11) NOT NULL,
  `template` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lead_square_transaction`
--

CREATE TABLE `lead_square_transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` varchar(55) DEFAULT NULL,
  `payment_status` varchar(55) DEFAULT NULL,
  `delay_duration` varchar(55) DEFAULT NULL,
  `source_type` varchar(55) DEFAULT NULL,
  `amount` varchar(55) DEFAULT NULL,
  `currency` varchar(55) DEFAULT NULL,
  `card_status` varchar(55) DEFAULT NULL,
  `card_brand` varchar(55) DEFAULT NULL,
  `last_4` varchar(55) DEFAULT NULL,
  `exp_month` varchar(55) DEFAULT NULL,
  `exp_year` varchar(55) DEFAULT NULL,
  `fingerprint` varchar(55) DEFAULT NULL,
  `card_type` varchar(55) DEFAULT NULL,
  `bin` varchar(55) DEFAULT NULL,
  `entry_method` varchar(55) DEFAULT NULL,
  `cvv_status` varchar(55) DEFAULT NULL,
  `avs_status` varchar(55) DEFAULT NULL,
  `statement_description` varchar(55) DEFAULT NULL,
  `location_id` varchar(55) DEFAULT NULL,
  `order_id` varchar(55) DEFAULT NULL,
  `total_amount` varchar(55) DEFAULT NULL,
  `receipt_number` varchar(55) DEFAULT NULL,
  `receipt_url` varchar(255) DEFAULT NULL,
  `delay_action` varchar(55) DEFAULT NULL,
  `delayed_until` varchar(55) DEFAULT NULL,
  `created_at` varchar(55) DEFAULT NULL,
  `updated_at` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `square_payment`
--

CREATE TABLE `square_payment` (
  `id` int(11) NOT NULL,
  `application_id` varchar(255) NOT NULL,
  `location_id` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `square_transaction`
--

CREATE TABLE `square_transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_price` varchar(55) DEFAULT NULL,
  `package` varchar(55) DEFAULT NULL,
  `package_id` varchar(55) DEFAULT NULL,
  `payment_id` varchar(55) DEFAULT NULL,
  `payment_status` varchar(55) DEFAULT NULL,
  `delay_duration` varchar(55) DEFAULT NULL,
  `source_type` varchar(55) DEFAULT NULL,
  `amount` varchar(55) DEFAULT NULL,
  `currency` varchar(55) DEFAULT NULL,
  `card_status` varchar(55) DEFAULT NULL,
  `card_brand` varchar(55) DEFAULT NULL,
  `last_4` varchar(55) DEFAULT NULL,
  `exp_month` varchar(55) DEFAULT NULL,
  `exp_year` varchar(55) DEFAULT NULL,
  `fingerprint` varchar(55) DEFAULT NULL,
  `card_type` varchar(55) DEFAULT NULL,
  `bin` varchar(55) DEFAULT NULL,
  `entry_method` varchar(55) DEFAULT NULL,
  `cvv_status` varchar(55) DEFAULT NULL,
  `avs_status` varchar(55) DEFAULT NULL,
  `statement_description` varchar(55) DEFAULT NULL,
  `location_id` varchar(55) DEFAULT NULL,
  `order_id` varchar(55) DEFAULT NULL,
  `total_amount` varchar(55) DEFAULT NULL,
  `receipt_number` varchar(55) DEFAULT NULL,
  `receipt_url` varchar(255) DEFAULT NULL,
  `delay_action` varchar(55) DEFAULT NULL,
  `delayed_until` varchar(55) DEFAULT NULL,
  `created_at` varchar(55) DEFAULT NULL,
  `updated_at` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_admin_permission`
--

CREATE TABLE `sub_admin_permission` (
  `id` int(11) NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `menu_link` varchar(255) NOT NULL,
  `permission` varchar(55) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_additional_services`
--

CREATE TABLE `tbl_additional_services` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `cost` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_alerts`
--

CREATE TABLE `tbl_alerts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` mediumtext NOT NULL,
  `time` varchar(20) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_card_details`
--

CREATE TABLE `tbl_card_details` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `card_no` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `cvv` varchar(10) DEFAULT NULL,
  `card_type` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_claim_form`
--

CREATE TABLE `tbl_claim_form` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(20) NOT NULL,
  `moving_date` varchar(20) NOT NULL,
  `moving_time` varchar(10) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_email` varchar(50) NOT NULL,
  `damage_address` text NOT NULL,
  `sign_name` varchar(50) NOT NULL,
  `sign` text NOT NULL,
  `signed_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `disclaimer` text NOT NULL,
  `info1` varchar(100) NOT NULL,
  `customer_called` varchar(20) NOT NULL,
  `comment` text NOT NULL,
  `repair_replace` varchar(50) NOT NULL,
  `date` varchar(20) NOT NULL,
  `cost` varchar(20) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_claim_items`
--

CREATE TABLE `tbl_claim_items` (
  `id` int(11) NOT NULL,
  `claim_id` int(11) NOT NULL,
  `additionalinal_insurance` varchar(5) NOT NULL,
  `ins_co_nm` varchar(50) NOT NULL,
  `ins_co_ph` varchar(20) NOT NULL,
  `ins_po_num` varchar(50) NOT NULL,
  `item_claimed` varchar(50) NOT NULL,
  `item_weight` varchar(10) NOT NULL,
  `item_desc` text NOT NULL,
  `itempacked` varchar(20) NOT NULL,
  `pictureincluded` varchar(5) NOT NULL,
  `picture_url` text NOT NULL,
  `make_model` varchar(30) NOT NULL,
  `manuf` varchar(30) NOT NULL,
  `part_num` varchar(30) NOT NULL,
  `year_purchased` varchar(10) NOT NULL,
  `store_purch` varchar(30) NOT NULL,
  `item_color` varchar(20) NOT NULL,
  `item_pattern` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company`
--

CREATE TABLE `tbl_company` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
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
  `social_tube` mediumtext NOT NULL,
  `slogan` varchar(500) NOT NULL,
  `tax_id` varchar(100) NOT NULL,
  `us_dot` varchar(100) NOT NULL,
  `company_mc` varchar(100) NOT NULL,
  `minimum_hour` varchar(100) NOT NULL,
  `social_pin` mediumtext NOT NULL,
  `publish_key` varchar(200) NOT NULL,
  `secret_key` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_deposit`
--

CREATE TABLE `tbl_deposit` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `deposit_name` varchar(100) NOT NULL,
  `deposit_description` varchar(100) NOT NULL,
  `deposit_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_discounts`
--

CREATE TABLE `tbl_discounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `discount_name` varchar(100) NOT NULL,
  `discount_price` varchar(100) NOT NULL,
  `discount_type` int(1) NOT NULL DEFAULT 1,
  `discount_description` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_email_open_track`
--

CREATE TABLE `tbl_email_open_track` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(12) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_email_templates`
--

CREATE TABLE `tbl_email_templates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `template` varchar(50) NOT NULL,
  `greeting_text` mediumtext NOT NULL,
  `middle_text` mediumtext NOT NULL,
  `button_text` mediumtext NOT NULL,
  `button_link` mediumtext NOT NULL,
  `button_bottom_text` mediumtext NOT NULL,
  `header_color` varchar(20) NOT NULL,
  `footer_color` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_email_template_names`
--

CREATE TABLE `tbl_email_template_names` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `template_type` varchar(50) NOT NULL,
  `templateName` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_embedded_forms`
--

CREATE TABLE `tbl_embedded_forms` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `form_name` varchar(200) NOT NULL,
  `form_phone` varchar(15) NOT NULL,
  `form_email` varchar(200) NOT NULL,
  `form_address` varchar(500) NOT NULL,
  `form_fb` varchar(250) NOT NULL,
  `form_tw` varchar(250) NOT NULL,
  `form_in` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_estimate_open_track`
--

CREATE TABLE `tbl_estimate_open_track` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(12) NOT NULL,
  `time` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_faq`
--

CREATE TABLE `tbl_faq` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `type` varchar(55) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_footer`
--

CREATE TABLE `tbl_footer` (
  `id` int(11) NOT NULL,
  `first_heading` varchar(255) DEFAULT NULL,
  `first_content` varchar(255) DEFAULT NULL,
  `second_heading` varchar(255) DEFAULT NULL,
  `second_content` varchar(255) DEFAULT NULL,
  `third_heading` varchar(255) DEFAULT NULL,
  `third_content` varchar(255) DEFAULT NULL,
  `fourth_heading` varchar(255) DEFAULT NULL,
  `fourth_content` varchar(255) DEFAULT NULL,
  `facebook_link` varchar(255) DEFAULT NULL,
  `twitter_link` varchar(255) DEFAULT NULL,
  `instagram_link` varchar(255) DEFAULT NULL,
  `linkedin_link` varchar(500) NOT NULL,
  `copyright_content` varchar(500) NOT NULL,
  `copyright` varchar(255) DEFAULT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_home`
--

CREATE TABLE `tbl_home` (
  `id` int(11) NOT NULL,
  `title` char(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `content_title` varchar(255) DEFAULT NULL,
  `content_text` varchar(1000) DEFAULT NULL,
  `content_image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_internal_chat`
--

CREATE TABLE `tbl_internal_chat` (
  `id` int(11) NOT NULL,
  `sender` varchar(10) NOT NULL,
  `receiver` varchar(10) NOT NULL,
  `message` mediumtext NOT NULL,
  `send_time` varchar(30) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0',
  `chat_type` varchar(55) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory_group`
--

CREATE TABLE `tbl_inventory_group` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory_groups_item`
--

CREATE TABLE `tbl_inventory_groups_item` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_size` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_invoice_sign`
--

CREATE TABLE `tbl_invoice_sign` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(20) NOT NULL,
  `sign` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_leads`
--

CREATE TABLE `tbl_leads` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL COMMENT '0=manual',
  `assigned_to` int(11) NOT NULL DEFAULT 0,
  `lead_id` varchar(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(150) NOT NULL,
  `comments` mediumtext NOT NULL,
  `JobDetail` varchar(1) NOT NULL,
  `JobType` varchar(50) NOT NULL,
  `ServiceType` varchar(50) NOT NULL,
  `DesiredDate` varchar(20) NOT NULL,
  `DesiredTime` varchar(20) NOT NULL,
  `MoveDate` varchar(20) NOT NULL,
  `MoveTime` varchar(20) NOT NULL,
  `EstimatedDate` varchar(20) NOT NULL,
  `EstimatedTime` varchar(20) NOT NULL,
  `LoadingDwellingSize` varchar(20) NOT NULL,
  `LoadingPlaceName` varchar(20) NOT NULL,
  `LeadLoadingApartment` varchar(200) NOT NULL,
  `LeadLoadingNotes` mediumtext NOT NULL,
  `LoadingAddress` varchar(50) NOT NULL,
  `LoadingZip` varchar(10) NOT NULL,
  `LoadingLat` varchar(10) NOT NULL,
  `LoadingLong` varchar(10) NOT NULL,
  `LoadingCity` varchar(20) NOT NULL,
  `LoadingState` varchar(20) NOT NULL,
  `LoadingStairs` varchar(5) NOT NULL,
  `LoadingNeedHelpPacking` varchar(1) NOT NULL,
  `LoadingPackingDate` varchar(20) NOT NULL,
  `LoadingPackingTime` varchar(20) NOT NULL,
  `LoadingElevator` varchar(1) NOT NULL,
  `LoadingGarage` varchar(1) NOT NULL,
  `UnloadingDwellingSize` varchar(20) NOT NULL,
  `UnloadingPlaceName` varchar(20) NOT NULL,
  `UnloadingAddress` varchar(50) NOT NULL,
  `LeadUnloadingApartment` varchar(200) NOT NULL,
  `LeadUnloadingNotes` mediumtext NOT NULL,
  `UnloadingZip` varchar(10) NOT NULL,
  `UnloadingLat` varchar(10) NOT NULL,
  `UnloadingLong` varchar(10) NOT NULL,
  `UnloadingCity` varchar(20) NOT NULL,
  `UnloadingState` varchar(20) NOT NULL,
  `UnloadingStairs` varchar(20) NOT NULL,
  `UnloadingNeedHelpPacking` varchar(1) NOT NULL,
  `UnloadingElevator` varchar(1) NOT NULL,
  `2ndLoadingDwellingSize` varchar(20) NOT NULL,
  `2ndLoadingPlaceName` varchar(100) NOT NULL,
  `2ndLoadingApartment` varchar(200) NOT NULL,
  `2ndLoadingAddress` varchar(50) NOT NULL,
  `2ndLoadingZip` varchar(10) NOT NULL,
  `2ndLoadingLat` varchar(10) NOT NULL,
  `2ndLoadingLong` varchar(10) NOT NULL,
  `2ndLoadingCity` varchar(10) NOT NULL,
  `2ndLoadingState` varchar(20) NOT NULL,
  `2ndLoadingStairs` varchar(5) NOT NULL,
  `2ndLoadingNeedHelpPacking` varchar(1) NOT NULL,
  `2ndLoadingPackingDate` varchar(20) NOT NULL,
  `2ndLoadingPackingTime` varchar(20) NOT NULL,
  `2ndLoadingElevator` varchar(1) NOT NULL,
  `2ndLoadingGarage` varchar(1) NOT NULL,
  `2ndLoadingNotes` mediumtext NOT NULL,
  `2ndUnloadingDwellingSize` varchar(20) NOT NULL,
  `2ndUnloadingPlaceName` varchar(20) NOT NULL,
  `2ndUnloadingApartment` varchar(100) NOT NULL,
  `2ndUnloadingAddress` varchar(50) NOT NULL,
  `2ndUnloadingZip` varchar(10) NOT NULL,
  `2ndUnoadingLat` varchar(10) NOT NULL,
  `2ndUnoadingLong` varchar(10) NOT NULL,
  `2ndUnloadingCity` varchar(10) NOT NULL,
  `2ndUnloadingState` varchar(20) NOT NULL,
  `2ndUnloadingStairs` varchar(5) NOT NULL,
  `2ndUnloadingNeedHelpPacking` varchar(1) NOT NULL,
  `2ndUnloadingElevator` varchar(1) NOT NULL,
  `2ndLeadUnloadingNotes` mediumtext NOT NULL,
  `LeadStop1` mediumtext NOT NULL,
  `LeadStop2` mediumtext NOT NULL,
  `LeadStop3` mediumtext NOT NULL,
  `unique_id` varchar(10) NOT NULL,
  `insert_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `distance` varchar(250) NOT NULL,
  `lead_status` varchar(1) NOT NULL DEFAULT '1',
  `book_date` varchar(20) DEFAULT NULL,
  `complete_date` varchar(20) DEFAULT NULL,
  `accept_status` int(1) NOT NULL DEFAULT 0,
  `reject_reason` varchar(50) NOT NULL,
  `assigned_date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lead_feed`
--

CREATE TABLE `tbl_lead_feed` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lead_id` varchar(10) NOT NULL,
  `action` varchar(500) NOT NULL,
  `timing` varchar(50) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logo`
--

CREATE TABLE `tbl_logo` (
  `id` int(11) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

CREATE TABLE `tbl_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` varchar(50) NOT NULL,
  `IP` varchar(30) NOT NULL,
  `browser` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_materials`
--

CREATE TABLE `tbl_materials` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `material_name` varchar(100) NOT NULL,
  `material_description` varchar(500) NOT NULL,
  `material_price` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_menu`
--

CREATE TABLE `tbl_menu` (
  `id` int(11) NOT NULL,
  `menu` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_moving_reminder_sent`
--

CREATE TABLE `tbl_moving_reminder_sent` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lead_id` varchar(10) NOT NULL,
  `sent` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_newsletter`
--

CREATE TABLE `tbl_newsletter` (
  `n_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `create_dt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notifications`
--

CREATE TABLE `tbl_notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `phone_active` varchar(1) NOT NULL DEFAULT '1',
  `email` varchar(250) NOT NULL,
  `email_active` varchar(1) NOT NULL DEFAULT '1',
  `movingreminder_active` varchar(1) NOT NULL,
  `time` varchar(5) NOT NULL DEFAULT '24',
  `autoresponder_active` varchar(1) NOT NULL,
  `autoresponder_time` varchar(5) NOT NULL DEFAULT '5',
  `review_active` varchar(1) NOT NULL,
  `customer_notif` varchar(1) NOT NULL DEFAULT '1',
  `cust_sms_text` varchar(200) NOT NULL DEFAULT 'Your moving Quote is ready please view and update your information and invetory. Click the link {link}'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_outgoing_email`
--

CREATE TABLE `tbl_outgoing_email` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lead_id` varchar(10) NOT NULL,
  `mail_from` varchar(250) NOT NULL,
  `mail_to` varchar(250) NOT NULL,
  `subject` mediumtext NOT NULL,
  `emailData` longblob NOT NULL,
  `date_sent` varchar(20) NOT NULL,
  `opened` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_package`
--

CREATE TABLE `tbl_package` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `bg_image` varchar(255) DEFAULT NULL,
  `package` varchar(255) DEFAULT NULL COMMENT 'plan_name',
  `price` varchar(255) DEFAULT NULL COMMENT 'plan_price',
  `monthly` varchar(255) DEFAULT NULL,
  `text1` varchar(255) DEFAULT NULL COMMENT 'User',
  `text2` varchar(255) DEFAULT NULL COMMENT 'Leads ',
  `text3` varchar(255) DEFAULT NULL,
  `text4` varchar(255) DEFAULT NULL,
  `text5` varchar(255) DEFAULT NULL COMMENT 'SMS',
  `email_limit` varchar(55) DEFAULT NULL,
  `text6` varchar(255) DEFAULT NULL,
  `button` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pages`
--

CREATE TABLE `tbl_pages` (
  `id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(55) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_number` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `actual_amount` double NOT NULL,
  `payment_amount` double(10,2) NOT NULL,
  `payment_currency` varchar(255) NOT NULL,
  `txn_id` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `test_dump` mediumtext NOT NULL,
  `payment_mode` varchar(55) DEFAULT NULL,
  `signature` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment_processing_fee`
--

CREATE TABLE `tbl_payment_processing_fee` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `processing_fee` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment_requests`
--

CREATE TABLE `tbl_payment_requests` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(10) NOT NULL,
  `request_date` varchar(20) NOT NULL,
  `request_amount` varchar(10) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '0',
  `type` varchar(20) NOT NULL DEFAULT 'initial',
  `paid_on` varchar(20) NOT NULL,
  `txn_id` varchar(100) NOT NULL,
  `payment_description` varchar(2500) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payment_setting`
--

CREATE TABLE `tbl_payment_setting` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gateway` varchar(20) NOT NULL,
  `email` varchar(250) NOT NULL,
  `sandbox` varchar(1) NOT NULL DEFAULT '0',
  `app_id` varchar(200) NOT NULL,
  `loc_id` varchar(200) NOT NULL,
  `access_token` varchar(500) NOT NULL,
  `publishable_key` varchar(200) NOT NULL,
  `secret_key` varchar(200) NOT NULL,
  `active` varchar(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_plans`
--

CREATE TABLE `tbl_plans` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(100) NOT NULL,
  `plan_price` varchar(10) NOT NULL,
  `plan_details` mediumtext NOT NULL,
  `job_limit` varchar(5) NOT NULL,
  `sms_limit` varchar(5) NOT NULL COMMENT '0=unlimited',
  `email_limit` varchar(5) NOT NULL COMMENT '0=unlimited',
  `status` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_plan_purchased`
--

CREATE TABLE `tbl_plan_purchased` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `remaining_lead` varchar(11) DEFAULT NULL,
  `total_lead` varchar(11) DEFAULT NULL,
  `purchased_on` varchar(20) NOT NULL,
  `renew_on` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_provider`
--

CREATE TABLE `tbl_provider` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `unique_id` varchar(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `website` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `fax` varchar(20) NOT NULL,
  `contact_name` varchar(100) NOT NULL,
  `price_per_lead` varchar(10) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quotation`
--

CREATE TABLE `tbl_quotation` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(10) NOT NULL,
  `datas` mediumtext NOT NULL,
  `inventoryArr` mediumtext NOT NULL,
  `materialsArr` mediumtext NOT NULL,
  `trucksArr` mediumtext NOT NULL,
  `crewArr` mediumtext NOT NULL,
  `start_time` varchar(55) DEFAULT NULL,
  `end_time` varchar(55) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_quote_acceptance`
--

CREATE TABLE `tbl_quote_acceptance` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(20) NOT NULL,
  `insurance_id` int(11) NOT NULL,
  `additional_services_id` varchar(20) NOT NULL,
  `signature` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_roles`
--

CREATE TABLE `tbl_roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `can_access` varchar(50) NOT NULL,
  `role_order` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

CREATE TABLE `tbl_services` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_description` varchar(100) NOT NULL,
  `service_price` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_service_completion_form`
--

CREATE TABLE `tbl_service_completion_form` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(20) NOT NULL,
  `release_text` text NOT NULL,
  `review_text` text NOT NULL,
  `customer_name` text NOT NULL,
  `customer_sign` text NOT NULL,
  `signed_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sms_templates`
--

CREATE TABLE `tbl_sms_templates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `template_name` varchar(200) NOT NULL,
  `content` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_subscription_history`
--

CREATE TABLE `tbl_subscription_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` varchar(20) NOT NULL,
  `plan_details` varchar(100) NOT NULL,
  `amount` varchar(10) NOT NULL,
  `extra_lead_charge` varchar(55) DEFAULT NULL,
  `total_amount` varchar(55) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_support`
--

CREATE TABLE `tbl_support` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `subject` mediumtext NOT NULL,
  `issues` mediumtext NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_support_reply`
--

CREATE TABLE `tbl_support_reply` (
  `id` int(11) NOT NULL,
  `support_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `reply` mediumtext NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tax`
--

CREATE TABLE `tbl_tax` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tax_rate` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_text_messaging`
--

CREATE TABLE `tbl_text_messaging` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `lead_id` varchar(10) NOT NULL,
  `message` varchar(200) NOT NULL,
  `date_sent` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trucks`
--

CREATE TABLE `tbl_trucks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `truck_name` varchar(100) NOT NULL,
  `rent_own` varchar(10) NOT NULL,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `year` varchar(4) NOT NULL,
  `length` varchar(50) NOT NULL,
  `cdl` varchar(50) NOT NULL,
  `purchase_date` varchar(50) NOT NULL,
  `purchase_mileage` varchar(50) NOT NULL,
  `vehicle_class` varchar(50) NOT NULL,
  `lbs` varchar(50) NOT NULL,
  `cu` varchar(50) NOT NULL,
  `vin` varchar(50) NOT NULL,
  `license_plate` varchar(50) NOT NULL,
  `dot_number` varchar(50) NOT NULL,
  `insurance` varchar(250) NOT NULL,
  `service_record1_date` mediumtext NOT NULL,
  `service_record1_whatwasdone` mediumtext NOT NULL,
  `service_record1_servicedby` mediumtext NOT NULL,
  `service_record1_nextdate` mediumtext NOT NULL,
  `service_record1_nextmileage` mediumtext NOT NULL,
  `service_record1_notes` mediumtext NOT NULL,
  `service_record2_date` mediumtext NOT NULL,
  `service_record2_whatwasdone` mediumtext NOT NULL,
  `service_record2_servicedby` mediumtext NOT NULL,
  `service_record2_nextdate` mediumtext NOT NULL,
  `service_record2_nextmileage` mediumtext NOT NULL,
  `service_record2_notes` mediumtext NOT NULL,
  `service_record3_date` mediumtext NOT NULL,
  `service_record3_whatwasdone` mediumtext NOT NULL,
  `service_record3_servicedby` mediumtext NOT NULL,
  `service_record3_nextdate` mediumtext NOT NULL,
  `service_record3_nextmileage` mediumtext NOT NULL,
  `service_record3_notes` mediumtext NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `salt` varchar(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email_id` varchar(250) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `alter_phone_no` varchar(20) NOT NULL,
  `picture` varchar(500) NOT NULL,
  `bio` mediumtext NOT NULL,
  `cover_photo` varchar(500) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `status` varchar(1) NOT NULL DEFAULT '1',
  `role` varchar(11) NOT NULL,
  `added_by` int(11) NOT NULL,
  `plan_purchased` varchar(1) NOT NULL DEFAULT '1',
  `plan_purchased_status` int(11) NOT NULL,
  `validation_id` varchar(250) NOT NULL,
  `reset_key` varchar(250) NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ssn` varchar(20) NOT NULL,
  `hire_date` varchar(20) NOT NULL,
  `starting_pay` varchar(10) NOT NULL,
  `current_pay` varchar(10) NOT NULL,
  `eligible_sales` int(1) NOT NULL,
  `lead_commision` varchar(10) NOT NULL,
  `annual_sale` varchar(10) NOT NULL,
  `lifetime_sale` varchar(10) NOT NULL,
  `lifetime_commision` varchar(10) NOT NULL,
  `employee_type` int(2) NOT NULL,
  `notes` mediumtext NOT NULL,
  `Agreement` mediumtext NOT NULL,
  `signature` varchar(55) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_valuation`
--

CREATE TABLE `tbl_valuation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `valuation_name` varchar(500) NOT NULL,
  `item_lb_kg` varchar(100) NOT NULL,
  `storage` varchar(100) NOT NULL,
  `maximum_rate` varchar(100) NOT NULL,
  `deductable` varchar(20) NOT NULL,
  `cost` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_waiver_form`
--

CREATE TABLE `tbl_waiver_form` (
  `id` int(11) NOT NULL,
  `lead_id` varchar(20) NOT NULL,
  `initial_text` text NOT NULL,
  `risky_text` text NOT NULL,
  `risky_text_sign` text NOT NULL,
  `damage_text` text NOT NULL,
  `damage_text_sign` text NOT NULL,
  `absent_customer` text NOT NULL,
  `absent_customer_sign` text NOT NULL,
  `release_text` text NOT NULL,
  `customer_name` text NOT NULL,
  `customer_sign` text NOT NULL,
  `signed_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_aggrement`
--
ALTER TABLE `all_aggrement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_system`
--
ALTER TABLE `chat_system`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `email_template`
--
ALTER TABLE `email_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_square_transaction`
--
ALTER TABLE `lead_square_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `square_payment`
--
ALTER TABLE `square_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `square_transaction`
--
ALTER TABLE `square_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_admin_permission`
--
ALTER TABLE `sub_admin_permission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_additional_services`
--
ALTER TABLE `tbl_additional_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_alerts`
--
ALTER TABLE `tbl_alerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_card_details`
--
ALTER TABLE `tbl_card_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_claim_form`
--
ALTER TABLE `tbl_claim_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_claim_items`
--
ALTER TABLE `tbl_claim_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_company`
--
ALTER TABLE `tbl_company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_deposit`
--
ALTER TABLE `tbl_deposit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_discounts`
--
ALTER TABLE `tbl_discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_email_open_track`
--
ALTER TABLE `tbl_email_open_track`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_email_templates`
--
ALTER TABLE `tbl_email_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_email_template_names`
--
ALTER TABLE `tbl_email_template_names`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_embedded_forms`
--
ALTER TABLE `tbl_embedded_forms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_estimate_open_track`
--
ALTER TABLE `tbl_estimate_open_track`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_faq`
--
ALTER TABLE `tbl_faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_footer`
--
ALTER TABLE `tbl_footer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_home`
--
ALTER TABLE `tbl_home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_internal_chat`
--
ALTER TABLE `tbl_internal_chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_inventory_group`
--
ALTER TABLE `tbl_inventory_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_inventory_groups_item`
--
ALTER TABLE `tbl_inventory_groups_item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_invoice_sign`
--
ALTER TABLE `tbl_invoice_sign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_leads`
--
ALTER TABLE `tbl_leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_lead_feed`
--
ALTER TABLE `tbl_lead_feed`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_logo`
--
ALTER TABLE `tbl_logo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_materials`
--
ALTER TABLE `tbl_materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_menu`
--
ALTER TABLE `tbl_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_moving_reminder_sent`
--
ALTER TABLE `tbl_moving_reminder_sent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
  ADD PRIMARY KEY (`n_id`);

--
-- Indexes for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_outgoing_email`
--
ALTER TABLE `tbl_outgoing_email`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_package`
--
ALTER TABLE `tbl_package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_pages`
--
ALTER TABLE `tbl_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payment_processing_fee`
--
ALTER TABLE `tbl_payment_processing_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payment_requests`
--
ALTER TABLE `tbl_payment_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_payment_setting`
--
ALTER TABLE `tbl_payment_setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_plans`
--
ALTER TABLE `tbl_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_plan_purchased`
--
ALTER TABLE `tbl_plan_purchased`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_provider`
--
ALTER TABLE `tbl_provider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_quotation`
--
ALTER TABLE `tbl_quotation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_quote_acceptance`
--
ALTER TABLE `tbl_quote_acceptance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_roles`
--
ALTER TABLE `tbl_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_service_completion_form`
--
ALTER TABLE `tbl_service_completion_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sms_templates`
--
ALTER TABLE `tbl_sms_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_subscription_history`
--
ALTER TABLE `tbl_subscription_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_support`
--
ALTER TABLE `tbl_support`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_support_reply`
--
ALTER TABLE `tbl_support_reply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_tax`
--
ALTER TABLE `tbl_tax`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_text_messaging`
--
ALTER TABLE `tbl_text_messaging`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_trucks`
--
ALTER TABLE `tbl_trucks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_valuation`
--
ALTER TABLE `tbl_valuation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_waiver_form`
--
ALTER TABLE `tbl_waiver_form`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_aggrement`
--
ALTER TABLE `all_aggrement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_system`
--
ALTER TABLE `chat_system`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `email_template`
--
ALTER TABLE `email_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lead_square_transaction`
--
ALTER TABLE `lead_square_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `square_payment`
--
ALTER TABLE `square_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `square_transaction`
--
ALTER TABLE `square_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_admin_permission`
--
ALTER TABLE `sub_admin_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_additional_services`
--
ALTER TABLE `tbl_additional_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_alerts`
--
ALTER TABLE `tbl_alerts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_card_details`
--
ALTER TABLE `tbl_card_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_claim_form`
--
ALTER TABLE `tbl_claim_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_claim_items`
--
ALTER TABLE `tbl_claim_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_company`
--
ALTER TABLE `tbl_company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_deposit`
--
ALTER TABLE `tbl_deposit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_discounts`
--
ALTER TABLE `tbl_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_email_open_track`
--
ALTER TABLE `tbl_email_open_track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_email_templates`
--
ALTER TABLE `tbl_email_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_email_template_names`
--
ALTER TABLE `tbl_email_template_names`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_embedded_forms`
--
ALTER TABLE `tbl_embedded_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_estimate_open_track`
--
ALTER TABLE `tbl_estimate_open_track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_faq`
--
ALTER TABLE `tbl_faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_footer`
--
ALTER TABLE `tbl_footer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_home`
--
ALTER TABLE `tbl_home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_internal_chat`
--
ALTER TABLE `tbl_internal_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory_group`
--
ALTER TABLE `tbl_inventory_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inventory_groups_item`
--
ALTER TABLE `tbl_inventory_groups_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_invoice_sign`
--
ALTER TABLE `tbl_invoice_sign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_leads`
--
ALTER TABLE `tbl_leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_lead_feed`
--
ALTER TABLE `tbl_lead_feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_logo`
--
ALTER TABLE `tbl_logo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_materials`
--
ALTER TABLE `tbl_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_menu`
--
ALTER TABLE `tbl_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_moving_reminder_sent`
--
ALTER TABLE `tbl_moving_reminder_sent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_notifications`
--
ALTER TABLE `tbl_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_outgoing_email`
--
ALTER TABLE `tbl_outgoing_email`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_package`
--
ALTER TABLE `tbl_package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pages`
--
ALTER TABLE `tbl_pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payment_processing_fee`
--
ALTER TABLE `tbl_payment_processing_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payment_requests`
--
ALTER TABLE `tbl_payment_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payment_setting`
--
ALTER TABLE `tbl_payment_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_plans`
--
ALTER TABLE `tbl_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_plan_purchased`
--
ALTER TABLE `tbl_plan_purchased`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_provider`
--
ALTER TABLE `tbl_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_quotation`
--
ALTER TABLE `tbl_quotation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_quote_acceptance`
--
ALTER TABLE `tbl_quote_acceptance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_roles`
--
ALTER TABLE `tbl_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_service_completion_form`
--
ALTER TABLE `tbl_service_completion_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_sms_templates`
--
ALTER TABLE `tbl_sms_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_subscription_history`
--
ALTER TABLE `tbl_subscription_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_support`
--
ALTER TABLE `tbl_support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_support_reply`
--
ALTER TABLE `tbl_support_reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tax`
--
ALTER TABLE `tbl_tax`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_text_messaging`
--
ALTER TABLE `tbl_text_messaging`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_trucks`
--
ALTER TABLE `tbl_trucks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_valuation`
--
ALTER TABLE `tbl_valuation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_waiver_form`
--
ALTER TABLE `tbl_waiver_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

