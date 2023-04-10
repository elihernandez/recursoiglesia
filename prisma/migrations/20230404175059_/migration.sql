/*
  Warnings:

  - You are about to drop the `attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shortener` table. If the table is not empty, all the data it contains will be lost.

*/
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
ALTER TABLE `product` MODIFY `images` JSON NULL;

-- DropTable
DROP TABLE `attempt`;

-- DropTable
DROP TABLE `shortener`;

-- CreateTable
CREATE TABLE `Download` (
    `id` VARCHAR(191) NOT NULL,
    `resourceId` VARCHAR(191) NOT NULL,
    `type` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MultitrackRequest` ADD CONSTRAINT `MultitrackRequest_multitrackId_fkey` FOREIGN KEY (`multitrackId`) REFERENCES `Multitrack`(`multitrackId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnProduct` ADD CONSTRAINT `CategoriesOnProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriesOnProduct` ADD CONSTRAINT `CategoriesOnProduct_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
