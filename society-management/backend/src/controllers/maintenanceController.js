import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL
export const getMaintenance =
  async (req, res) => {
    try {
      const data =
        await prisma.maintenance.findMany({
          orderBy: {
            id: "desc",
          },
        });

      res.json(data);
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  };

// CREATE
export const createMaintenance =
  async (req, res) => {
    try {
      const {
        amount,
        month,
        userId,
      } = req.body;

      const data =
        await prisma.maintenance.create({
          data: {
            amount:
              parseFloat(
                amount
              ),
            month,
            userId:
              parseInt(
                userId
              ),
            status:
              "PENDING",
          },
        });

      res.status(201).json(
        data
      );
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  };

// DELETE
export const deleteMaintenance =
  async (req, res) => {
    try {
      const id =
        parseInt(
          req.params.id
        );

      await prisma.maintenance.delete({
        where: {
          id,
        },
      });

      res.json({
        message:
          "Deleted",
      });
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  };

// UPDATE STATUS
export const updateMaintenance =
  async (req, res) => {
    try {
      const id =
        parseInt(
          req.params.id
        );

      const {
        status,
      } = req.body;

      const updated =
        await prisma.maintenance.update({
          where: {
            id,
          },
          data: {
            status,
          },
        });

      res.json(
        updated
      );
    } catch (error) {
      res.status(500).json({
        error:
          error.message,
      });
    }
  };