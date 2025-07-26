-- DropForeignKey
ALTER TABLE `game_sessions` DROP FOREIGN KEY `game_sessions_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `game_sessions` ADD CONSTRAINT `game_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
