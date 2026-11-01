import Feedback from "../models/feedbackModel.js";

export const getAdminStatistics = async (req, res) => {
  try {

    const categoryStats = await Feedback.aggregate([
      {
        $group: {
          _id: "$category",
          totalReviews: { $sum: 1 },
          avgRating: {$avg: '$rating'}
        }
      },
      {
        $sort: {
          totalReviews: -1
        }
      }
    ]);

    const totalFeedbacks = await Feedback.countDocuments()

    let averageRating = await Feedback.aggregate([
        {
            $group: {
                _id: null,
                avgRating: {
                    $avg: "$rating"
                }
            }
        }
    ]);

    averageRating = Number(
        (averageRating[0]?.avgRating ?? 0).toFixed(2)
    );

    const fiveStarRatings = await Feedback.countDocuments({
       rating: 5
    })

    const ratingsDistribution = await Feedback.aggregate([
        {
            $group:{
                _id: "$rating",
                ratingCount: {$sum: 1}
            }
        },
        {
            $sort: {
                ratingCount: -1
            }
        }
    ])

    const monthWiseSubmissions = await Feedback.aggregate([
        {
            $group:{
                _id: {
                    $dateToString: {
                        format: '%Y-%m',
                        date: '$createdAt'
                    }
                },
                totalReviews: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])

    const latestFeedbacks = await Feedback.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $limit: 5
        },
        {
            $project: {
                _id: 1,
                name: 1,
                category: 1,
                feedback: 1,
                rating: 1,
                createdAt: 1
            }
        }
    ]);

    const highestRated = await Feedback.aggregate([
        {
            $match:{
                "rating": 5
            }
        },
        {
            $group:{
                _id: "$category",
                totalReviews: {
                    $sum: 1
                },
            }
        },
        {
            $sort: {
                totalReviews: -1
            }
        },
        {
            $limit: 1
        }
    ])

    const lowestRated = await Feedback.aggregate([
        {
            $match:{
                "rating": 1
            }
        },
        {
            $group:{
                _id: "$category",
                totalReviews: {
                    $sum: 1
                },
            }
        },
        {
            $sort: {
                totalReviews: -1
            }
        },
        {
            $limit: 1
        }
    ])

    res.status(200).json({
      success: true,
      categoryStats,
      totalFeedbacks,
      averageRating,
      fiveStarRatings,
      ratingsDistribution,
      monthWiseSubmissions,
      latestFeedbacks,
      highestRated,
      lowestRated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

