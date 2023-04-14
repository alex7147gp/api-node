const boom = require("@hapi/boom");


const bcrypt = require("bcrypt");


const UserService = require("./user.service");
const service = new UserService();

const jwt = require("jsonwebtoken");

const config = require("./../config/config")

const nodemailer = require("nodemailer");

class AuthService {
  
  async getUser(email, password) {

    const user = await service.findByEmail(email);
      if (!user) {
        throw (boom.unauyhorized());
      }
      const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        throw (boom.unauthorized(), false);
      }
      delete user._doc.password;
      return user;

    }

    signToken(user) {
      const payload = {
        sub: user._id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token
      });
    }

    async sendPassword(email) {
      const user = await service.findByEmail(email);
      if (!user) {
        throw (boom.unauyhorized());
      }
      const payload = {
        sub: user._id,
      }
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
      const link = `http://myfrontend.com/recovery?token=${token}`
      await service.update(user.id, { recoveryToken: token });
      const mail = {
        from: 'calle7026@gamil.com', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email para recuperar comtraseña", // Subject line
        html:`<b>Ingresa a este link => ${link}</b>`, // html body
      };
      const rta = await this.sendMail(mail);
      return rta;
    }

    async changePassword(token, newPassword) {
         
      try {
        const payload = jwt.verify(token, config.jwtSecret);

        const user = await service.findOne(payload.sub);
        
        if (user.recoveryToken !== token) {
          throw boom.unauthorized();
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await service.update(user.id, { recoveryToken: null, password: hash});
      
        return { message: 'password changed'};

      }

      catch (err) {
        throw boom.unauthorized(err);
      }

    }

    async sendMail(infoMail) {
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true, // true for 465, false for other ports
        port: 465,
        auth: {
          user: config.smtpEmail,
          pass: config.smtpPass
        }
      });

      await transporter.sendMail(infoMail);

      return { message: 'mail sended' }

    }

}

module.exports = AuthService;