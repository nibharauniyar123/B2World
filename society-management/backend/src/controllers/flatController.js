import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ============================
// GET ALL FLATS
// ============================
export const getFlats = async (req, res) => {
  try {
    const flats = await prisma.flat.findMany({
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
    const { block, flatNo, floor, owner, societyId } = req.body;

    const updatedFlat = await prisma.flat.update({
      where: { id },
      data: {
        block,
        flatNo,
        floor,
        owner,
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