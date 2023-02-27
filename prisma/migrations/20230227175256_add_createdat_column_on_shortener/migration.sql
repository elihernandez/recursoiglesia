-- DropIndex
DROP INDEX `Album_artistId_fkey` ON `album`;

-- DropIndex
DROP INDEX `Multitrack_albumId_fkey` ON `multitrack`;

-- DropIndex
DROP INDEX `Multitrack_artistId_fkey` ON `multitrack`;

-- DropIndex
DROP INDEX `MultitrackRequest_songId_fkey` ON `multitrackrequest`;

-- AlterTable
ALTER TABLE `shortener` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Shortener`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MultitrackRequest` ADD CONSTRAINT `MultitrackRequest_songId_fkey` FOREIGN KEY (`songId`) REFERENCES `Multitrack`(`songId`) ON DELETE RESTRICT ON UPDATE CASCADE;
