### Email (sending) plan

#### Emails i have to send:

1. When a teacher send a message to student.
2. When a student gets allocated a new module
3. When teachers get message from other teachers
4. When Students get notifications(new tests, new assignments, teachers announcements).
5. thus in teachers announcement can include anything from -> A new video steam has been uploaded to simple announcements
6. When student assignment/test has been graded.

#### Plan

1. Create one large file for each section(student, teacher and admin)
2. In each of the files create different functions for different emails

```javascript
	/*firstly declare an interface*/
	interface emailInterface{
		to: string[];
	  	subject: string;
	  	text: string;
	}

	/*This email-object i create where i call adminLoginfunc() */
	emailObject : emaiInterface = {
		to: [getEmail(username)], /*hypethetical getEmail function that i still need to create*/
		subject: "A user has logged into your account",
		text: "<html> <b>If it's not you, <a href="blocking link">Click here</a></b> </html>"
	}
	adminLoginEmailFunc(emailObject); // call the function

	/*email files...*/
	// takes the username of the admin
	const adminLoginEmailFunc = (emailObject: emailInterface) => : void{
		/* create transport function will go here*/
		emailTransporter(ResultObject);
	}

	// in the index file... the transporter
	const emailTransporter = (mailOptions: emailInterface) =>{
		transporter.sendMail(mailOptions, function(error ,info){
		  if (error) {
			console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
	}

```
