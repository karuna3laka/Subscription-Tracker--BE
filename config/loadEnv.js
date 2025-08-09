import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Convert to CommonJS __dirname, __filename in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determine which .env file to load
const nodeEnv = process.env.NODE_ENV || 'development';
const envPath = resolve(__dirname, `../.env.${nodeEnv}.local`);

// Load the .env file
config({ path: envPath });

console.log(`Loaded environment: ${nodeEnv}`);

// ✅ Export values manually
export const DB_URI = process.env.DB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;



export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; // ✅ Add this line
