import Feedback from "../models/feedbackModel.js";

export const getAdminStatistics = async (req, res) => {
  try {

    const categoryStats = await Feedback.aggregate([
      {
        $group: {
          _id: "$category",
          totalReviews: { $sum: 1 }
        }
      },
      {
        $sort: {
          totalReviews: -1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      categoryStats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};