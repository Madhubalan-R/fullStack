import { DataSource } from "typeorm";
import path from "path";
//import { config } from "dotenv";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "bookdata",
  password: "m@dhu12345",
  database: "bookdata",
  synchronize: false,
  logging: true,
  entities: [path.join(process.cwd(), "src/models/*.ts")],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export const checkConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("db connected successfully");
  } catch (error) {
    
    console.log("cannot connect to db",error);
  }
};
