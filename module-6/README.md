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
8. $lookup stage, embedding vs referencing
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
- [$facet, multiple pipeline aggregation stage](#facet-multiple-pipeline-aggregation-stage)
  - [References:](#references-6)
  - [Example:](#example-4)
- [$lookup stage, embedding vs referencing](#lookup-stage-embedding-vs-referencing)
  - [Embedded](#embedded)
  - [Referencing](#referencing)
  - [MongoDB $lookup](#mongodb-lookup)
- [What is indexing, COLLSCAN vs IXSCAN](#what-is-indexing-collscan-vs-ixscan)
  - [References](#references-7)
  - [Explanation](#explanation)
  - [Example](#example-5)
- [Explore compound index and text index](#explore-compound-index-and-text-index)
  - [References](#references-8)
  - [1. Compound Index](#1-compound-index)
  - [2. Text Index](#2-text-index)

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

# $facet, multiple pipeline aggregation stage

Sometimes when creating a report on data, you find that you need to do the same preliminary processing for a number of reports, and you are faced with having to create and maintain an intermediate collection.

You may, for example, do a weekly summary of trading that is used by all subsequent reports. You might have wished it were possible to run more than one pipeline simultaneously over the output of a single aggregation pipeline.

We can now do it within a single pipeline thanks to the `$facet` stage.

### References:

- [$fecet](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-facet)

### Example:

```ts
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
```

# $lookup stage, embedding vs referencing

### Embedded

- One-to-one Relationships
- Frequent Reading Data
- Atomic Updates
- Reduced Network Overhead
- Small Data size

### Referencing

- One-to-Many Relationships
- Many-to-Many
- Frequent Writing
- Big Data Size
- Scalability
- Flexibility

### [MongoDB $lookup](https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/#mongodb-lookup)

Because MongoDB is document-based, we can shape our documents the way we need. However, there is often a requirement to use information from more than one collection.

Using the `$lookup`, here is an aggregate query that merges fields from two collections.

```ts
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
]);
```

# What is indexing, COLLSCAN vs IXSCAN

### References

- [indexing](https://www.mongodb.com/docs/manual/indexes/?utm_source=compass&utm_medium=product#single-field)

```ts
db.getCollection("massive-data").createIndex({ email: 1 });
```

### Explanation

In MongoDB, indexing is like creating a table of contents for your data. It helps MongoDB quickly find the documents you're looking for, just like flipping through a book with a table of contents is faster than flipping through every page.

Now, let's talk about COLLSCAN and IXSCAN:

1. **COLLSCAN**: Imagine you're looking for a specific word in a book, but there's no table of contents, so you have to check every page one by one. COLLSCAN (short for Collection Scan) is like that. MongoDB has to look through every document in a collection to find what you're searching for. It's slow and not efficient, especially with large amounts of data.
2. **IXSCAN**: This is much better. It's like having an alphabetized index at the back of the book. When you're searching for a word, you just look it up in the index, find the page number, and go straight to that page. In MongoDB, IXSCAN (Index Scan) is similar. If there's an index on the field you're searching for, MongoDB can quickly scan the index to find the documents you need, making the search much faster.

Here's an example: Let's say you have a MongoDB collection of books, and you want to find all the books written by a specific author, let's say "J.K. Rowling".

- With COLLSCAN, MongoDB would need to check every book in the collection to see if it's written by "J.K. Rowling".
- With IXSCAN, if there's an index on the "author" field, MongoDB can quickly find all the books by "J.K. Rowling" by scanning the index, which is much faster.

So, to sum up, COLLSCAN means scanning through every document in a collection, while IXSCAN means using an index to quickly find the documents you're looking for. And of course, IXSCAN is much more efficient!

### Example

let's create a simple example to illustrate COLLSCAN and IXSCAN using MongoDB's JavaScript-like syntax (MongoDB Shell).

Let's start by inserting some sample data into a collection:

```jsx
// Inserting sample data into the "books" collection
db.books.insertMany([
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling" },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
]);
```

Now, let's create an index on the "author" field:

```jsx
// Creating an index on the "author" field
db.books.createIndex({ author: 1 });
```

Now, let's run queries with and without the index:

1. **COLLSCAN** (without index):

```jsx
// Query without index (COLLSCAN)
db.books.find({ author: "J.K. Rowling" }).explain("executionStats");
```

1. **IXSCAN** (with index):

```ts
// Query with index (IXSCAN)
db.books.find({ author: "J.K. Rowling" }).explain("executionStats");
```

When you run these queries, MongoDB will provide execution statistics, including details about whether COLLSCAN or IXSCAN was used. You'll see that the query with the index (IXSCAN) should be much faster and more efficient than the query without the index (COLLSCAN).

# Explore compound index and text index

### References

- [Text Index](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-text/)

Let's break down compound indexes and text indexes in MongoDB:

### 1. Compound Index

Think of a compound index like a combined index in a library. In a library, you might have separate indexes for books sorted by title and another index for books sorted by author. A compound index combines these into one.

So, in MongoDB, a compound index is an index that includes multiple fields. It helps speed up queries that involve multiple fields by sorting and organizing the data in a way that makes these queries faster.

For example, if you frequently query books by both title and author, creating a compound index on both fields can significantly speed up those queries.

Here's a simple example in MongoDB's syntax:

```ts
// Creating a compound index on "title" and "author" fields
db.books.createIndex({ title: 1, author: 1 });
```

This index will make queries that involve both the "title" and "author" fields much faster.

### 2. Text Index

A text index is specialized for text search. It's like creating an index specifically designed for searching through words and phrases in documents.

Imagine you have a collection of articles or blog posts. A text index allows you to search for words or phrases within the text content efficiently.

Unlike regular indexes that are useful for exact matches or range queries, text indexes support full-text search capabilities, including language-specific stemming, stop words, and linguistic rules.

Here's how you create a text index:

```ts
// Creating a text index on the "content" field
db.articles.createIndex({ content: "text" });
```

This text index enables you to perform text search queries like:

```ts
// Searching for articles containing the word "MongoDB"
db.articles.find({ $text: { $search: "MongoDB" } });
```

Text indexes are handy when you need to search through large amounts of text data efficiently, like searching through articles, blog posts, comments, etc.

In simple terms, compound indexes combine multiple fields for faster querying, while text indexes specialize in efficient searching through text content.
