require('dotenv').config();
export const server_port = process.env.SERVER_PORT || 3001;
export const db_url = process.env.DB_URL || "127.0.0.1/ecommerce-mvc";
export const ttl = process.env.CART_TTL || "120";
export const access_key = process.env.ACCESS_TOKEN_KEY || "fjdsfhjd";
export const refresh_key = process.env.REFRESH_TOKEN_KEY  || "dfjhjddf";
//export const file_size = process.env.ALLOWED_FILE_TYPE;
//export const cloudinaryName = process.env.CLOUDINARY_NAME;
//export const cloudinaryApi = process.env.CLOUDINARY_API;
//problem secret key
//export const cloudinarKey = process.env.CLOUDINARY_SECRET_KEY
//export const client_url = process.env.CLIENT_URL || "http://localhost:3000";
//export const smtpUser = process.env.SMTP_USERNAME;
//export const smtpPassword = process.env.SMTP_PASSWORD;