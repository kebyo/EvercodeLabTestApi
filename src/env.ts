import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/../../.env') });

/**
 * Object for settings (data from .env and etc)
 */
export default {
    /**
     * Host for listening by server
     */
    host: process.env.HOST as string || '127.0.0.1',

    /**
     * The Port you are using for http connection
     */
    port: parseInt(process.env.HTTP_PORT as string || '3000', 10),
}
