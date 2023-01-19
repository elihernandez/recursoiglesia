/*
  Warnings:

  - Added the required column `imgUrl` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `template` ADD COLUMN `imgUrl` VARCHAR(191) NOT NULL;
