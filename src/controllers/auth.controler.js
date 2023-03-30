import { authPassport } from "../auth/passport.js";
import passport from "passport";

authPassport(passport);

class AuthController{

    static postSignupPassport = passport.authenticate("signupStrategy",{
        failureRedirect: "/failSignup",
        failureMessage: true
    });

    static postLoginPassport = passport.authenticate("loginStrategy", {
        failureRedirect: "/failLogin",
        failureMessage: true
    });

    static postSignup(req, res){
        res.send("Usuario registrado y autenticado")
    }

    static logout(req,res){
        req.logOut(err=>{
            if(err) return res.status(400).json({error:"Error al cerrar sesion"});
            req.session.destroy(err=>{
                if(err) return res.status(400).json({error:"Error al cerrar la sesion"});
                res.status(200).json({message:"Sesion finalizada"})
            })
        })
    }
}

export{AuthController}