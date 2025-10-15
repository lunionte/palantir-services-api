import express from "express";
import dotenv from "dotenv";
import { ownerAuthRoutes } from "./routes/owner.auth.route";
import { errors } from "celebrate";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { ownerRoutes } from "./routes/owner.route";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/owner", ownerRoutes);
app.use("/api/auth/owner", ownerAuthRoutes);

app.use(errors());
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
