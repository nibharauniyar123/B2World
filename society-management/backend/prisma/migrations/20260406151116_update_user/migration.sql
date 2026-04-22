/*
  Warnings:

  - The primary key for the `Complaint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Complaint` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `Complaint` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `societyId` on table `Complaint` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Society` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending',
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "societyId" SET NOT NULL,
ADD CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Society" ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
