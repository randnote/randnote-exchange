"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
// import smtpTransport from 'nodemailer-smtp-transport';
// /*
// So asically i have to fetch all the users in the database that i wanna send the email to and
// */
// interface email{
//   to: string[]; // string array of the people i want to send the email to...
//   subject: string;
//   text: string;
// }
var transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'macbaseco@gmail.com',
        pass: '5308macbaseco' // naturally, replace both with your real credentials or an application-specific password
    }
});
var mailOptions = {
    from: 'macbaseco@gmail.com',
    to: 'danielromeo99@gmail.com',
    subject: 'Invoices due',
    text: 'Dudes, this is a test email'
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
});
//# sourceMappingURL=index.js.map