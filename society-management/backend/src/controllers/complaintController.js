
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// ==============================
// CREATE COMPLAINT
// ==============================

export const createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      userId,
      societyId,
      assignedStaff,
      feedback,
      rating,
      vendorId,
    } = req.body;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,

        image: req.file
          ? `/uploads/${req.file.filename}`
          : null,

        assignedStaff,

        feedback,

        rating: rating
          ? Number(rating)
          : null,

        status: "OPEN",

        user: {
          connect: {
            id: Number(userId),
          },
        },

        society: {
          connect: {
            id: Number(societyId),
          },
        },

        ...(vendorId
          ? {
              vendor: {
                connect: {
                  id: Number(vendorId),
                },
              },
            }
          : {}),
      },
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==============================
// GET ALL COMPLAINTS
// ==============================

export const getComplaints = async (req, res) => {
  try {

    // const complaints =
    //   await prisma.complaint.findMany({
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   });
  // const complaints =
  // await prisma.complaint.findMany({
  //   include: {
  //     vendor: true,
  //   },

  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  const complaints =
 await prisma.complaint.findMany({
   include:{
     user:true,
     society:true,
     vendor:true
   },
   orderBy:{
     createdAt:"desc"
   }
 });

    res.json(complaints);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};


// ==============================
// UPDATE STATUS
// ==============================


export const updateComplaintStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const complaint =
        await prisma.complaint.update({
          where: {
            id: Number(req.params.id),
          },
          data: {
            status,
          },
        });

      res.json(complaint);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: error.message,
      });
    }
  };

//Delete Complaint
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

// ==============================
// ADD FEEDBACK & RATING
// ==============================

export const addFeedback =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        feedback,
        rating,
      } = req.body;

      const complaint =
        await prisma.complaint.update({
          where: {
            id: Number(id),
          },

          data: {
            feedback,
            rating: Number(rating),
          },
        });

      res.json(complaint);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Feedback failed",
      });
    }
  };
  export const updateComplaint = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      description,
      assignedStaff,
      feedback,
      rating,
      status,
    } = req.body;

    const updatedComplaint =
      await prisma.complaint.update({

        where: {
          id: Number(id),
        },

        data: {
          title,
          description,
          assignedStaff,
          feedback,
          rating: Number(rating),
          status,

          image: req.file
            ? `/uploads/${req.file.filename}`
            : undefined,
        },
      });

    res.json(updatedComplaint);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Complaint update failed",
    });
  }
};
// export const assignComplaint = async(req,res)=>{

//   const complaint = await prisma.complaint.update({

//     where:{
//       id:Number(req.params.id)
//     },

//     data:{
//       assignedStaff:req.body.assignedStaff,
//       assignedAt:new Date(),
//       status:"IN_PROGRESS"
//     }

//   });

//   res.json(complaint);

// };
export const assignComplaint =
async(req,res)=>{

  try{

    const complaint =
      await prisma.complaint.update({

        where:{
          id:Number(req.params.id)
        },

        data:{
          assignedStaff:req.body.assignedStaff,

          assignedAt:new Date(),

          status:"IN_PROGRESS"
        }

      });

    res.json(complaint);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Assign failed"
    });

  }

};
// 
export const resolveComplaint =
async(req,res)=>{

  try{

    const complaint =
      await prisma.complaint.update({

        where:{
          id:Number(req.params.id)
        },

        data:{
          status:"RESOLVED",

          resolvedAt:new Date()
        }

      });

    res.json(complaint);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"Resolve failed"
    });

  }

};
// export const assignVendor = async(req,res)=>{

//   const complaint =
//    await prisma.complaint.update({

//     where:{
//       id:Number(req.params.id)
//     },

//     data:{
//       vendorId:req.body.vendorId,
//       status:"IN_PROGRESS"
//     }

//    });

//    res.json(complaint);

// };
export const assignVendor = async(req,res)=>{
  const complaint =
   await prisma.complaint.update({
      where:{
        id:Number(req.params.id)
      },
      data:{
        vendorId:Number(req.body.vendorId),
        status:"IN_PROGRESS"
      }
   });

   res.json(complaint);
};