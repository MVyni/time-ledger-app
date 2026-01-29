/*
  Warnings:

  - You are about to drop the `monthly_reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "monthly_reports" DROP CONSTRAINT "monthly_reports_user_id_fkey";

-- DropTable
DROP TABLE "monthly_reports";

-- CreateIndex
CREATE INDEX "work_entries_user_id_date_idx" ON "work_entries"("user_id", "date");
