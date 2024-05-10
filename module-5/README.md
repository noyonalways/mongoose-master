<h1 align='center'>In-Depth Exploration of MongoDB Queries</h1>

## Topics:

0. Introduction
1. Install MongoDB compass & No SQL Booster
2. Insert, insertOne, find, findOne,field filtering, project
3. $eq, $neq, $gt, $lt, $gte, $lte
4. $in, $nin, implicit and condition
5. $and, $or, implicit vs explicit
6. $exists, $type, $size
7. $all, $elemMatch
8. $set, $addToSet, $push
9. $unset, $pop, $pull, $pullAll
10. More about $set, how to explore documentation
11. Delete documents, drop collection and how to explore by yourself

## Table of Contents

- [Introduction](#introduction)
  - [What is MongoDB?](#what-is-mongodb)
  - [Why MongoDB](#why-mongodb)
  - [MongoDB vs Traditional Databases](#mongodb-vs-traditional-databases)
  - [RDBMS vs MongoDB](#rdbms-vs-mongodb)
  - [MongoDB Features](#mongodb-features)
  - [Where MongoDB is a good choice?](#where-mongodb-is-a-good-choice)
- [Install MongoDB compass \& No SQL Booster](#install-mongodb-compass--no-sql-booster)
- [Insert, insertOne, find, findOne, field filtering, project](#insert-insertone-find-findone-field-filtering-project)
- [Comparison Operators: $eq, $neq, $gt, $lt, $gte, $lte](#comparison-operators-eq-neq-gt-lt-gte-lte)
  - [sort()](#sort)
- [$in, $nin, implicit and condition](#in-nin-implicit-and-condition)
- [Logical Query Operators: $and, $or, implicit vs explicit](#logical-query-operators-and-or-implicit-vs-explicit)
- [Element Query Operators: $exists, $type, $size](#element-query-operators-exists-type-size)
- [Array Query Operator: $all, $elemMatch](#array-query-operator-all-elemmatch)
- [Field Update Operators: $set, $addToSet, $push](#field-update-operators-set-addtoset-push)
  - [$each](#each)

# Introduction

### What is MongoDB?

MongoDB is a NoSQL database storing data in JSON-like documents. NoSQL databases break from traditional relational models, ideal for managing vast data. MongoDB stands out for its scalability, flexibility, and performance trusted by giants like Google, Facebook and eBay.

### Why MongoDB

- Scalable high-performance & Open source
- Document-oriented Database
- Cost-Effective Solutions
- Rich Ecosystem of Tools, Documentation and Community.

### MongoDB vs Traditional Databases

| Feature     | MongoDB                                            | Traditional Databases            |
| ----------- | -------------------------------------------------- | -------------------------------- |
| Data Model  | Document-oriented                                  | Relational                       |
| Schema      | Flexible                                           | Rigid                            |
| Scalability | Horizontal & Vertical                              | Vertical                         |
| Performance | Optimized for unstructured or semi-structured data | Optimized for structured queries |

### RDBMS vs MongoDB

| RDBMS Database | MongoDB Database |
| -------------- | ---------------- |
| Tables         | Collections      |
| Rows           | Documents        |
| Columns        | Fields           |

### MongoDB Features

- JSON-like Documents (BSON)
- Indexing
- Aggregation Framework
- Security Features
- Free Atlas Database
- MongoDB Compass (GUI)

### Where MongoDB is a good choice?

- E-commerce applications
- Social media applications
- Gaming applications
- Web applications
- Mobile applications
- Real-time applications

# Install MongoDB compass & No SQL Booster

- [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Shell Download](https://www.mongodb.com/try/download/shell)
- [MongoDB Compass Download (GUI)](https://www.mongodb.com/try/download/compass)
- [NoSQLBooster - The Smartest GUI Tool and IDE for MongoDB](https://nosqlbooster.com/downloads)

# Insert, insertOne, find, findOne, field filtering, project

get all documents:

```sh
db.collectionName.find({});
```

get documents using field filtering

```sh
db.collectionName.find({}, {name: 1, email: 1, gender: 1});
```

insert one:

```sh
db.collectionName.insertOne({name: "Next Web Development"})
```

insert many:

```sh
db.collectionName.insertMany([
{name: "Complete Web Development"},
{name: "Next Web Development"}
])
```

# Comparison Operators: $eq, $neq, $gt, $lt, $gte, $lte

`$eq` ⇒ equal

```sh
db.users.find({gender: { $eq: "Male"}})
```

```sh
db.users.find({age: { $eq: 12}})
```

`$ne` ⇒ not equal

```sh
db.users.find({age: { $ne: 12}})
```

`$gt` ⇒ grater than

```sh
db.users.find({age: { $gt: 18}})
```

```sh
db.users.find({age: { $gt: 30}})
```

`$gte` ⇒ grater than or equal

```sh
db.users.find({ age: { $gte: 30 } })
```

`$lt` ⇒ less than

```sh
db.users.find({age: { $lt: 30}})
```

`$lte` ⇒ less than or equal

```sh
db.users.find({ age: { $lte: 18 } })
```

### sort()

- ascending order (small to large)
- descending order (large to small)

ascending order:

```sh
db.users.find({ age: { $gte: 30 } }).sort({ age: 1 })
```

descending order:

```sh
db.users.find({ age: { $gte: 30 } }).sort({ age: -1 })
```

# $in, $nin, implicit and condition

The [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in) operator selects the documents where the value of a field equals any value in the specified array.

```sh
db.users.find({
    gender: "Female",
    age: { $lte: 30, $gte: 18 }
}, {
    age: 1,
    name: 1,
    gender: 1
}).sort({ age: 1 })
```

```sh
db.users.find({
    gender: "Female",
    age: { $in: [18, 20, 22, 24, 26] }
}, {
    age: 1,
    name: 1,
    gender: 1
}).sort({ age: 1 })
```

[$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/#mongodb-query-op.-nin) selects the documents where:

- the specified field value is not in the specified array **or**
- the specified field does not exist.

```sh
db.users.find({
    gender: "Female",
    age: { $nin: [18, 20, 22, 24, 26] }
}, {
    age: 1,
    name: 1,
    gender: 1
}).sort({ age: 1 })
```

```sh
db.users.find({
    gender: "Female",
    age: { $nin: [18, 20, 22, 24, 26, 28, 30] },
    interests: { $in: ["Cooking", "Gaming"] }
}, {
    age: 1,
    name: 1,
    gender: 1,
    interests: 1
}).sort({ age: 1 })
```

# Logical Query Operators: $and, $or, implicit vs explicit

[$and](https://www.mongodb.com/docs/manual/reference/operator/query/and/#mongodb-query-op.-and) performs a logical `AND` operation on an array of *one or more* expressions (`<expression1>`, `<expression2>`, and so on) and selects the documents that satisfy *all* the expressions.

```sh
db.users.find({
    $and: [
        { age: { $ne: 15 } },
        { age: { $lte: 30 } }
    ]
}).project({
    age: 1
})
```

```sh
db.users.find({
    $and: [
        { gender: "Female" },
        { age: { $ne: 15 } },
        { age: { $lte: 30 } }
    ]
}).project({
    age: 1,
    gender: 1
})
```

The [$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/#mongodb-query-op.-or) operator performs a logical `OR` operation on an array of *one or more* `<expressions>` and selects the documents that satisfy *at least* one of the `<expressions>`.

```sh
db.users.find({
    $or: [
        { interests: "Travelling" },
        { interests: "Cooking"}
    ]
}).project({
    interests: 1
}).sort({ age: 1 })
```

```sh
db.users.find({
    $or: [
        { "skills.name": "JAVASCRIPT" },
        { "skills.name": "PYTHON" },
    ]
}).project({
    skills: 1
}).sort({ age: 1 })
```

same thing using `$in`

```sh
db.users.find({
    "skills.name": {$in:  ["JAVASCRIPT", "PYTHON"]}
}).project({
    skills: 1
}).sort({ age: 1 })
```

# Element Query Operators: $exists, $type, $size

The [$exists](https://www.mongodb.com/docs/manual/reference/operator/query/exists/#mongodb-query-op.-exists) operator matches documents that contain or do not contain a specified field, including documents where the field value is `null`.

```sh
db.users.find({
    unknown: { $exists: true}
})
```

[$type](https://www.mongodb.com/docs/manual/reference/operator/query/type/#mongodb-query-op.-type) selects documents where the *value* of the `field` is an instance of the specified [BSON](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-BSON) type(s). Querying by data type is useful when dealing with highly unstructured data where data types are not predictable.

```sh
db.users.find({
        age: { $type: "string"}
})
```

```sh
db.users.find({
        company: { $type: "null"}
})
```

`$size`

```sh
db.users.find({
        friends: { $size: 0}
})
```

# Array Query Operator: $all, $elemMatch

The [$all](https://www.mongodb.com/docs/manual/reference/operator/query/all/#mongodb-query-op.-all) operator selects the documents where the value of a field is an array that contains all the specified elements.

```sh
db.users.find({
    interests: { $all: ["Travelling", "Gaming", "Reading"] }
}).project({
    interests: 1
})
```

The [$elemMatch](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch) operator matches documents that contain an array field with at least one element that matches all the specified query criteria.

```sh
db.users.find({
    skills: { $elemMatch: {
        name: "JAVASCRIPT",
        level: "Intermidiate"
    } }
}).project({
    skills: 1
})
```

# Field Update Operators: $set, $addToSet, $push

The [$set](https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set) operator replaces the value of a field with the specified value.

```sh
db.users.updateOne(
    {_id: ObjectId("6406ad65fc13ae5a400000c7")},
    { $set: {
        interests: ["Travelling"]
    } }
)
// $set -> change the whole intire field that is modified
```

The [$addToSet](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) operator adds a value to an array unless the value is already present, in which case [addToSet](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) does nothing to that array.

```sh
db.users.updateOne(
    {_id: ObjectId("6406ad65fc13ae5a400000c7")},
    { $addToSet: {
        interests: "Gamming"
    } }
)
```

### $each

You can use the [addToSet](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) operator with the [each](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) modifier. The [each](https://www.mongodb.com/docs/manual/reference/operator/update/each/#mongodb-update-up.-each) modifier allows the [$addToSet](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#mongodb-update-up.-addToSet) operator to add multiple values to the array field.

```sh
db.users.updateOne(
    {_id: ObjectId("6406ad65fc13ae5a400000c7")},
    { $addToSet: {
        interests: {
            $each: ["Photography", "Programming"]
        }
    } }
)
```

The [$push](https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push) operator appends a specified value to an array.

```sh
db.users.updateOne(
    {_id: ObjectId("6406ad65fc13ae5a400000c7")},
    { $push: {
        interests: {
            $each: ["Photography", "Programming"]
        }
    } }
)
```
