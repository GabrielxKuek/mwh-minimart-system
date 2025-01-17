const { getTotalResidents, getTotalPendingRequests, getLowStockItems, getApprovedRequests, getRecentChanges } = require("../models/dashboardModel");

module.exports.getDashboardData = async (req, res) => {
  try {
    const totalResidents = await getTotalResidents();
    const totalPendingRequests = await getTotalPendingRequests();
    const lowStockItems = await getLowStockItems();
    const approvedRequests = await getApprovedRequests();
    const recentChanges = await getRecentChanges();

    res.status(200).json({
      totalResidents,
      totalPendingRequests,
      lowStockItems,
      approvedRequests,
      recentChanges,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};