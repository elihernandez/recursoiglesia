-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `Album_artistId_fkey`;

-- DropForeignKey
ALTER TABLE `multitrack` DROP FOREIGN KEY `Multitrack_albumId_fkey`;

-- DropForeignKey
ALTER TABLE `multitrack` DROP FOREIGN KEY `Multitrack_artistId_fkey`;

-- AlterTable
ALTER TABLE `album` MODIFY `artistId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `multitrack` MODIFY `artistId` VARCHAR(191) NULL,
    MODIFY `albumId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
