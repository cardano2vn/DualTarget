package repository

import (
	"dualtarget-backend/src/helpers"
	"fmt"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
)

func SendMail(from string, to []string, message []byte) {
	err := godotenv.Load(".env")
	helpers.ErrorPanic(err)
	auth := smtp.PlainAuth("", from, os.Getenv(""), os.Getenv(""))
	smtpAddress := fmt.Sprintf("%s:%v", os.Getenv("SMTP_HOST"), os.Getenv("SMTP_PORT"))
	err = smtp.SendMail(smtpAddress, auth, from, to, message)
	helpers.ErrorPanic(err)
}
