/*
  Warnings:

  - You are about to drop the column `typeId` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `bill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_typeId_fkey";

-- DropForeignKey
ALTER TABLE "bill" DROP CONSTRAINT "bill_userId_fkey";

-- AlterTable
ALTER TABLE "bill" DROP COLUMN "typeId",
DROP COLUMN "userId";
