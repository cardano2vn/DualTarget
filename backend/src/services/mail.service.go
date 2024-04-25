package services

import (
	"dualtarget-backend/src/repository"
)

func SendMail() {
	from := "hello@schadokar.dev"

	// Array of recipients address
	to := []string{"shubham@schadokar.dev"}

	// Create a message and convert it into bytes
	msg := []byte("To: shubham@schadokar.dev\r\n" +
		"From: hello@schadokar.dev\r\n" +
		"Subject: Hello Gophers!\r\n" +
		"\r\n" +
		"This is the email is sent using golang and sendinblue.\r\n")

	repository.SendMail(from, to, msg)

}
