#!/usr/bin/env bash

PROJECT_NAME="mdoc"

wrangler pages deploy . --project-name="$PROJECT_NAME"
