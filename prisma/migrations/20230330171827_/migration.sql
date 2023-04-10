-- DropIndex
DROP INDEX `Album_artistId_fkey` ON `album`;

-- DropIndex
DROP INDEX `CategoriesOnProduct_categoryId_fkey` ON `categoriesonproduct`;

-- DropIndex
DROP INDEX `Multitrack_albumId_fkey` ON `multitrack`;

-- DropIndex
DROP INDEX `Multitrack_artistId_fkey` ON `multitrack`;

-- DropIndex
DROP INDEX `MultitrackRequest_multitrackId_fkey` ON `multitrackrequest`;

-- AlterTable
ALTER TABLE `multitrack` ADD COLUMN `urlDate` DATE NULL;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_multitrackId_fkey` FOREIGN KEY (`multitrackId`) REFERENCES `Shortener`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MultitrackRequest` ADD CONSTRAINT `MultitrackRequest_multitrackId_fkey` FOREIGN KEY (`multitrackId`) REFERENCES `Multitrack`(`multitrackId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnProduct` ADD CONSTRAINT `CategoriesOnProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnProduct` ADD CONSTRAINT `CategoriesOnProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
