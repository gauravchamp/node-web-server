const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/User');
const secret=require('./keys').secret;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=secret;

module.exports=(passport)=>{
    passport.use(new JwtStrategy(opts,async(jwt_payload,done)=>{
        try{
            const user=await User.findById(jwt_payload.id);
            if(user){
                return done(null,user);
            }
            return done(null,false);
        }
        catch(err){
            console.log(err);
        }
    }));
};

