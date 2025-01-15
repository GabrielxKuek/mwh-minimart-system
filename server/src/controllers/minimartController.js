// module.exports.readAllProductByAll = (req, res, next) => {
//   res.status(200).send([
//     {
//       product_id: 1,
//       name: "Spicy Doritos",
//       description: "Crunchy tortilla chips with intense nacho cheese and spicy flavoring. Perfect for parties or gaming sessions.",
//       quantity: 150,
//       image_url: "doritos_spicy.jpg",
//       point: 3
//     },
//     {
//       product_id: 2,
//       name: "Oreo Pack",
//       description: "Classic sandwich cookies with creamy vanilla filling. Contains 15 cookies per pack.",
//       quantity: 200,
//       image_url: "oreo_classic.jpg",
//       point: 2
//     },
//     {
//       product_id: 3,
//       name: "Mixed Nuts Premium",
//       description: "A healthy blend of cashews, almonds, and pistachios. Roasted and lightly salted.",
//       quantity: 75,
//       image_url: "mixed_nuts.jpg",
//       point: 5
//     },
//     {
//       product_id: 4,
//       name: "Pocky Chocolate",
//       description: "Japanese biscuit sticks coated with rich milk chocolate. Great for sharing!",
//       quantity: 120,
//       image_url: "pocky_choco.jpg",
//       point: 3
//     },
//     {
//       product_id: 5,
//       name: "Instant Ramen Bowl",
//       description: "Quick and tasty chicken flavored ramen with dehydrated vegetables. Ready in 3 minutes.",
//       quantity: 300,
//       image_url: "ramen_chicken.jpg",
//       point: 4
//     },
//     {
//       product_id: 6,
//       name: "Pringles Original",
//       description: "Original flavored potato crisps in a convenient stackable can. Stay fresh longer!",
//       quantity: 100,
//       image_url: "pringles_original.jpg",
//       point: 3
//     },
//     {
//       product_id: 7,
//       name: "KitKat Green Tea",
//       description: "Japanese special edition green tea flavored chocolate wafer bars. Pack of 2.",
//       quantity: 85,
//       image_url: "kitkat_matcha.jpg",
//       point: 4
//     },
//     {
//       product_id: 8,
//       name: "Dried Mango",
//       description: "Natural dried mango slices with no added sugar. Healthy and sweet snack option.",
//       quantity: 90,
//       image_url: "dried_mango.jpg",
//       point: 5
//     },
//     {
//       product_id: 9,
//       name: "Cheetos Flamin' Hot",
//       description: "Extra spicy cheese-flavored snacks. Warning: seriously hot!",
//       quantity: 180,
//       image_url: "cheetos_hot.jpg",
//       point: 3
//     },
//     {
//       product_id: 10,
//       name: "Popcorn Classic",
//       description: "Microwave popcorn with classic butter flavor. Ready in 2 minutes.",
//       quantity: 250,
//       image_url: "popcorn_butter.jpg",
//       point: 2
//     }
//   ])
// };

// module.exports.readAllRequestByUser = (req, res, next) => {
//     res.status(200).send([
//         {
//             request_id: 1,
//             product_id: 3,
//             status_id: 1,
//             quantity: 2
//         },
//         {
//             request_id: 2,
//             product_id: 1,
//             status_id: 2,
//             quantity: 1
//         },
//         {
//             request_id: 3,
//             product_id: 7,
//             status_id: 4,
//             quantity: 3
//         },
//         {
//             request_id: 4,
//             product_id: 5,
//             status_id: 3,
//             quantity: 5
//         },
//         {
//             request_id: 5,
//             product_id: 2,
//             status_id: 1,
//             quantity: 2
//         },
//         {
//             request_id: 6,
//             product_id: 10,
//             status_id: 2,
//             quantity: 1
//         },
//         {
//             request_id: 7,
//             product_id: 4,
//             status_id: 1,
//             quantity: 4
//         },
//         {
//             request_id: 8,
//             product_id: 8,
//             status_id: 2,
//             quantity: 2
//         },
//         {
//             request_id: 9,
//             product_id: 6,
//             status_id: 4,
//             quantity: 1
//         },
//         {
//             request_id: 10,
//             product_id: 9,
//             status_id: 2,
//             quantity: 3
//         }
//     ])
// };

// module.exports.createRequest = (req, res, next) => {
//     res.status(200).send({
//         message: "Request created successfully"
//     })
// }

const { getAllProducts } = require('../models/minimartModel');

module.exports.readAllProductByAll = async (req, res, next) => {
  try {
    // Get products using your existing model function
    const products = await getAllProducts();
    
    // Transform the data to match your desired response format
    const formattedProducts = products.map(product => ({
      product_id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      image_url: product.imageUrl,
      point: product.point
    }));

    // Send successful response
    res.status(200).send(formattedProducts);
    
  } catch (error) {
    console.error("Error in readAllProductByAll:", error);
    res.status(500).send({
      message: "Failed to fetch products",
      error: error.message
    });
  }
};