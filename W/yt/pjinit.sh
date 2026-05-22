#!/usr/bin/env bash

#---------------------------------
#  initz.sh - Project Setup
#---------------------------------

# /// Housekeeping ///

# Error Handling
set -euo pipefail

# Colors
BBLACK='\033[1;90m'
BRED='\033[1;91m'
BGREEN='\033[1;92m'
BYELLOW='\033[1;93m'
BBLUE='\033[1;94m'
BMAGENTA='\033[1;95m'
BCYAN='\033[1;96m'
BWHITE='\033[1;97m'
RESET='\033[0m'

# /// Variables ///

# /// Functions ///

# Function Single
pussy1() {
	declare -a CMD=(

		#0 -  Init cloudflare workers
		"bun create cloudflare@latest"

	)

	CMDEXEC="${CMD[0]}"
	echo -e "${BBLUE} · · ────── ꒰ঌ·✦·໒꒱ ────── · ·"
	echo -e "${BBLUE} · · ────── PantySmellling ────── · ·"
	echo -e "${BBLUE} · · ────── ꒰ঌ·✦·໒꒱ ────── · ·"
	date
	echo -e "Executing:${BMAGENTA}${CMDEXEC}${RESET}"
	eval "${CMDEXEC}"
	echo -e "${BGREEN}Done!"
	echo -e "───── ⋆⋅☆⋅⋆ ─────${RESET}"
	echo -e "───── ⋆⋅☆⋅⋆ ─────${RESET}"
	echo -e "───── ⋆⋅☆⋅⋆ ─────${RESET}"
}

# Wrangler deployments workers (new default method)
wr1() {
	declare -a CMD=(

		#0 -  Step1 - Export Smelly Panty
		# export CLOUDFLARE_API_TOKEN="StinkyPanty"

		# 1 - Do the wrangler setup
		bunx wrangler setup

		# 2 - Setup the wrangler types
		bunx wrangler types

		# 3 - Build Booty
		bun run build

		#4 - Deploy Spread Ass lick
		bun run deploy
	)

	for CMDEXEC in "${CMD[@]}"; do
		echo -e "${BBLUE}────── ꒰ঌ·✦·໒꒱ ──────${RESET}"
		echo -e "${BBLUE}────── Wrangler Wrokers Deployments ──────${RESET}"
		echo -e "${BBLUE}────── ꒰ঌ·✦·໒꒱ ──────${RESET}"
		echo -e "Executing: ${CMDEXEC}"
		eval "${CMDEXEC}"
		echo -e "${BGREEN}Done!${RESET}"
		echo -e "${BBLUE}───── ⋆⋅☆⋅⋆ ─────${RESET}"
		echo -e "${BBLUE}───── ⋆⋅☆⋅⋆ ─────${RESET}"
		echo -e "${BBLUE}───── ⋆⋅☆⋅⋆ ─────${RESET}"
		echo -e ""
		echo -e ""
		echo -e ""
	done
}

booty1() {
	declare -a CMD=(

		#0 - Get Compartment List
		echo -e "Drink Her Piss"
	)

	for CMDEXEC in "${CMD[@]}"; do
		echo -e "${BBLUE}────── ꒰ঌ·✦·໒꒱ ──────${RESET}"
		echo -e "${BBLUE}────── Woman Ass Poop Eating ──────${RESET}"
		echo -e "${BBLUE}────── ꒰ঌ·✦·໒꒱ ──────${RESET}"
		echo -e "Executing: ${CMDEXEC}"
		eval "${CMDEXEC}"
		echo -e "${BGREEN}Done!${RESET}"
		echo -e "${BBLUE}───── ⋆⋅☆⋅⋆ ─────${RESET}"
		echo -e "${BBLUE}───── ⋆⋅☆⋅⋆ ─────${RESET}"
		echo -e "${BBLUE}───── ⋆⋅☆⋅⋆ ─────${RESET}"
		echo # Add blank line between commands
	done
}

# /// Execiton ///

panty() {
	pussy1 2>&1 | tee -a initz.sh.txt
	# booty1 2>&1 | tee -a initz.sh.txt
	# wr1 2>&1 | tee -a initz.sh.txt

}
panty
