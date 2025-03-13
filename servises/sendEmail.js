import nodemailer from 'nodemailer';
require('dotenv').config();
const smtpUser =process.env.SMTP_USERNAME;
const smtpPassword= process.env.SMTP_PASSWORD;
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: smtpUser,
    pass: smtpPassword,
  },
});
const emailWithNodeMailer=async(emailData)=>{
  try{
   const optionsMailData={
    from:smtpUser, // sender address
    to:emailData.recipient, // list of receivers or recipient
    subject:emailData.subject,  // Subject line
    html:emailData.body, // html body
  };
  const info=await transporter.sendMail(optionsMailData);
  console.log('Message send: %s', info.response)
  }catch(error){
   throw error.message;
  }
};
export default emailWithNodeMailer;