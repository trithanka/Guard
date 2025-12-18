import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
	const client = await pool.connect();
	try {
		// Check if name column is nullable
		const result = await client.query(`
			SELECT 
				column_name,
				is_nullable,
				data_type
			FROM information_schema.columns
			WHERE table_name = 'user' 
			AND column_name = 'name'
		`);

		console.log("=== Database Schema Check ===");
		if (result.rows.length > 0) {
			const column = result.rows[0];
			console.log("Column name:", column.column_name);
			console.log("Is nullable:", column.is_nullable);
			console.log("Data type:", column.data_type);
			
			if (column.is_nullable === "NO") {
				console.log("\n⚠️  WARNING: 'name' column is NOT NULL!");
				console.log("This will cause errors when Better Auth tries to create/update users without a name.");
				console.log("\nFixing it now...");
				
				await client.query('ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL');
				console.log("✅ Fixed! 'name' column is now nullable.");
			} else {
				console.log("✅ 'name' column is already nullable.");
			}
		} else {
			console.log("❌ 'user' table or 'name' column not found!");
		}
		console.log("============================");
	} catch (error) {
		console.error("Error checking schema:", error);
	} finally {
		client.release();
		await pool.end();
	}
}

checkSchema();

