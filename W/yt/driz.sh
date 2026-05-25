#!/usr/bin/env bash

#---------------------------------
#  Driz.sh - Setup for drizzle - Since  bun create cloudflare@latest fails with drizzle
#---------------------------------

# /// setup ///

# Taken frrom -
d1() {
	bun add drizzle-orm wrangler dotenv
	bun add -D drizzle-kit tsx
}

# /// run ///

panty() {
	d1
}
panty
