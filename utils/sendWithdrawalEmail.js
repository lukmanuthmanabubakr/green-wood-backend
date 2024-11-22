// const nodemailer = require("nodemailer");
// const path = require("path");

// const sendWithdrawalEmail = async (
//   subject,
//   send_to,
//   sent_from,
//   reply_to,
//   template,
//   name,
//   amount,
//   transactionId,
//   withdrawalDate,
//   link
// ) => {
//   // Dynamically import nodemailer-express-handlebars
//   const hbs = (await import("nodemailer-express-handlebars")).default;

//   // Create Email Transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: 465,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const handlebarsOptions = {
//     viewEngine: {
//       extName: ".handlebars",
//       partialsDir: path.resolve("./views"),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve("./views"),
//     extName: ".handlebars",
//   };

//   transporter.use("compile", hbs(handlebarsOptions));

//   // Options for sending email
//   const options = {
//     from: sent_from,
//     to: send_to,
//     replyTo: reply_to,
//     subject,
//     template,
//     context: {
//       name,
//       amount,
//       transactionId,
//       withdrawalDate,
//       link
//     },
//   };

//   // Send Email
//   try {
//     const info = await transporter.sendMail(options);
//     console.log("Withdrawal email sent successfully:", info.response);
//   } catch (err) {
//     console.error("Error sending withdrawal email:", err);
//     throw new Error("Failed to send withdrawal email.");
//   }
// };

// module.exports = sendWithdrawalEmail;





const nodemailer = require("nodemailer");
const path = require("path");

const sendWithdrawalEmail = async (
  subject,
  send_to,
  sent_from,
  reply_to,
  template,
  name,
  amount,
  walletAddress, // Added walletAddress to the context
  transactionId,
  withdrawalDate,
  link
) => {
  // Dynamically import nodemailer-express-handlebars
  const hbs = (await import("nodemailer-express-handlebars")).default;

  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlebarsOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  // Options for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject,
    template,
    context: {
      name,
      amount,
      walletAddress, // Pass walletAddress to the context
      transactionId,
      withdrawalDate,
      link
    },
  };

  // Send Email
  try {
    const info = await transporter.sendMail(options);
    console.log("Withdrawal email sent successfully:", info.response);
  } catch (err) {
    console.error("Error sending withdrawal email:", err);
    throw new Error("Failed to send withdrawal email.");
  }
};

module.exports = sendWithdrawalEmail;
