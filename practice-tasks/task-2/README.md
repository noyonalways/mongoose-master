<h1 align='center'>Practice Task - 2</h1>
<h3 align='center'>Mastering MongoDB Aggregation & Indexing</h3>

1. Retrieve the count of individuals who are active (isActive: true) for each gender.
2. Retrieve the names and email addresses of individuals who are active (`isActive: true`) and have a favorite fruit of "banana".
3. Find the average age of individuals for each favorite fruit, then sort the results in descending order of average age.
4. Retrieve a list of unique friend names for individuals who have at least one friend, and include only the friends with names starting with the letter "W".

   `Hints: Explore how to use regex [ "friends.name": /^W/]`

5. Use $facet to separate individuals into two facets based on their age: those below 30 and those above 30. Then, within each facet, bucket the individuals into age ranges (e.g., 20-25, 26-30, etc.) and sort them by name within each bucket.

6. Calculate the total balance of individuals for each company and display the company name along with the total balance. Limit the result to show only the top two companies with the highest total balance.

   `Hints: Explore $slice, $split`

## References

- [$match - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
- [$group - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)
- [$project - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)
- [$sort - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)
- [$unwind - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)
- [$push - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/push/)
- [$facet - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/)
- [$bucket - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/)
- [$covert - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/covert/)
- [$toDouble - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/toDouble/)
- [$sum - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/)
- [$slice - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/slice/)
- [$split - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/split/)
- [$size - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/size/)
- [$set - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/set/)
- [$limit - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)
- [$replaceAll - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/replaceAll/)
- [$substr - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/substr/)
- [$subtract - aggregation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/subtract/)

## Solutions:

- [References](#references)
- [Solutions:](#solutions)
- [Problem 1](#problem-1)
- [Problem 2](#problem-2)
- [Problem 3](#problem-3)
- [Problem 4](#problem-4)
- [Problem 5](#problem-5)
- [Problem 6 - 1](#problem-6---1)
- [Problem 6 - 2](#problem-6---2)

## Problem 1

```js
db.massiveData.aggregate([
  // stage-1
  {
    $match: {
      isActive: true,
    },
  },
  // stage-2
  {
    $group: {
      _id: "$gender",
      count: { $sum: 1 },
    },
  },
]);
```

## Problem 2

```js
db.massiveData.aggregate([
  // stage-1
  {
    $match: {
      isActive: true,
      favoriteFruit: "banana",
    },
  },
  // stage-2
  {
    $project: {
      name: 1,
      email: 1,
      isActive: 1,
      favoriteFruit: 1,
    },
  },
]);
```

## Problem 3

```js
db.massiveData.aggregate([
  // stage-1
  {
    $group: {
      _id: "$favoriteFruit",
      averageAge: { $avg: "$age" },
    },
  },
  // stage-2
  {
    $sort: { averageAge: -1 },
  },
]);
```

## Problem 4

```js
db.massiveData.aggregate([
  // stage-1
  { $unwind: "$friends" },
  // stage-2
  {
    $match: {
      "friends.name": /^W/,
    },
  },
  // stage-3
  {
    $group: {
      _id: "$_id",
      uniqueFriends: { $addToSet: "$friends.name" },
    },
  },
]);
```

## Problem 5

```js
db.massiveData.aggregate([
  // main-stage-1
  {
    $facet: {
      // pipeline-1
      below30: [
        {
          $match: { age: { $lt: 30 } },
        },
        {
          $sort: { age: 1 },
        },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [20, 25, 30],
            default: "Other",
            output: {
              persons: { $push: { name: "$name", age: "$age" } },
            },
          },
        },
      ],
      // pipeline-2
      above30: [
        {
          $match: { age: { $gt: 30 } },
        },
        {
          $sort: { age: 1 },
        },
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [30, 35, 45],
            default: "Other",
            output: {
              persons: { $push: { name: "$name", age: "$age" } },
            },
          },
        },
      ],
    },
  },
]);
```

## Problem 6 - 1

```json
// data format:
[{
	"_id" : "$oid("654dbfa0ac03b4ef85f2a90a")",
	"index" : 7896,
	"guid" : "5b8cbb4e-4c87-4ab8-ab24-a8490777b092",
	"isActive" : false,
	"balance" : "$1940.00",
	"picture" : "http://placehold.it/32x32",
	"age" : 36,
	"eyeColor" : "brown",
	"name" : "Hazel Mcmillan",
	"gender" : "female",
	"company" : "MICRONAUT",
	"email" : "hazelmcmillan@micronaut.com",
	"phone" : "+1 (837) 532-2851",
	"address" : "867 Congress Street, Jardine, Guam, 2150",
	"about" : "Nisi laborum sunt occaecat quis fugiat consectetur aliquip occaecat culpa. Enim cupidatat velit eu consectetur qui ea occaecat laboris quis in ut proident pariatur. Cupidatat nostrud dolor ipsum excepteur Lorem id sit excepteur magna reprehenderit do ut fugiat.\r\n",
	"registered" : "2016-08-09T12:53:56 -06:00",
	"latitude" : -56.852509,
	"longitude" : -72.611599,
	"tags" : [
		"esse",
		"duis",
		"cupidatat",
		"ullamco",
		"do",
		"sunt",
		"id"
	],
	"friends" : [
		{
			"id" : 0,
			"name" : "Castro Cotton"
		},
		{
			"id" : 1,
			"name" : "Weber Robles"
		},
		{
			"id" : 2,
			"name" : "Katy Gonzales"
		}
	],
	"greeting" : "Hello, Hazel Mcmillan! You have 4 unread messages.",
	"favoriteFruit" : "banana"
}]
```

```js
db.data.aggregate([
  {
    $group: {
      _id: "$company",
      totalBalance: { $sum: { $toDouble: { $substr: ["$balance", 1, -1] } } },
    },
  },
]);
```

## Problem 6 - 2

```json
[{
	"_id" : ObjectId("654dbfa0ac03b4ef85f2a90a"),
	"index" : 7896,
	"guid" : "5b8cbb4e-4c87-4ab8-ab24-a8490777b092",
	"isActive" : false,
	"balance" : "$1,940.00",
	"picture" : "http://placehold.it/32x32",
	"age" : 36,
	"eyeColor" : "brown",
	"name" : "Hazel Mcmillan",
	"gender" : "female",
	"company" : "MICRONAUT",
	"email" : "hazelmcmillan@micronaut.com",
	"phone" : "+1 (837) 532-2851",
	"address" : "867 Congress Street, Jardine, Guam, 2150",
	"about" : "Nisi laborum sunt occaecat quis fugiat consectetur aliquip occaecat culpa. Enim cupidatat velit eu consectetur qui ea occaecat laboris quis in ut proident pariatur. Cupidatat nostrud dolor ipsum excepteur Lorem id sit excepteur magna reprehenderit do ut fugiat.\r\n",
	"registered" : "2016-08-09T12:53:56 -06:00",
	"latitude" : -56.852509,
	"longitude" : -72.611599,
	"tags" : [
		"esse",
		"duis",
		"cupidatat",
		"ullamco",
		"do",
		"sunt",
		"id"
	],
	"friends" : [
		{
			"id" : 0,
			"name" : "Castro Cotton"
		},
		{
			"id" : 1,
			"name" : "Weber Robles"
		},
		{
			"id" : 2,
			"name" : "Katy Gonzales"
		}
	],
	"greeting" : "Hello, Hazel Mcmillan! You have 4 unread messages.",
	"favoriteFruit" : "banana"
}]
```

```js
// balance: "$1,940.00" -> has the "," in the balance
db.massiveData.aggregate([
  {
    $set: {
      balance: {
        $convert: {
          input: {
            $replaceAll: {
              input: { $substr: ["$balance", 1, -1] },
              find: ",",
              replacement: "",
            },
          },
          to: "double",
          onError: 0,
          onNull: 0,
        },
      },
    },
  },
  {
    $group: {
      _id: "$company",
      totalBalance: { $sum: "$balance" },
      details: {
        $push: {
          employee: "$name",
          amount: "$balance",
        },
      },
    },
  },
  {
    $sort: { totalBalance: -1 },
  },
  {
    $limit: 2,
  },
  {
    $project: {
      _id: 0,
      company: "$_id",
      totalBalance: 1,
    },
  },
]);
```
