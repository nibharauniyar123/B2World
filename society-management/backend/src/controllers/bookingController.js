import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET ALL
export const getBookings =
  async (req, res) => {
    try {
      const data =
        await prisma.booking.findMany({
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
export const createBooking =
  async (req, res) => {
    try {
      const {
        amenity,
        date,
        slot,
        userId,
      } = req.body;

      const data =
        await prisma.booking.create({
          data: {
            amenity,
            date: new Date(date),
            slot,
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
export const deleteBooking =
  async (req, res) => {
    try {
      const id =
        parseInt(
          req.params.id
        );

      await prisma.booking.delete({
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
export const updateBooking =
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
        await prisma.booking.update({
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