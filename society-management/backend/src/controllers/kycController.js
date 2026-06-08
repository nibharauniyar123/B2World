import prisma from "../config/prisma.js";

export const uploadKYC = async (req, res) => {
  const userId = Number(req.body.userId);

  const kyc = await prisma.kYC.create({
    data: {
      userId,
      citizenship: req.file?.filename,
    },
  });

  res.json(kyc);
};
export const getKYC = async (req, res) => {
  try {
    const { userId } = req.params;

    const kyc = await prisma.kYC.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    res.json(kyc);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch KYC",
    });
  }
};