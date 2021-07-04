import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/../../.env') });

/**
 * Host for listening by server
 */
const host = process.env.HOST as string || '127.0.0.1';

/**
 * The Port you are using for http connection
 */
const port = parseInt(process.env.HTTP_PORT as string || '3000', 10);

/**
 * API url
 */
const apiUrl = `http://${host}:${port}`;

/**
 * Object for settings (data from .env and etc)
 */
export default {
    host,
    port,
    apiUrl,
}
