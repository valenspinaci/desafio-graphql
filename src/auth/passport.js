import bcrypt from "bcryptjs";
import { userModel } from "../dbOperations/models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";

const createHash = (password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
}

const authPassport = (passport)=>{
    passport.serializeUser((user, done)=>{
        return done(null, user.id)
    })
    //Al serializar estamos guardando el id del usuario en la session
    passport.deserializeUser((id,done)=>{
        userModel.findById(id,(error, userFound)=>{
            return done(error, userFound)
        })
    })

    passport.use("signupStrategy", new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "mail"
        },
        async (req, username, password, done) =>{
            try {
                const user = await userModel.findOne({mail:username});
                if(user) return done(null, false, {message:`El usuario ya está registrado`});
                const newUser = {
                    mail:username,
                    password: createHash(password),
                    name:req.body.name,
                    adress: req.body.adress,
                    age: req.body.age,
                    phone: req.body.phone,
                    photo: req.body.photo
                };
                const userCreated = await userModel.create(newUser);
                return done(null, userCreated, {message:`Usuario registrado exitosamente`})
            } catch (error) {
                return done(null, false, {message:`Error al autenticar usuario ${error}`});
            }
        }
    ))

    passport.use("loginStrategy", new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField: "mail"
        },
        (req,username,password,done)=>{
            userModel.findOne({mail:username}, (error,user)=>{
                if(error) return done (error, false, {message: "Ha ocurrido un error"})
                if(user){
                    let compare = bcrypt.compareSync( password, user.password );
                    if(compare){
                        return done (null, user)
                    }else{
                        return done (error, false, {message:"La contraseña es incorrecta"})
                    }
                }else{
                    return done (error, false, {message: "El correo no ha sido encontrado"})
                }
            })
        }
    ))
}

export {authPassport}