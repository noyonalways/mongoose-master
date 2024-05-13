// mongodb aggregation syntax
db.collection.aggregate([
  // stage 1
  {}, // -> pipeline
  {}, // -> pipeline
  {}, // -> pipeline
]);

// data flow
// `collection` => `stage 1` => `stage 2` => `stage 3` => `Final output`

// example:
db.cousins.aggregate([
  // filtering out th cousins who have an exam
  { $match: { hasExam: { $ne: true } } },

  // filtering out cousins who have a budget less than 500
  { $match: { budget: { $gte: 500 } } },

  // filter out cousins who are sick
  { $match: { isSick: false } },

  // sort by age
  { $sort: { age: -1 } },

  // limit by 2
  { $limit: 2 },

  // calculate the budget
  {
    $group: {
      _id: null,
      totalBudget: { $sum: "$budget" },
      cousins: { $push: "$name" },
    },
  },
]);

// $facet
db.users.aggregate([
  {
    $facet: {
      // pipeline-1
      friendsCount: [
        // stage-1
        { $unwind: "$friends" },

        // stage-2
        { $group: { _id: "$friends", count: { $sum: 1 } } },
      ],

      // pipeline-2
      educationCount: [
        // stage-1
        { $unwind: "$education" },

        // stage-2
        { $group: { _id: "$education.major", count: { $sum: 1 } } },
      ],

      // pipeline-3
      skillsCount: [
        // stage-1
        { $unwind: "$skills" },

        // stage-2
        { $group: { _id: "$skills.name", count: { $sum: 1 } } },
      ],
    },
  },
]);
