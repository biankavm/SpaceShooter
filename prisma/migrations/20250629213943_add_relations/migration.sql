/*
  Warnings:

  - You are about to drop the column `fullname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `major_id` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_fullname_key` ON `users`;

-- AlterTable
ALTER TABLE `majors` MODIFY `code` CHAR(40) NOT NULL;

-- AlterTable
-- Primeiro adicionamos as colunas como nullable para preservar dados existentes
ALTER TABLE `users` DROP COLUMN `fullname`,
    DROP COLUMN `major_id`,
    ADD COLUMN `majorId` CHAR(40) NULL,
    ADD COLUMN `name` VARCHAR(100) NULL,
    ADD COLUMN `password` CHAR(60) NULL;

-- Atualizar dados existentes
UPDATE `users` SET `name` = 'Usuário Padrão', `password` = '$2b$10$default.hash.here', `majorId` = (SELECT id FROM majors LIMIT 1) WHERE `name` IS NULL;

-- Agora tornamos as colunas obrigatórias
ALTER TABLE `users` MODIFY `majorId` CHAR(40) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `password` CHAR(60) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_sessions` ADD CONSTRAINT `game_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
