<h1 align='center'>Mastering MongoDB Aggregation & Indexing</h1>

## Topics:

0. Intro the powerful aggregation framework
1. $match , $project aggregation stage
2. $addFields , $out , $merge aggregation stage
3. $group , $sum , $push aggregation stage
4. Explore more about $group & $project
5. Explore $group with $unwind aggregation stage
6. $bucket, $sort, and $limit aggregation stage
7. $facet, multiple pipeline aggregation stage
8. $lookup stage, embedding vs referencing.mp4
9. What is indexing, COLLSCAN vs IXSCAN
10. Explore compound index and text index
11. Practice Task - 2

## Table of Contents:

- [Intro The Powerful Aggregation Framework](#intro-the-powerful-aggregation-framework)
  - [What is Aggregation?](#what-is-aggregation)
  - [SyntaxS](#syntaxs)
  - [Data Flow](#data-flow)
  - [Example](#example)
- [$match , $project aggregation stage](#match--project-aggregation-stage)
  - [References](#references)
  - [Example](#example-1)
- [$addFields , $out , $merge aggregation stage](#addfields--out--merge-aggregation-stage)
  - [References](#references-1)
- [$group , $sum , $push aggregation stage](#group--sum--push-aggregation-stage)
  - [References](#references-2)
  - [MongoDB $group aggregation operators](#mongodb-group-aggregation-operators)
- [Explore more about $group \& $project](#explore-more-about-group--project)
  - [References](#references-3)
- [Explore $group with $unwind aggregation stage](#explore-group-with-unwind-aggregation-stage)
  - [References](#references-4)
  - [Example](#example-2)
- [$bucket, $sort, and $limit aggregation stage](#bucket-sort-and-limit-aggregation-stage)
  - [References](#references-5)
  - [Example](#example-3)

# Intro The Powerful Aggregation Framework

### What is Aggregation?

Aggregation is a way of processing a large number of documents in a collection by means of passing them through different stages.

The stages make up what is known as a pipeline.

The states in a pipeline can filter, sort, group, reshape, and modify documents that pass through the pipeline.

### SyntaxS

```ts
// mongodb aggregation syntax
db.collection.aggregate([
  // stage 1
  {}, // -> pipeline
  {}, // -> pipeline
  {}, // -> pipeline
]);
```

### Data Flow

`collection` → `stage 1` → `stage 2` → `stage 3` → `Final output`

### Example

```ts
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
```

# $match , $project aggregation stage

### References

- [$match](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-match)
- [$project](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-project)

find():

```ts
db.users.find({
  gender: "Male",
  age: { $lt: 30 },
});
```

aggregate();

```ts
db.users.aggregate([
  // stage-1
  { $match: { gender: "Male", age: { $lt: 30 } } },
]);
```

### Example

```ts
db.users
  .find({
    gender: "Male",
    age: { $lt: 30 },
  })
  .project({
    name: 1,
    gender: 1,
    age: 1,
  });
```

```ts
db.users.aggregate([
  // stage-1
  { $match: { gender: "Male", age: { $lt: 30 } } },

  // stage-2
  { $project: { name: 1, gender: 1, age: 1 } },
]);
```

# $addFields , $out , $merge aggregation stage

### References

- [$merge](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-out)
- [$addFields](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#addfields)

```ts
db.users.aggregate([
  // stage-1:
  { $match: { gender: "Male" } },

  // stage-2:
  {
    $addFields: {
      course: "level-2",
      edTech: "Programming Hero",
    },
  },

  // stage-3:
  // { $project: { email: 1, course: 1, edTech: 1 } },

  // stage-4:
  { $out: "courseStudents" },
]);
```

```ts
db.users.aggregate([
  // stage-1:
  // { $match: { gender: "Male" } },

  // stage-2:
  {
    $addFields: {
      course: "level-2",
      edTech: "Programming Hero",
    },
  },

  // stage-3:
  // { $project: { email: 1, course: 1, edTech: 1 } },

  // stage-4:
  { $merge: "users" },
]);
```

# $group , $sum , $push aggregation stage

### References

- [$group](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-group)

### [MongoDB $group aggregation operators](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-aggregation-operators)

The $group stage supports certain expressions (operators) allowing users to perform arithmetic, array, boolean and other operations as part of the aggregation pipeline.

| Operator | Meaning                                                             |
| -------- | ------------------------------------------------------------------- |
| $count   | Calculates the quantity of documents in the given group.            |
| $max     | Displays the maximum value of a document’s field in the collection. |
| $min     | Displays the minimum value of a document’s field in the collection. |
| $avg     | Displays the average value of a document’s field in the collection. |
| $sum     | Sums up the specified values of all documents in the collection.    |
| $push    | Adds extra values into the array of the resulting document.         |

```ts
db.users.aggregate([
  // stage-1
  {
    $group: {
      _id: "$address.country",
      totalPeople: { $sum: 1 },
      people: { $push: "$name" },
    },
  },

  // stage-2
  { $sort: { _id: 1 } },
]);
```

`$$ROOT`

References the root document, i.e. the top-level document, currently being processed in the aggregation pipeline stage.

```ts
db.users.aggregate([
  // stage-1
  {
    $group: {
      _id: "$address.country",
      totalPeople: { $sum: 1 },
      people: { $push: "$$ROOT" },
    },
  },

  // stage-2
  { $sort: { _id: 1 } },
]);
```

`$project`

```ts
db.users.aggregate([
  // stage-1
  {
    $group: {
      _id: "$address.country",
      totalPeople: { $sum: 1 },
      people: { $push: "$$ROOT" },
    },
  },

  // stage-2
  { $sort: { _id: 1 } },

  // stage-3
  {
    $project: {
      "people.name": 1,
      "people.email": 1,
      "people.phone": 1,
      totalPeople: 1,
    },
  },
]);
```

# Explore more about $group & $project

### References

- [project](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-project)
- [$group](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-group)

```ts
db.users.aggregate([
  // stage-1
  {
    $group: {
      _id: null,
      totalPeople: { $sum: 1 },
      totalSalary: { $sum: "$salary" },
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" },
      avgSalary: { $avg: "$salary" },
    },
  },

  // stage-2
  {
    $project: {
      totalSalary: 1,
      maxSalary: 1,
      minSalary: 1,
      averageSalary: "$avgSalary",
      differenceBetweenMinMax: { $subtract: ["$maxSalary", "$minSalary"] },
    },
  },
]);
```

# Explore $group with $unwind aggregation stage

### References

- [$unwind](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-unwind)

### Example

```ts
db.users.aggregate([
  // stage-1
  {
    $unwind: "$friends",
  },

  // stage
  {
    $group: { _id: "$friends", count: { $sum: 1 } },
  },
]);
```

```ts
db.users.aggregate([
  // stage-1
  {
    $unwind: "$interests",
  },

  // stage
  {
    $group: {
      _id: "$age",
      count: { $sum: 1 },
      interestsPerAge: { $push: "$interests" },
    },
  },
]);
```

# $bucket, $sort, and $limit aggregation stage

### References

- [$bucket](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/)

### Example

```ts
db.users.aggregate([
  // stage-1
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 40, 60, 80],
      default: "80 er uporer bura gula",
      output: {
        count: { $sum: 1 },
        people: {
          $push: {
            age: "$age",
            name: "$name",
          },
        },
      },
    },
  },

  // stage-2
  {
    $sort: { count: 1 },
  },
]);
```
