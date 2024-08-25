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
        discount: false
    }
]

const typeDefs = gql`
    type Query {            
      courses: [Course!]!
      course(id: ID!): Course
      numOfCourses: Int
      welcome: String!
      price: Float      
      isTrainer: Boolean
    }

   type Course  {        
    name: String!
    description: String!
    price: Float!         
    discount: Boolean!
   }             
`

const resolvers = {
    Query: {
        welcome: () => {
            return 'Something'
        },

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
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`Server is running at ${url}`))