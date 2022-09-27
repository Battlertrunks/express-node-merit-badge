# Node.js / Express Merit Badge

## Intro
To complete this exercise you will need to create a demo node.js app that uses the Express package to create a simple demo API. 

- Setup a new node.js project 
- Install any needed packages
- Load the books.json file into memory
- Using the Express framework create routes to satisfy the Book API Specs below
- Test your API using the provided postman collection 

## Book API Specs
### Get
- GET /books with no parameters -------
  - Returns a lists of all books and http response of 200
- GET /books with a query parameter of publisher ------
  - Returns a list of all books with that publisher and HTTP response of 200
  - If there are no books found with that parameter an empty array is returned
- GET /books/:ID ------
  - Returns the book with that ID and HTTP Response of 200
  - If there is no book with that ID it returns an HTTP response of 404

### Post
- POST /books/ ------
  - Creates a new book with a new ID Returns the new book with a HTTP response of 201
  - If the JSON contains an ID return a 400
  
### Put
- PUT /books/:ID ------
  - If the book does not exists create it with the given ID and Return a HTTP status code of 201
  - If the book does exist update/replace it with the new one in the body and Return a HTTP Status code of 204
  
### Delete
- DELETE /books/:ID
  - If a Book with that ID exists remove it and return a HTTP response of 204
  - If a Book with that ID does not exist return an HTTP response of 404

## Example Book Object
``` Json
{
    "isbn": "149207800X",
    "title": "Head First Design Patterns",
    "subtitle": "Building Extensible and Maintainable Object-Oriented Software",
    "author": "Eric Freeman, Elisabeth Robson",
    "published": "2021-01-12T00:00:00.000Z",
    "publisher": "O'Reilly Media",
    "pages": 669,
    "description": "You know you don't want to reinvent the wheel, so you look to Design Patterns: the lessons learned by those who've faced the same software design problems. With Design Patterns, you get to take advantage of the best practices and experience of others so you can spend your time on something more challenging. Something more fun. This book shows you the patterns that matter, when to use them and why, how to apply them to your own designs, and the object-oriented design principles on which they're based. Join hundreds of thousands of developers who've improved their object-oriented design skills through Head First Design Patterns.",
    "website": "https://wickedlysmart.com/head-first-design-patterns/"
}
```

## Running the postman tests
- You will want to import the postman collection using ```File -> Import``` 
- Once the collection is imported 
  - Click on the top node of the collection 
  - Then click "Run"
  - Make sure all the tests are Checked
  - Then Click "Run Backend Merit Badge"
- Note: make sure you run the tests against a fresh start of the API since data is added and removed by the tests
