import express from "express";
import dotenv from "dotenv";
import { ownerAuthRoutes } from "./routes/owner.auth.route";
import { errors } from "celebrate";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { ownerRoutes } from "./routes/owner.route";
import { businessRoute } from "./routes/business.route";
import { professionalRoutes } from "./routes/professional.auth.route";
import { clientRoutes } from "./routes/client.auth.route";
import { appointmentRoutes } from "./routes/appointment.route";
import { servicesRoutes } from "./routes/services.route";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use("/api/owner", ownerRoutes);
app.use("/api/auth/owner", ownerAuthRoutes);
app.use("/api/auth/professional", professionalRoutes);
app.use("/api/business", businessRoute);
app.use("/api/auth/client", clientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", servicesRoutes);

app.use(errors());
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
