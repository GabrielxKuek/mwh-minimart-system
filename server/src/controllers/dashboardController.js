const { getTotalResidents, getTotalPendingRequests, getLowStockItems, getApprovedRequests, getRecentChanges, getTotalPendingTasks } = require("../models/dashboardModel");

module.exports.getDashboardData = async (req, res) => {
  try {
    const totalResidents = await getTotalResidents();
    const totalPendingRequests = await getTotalPendingRequests();
    const lowStockItems = await getLowStockItems();
    const approvedRequests = await getApprovedRequests();
    const recentChanges = await getRecentChanges();
    const totalPendingTasks = await getTotalPendingTasks();

    res.status(200).json({
      totalResidents,
      totalPendingRequests,
      lowStockItems,
      approvedRequests,
      recentChanges,
      totalPendingTasks,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};