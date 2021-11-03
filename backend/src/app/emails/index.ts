import nodemailer from "nodemailer";
// import smtpTransport from 'nodemailer-smtp-transport';

// /*
// So asically i have to fetch all the users in the database that i wanna send the email to and
// */

// interface email{
//   to: string[]; // string array of the people i want to send the email to...
//   subject: string;
//   text: string;
// }

const transporter = nodemailer.createTransport({
   service: 'gmail',
  auth: {
    user: 'macbaseco@gmail.com',
    pass: '5308macbaseco' // naturally, replace both with your real credentials or an application-specific password
  }
});


const mailOptions = {
  from: 'macbaseco@gmail.com',
  to: 'danielromeo99@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, this is a test email'
};

transporter.sendMail(mailOptions, function(error: any, info:any){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
