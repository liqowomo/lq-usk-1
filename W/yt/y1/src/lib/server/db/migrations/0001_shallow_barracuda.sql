PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_mistress_book` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`message` text NOT NULL,
	`fetish` text NOT NULL,
	`country` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_mistress_book`("id", "name", "message", "fetish", "country", "created_at") SELECT "id", "name", "message", "fetish", "country", "created_at" FROM `mistress_book`;--> statement-breakpoint
DROP TABLE `mistress_book`;--> statement-breakpoint
ALTER TABLE `__new_mistress_book` RENAME TO `mistress_book`;--> statement-breakpoint
PRAGMA foreign_keys=ON;