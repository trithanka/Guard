import app from "./app";

export default {
	port: 2154,
	hostname: "0.0.0.0", // Bind to all interfaces (allows connections from emulator/network)
	fetch: app.fetch,
};
