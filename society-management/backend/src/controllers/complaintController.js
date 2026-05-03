import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL
export const getComplaints = async (req, res) => {
  try {
    const complaints =
      await prisma.complaint.findMany({
        orderBy: {
          id: "desc",
        },
      });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// CREATE
export const createComplaint = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      userId,
      societyId,
    } = req.body;

    const complaint =
      await prisma.complaint.create({
        data: {
          title,
          description,
          userId: parseInt(userId),
          societyId: parseInt(
            societyId
          ),
          status: "OPEN",
        },
      });

    res.status(201).json(
      complaint
    );
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE
export const deleteComplaint =
  async (req, res) => {
    try {
      const id = parseInt(
        req.params.id
      );

      await prisma.complaint.delete({
        where: { id },
      });

      res.json({
        message:
          "Complaint deleted",
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

// UPDATE STATUS
export const updateComplaintStatus =
  async (req, res) => {
    try {
      const id = parseInt(
        req.params.id
      );

      const { status } =
        req.body;

      const updated =
        await prisma.complaint.update({
          where: { id },
          data: {
            status,
          },
        });

      res.json(updated);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };