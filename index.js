const { ApolloServer, gql } = require("apollo-server")


const courses = [
    {
        id: "book-06",
        name: "TypeScript Basics",
        description: "TypeScript Basics for beginners",
        price: 599.99,
        discount: false
    },
    {
        id: "book-07",
        name: "GraphQL Basics",
        description: "GraphQL Basics for beginners",
        price: 499.99,
        discount: true
    },
    {
        id: "book-08",
        name: "NextJS Basics",
        description: "NextJS Basics for beginners",
        price: 599.99,
        discount: false,
        genreId: "cat-01"
    },
    {
        id: "book-21",
        name: "The Immortals of Meluha",
        description: "Shiva Trilogy -1",
        price: 299.99,
        discount: false,
        genreId: "cat-02"
    },
    {
        id: "book-22",
        name: "The Secret of the Nagas",
        description: "Shiva Trilogy -2",
        price: 199.99,
        discount: true,
        genreId: "cat-02"
    },
    {
        id: "book-23",
        name: "The Oath of the Vayuputras",
        description: "Shiva Trilogy -3",
        price: 599.99,
        discount: false,
        genreId: "cat-02"
    }
]

const genres = [
    { id: 'cat-01', name: 'Technical' },
    { id: 'cat-02', name: 'History' }
]

const typeDefs = gql`
    type Query {            
      courses: [Course!]!
      course(id: ID!): Course
      genres:[Genre!]!
      genre(id: ID!): Genre
      numOfCourses: Int
      price: Float      
      isTrainer: Boolean
    }

   type Course  {
    id: String!        
    name: String!
    description: String!
    price: Float!         
    discount: Boolean!
    genre: Genre
   }   

   type Genre {
    id: String!
    name: String!
    courses: [Course!]!
   }          
`

const resolvers = {
    Query: {
        numOfCourses: () => {
            return 12
        },

        price: () => {
            return 1465.98
        },

        isTrainer: () => {
            return true
        },

        courses: () => courses,

        course: (parent, args, context) => {
            const courseId = args.id
            const course = courses.find(item => item.id === courseId)
            if (!course) return null
            else return course
        },

        genres: () => genres,

        genre: (parent, args, context) => {
            const genreId = args.id
            console.log(genreId)
            const genre = genres.find(item => item.id === genreId)
            if (!genre) return null
            else return genre
        }
    },

    Genre: {
        courses: (parent, args, context) => {
            const genreId = parent.id
            return courses.filter(item => item.genreId === genreId)
        }
    },

    Course: {
        genre: (parent, args, context) => {
            const genreId = parent.genreId
            return genres.find(item => item.id === genreId)
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`Server is running at ${url}`))