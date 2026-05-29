
import prisma from "../config/prisma.js";

// export const createVendor = async (req, res) => {

//   try {

//     const {
//       name,
//       service,
//       phone,
//       address,
//     } = req.body;

//     const vendor =
//       await prisma.vendor.create({
//         data: {
//           name,
//           service,
//           phone,
//           address,
//         },
//       });

//     res.status(201).json(vendor);

//   } catch (error) {

//     console.log("CREATE VENDOR ERROR:", error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const createVendor = async (req, res) => {
  try {
    const { name, service, phone, address } = req.body;

    const vendor = await prisma.vendor.create({
      data: {
        name,
        service,
        phone,
        address,
      },
    });

    res.status(201).json(vendor);

  } catch (error) {

    console.log("CREATE VENDOR ERROR:", error);

    res.status(500).json({
      error: "Failed to create vendor",
    });
  }
};

export const getVendors = async (req, res) => {

  try {

    const vendors =
      await prisma.vendor.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(vendors);

  } catch (error) {

    console.log("GET VENDOR ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteVendor = async (req, res) => {

  try {

    await prisma.vendor.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Vendor deleted",
    });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};