// import nodemailer from "nodemailer";
// import smtpTransport from 'nodemailer-smtp-transport';
// /*
// So asically i have to fetch all the users in the database that i wanna send the email to and
// */
// interface email{
//   to: string[]; // string array of the people i want to send the email to...
//   subject: string;
//   text: string;
// }
// const transporter = nodemailer.createTransport(smtpTransport({
//    service: 'smtp.gmail.com',
//    host: 'mtp.gmail.com',
//   auth: {
//     user: 'danielromeo99@gmail.com',
//     pass: '5308danielromeo' // naturally, replace both with your real credentials or an application-specific password
//   }
// }));
// /**/
// const mailOptions = {
//   from: 'danielromeo99@gmail.com',
//   to: 'macbaseco@gmail.com',
//   subject: 'Invoices due',
//   text: 'Dudes, we really need your money.'
// };
// transporter.sendMail(mailOptions, function(error: any, info:any){
//   if (error) {
// 	console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
//# sourceMappingURL=login.email.js.map
