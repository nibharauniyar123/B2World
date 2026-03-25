
export const getDashboard = async (req, res) => {
  try {
    res.json({
      message: "Dashboard working",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};