#!/usr/bin/env bash

#---------------------------------
#  Initz.sh - Setting up Drizzle and Drizzlekit
#---------------------------------

drizzleinstall() {
	# Core Drizzle packages
	bun add drizzle-orm

	# Drizzle Kit (for migrations)
	bun add -d drizzle-kit

	# For local SQLite testing (optional but recommended)
	bun add @libsql/client
}

# Execution Zone
panty() {
	drizzleinstall
}
panty
