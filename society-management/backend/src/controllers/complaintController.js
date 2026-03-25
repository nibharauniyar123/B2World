import prisma from "../prisma/prismaClient.js";

// CREATE COMPLAINT
export const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        userId: req.user.id,
        societyId: req.user.societyId,
      },
    });

    res.json({
      message: "Complaint created",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL COMPLAINTS
export const getComplaints = async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({
      where: {
        societyId: req.user.societyId,
      },
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STATUS
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;

    const complaint = await prisma.complaint.update({
      where: { id },
      data: { status },
    });

    res.json({
      message: "Status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};