import app from "./app";
import config from "./config/config";

import connectDB from "./db/connect-db";

function startServer() {
  connectDB(config.databaseUrl, () => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  });
}

startServer();
