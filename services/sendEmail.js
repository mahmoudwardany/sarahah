const nodemailer = require("nodemailer");

module.exports=async(userEmail,subject,htmlTemplete)=>{
try {
    let transporter = nodemailer.createTransport({
        service:"gmail", // true for 465, false for other ports
        auth: {
          user: process.env.APP_EMAIL_ADDRESS, // generated ethereal user
          pass: process.env.APP_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: process.env.APP_EMAIL_ADDRESS,
        to: userEmail, // list of receivers
        subject: subject, // Subject line 
        html: htmlTemplete, // html body
      });
} catch (error) {
    throw new Error("Interal server Error (nodemailer)")
}
}