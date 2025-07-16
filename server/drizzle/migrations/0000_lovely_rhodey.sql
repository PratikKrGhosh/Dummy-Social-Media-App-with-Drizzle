CREATE TABLE `users_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(15) NOT NULL,
	`user_name` varchar(15) NOT NULL,
	`email` varchar(255) NOT NULL,
	`is_verified` boolean NOT NULL DEFAULT false,
	`password` varchar(15) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_user_name_unique` UNIQUE(`user_name`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_table_is_verified_unique` UNIQUE(`is_verified`)
);
