-- CreateTable
CREATE TABLE "Flat" (
    "id" SERIAL NOT NULL,
    "block" TEXT NOT NULL,
    "flatNo" TEXT NOT NULL,
    "societyId" INTEGER NOT NULL,

    CONSTRAINT "Flat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flat" ADD CONSTRAINT "Flat_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
