import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Student {
        id: ID
        name: String
        department: String
    }

    type Query {
        getAllStudents: [Student]  
        getStudentById(id: ID!): Student
    }

    type Mutation {
        createStudent(name: String!, department: String!): Student
        deleteStudent(id: ID!): DeleteStudentResponse
        updateStudent(id: ID!, name: String, department: String): UpdateStudentResponse
    }
    
    type DeleteStudentResponse {
        success: Boolean!
        message: String!
    }
    
    type UpdateStudentResponse {
        success: Boolean!
        message: String!
        student: Student
    }
`);
