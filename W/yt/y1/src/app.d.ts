import type { Env } from "../worker-configuration"

declare global {
  namespace App {
    interface Platform {
      env: Env & {
        UPSTASH_REDIS_REST_URL?: string // Made optional
        UPSTASH_REDIS_REST_TOKEN?: string // Made optional
      }
      cf?: CfProperties
      ctx?: ExecutionContext
    }

    interface Locals {
      db: any
    }
  }
}

export {}
