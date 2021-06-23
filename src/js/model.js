import { Email } from './vendors/smtp.js';
import { addClass, removeClass } from './helper.js';
import { form } from './config.js';

// ! For make form working make necessary changes as mentioned below

// Form submission
export const submitForm = function (e) {
  e.preventDefault();

  // Input values
  let name = document.querySelector('.js-name').value;
  let email = document.querySelector('.js-email').value;
  let message = document.querySelector('.js-message').value;

  sendMail(name, email, message);
};

const sendMail = function (name, email, message) {
  addClass(document.querySelector('.js-form-container'), 'hide');
  removeClass(document.querySelector('.js-spinner'), 'hide');

  Email.send({
    //! add your own secure token here
    SecureToken: 'Enter secure token',
    //! or input your email and password from which you want to receive emails(use only one method)

    //! for more info visit https://smtpjs.com/ or contact me at https://pawanjs.xyz

    //! Host : "smtp.yourisp.com",
    //! Username : "username",
    //! Password : "password",

    //! Change email to your email in which you want to receive emails
    To: 'contactpawanjs@gmail.com',
    From: 'mailtopawanjs@gmail.com',
    Subject: 'Mail from website',
    Body: `<p style="font-size:24px;">Name: ${name}</p>
           <p style="font-size:24px; margin-top: 10px;">Email: ${email}</p>
           <p style="font-size:24px; margin-top: 10px;">Message: ${message}</p>`,
  }).then(() => {
    form.reset();
    addClass(document.querySelector('.js-spinner'), 'hide');
    removeClass(document.querySelector('.js-success-box'), 'hide');
    document.querySelector('.js-userName').textContent =
      name.charAt(0).toUpperCase() + name.slice(1);
  });
};
