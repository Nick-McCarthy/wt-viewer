import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';
dotenv.config();

export async function query({query, values = []}: {query: string, values: any[]}) {
    const dbconnection = await mysql.createConnection({
        connectionLimit: 10,
        host: process.env.HOST!,
        user: process.env.DB_USER_NAME!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DATABASE!,
});
    try{
    const [rows] = await dbconnection.execute(query, values);
    dbconnection.end();
    return rows;
    } catch (error) {
        throw Error((error as Error).message);
    }
}