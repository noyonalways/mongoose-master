// Problem 1
db.users.find(
  {
    age: { $gt: 30 },
  },
  {
    name: 1,
    email: 1,
  }
);

// Problem 2
db.users.find(
  {
    $or: [{ favouriteColor: "Maroon" }, { favouriteColor: "Blue" }],
  },
  {
    email: 1,
    favouriteColor: 1,
  }
);

// Problem 3
db.users.find(
  {
    skills: { $size: 0 },
  },
  {
    skills: 1,
    email: 1,
  }
);

// Problem 4
db.users.find(
  {
    $and: [{ "skills.name": "JAVASCRIPT" }, { "skills.name": "JAVA" }],
  },
  {
    email: 1,
    skills: 1,
  }
);

// Problem 5
db.users.updateOne(
  { email: "dmanson2n@godaddy.com" },
  {
    $addToSet: {
      skills: {
        name: "Python",
        level: "Beginner",
        isLearning: true,
      },
    },
  }
);

// Problem 6
db.users.updateMany(
  { $expr: { $gte: [{ $size: "$languages" }, 0] } },
  { $addToSet: { languages: "Spanish" } }
);

// Problem 7
db.users.updateMany(
  {
    "skills.name": "KOTLIN",
  },
  {
    $pull: {
      skills: {
        name: "KOTLIN",
      },
    },
  }
);
