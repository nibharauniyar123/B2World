import prisma from "../prisma/prismaClient.js";

/*
CREATE FLAT
POST /api/flats
*/
export const createFlat = async (req, res) => {
  try {
    const { block, flatNo, societyId } = req.body;

    const flat = await prisma.flat.create({
      data: {
        block,
        flatNo,
        societyId: Number(societyId),
      },
    });

    res.status(201).json({
      message: "Flat created successfully",
      flat,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
GET ALL FLATS
GET /api/flats
*/
export const getFlats = async (req, res) => {
  try {
    const flats = await prisma.flat.findMany({
      include: {
        society: true,
      },
    });

    res.json(flats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
GET SINGLE FLAT
GET /api/flats/:id
*/
export const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;

    const flat = await prisma.flat.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        society: true,
      },
    });

    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.json(flat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
UPDATE FLAT
PUT /api/flats/:id
*/
export const updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { block, flatNo } = req.body;

    const updatedFlat = await prisma.flat.update({
      where: {
        id: Number(id),
      },
      data: {
        block,
        flatNo,
      },
    });

    res.json({
      message: "Flat updated successfully",
      updatedFlat,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/*
DELETE FLAT
DELETE /api/flats/:id
*/
export const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.flat.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Flat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};