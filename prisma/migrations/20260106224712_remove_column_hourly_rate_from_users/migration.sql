/*
  Warnings:

  - You are about to drop the column `base_hourly_rate` on the `users` table. All the data in the column will be lost.
  - Made the column `hourly_rate_at_time` on table `work_entries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "base_hourly_rate";

-- AlterTable
ALTER TABLE "work_entries" ALTER COLUMN "hourly_rate_at_time" SET NOT NULL;
