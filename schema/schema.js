const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphql;

var books = [
    { name: 'book 1', genre: 'genre 1', id: '1', authorId : '1', price: '100'},
    { name: 'book 2', genre: 'genre 2', id: '2', authorId : '2', price: '500'},
    { name: 'book 3', genre: 'genre 3', id: '3', authorId : '3', price: '200'},
    { name: 'book 4', genre: 'genre 4', id: '4', authorId : '2', price: '110'},
    { name: 'book 5', genre: 'genre 5', id: '5', authorId : '2', price: '850'},
    { name: 'book 6', genre: 'genre 6', id: '6', authorId : '3', price: '1000'},
    { name: 'book 7', genre: 'genre 7', id: '7', authorId : '3', price: '800'},
    { name: 'book 8', genre: 'genre 8', id: '8', authorId : '3', price: '1300.50'},

]

var authors = [
    { name: 'author 1', book: 'book 1', id: '1', age: 25},
    { name: 'author 2', book: 'book 2', id: '2', age: 35},
    { name: 'author 3', book: 'book 3', id: '3', age: 40},
]

const BookType = new GraphQLObjectType({
    name : 'book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        price:{type: GraphQLString},
        author: {
            type : AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name : 'author',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        book:{type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //console.log(parent)
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return _.find(books, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: { 
                skip: {type: GraphQLID},
                limit: {type: GraphQLID}
            },
            resolve(parent, args) {
                 //return books;
                 return books.slice(args.skip,args.limit)
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addAuthor : {
            type: AuthorType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                book: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let authorExist = _.find(authors, {id: args.id})
                if(!authorExist) {
                    let authorObj = { id:args.id, name: args.name, book: args.book, age: args.age}
                    let pushedAuthor = authors.push(authorObj)
                    if(pushedAuthor)
                        return authorObj;
                } 
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation : mutation
});