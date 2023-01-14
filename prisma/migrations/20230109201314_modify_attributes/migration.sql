/*
  Warnings:

  - Made the column `artistId` on table `multitrack` required. This step will fail if there are existing NULL values in that column.
  - Made the column `albumId` on table `multitrack` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `multitrack` DROP FOREIGN KEY `Multitrack_albumId_fkey`;

-- DropForeignKey
ALTER TABLE `multitrack` DROP FOREIGN KEY `Multitrack_artistId_fkey`;

-- AlterTable
ALTER TABLE `multitrack` MODIFY `artistId` VARCHAR(191) NOT NULL,
    MODIFY `albumId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
