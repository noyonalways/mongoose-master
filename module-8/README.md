<h1 align='center'>Mastering The Core Concepts of Mongoose</h1>

## Topics:

1. Introduction to mongoose
2. Installing express , mongoose, typescript, dotenv ,cors
3. Installing eslint, refactor code, fix errors using command
4. Install prettier,ts-node-dev,fix formatting issues
5. Software design pattern , mvc vs modular, create an interface
6. Create an schema for a student
7. Refactor your schema
8. Create route , service and controller
9. Insert a student data into MongoDB
10. Create get student route

## Table of Contents

- [Introduction to mongoose](#introduction-to-mongoose)
  - [What is Mongoose?](#what-is-mongoose)
  - [MongoDB](#mongodb)
  - [Mongoose](#mongoose)
  - [Why should we use Mongoose?](#why-should-we-use-mongoose)
- [Installing express , mongoose, typescript, dotenv ,cors](#installing-express--mongoose-typescript-dotenv-cors)
  - [Software Design Pattern](#software-design-pattern)
  - [MVC](#mvc)
  - [Views libraries](#views-libraries)
  - [Modular](#modular)
  - [Benefits of using Modular Pattern](#benefits-of-using-modular-pattern)
  - [Rules / Principle](#rules--principle)
  - [In JavaScript](#in-javascript)
  - [In TypeScript](#in-typescript)

# Introduction to mongoose

### What is Mongoose?

A Powerful Object Data Modeling Library for MongoDB . (ODM)

### MongoDB

- find()
- findOne()
- count()
- update()
- delete()

### Mongoose

- Model.create()
- Model.find()
- Model.findById()
- Model.findByIdAndUpdate()
- Model.findOne()
- Model.findOneAndDelete()
- Model.replaceOne()
- Model.updateMany()
- Model.updateOne()

### Why should we use Mongoose?

- Schema Definition
- Model Creation
- Data Validation
- Querying
- Middleware Support
- Population

# Installing express , mongoose, typescript, dotenv ,cors

### Software Design Pattern

- MVC
- Modular

### MVC

- interfaces
- routes
- models
- views
- controllers

### Views libraries

- ejs
- handlebars
- pugs

### Modular

- Student
  - student.interface.ts
  - student.routes.ts
  - student.controller.ts
  - student.service.ts
- Admin
  - admin.interface.ts
  - admin.routes.ts
  - admin.controller.ts
  - admin.service.ts

### Benefits of using Modular Pattern

- Scalability
- Maintainability
- Better Refactoring
- Efficient Development

### Rules / Principle

- DRY - Don’t Repeat Yourself
- Fat Model / Thin Controller

### In JavaScript

- Schema
- Model
- DB Query

### In TypeScript

- Interface
- Schema
- Model
- DB Query
