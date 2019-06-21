## Installation

``` bash
# clone the repo
$ git clone https://github.com/dev-esakki/graphQl.git

# go into app's directory
$ cd graphQl

# install app's dependencies
$ npm install
```

### Basic usage

``` bash
# dev server  with hot reload at http://localhost:8000/graphql
$ node app.js
```

Navigate to [http://localhost:8000/graphql](http://localhost:8000/graphql). 

## Query and Mutation usage
```
## sample query usage
# mutation is to insert or add datas
mutation {
  addAuthor(id: 5, name: "name 9", book: "book 9", age: 23) {
    name
    age
  }
}

# To Retrieve Datas based on fields
{
  authors{ 
    name 
    age
  }
}

```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
graphQl#
├── schema/          #static files
│   ├── schema.js    #grapgQl schema
├── app.js           #project root
└── package.json
```