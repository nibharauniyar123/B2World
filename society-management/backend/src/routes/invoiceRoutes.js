import express from "express";

const router = express.Router();

router.get("/:id", async (req, res) => {

  try {

    res.json({
      message: "Invoice generated",
      invoiceId: req.params.id,
    });

  } catch (error) {

    res.status(500).json({
      message: "Invoice failed",
    });
  }
});

export default router;