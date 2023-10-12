import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import LocalStrategy from 'passport-local';
import { userModel } from '../dao/models/user.model.js';
import bcrypt from 'bcrypt';

const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          const exists = await userModel.findOne({ email: username });
          if (exists) {
            return done(null, false);
          }

          const user = await userModel.create({
            first_name,
            last_name,
            age,
            email: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          });
          req.session.isLogged = false;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }
          
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }

            let rol ='usuario'; 
             
          if (username === 'adminCoder@coder.com' &&  bcrypt.compareSync('adminCod3r123', user.password)) {
             rol = 'admin';
          }
          user.rol  = rol;
          return done(null, user);
        } catch (error) {
            console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Iv1.f591dc707f3a5215',
        clientSecret: '91e7e7cf3c6e027e3d9d588c5b4a583891c2f8ba',
        callbackURL: 'http://localhost:8080/api/githubcallback',
        scope: ['user:email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const user = await userModel.findOne({ email });
          if (!user) {
            const newUser = await userModel.create({
              first_name: profile._json.name,
              last_name: '',
              age: 18,
              password: '',
              email,
            });

            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
