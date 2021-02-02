
import pg  from 'pg';
const {Client}=pg
const client = new Client({
    host: 'ec2-54-78-127-245.eu-west-1.compute.amazonaws.com',
    user: 'hgttxborsduqpt',
    password: '360dccbfce21d3a5850dc54f1581239dbada7960954f3e1bde8e278f2288672d',
    database: 'dbbvgediiq64sb',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})
client.connect()
client.query(`DROP TABLE User;`)