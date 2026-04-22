/*
  Warnings:

  - Added the required column `city` to the `Society` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Society" ADD COLUMN     "city" TEXT NOT NULL;
