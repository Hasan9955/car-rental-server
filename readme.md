
# Car-rental-server
## Live Link: https://car-rental-server-eight.vercel.app/



![image](https://i.ibb.co/XkKtw26/190325-rental-cars-cs-229p.png)

# Used Technologies 
### 1. Express.js
### 2. Mongoose
### 3. TypeScript  

# Why TypeScript?

By using the **TypeScript** standard, you'll have better team and code stability with **Interface Oriented Development**, leading to better standardized codes. TypeScript allows developers to focus more on exposed Interfaces or API, rather than having to know all the code by heart. This makes the codebase easier to maintain with big teams, especially if those teams are composed of developers of different skill levels.

# Why Mongoose?

Since MongoDB is a denormalized NoSQL database, its inherently schema-less design means documents will have varying sets of fields with different data types. This provides your data model with as much flexibility as you wanted over time, however, it can be difficult to cope with coming from a SQL background. Mongoose defines a schema for your data models so your documents follow a specific structure with pre-defined data types. On top of that, Mongoose provides built-in type casting, validation, query building, and business logic hooks out-of-the-box which saves developers the pain of writing boilerplates for MongoDB.
 

# Getting started

- Clone the repository

```
git clone https://github.com/Hasan9955/car-rental-server.git
```

- Install dependencies

```
cd <project_name>
npm install
npm run tsc
```

- Run the project with auto reload (nodemon)

```
npm run dev
```

- Build the project

```
npm run build
```

- Build and run the project

```
npm run prod
```

Finally, navigate to `http://localhost:8000/` and you should see the API running!

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure. In a TypeScript project, it's best to have separate _source_ and _distributable_ files. TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name               | Description                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **config**         | Contains config environment to be used by the config package, such as MongoDB URI, jwtSecret, and etc.                                                        |
| **dist**           | Contains the distributable (or output) from your TypeScript build                                                                                             |
| **node_modules**   | Contains all your npm dependencies                                                                                                                            |
| **src**            | Contains your source code that will be compiled to the dist dir                                                                                               |
| **src/middleware** | Contains the middlewares to intercept requests                                                                                                                |
| **src/models**     | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB                                                                  |
| **src/routes**     | Routes define the endpoints of your API                                                                                                                       |
| **src/types**      | Contains all your custom types to better handle type checking with TypeScript                                                                                 |
| **src/server.ts**  | Entry point to your express app                                                                                                                               |
| package.json       | File that contains npm dependencies as well as build scripts                                                   |
| tsconfig.json      | Config settings for compiling server code written in TypeScript                                                                                               |
| tslint.json        | Config settings for TSLint code style checking                                                                                                                |


# Dependencies

Dependencies are managed through `package.json`.
In that file you'll find two sections:

## `dependencies`

| Package           | Description                                     |
| ----------------- | ----------------------------------------------- |
| bcryptjs          | Library for hashing and salting user passwords. |
| config            | Universal configurations for your app.          |
| express           | Node.js web framework.                          |   
| http-status-codes | HTTP status codes constants.                    |
| jsonwebtoken      | JsonWebToken implementation for Node.js.        |
| mongoose          | MongoDB modeling tool in an async environment.  |
| typescript        | Typed superset of JavaScript.                   |

## `devDependencies`

Since TypeScript is used, dependencies should be accompanied with their corresponding DefinitelyTyped @types package.

| Package             | Description                             |
| ------------------- | --------------------------------------- |
| @types/bcryptjs     | DefinitelyTyped for bcryptjs            |
| @types/config       | DefinitelyTyped for config              |
| @types/express      | DefinitelyTyped for express             | 
| @types/jsonwebtoken | DefinitelyTyped for jsonwebtoken        |
| @types/mongoose     | DefinitelyTyped for mongoose            | 
| nodemon             | Reload node application on code changes |

To install or update these dependencies you can use `npm install` or `npm update`.