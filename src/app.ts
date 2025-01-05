import express, { NextFunction, Request, Response } from "express";
import AppError from "./utils/appError";
import DB from "./database/DB";
import * as dotenv from 'dotenv';


import globalErrorHandler from "./controllers/ErrorControllers";
import medicalFacilityRoutes from "./routes/medicalFacility.route";
import doctorRoutes from "./routes/doctor.route";
import patientRoutes from "./routes/patient.route";
dotenv.config();

const app = express();

app.use(express.json());  // This will automatically parse incoming JSON data into `req.body`

const db = DB.getInstance('mongodb://localhost:27017/test?replicaSet=rs0');
db.connect();

app.use("/api/v1/medical-facilities",medicalFacilityRoutes);
app.use("/api/v1/doctors",doctorRoutes);
app.use("/api/v1/patients",patientRoutes);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);
const port:any =  3000

app.listen(port, () => {
    console.log(port);
})

process.on('SIGINT', () => {
    db.disconnect(); // Disconnect when the process is terminated
    process.exit();
});

