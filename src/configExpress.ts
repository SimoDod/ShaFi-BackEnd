/* eslint-disable @typescript-eslint/naming-convention */
import bodyParser from "body-parser";
import type { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import rateLimit from "express-rate-limit";
import errMsg from "./utils/errorConstants.js";
import { fileURLToPath } from "url";
import e from "express";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configExpress = (app: Application) => {
  app.options("*", cors());
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://www.adascout.com",
        "https://adascout.com",
      ],
      credentials: true,
    }),
  );
  app.use(morgan("dev"));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "'self'",
            "https://adascout.com",
            "https://www.adascout.com",
            "https://www.google.com",
          ],
          frameSrc: ["'self'", "https://www.google.com"],
        },
      },
    }),
  );
  app.use(bodyParser.json());
  app.use(e.static(path.join(__dirname, "../../distStatic")));
  app.use("/api", routes);
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../distStatic", "index.html"));
  });
  app.use(errorHandler);

  return app;
};

export default configExpress;
