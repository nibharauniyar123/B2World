import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ============================
// GET ALL FLATS
// ============================
export const getFlats = async (req, res) => {
  try {
    // const flats = await prisma.flat.findMany({
    //   orderBy: {
    //     id: "desc",
    //   },
    // });
    const flats = await prisma.flat.findMany({
  include: {
    society: true,
  },
  orderBy: {
    id: "desc",
  },
});

    res.json(flats);
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ============================
// CREATE FLAT
// ============================
export const createFlat = async (req, res) => {
  try {
    const { block, flatNo, floor, ownerName, societyId } = req.body;

    const flat = await prisma.flat.create({
      data: {
        block,
        flatNo,
        floor,
        ownerName ,
        societyId: Number(societyId), // ✅ IMPORTANT
      },
    });

    res.status(201).json(flat);
  } catch (error) {
    console.log("CREATE FLAT ERROR:", error); // 👈 DEBUG
    res.status(500).json({ error: error.message });
  }
};
// ============================
// UPDATE FLAT ✅
// ============================
export const updateFlat = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { block, flatNo, floor, ownerName, societyId } = req.body;

    const updatedFlat = await prisma.flat.update({
      where: { id },
      data: {
        block,
        flatNo,
        floor,
        ownerName,
        societyId: Number(societyId),
      },
    });

    res.json(updatedFlat);
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
// ============================
// GET FLAT BY ID
// ============================

export const getFlatById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const flat = await prisma.flat.findUnique({
      where: { id },
      include: {
        society: true,
      },
    });

    if (!flat) {
      return res.status(404).json({
        message: "Flat not found",
      });
    }

    res.json(flat);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// ============================
// DELETE FLAT
// ============================
export const deleteFlat = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.flat.delete({
      where: { id },
    });

    res.json({ message: "Flat deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateOccupancy = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { occupancyStatus } = req.body;

    const flat = await prisma.flat.update({
      where: { id },
      data: {
        occupancyStatus,
      },
    });

    res.json(flat);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
export const assignResident = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { ownerName } = req.body;

    const flat = await prisma.flat.update({
      where: { id },
      data: {
        ownerName,
        occupancyStatus: "OCCUPIED",
      },
    });

    res.json(flat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};