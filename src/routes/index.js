import express from "express";
import { productsRouter } from "./api/products.routes.js";
import { cartRouter } from "./api/cart.routes.js";
import { AuthController } from "../controllers/auth.controler.js";
import { ProductsController } from "../controllers/products.controller.js";
import { CartController } from "../controllers/cart.controller.js";
import { transporter, testEmail } from "../mail/index.js";

const router = express.Router()

router.get("/", async(req,res)=>{
    if(req.session.passport){
        await res.render("home", {
            products: ProductsController.getProducts,
            cart: CartController.getCart
        })
    }else{
        res.redirect("/login")
    }
});

//Registro
router.get("/signup", (req,res)=>{
    if(req.session.passport){
        res.redirect("/")
    }else{
        res.render("signup")
    }
})

//Registro - Autenticacionn
router.post("/signup", AuthController.postSignupPassport, (req,res)=>{
    const {mail} = req.body;
    req.session.passport.username = mail;
    //Envio de mail
    const emailTemplate = `<div>
    <h1>Buenas noticias!</h1>
    <p>Un nuevo usuario llamado ${req.session.passport.username} ha ingresado a nuestra familia!</p>
    <a href="https://cloud.mongodb.com/v2/63990b46bf240c328e7495b5#/metrics/replicaSet/63990d110dced0130e56beb0/explorer/ecommerce/sessions/find">Ver más</a>
    </div>`

    const mailOptions = {
    from:"sever app Node",
    to: testEmail,
    subject:"Nuevo Registro",
    html: emailTemplate
    }
    try {
        transporter.sendMail(mailOptions)
        console.log("Mail enviado")
        res.redirect("/")
    } catch (error) {
        console.log("Hubo un error enviando el mail")
        res.render("failSignup")
    }
})

//Error registro
router.get("/failSignup", (req,res)=>{
    res.render("failSignup")
})

//Ingreso
router.get("/login", (req,res)=>{
    if(req.session.passport){
        res.redirect("/")
    }else{
        res.render("login")
    }
})

//Ingreso - Autenticacion
router.post("/login", AuthController.postLoginPassport, (req,res)=>{
    const {mail} = req.body;
    req.session.passport.username = mail;
    res.redirect("/")
})

//Error ingreso
router.get("/failLogin", (req,res)=>{
    res.render("failLogin")
})

//Logout
router.post("/logout", AuthController.logout)

router.use("/products", productsRouter);
router.use("/cart", cartRouter);

export {router};