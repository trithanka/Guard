import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

async function verifySchema() {
	const client = await pool.connect();
	try {
		const result = await client.query(`
			SELECT 
				column_name,
				data_type,
				is_nullable,
				character_maximum_length
			FROM information_schema.columns
			WHERE table_name = 'user'
			ORDER BY ordinal_position
		`);

		console.log("=== User Table Schema ===");
		console.table(result.rows);
		
		// Check specifically for gender and dob
		const gender = result.rows.find((r) => r.column_name === "gender");
		const dob = result.rows.find((r) => r.column_name === "dob");
		
		console.log("\n=== Gender and DOB Check ===");
		if (gender) {
			console.log(`✅ gender: ${gender.data_type}(${gender.character_maximum_length || "N/A"}), nullable: ${gender.is_nullable}`);
		} else {
			console.log("❌ gender column NOT found");
		}
		
		if (dob) {
			console.log(`✅ dob: ${dob.data_type}, nullable: ${dob.is_nullable}`);
		} else {
			console.log("❌ dob column NOT found");
		}
	} catch (error) {
		console.error("Error:", error);
	} finally {
		client.release();
		await pool.end();
	}
}

verifySchema();

