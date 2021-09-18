
const nodemailer = require('nodemailer');
const nodemailMailgun = require('nodemailer-mailgun-transport');
const fs = require("fs")
const path = require("path")
const express = require('express');
const axios = require('axios')
const handlebars = require("handlebars")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.handlebars"), "utf8");

const auth = {
	auth: {
	api_key: "0ac0346a2d-8f91bd99",
	domain:  "yugae"
         }
};







const template = handlebars.compile(emailTemplateSource)

//const htmlToSend = template({message: "HelloSSSSSS!"})
let transporter  = nodemailer.createTransport(nodemailMailgun(auth));
axios.get('http://ip:8080/ords/ins100/vpolx/')
     .then((response) => {
     	const sos = JSON.stringify(response.data);
     	const so = JSON.parse(sos); 


      for(var z=0;z<so.items.length;z++)
       {
       let   a  = so.items[z].party_name;
        //console.log('\t' + so.items[z].party_name + 'policy_no '+ so.items[z].policy_no + 'start_date '+ so.items[z].start_date + 'end_date' + so.items[z].end_date
        //	+'ins type' +  so.items[z].ins_type + 'ins company' + so.items[z].insurance_company) 
       

const htmlToSend = template({message: "Policy soft Copy !"+'\t'+a,mpolicy_no: so.items[z].policy_no,msdate: so.items[z].start_date,medate:so.items[z].end_date,micompany:so.items[z].insurance_company,mitype:so.items[z].ins_type});
const mailOptions = {
	from: "yugabk@gmail.com",
	to:'yugabk@gmail.com',
	subject:a,
	html: htmlToSend
};



			
transporter.sendMail(mailOptions,function(err,data){
	if (err) {
		console.log('Error',err);
	} else
	{
		console.log('Message sent')
	}
});






       }
      })
      .catch(console.error)


      