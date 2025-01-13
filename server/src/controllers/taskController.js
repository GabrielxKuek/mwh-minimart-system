module.exports.readAllTasksByUser = (req, res, next) => {
  res.status(200).send([
    {
      task_id: 1,
      name: "Clean the halls",
      description: "Clean the halls of the dorm",
      image: "https://aline-studio.com/wp-content/uploads/2020/03/310-East-70th-Street-New-York-NY-Lenox-Hill-Lobby-Redesign-View-3thumnail.jpg",
      point: 10,
      completion_image: "https://as2.ftcdn.net/jpg/00/59/97/55/1000_F_59975580_F6jew6yj2e4UkrNWc3pww6A7tv0Kp0nu.webp",
      status: "completed"
    },
    {
      task_id: 2,
      name: "Hide contraband",
      description: "Hide the contraband in the dorm",
      image: "https://www.shutterstock.com/shutterstock/photos/38146915/display_1500/stock-photo-thief-and-walk-on-tiptoe-silent-robber-walks-on-toes-with-shoes-in-hand-the-man-in-the-mask-38146915.jpg",
      point: 5,
      completion_image: "https://as2.ftcdn.net/jpg/00/59/97/55/1000_F_59975580_F6jew6yj2e4UkrNWc3pww6A7tv0Kp0nu.webp",
      status: "pending"
    },
    {
      task_id: 4,
      name: "Clear trash",
      description: "Clear all the trash in the dorm",
      image: "https://thumbs.dreamstime.com/z/trash-can-vector-illustration-30463554.jpg?ct=jpeg",
      point: 15,
      completion_image: "https://as2.ftcdn.net/jpg/00/59/97/55/1000_F_59975580_F6jew6yj2e4UkrNWc3pww6A7tv0Kp0nu.webp",
      status: "completed"
    },
    {
      task_id: 5,
      name: "Wash the dishes",
      description: "Wash all the dishes in the sink",
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*cMEj0b9WHzvkw21FKiQ5UA.png",
      point: 5,
      completion_image: null,
      status: "incomplete"
    }
  ])
};

module.exports.readCompletedTasksByUser = (req, res, next) => {
  res.status(200).send([
    {
      task_id: 1,
      name: "Clean the halls",
      description: "Clean the halls of the dorm",
      image: "https://aline-studio.com/wp-content/uploads/2020/03/310-East-70th-Street-New-York-NY-Lenox-Hill-Lobby-Redesign-View-3thumnail.jpg",
      point: 10,
      completion_image: "https://as2.ftcdn.net/jpg/00/59/97/55/1000_F_59975580_F6jew6yj2e4UkrNWc3pww6A7tv0Kp0nu.webp",
      status: "completed"
    },
    {
      task_id: 4,
      name: "Clear trash",
      description: "Clear all the trash in the dorm",
      image: "https://thumbs.dreamstime.com/z/trash-can-vector-illustration-30463554.jpg?ct=jpeg",
      point: 15,
      completion_image: "https://as2.ftcdn.net/jpg/00/59/97/55/1000_F_59975580_F6jew6yj2e4UkrNWc3pww6A7tv0Kp0nu.webp",
      status: "completed"
    }
  ])
}

module.exports.readPendingTasksByUser = (req, res, next) => {
  res.status(200).send([
    {
      task_id: 2,
      name: "Hide contraband",
      description: "Hide the contraband in the dorm",
      image: "https://www.shutterstock.com/shutterstock/photos/38146915/display_1500/stock-photo-thief-and-walk-on-tiptoe-silent-robber-walks-on-toes-with-shoes-in-hand-the-man-in-the-mask-38146915.jpg",
      point: 5,
      completion_image: "https://as2.ftcdn.net/jpg/00/59/97/55/1000_F_59975580_F6jew6yj2e4UkrNWc3pww6A7tv0Kp0nu.webp",
      status: "pending"
    },
  ])
}

module.exports.readIncompleteTasksByUser = (req, res, next) => {
  res.status(200).send([
    {
      task_id: 5,
      name: "Wash the dishes",
      description: "Wash all the dishes in the sink",
      image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*cMEj0b9WHzvkw21FKiQ5UA.png",
      point: 5,
      completion_image: null,
      status: "incomplete"
    }
  ])
}