
import pg  from 'pg';
const {Client}=pg
const client = new Client({
    host: '',
    user: '',
    password: '',
    database: '',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})
client.connect()
client.query(`DROP TABLE User;`)