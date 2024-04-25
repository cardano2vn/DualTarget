package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model

	Id        string `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	TxHash    string `gorm:"type:varchar(255)"`
	Date      string `gorm:"type:varchar(255)"`
	Action    string `gorm:"type:varchar(255)"`
	Amount    string `gorm:"type:varchar(255)"`
	Status    string `gorm:"type:varchar(255)"`
	AccountId string `gorm:"type:varchar(255)"`
}
