import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { db } from "./db"; // your drizzle instance

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    plugins: [
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, ctx) => {
                // TODO: Implement sending OTP code via SMS
                // Example with Twilio, AWS SNS, or your SMS provider:
                // await smsProvider.send(phoneNumber, `Your verification code is: ${code}`);
                console.log(`OTP for ${phoneNumber}: ${code}`);
            },
        }),
    ],
});