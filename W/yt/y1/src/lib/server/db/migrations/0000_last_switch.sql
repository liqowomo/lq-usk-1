CREATE TABLE `mistress_book` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`message` text NOT NULL,
	`fetish` text NOT NULL,
	`country` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`age` integer,
	`fetish` text
);
