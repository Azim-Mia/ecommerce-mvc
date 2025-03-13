import { Redis } from 'ioredis';
const redis = new Redis({
  port: 10971,
  host:'redis-10971.c9.us-east-1-4.ec2.redns.redis-cloud.com',
  username: "default",
  password: '4nkFu4I9c0MDBGHdhsaPkHYGXVeNyp6t',
  db: 0, // Defaults to 0
});
export default redis;