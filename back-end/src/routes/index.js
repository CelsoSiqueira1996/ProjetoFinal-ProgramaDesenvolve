import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
import express from "express";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send("API Projeto Prático - Programa Desenvolve.");
    });

    app.use(
        express.json(),
        userRoutes,
        productRoutes,
        authRoutes
    );
}

export default routes;