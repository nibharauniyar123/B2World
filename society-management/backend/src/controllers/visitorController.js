import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL
export const getVisitors = async (req, res) => {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
export const createVisitor = async (req, res) => {
  try {
    const {
      name,
      phone,
      vehicle,
      residentId,
    } = req.body;

    const visitor =
      await prisma.visitor.create({
        data: {
          name,
          phone,
          vehicle,
          residentId: parseInt(
            residentId
          ),
        },
      });

    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteVisitor = async (
  req,
  res
) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.visitor.delete({
      where: { id },
    });

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};