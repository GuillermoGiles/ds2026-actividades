import { defineConfig } from '@prisma/config'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  earlyAccess: true,
  studio: {
    port: 5555
  },
  migrations: {
    seed: 'tsx ./prisma/seed.ts'
  },
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://postgres:libreria_dev@localhost:5432/libreria_db"
  }
})
