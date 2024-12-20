import bodyParser from "body-parser";
import type { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import rateLimit from "express-rate-limit";
import errMsg from "./utils/errorConstants.js";

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 300 requests per 15 minutes limit
  max: 300,
  message: errMsg.tooManyRequests,
});

const configExpress = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  /* app.use(e.static(path.join(__dirname, "../dist"))); */
  app.use(limiter);
  app.use("/api", routes);
  /* app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  }); */
  app.use(errorHandler);
  return app;
};

export default configExpress;
