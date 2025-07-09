CREATE TABLE `email_tokens_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(8) NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE),
	CONSTRAINT `email_tokens_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_tokens_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`expires_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE),
	CONSTRAINT `password_tokens_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`valid` boolean NOT NULL DEFAULT true,
	`user_agent` text NOT NULL,
	`user_ip` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(20) NOT NULL,
	`user_name` varchar(20) NOT NULL,
	`email` varchar(255) NOT NULL,
	`is_verified` boolean NOT NULL DEFAULT false,
	`password` varchar(16) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_user_name_unique` UNIQUE(`user_name`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `email_tokens_table` ADD CONSTRAINT `email_tokens_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `password_tokens_table` ADD CONSTRAINT `password_tokens_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessions_table` ADD CONSTRAINT `sessions_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;