/*
  Warnings:

  - The values [admin,waiter,cashier,kitchen] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'WAITER', 'KITCHEN', 'CASHIER');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'WAITER';
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT,
ALTER COLUMN "role" SET DEFAULT 'WAITER';

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
