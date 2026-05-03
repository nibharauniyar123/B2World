import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL
export const getSocieties = async (req, res) => {
  try {
    const societies = await prisma.society.findMany({
      orderBy: { id: "desc" },
    });

    res.json(societies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
export const createSociety = async (req, res) => {
  try {
    const { name, address, city } = req.body;

    const society = await prisma.society.create({
      data: {
        name,
        address,
        city,
      },
    });

    res.status(201).json(society);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteSociety = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.society.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateSociety = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, address, city } = req.body;

    const updated = await prisma.society.update({
      where: { id },
      data: {
        name,
        address,
        city,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};