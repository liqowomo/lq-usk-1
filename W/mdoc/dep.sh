#!/usr/bin/env bash

PROJECT_NAME="mdoc"

wrangler pages deploy . --minify --project-name="$PROJECT_NAME"
