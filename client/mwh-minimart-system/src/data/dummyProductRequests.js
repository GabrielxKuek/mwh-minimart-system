const dummyProductRequests = [
  {
    week: "2024-W51", // December 16 - 22, 2024
    requests: [
      { product: "Product A", userId: "user1", quantity: 2 },
      { product: "Product B", userId: "user2", quantity: 5 },
      { product: "Product A", userId: "user3", quantity: 1 },
      { product: "Product C", userId: "user1", quantity: 3 },
    ],
  },
  {
    week: "2024-W52", // December 23 - 29, 2024
    requests: [
      { product: "Product B", userId: "user2", quantity: 3 },
      { product: "Product D", userId: "user4", quantity: 7 },
      { product: "Product C", userId: "user1", quantity: 2 },
      { product: "Product A", userId: "user3", quantity: 2 },
    ],
  },
  {
    week: "2025-W01", // December 30, 2024 - January 5, 2025
    requests: [
      { product: "Product C", userId: "user4", quantity: 4 },
      { product: "Product D", userId: "user2", quantity: 1 },
      { product: "Product A", userId: "user1", quantity: 3 },
      { product: "Product B", userId: "user3", quantity: 6 },
    ],
  },
  {
    week: "2025-W02", // January 6 - 12, 2025
    requests: [
      { product: "Product A", userId: "user3", quantity: 4 },
      { product: "Product C", userId: "user1", quantity: 1 },
      { product: "Product D", userId: "user4", quantity: 2 },
      { product: "Product B", userId: "user2", quantity: 3 },
    ],
  },
  {
    week: "2025-W03", // January 13 - 19, 2025
    requests: [
      { product: "Product B", userId: "user4", quantity: 5 },
      { product: "Product D", userId: "user3", quantity: 2 },
      { product: "Product C", userId: "user2", quantity: 4 },
      { product: "Product A", userId: "user1", quantity: 1 },
    ],
  },
  {
    week: "2025-W04", // January 20 - 26, 2025
    requests: [
      { product: "Product D", userId: "user1", quantity: 3 },
      { product: "Product A", userId: "user4", quantity: 2 },
      { product: "Product C", userId: "user3", quantity: 6 },
      { product: "Product B", userId: "user2", quantity: 1 },
    ],
  },
];

export default dummyProductRequests;
