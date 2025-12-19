import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

async function applyChanges() {
	const client = await pool.connect();
	try {
		console.log("Applying gender and dob columns...");
		
		// Check if columns already exist
		const checkGender = await client.query(`
			SELECT column_name 
			FROM information_schema.columns 
			WHERE table_name = 'user' AND column_name = 'gender'
		`);
		
		const checkDob = await client.query(`
			SELECT column_name 
			FROM information_schema.columns 
			WHERE table_name = 'user' AND column_name = 'dob'
		`);

		if (checkGender.rows.length === 0) {
			await client.query('ALTER TABLE "user" ADD COLUMN "gender" varchar(20)');
			console.log("✅ Added 'gender' column");
		} else {
			console.log("⚠️  'gender' column already exists");
		}

		if (checkDob.rows.length === 0) {
			await client.query('ALTER TABLE "user" ADD COLUMN "dob" date');
			console.log("✅ Added 'dob' column");
		} else {
			console.log("⚠️  'dob' column already exists");
		}

		console.log("Done!");
	} catch (error) {
		console.error("Error applying changes:", error);
		throw error;
	} finally {
		client.release();
		await pool.end();
	}
}

applyChanges();

