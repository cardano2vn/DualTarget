package repository

import (
	dto "dualtarget-backend/src/dto/account"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"errors"

	"gorm.io/gorm"
)

type IAccountRepository interface {
	Save(account models.Account) (accountDto models.Account, err error)
	Update(account models.Account)
	Delete(accountId string)
	FindById(accountId string) (accountDto models.Account, err error)
	FindByAddress(walletAddress string) (accountDto models.Account, err error)
	FindAll() []models.Account
}

type TAccountRepository struct {
	DB *gorm.DB
}

func AccountRepositoryImplement(DB *gorm.DB) IAccountRepository {
	return &TAccountRepository{DB: DB}
}

func (accountRepository *TAccountRepository) Delete(accountId string) {
	var accountDto models.Account
	result := accountRepository.DB.Where("id = ?", accountId).Delete(&accountDto)
	helpers.ErrorPanic(result.Error)
}

func (accountRepository *TAccountRepository) FindAll() []models.Account {
	var accounts []models.Account
	result := accountRepository.DB.Find(&accounts)
	helpers.ErrorPanic(result.Error)
	return accounts
}

func (accountRepository *TAccountRepository) FindById(id string) (account models.Account, err error) {
	var accountDto models.Account
	result := accountRepository.DB.Where("id = ?", id).Find(&accountDto)
	if result != nil {
		return accountDto, nil
	} else {
		return accountDto, errors.New("Account is not found")
	}
}

func (accountRepository *TAccountRepository) FindByAddress(walletAddress string) (account models.Account, err error) {
	var accountDto models.Account
	result := accountRepository.DB.Where("wallet_address = ?", walletAddress).Find(&accountDto)
	if result != nil {
		return accountDto, nil
	} else {
		return accountDto, errors.New("Account is not found")
	}
}

func (accountRepository *TAccountRepository) Save(account models.Account) (accountDto models.Account, err error) {
	result := accountRepository.DB.Create(&account)
	helpers.ErrorPanic(result.Error)
	return account, nil
}

func (accountRepository *TAccountRepository) Update(account models.Account) {
	var updateAccount = dto.UpdateAccountDto{
		Id:            account.Id,
		WalletAddress: account.WalletAddress,
		StakeAddress:  account.StakeAddress,
	}
	result := accountRepository.DB.Model(&account).Updates(updateAccount)
	helpers.ErrorPanic(result.Error)
}
