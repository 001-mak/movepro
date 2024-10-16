-- CreateTable
CREATE TABLE `tbl_company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(250) NOT NULL,
    `company_email` VARCHAR(250) NOT NULL,
    `street` MEDIUMTEXT NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `state` VARCHAR(50) NOT NULL,
    `zip` VARCHAR(10) NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `company_logo` VARCHAR(250) NOT NULL,
    `website` VARCHAR(250) NOT NULL,
    `social_fb` MEDIUMTEXT NOT NULL,
    `social_tw` MEDIUMTEXT NOT NULL,
    `social_in` MEDIUMTEXT NOT NULL,
    `social_insta` MEDIUMTEXT NOT NULL,
    `social_tube` MEDIUMTEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `subscription_plan_id` INTEGER NULL DEFAULT 1,

    INDEX `fk_user_company`(`user_id`),
    INDEX `fk_subscription_plan`(`subscription_plan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_id` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `salt` VARCHAR(255) NOT NULL,
    `phone_no` VARCHAR(20) NOT NULL,
    `picture` VARCHAR(500) NULL,
    `bio` MEDIUMTEXT NULL,
    `cover_photo` VARCHAR(500) NULL,
    `street` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `zip` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `ssn` VARCHAR(20) NOT NULL,
    `hire_date` VARCHAR(20) NULL,
    `current_pay` VARCHAR(10) NULL,
    `company_id` INTEGER NULL,
    `reset_key` VARCHAR(255) NULL,
    `reset_key_expiry` DATETIME(0) NULL,
    `user_role` VARCHAR(50) NULL,

    UNIQUE INDEX `email_id`(`email_id`),
    INDEX `fk_company_user`(`company_id`),
    INDEX `fk_user_role`(`user_role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_subscription_plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_plan_name` VARCHAR(100) NOT NULL,
    `subscription_plan_price` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_role` (
    `role` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_leads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `comments` MEDIUMTEXT NULL,
    `JobType` VARCHAR(50) NOT NULL,
    `ServiceType` VARCHAR(50) NULL,
    `MoveDate` VARCHAR(20) NOT NULL,
    `MoveTime` VARCHAR(20) NOT NULL,
    `EstimatedDate` VARCHAR(20) NULL,
    `EstimatedTime` VARCHAR(20) NULL,
    `LoadingDwellingSize` VARCHAR(20) NULL,
    `LoadingPlaceName` VARCHAR(20) NULL,
    `LeadLoadingApartment` VARCHAR(200) NULL,
    `LeadLoadingNotes` MEDIUMTEXT NULL,
    `LoadingAddress` VARCHAR(50) NULL,
    `LoadingZip` VARCHAR(10) NULL,
    `LoadingLat` VARCHAR(10) NULL,
    `LoadingLong` VARCHAR(10) NULL,
    `LoadingCity` VARCHAR(20) NOT NULL,
    `LoadingState` VARCHAR(20) NULL,
    `LoadingStairs` VARCHAR(5) NULL,
    `LoadingNeedHelpPacking` VARCHAR(1) NULL,
    `LoadingPackingDate` VARCHAR(20) NULL,
    `LoadingPackingTime` VARCHAR(20) NULL,
    `LoadingElevator` VARCHAR(1) NULL,
    `LoadingGarage` VARCHAR(1) NULL,
    `UnloadingDwellingSize` VARCHAR(20) NULL,
    `UnloadingPlaceName` VARCHAR(20) NULL,
    `UnloadingAddress` VARCHAR(50) NULL,
    `LeadUnloadingApartment` VARCHAR(200) NULL,
    `LeadUnloadingNotes` MEDIUMTEXT NULL,
    `UnloadingZip` VARCHAR(10) NULL,
    `UnloadingLat` VARCHAR(10) NULL,
    `UnloadingLong` VARCHAR(10) NULL,
    `UnloadingCity` VARCHAR(20) NULL,
    `UnloadingState` VARCHAR(20) NULL,
    `UnloadingStairs` VARCHAR(20) NULL,
    `UnloadingNeedHelpPacking` VARCHAR(1) NULL,
    `UnloadingElevator` VARCHAR(1) NULL,
    `2ndLoadingDwellingSize` VARCHAR(20) NULL,
    `2ndLoadingPlaceName` VARCHAR(100) NULL,
    `2ndLoadingApartment` VARCHAR(200) NULL,
    `2ndLoadingAddress` VARCHAR(50) NULL,
    `2ndLoadingZip` VARCHAR(10) NULL,
    `2ndLoadingLat` VARCHAR(10) NULL,
    `2ndLoadingLong` VARCHAR(10) NULL,
    `2ndLoadingCity` VARCHAR(10) NULL,
    `2ndLoadingState` VARCHAR(20) NULL,
    `2ndLoadingStairs` VARCHAR(5) NULL,
    `2ndLoadingNeedHelpPacking` VARCHAR(1) NULL,
    `2ndLoadingPackingDate` VARCHAR(20) NULL,
    `2ndLoadingPackingTime` VARCHAR(20) NULL,
    `2ndLoadingElevator` VARCHAR(1) NULL,
    `2ndLoadingGarage` VARCHAR(1) NULL,
    `2ndLoadingNotes` MEDIUMTEXT NULL,
    `2ndUnloadingDwellingSize` VARCHAR(20) NULL,
    `2ndUnloadingPlaceName` VARCHAR(20) NULL,
    `2ndUnloadingApartment` VARCHAR(100) NULL,
    `2ndUnloadingAddress` VARCHAR(50) NULL,
    `2ndUnloadingZip` VARCHAR(10) NULL,
    `2ndUnloadingLat` VARCHAR(10) NULL,
    `2ndUnloadingLong` VARCHAR(10) NULL,
    `2ndUnloadingCity` VARCHAR(10) NULL,
    `2ndUnloadingState` VARCHAR(20) NULL,
    `2ndUnloadingStairs` VARCHAR(5) NULL,
    `2ndUnloadingNeedHelpPacking` VARCHAR(1) NULL,
    `2ndUnloadingElevator` VARCHAR(1) NULL,
    `2ndLeadUnloadingNotes` MEDIUMTEXT NULL,
    `insert_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `distance` VARCHAR(250) NULL,
    `lead_status` VARCHAR(1) NOT NULL DEFAULT '1',
    `book_date` VARCHAR(20) NULL,
    `complete_date` VARCHAR(20) NULL,
    `accept_status` INTEGER NULL DEFAULT 0,
    `reject_reason` VARCHAR(50) NULL,
    `company_id` INTEGER NULL,

    INDEX `fk_company_id`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_driver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `license_number` VARCHAR(100) NOT NULL,
    `license_expiry` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `user_id`(`user_id`),
    UNIQUE INDEX `license_number`(`license_number`),
    INDEX `fk_driver_user`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_truck` (
    `company_id` INTEGER NOT NULL,
    `rented` BIT(1) NULL,
    `make` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `year_of_manufacture` INTEGER NOT NULL,
    `vin` VARCHAR(255) NOT NULL,
    `license_plate_number` VARCHAR(50) NOT NULL,
    `license_plate_state_province` VARCHAR(50) NOT NULL,
    `truck_type` VARCHAR(100) NOT NULL,
    `truck_capacity` VARCHAR(50) NULL,
    `owner_name` VARCHAR(255) NOT NULL,
    `lease_details` TEXT NULL,
    `insurance_provider` VARCHAR(255) NULL,
    `insurance_policy_number` VARCHAR(255) NULL,
    `fuel_efficiency` VARCHAR(100) NULL,
    `tare_weight` VARCHAR(100) NULL,
    `payload_capacity` VARCHAR(100) NULL,
    `volume` VARCHAR(100) NOT NULL,
    `last_maintenance_date` DATE NULL,
    `next_maintenance_date` DATE NULL,
    `dot_compliance_number` VARCHAR(50) NULL,
    `cvor_number` VARCHAR(50) NULL,
    `cargo_restrictions` TEXT NULL,
    `vehicle_notes` TEXT NULL,
    `special_permits` TEXT NULL,
    `driver_id` INTEGER NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `vin`(`vin`),
    INDEX `company_id`(`company_id`),
    INDEX `fk_truck_driver`(`driver_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_inventory_group_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `item_name` VARCHAR(100) NOT NULL,
    `item_size` VARCHAR(100) NOT NULL,

    INDEX `group_id`(`group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_inventory_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(100) NOT NULL,
    `company_id` INTEGER NOT NULL,

    INDEX `fk_tbl_inventory_group_company`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `material_name` VARCHAR(100) NOT NULL,
    `material_description` VARCHAR(500) NULL,
    `material_price` FLOAT NOT NULL,
    `company_id` INTEGER NOT NULL,

    INDEX `fk_tbl_materials_company`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_company` ADD CONSTRAINT `fk_subscription_plan` FOREIGN KEY (`subscription_plan_id`) REFERENCES `tbl_subscription_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_company` ADD CONSTRAINT `fk_company_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_user` ADD CONSTRAINT `fk_user_company` FOREIGN KEY (`company_id`) REFERENCES `tbl_company`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_user` ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`user_role`) REFERENCES `tbl_role`(`role`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_leads` ADD CONSTRAINT `fk_company_id` FOREIGN KEY (`company_id`) REFERENCES `tbl_company`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_driver` ADD CONSTRAINT `tbl_driver_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_truck` ADD CONSTRAINT `fk_truck_driver` FOREIGN KEY (`driver_id`) REFERENCES `tbl_user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tbl_truck` ADD CONSTRAINT `tbl_truck_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `tbl_company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_inventory_group_items` ADD CONSTRAINT `fk_inventory_group_item_group` FOREIGN KEY (`group_id`) REFERENCES `tbl_inventory_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_inventory_groups` ADD CONSTRAINT `fk_tbl_inventory_group_company` FOREIGN KEY (`company_id`) REFERENCES `tbl_company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materials` ADD CONSTRAINT `fk_tbl_materials_company` FOREIGN KEY (`company_id`) REFERENCES `tbl_company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
