import { Student } from "../entities/Student"
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Admin@123",
    database: "Student",
    synchronize: true,
    logging: true,
    entities: [Student],
    subscribers: [],
    migrations: [],
    options: { encrypt: false }
});