import type { Env } from "../worker-configuration"

declare global {
  namespace App {
    interface Platform {
      env: Env // This will now include DB
      cf?: CfProperties
      ctx?: ExecutionContext
    }

    interface Locals {
      db: any // Or proper Drizzle type
    }
  }
}

export {}
