import type { Env } from "../worker-configuration"

declare global {
  namespace App {
    interface Platform {
      env: Env & {
        UPSTASH_REDIS_REST_URL: string
        UPSTASH_REDIS_REST_TOKEN: string
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
