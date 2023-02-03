-- DropIndex
DROP INDEX `Album_artistId_fkey` ON `album`;

-- DropIndex
DROP INDEX `Multitrack_albumId_fkey` ON `multitrack`;

-- DropIndex
DROP INDEX `Multitrack_artistId_fkey` ON `multitrack`;

-- CreateTable
CREATE TABLE `MultitrackRequest` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `multitrackId` VARCHAR(191) NOT NULL,
    `isSent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Multitrack` ADD CONSTRAINT `Multitrack_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MultitrackRequest` ADD CONSTRAINT `MultitrackRequest_multitrackId_fkey` FOREIGN KEY (`multitrackId`) REFERENCES `Multitrack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
