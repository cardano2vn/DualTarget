package models

import (
	"time"

	"gorm.io/gorm"
)

type Account struct {
	gorm.Model

	Id            string `gorm:"primaryKey"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	WalletAddress string        `gorm:"type:varchar(255)"`
	StakeAddress  string        `gorm:"type:varchar(255)"`
	Transactions  []Transaction `gorm:"foreignKey:AccountId;references:Id"`
}
