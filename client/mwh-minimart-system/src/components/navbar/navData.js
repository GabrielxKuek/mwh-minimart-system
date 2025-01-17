export const adminMenuItems = {
    management: [
      { to: "/user-management", label: "User Management" },
      { to: "/task-management", label: "Task Management" },
      { to: "/inventory-management", label: "Inventory" },
    ],
    requests: [
      { to: "/task-completion-request", label: "Completion Requests" },
      { to: "/request-management", label: "Current Requests" },
      { to: "/request-history", label: "Request History" },
    ],
    reports: [
      { to: "/transactions", label: "Transactions" },
      { to: "/reports", label: "Reports" },
    ],
  };
  
  export const userMenuItems = {
    activities: [
      { to: "/tasks", label: "Tasks" },
      { to: "/achievements", label: "Achievements" },
      { to: "/leaderboard", label: "Leaderboard" },
    ],
    rewards: [
      { to: "/minimart", label: "Minimart" },
      { to: "/vouchers", label: "Vouchers" },
    ],
  };