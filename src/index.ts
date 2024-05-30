import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { createStudent, getAllStudents ,getStudentById,deleteStudent,updateStudent} from "./studentController";

import { AppDataSource } from "../src/entities/datasource";
import  {schema} from "./entities/schema";
const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");



    
        const rootValue = {
            getAllStudents: () => getAllStudents(),
            getStudentById: (args: { id: number }) => getStudentById(args.id),
            createStudent: ({ name, department }: { name: string, department: string }) => createStudent(name, department),
            deleteStudent: ({ id }: { id: number }) => deleteStudent(id),
            updateStudent: ({ id, name, department }: { id: number, name?: string, department?: string }) =>
                updateStudent(id, name, department),
        };

        const app = express();

        app.use(
            "/graphql",
            graphqlHTTP({
                schema: schema,
                rootValue: rootValue,
                graphiql: true,
            })
        );

        app.listen(4000, () => {
            console.log("Server is running on http://localhost:4000/graphql");
        });
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
};

startServer();
