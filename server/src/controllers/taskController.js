module.exports.readAllTasksByUser = (req, res, next) => {
  res.status(200).send([
      {
        task_id: 1,
        name: "Complete Project Documentation",
        description: "Write comprehensive documentation for the new feature release",
        image: "doc_template.png",
        point: 10,
        completion_image: "completed_doc.jpg"
      },
      {
        task_id: 2,
        name: "Code Review",
        description: "Review pull request #123 for the authentication module",
        image: "code_review.png",
        point: 5,
        completion_image: null
      },
      {
        task_id: 4,
        name: "UI Testing",
        description: "Perform user acceptance testing for the new dashboard",
        image: "test_cases.png",
        point: 15,
        completion_image: "dashboard_test_results.png"
      }
    ])
};