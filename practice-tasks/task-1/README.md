<h1 align='center'>Practice Task - 1</h1>
<h3 align='center'>In-Depth Exploration of MongoDB Queries</h3>

1. Find all documents in the collection where the age is greater than 30, and only return the name and email fields.
2. Find documents where the favorite color is either "Maroon" or "Blue."
3. Find all documents where the skill is an empty array.
4. Find documents where the person has skills in both "JavaScript" and "Java."
5. Add a new skill to the skills array for the document with the email "dmanson2n@godaddy.com". The skill is:

```ts
{
  "name": "Python",
  "level": "Beginner",
  "isLearning": true
}
```

6. Add a new language "Spanish" to the list of languages spoken by the person.
7. Remove the skill with the name "Kotlin" from the skills array.

## References

- [$gt - Comparison Query Operator](https://www.mongodb.com/docs/manual/reference/operator/query/gt/)
- [$gte - Comparison Query Operator](https://www.mongodb.com/docs/manual/reference/operator/query/gte/)
- [$or - Logical Query Operator](https://www.mongodb.com/docs/manual/reference/operator/query/or/)
- [$and - Logical Query Operator](https://www.mongodb.com/docs/manual/reference/operator/query/and/)
- [$size - Array Query Operator](https://www.mongodb.com/docs/manual/reference/operator/query/size/)
- [$addToSet - Array Update Operator ](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/)
- [$pull - Array Update Operator](https://www.mongodb.com/docs/manual/reference/operator/update/pull/)
- [$expr - Evaluation Query Operator](https://www.mongodb.com/docs/manual/reference/operator/query/expr/)

## Problem 1

```ts
db.users.find(
  {
    age: { $gt: 30 },
  },
  {
    name: 1,
    email: 1,
  }
);
```

## Problem 2

```ts
db.users.find(
  {
    $or: [{ favouriteColor: "Maroon" }, { favouriteColor: "Blue" }],
  },
  {
    email: 1,
    favouriteColor: 1,
  }
);
```

## Problem 3

```ts
db.users.find(
  {
    skills: { $size: 0 },
  },
  {
    skills: 1,
    email: 1,
  }
);
```

## Problem 4

```ts
db.users.find(
  {
    $and: [{ "skills.name": "JAVASCRIPT" }, { "skills.name": "JAVA" }],
  },
  {
    email: 1,
    skills: 1,
  }
);
```

## Problem 5

```ts
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
```

## Problem 6

```ts
db.users.updateMany(
  { $expr: { $gte: [{ $size: "$languages" }, 0] } },
  { $addToSet: { languages: "Spanish" } }
);
```

## Problem 7

```ts
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
```
