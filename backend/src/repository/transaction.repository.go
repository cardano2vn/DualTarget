package repository

import (
	dto "dualtarget-backend/src/dto/transaction"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"errors"

	"gorm.io/gorm"
)

type ITransactionRepository interface {
	Save(transaction models.Transaction) (transactionDto models.Transaction, err error)
	Update(transaction models.Transaction)
	Delete(transactionId string)
	FindById(transactionId string) (transaction models.Transaction, err error)
	FindByTxHash(transactionHash string) (transaction models.Transaction, err error)
	FindAll(count int, size int) ([]models.Transaction, int)
	FindByAccountId(count int, size int, accountId string) ([]models.Transaction, int)
}

type TTransactionRepository struct {
	DB *gorm.DB
}

func TransactionRepositoryImplement(DB *gorm.DB) ITransactionRepository {
	return &TTransactionRepository{DB: DB}
}

func (transactionRepository *TTransactionRepository) Delete(transactionId string) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Where("id = ?", transactionId).Delete(&transactionDto)
	helpers.ErrorPanic(result.Error)
}

func (transactionRepository *TTransactionRepository) FindByTxHash(transactionHash string) (transaction models.Transaction, err error) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Find(&transactionDto, transactionHash)
	if result != nil {
		return transactionDto, nil
	} else {
		return transactionDto, errors.New("tag is not found")
	}
}

func (transactionRepository *TTransactionRepository) FindAll(count int, size int) ([]models.Transaction, int) {
	var transactions []models.Transaction
	offset := (size - 1) * count
	totalTransactions := transactionRepository.DB.Find(&transactions)
	result := transactionRepository.DB.Limit(size).Offset(offset).Find(&transactions)
	helpers.ErrorPanic(result.Error)
	totalPage := (int(totalTransactions.RowsAffected) + size - 1) / size
	return transactions, totalPage
}

func (transactionRepository *TTransactionRepository) FindById(transactionId string) (transaction models.Transaction, err error) {
	var transactionDto models.Transaction
	result := transactionRepository.DB.Find(&transactionDto, transactionId)
	if result != nil {
		return transactionDto, nil
	} else {
		return transactionDto, errors.New("transaction is not found")
	}
}

func (transactionRepository *TTransactionRepository) FindByAccountId(count int, size int, accountId string) ([]models.Transaction, int) {
	var transactions []models.Transaction
	offset := (size - 1) * count
	totalTransactions := transactionRepository.DB.Where("account_id = ?", accountId).Find(&transactions)
	result := transactionRepository.DB.Limit(size).Offset(offset).Where("account_id = ?", accountId).Find(&transactions)
	helpers.ErrorPanic(result.Error)
	totalPage := (int(totalTransactions.RowsAffected) + size - 1) / size
	return transactions, totalPage
}

func (transactionRepository *TTransactionRepository) Save(transaction models.Transaction) (transactionDto models.Transaction, err error) {
	result := transactionRepository.DB.Create(&transaction)
	helpers.ErrorPanic(result.Error)
	return transaction, nil
}

func (transactionRepository *TTransactionRepository) Update(transaction models.Transaction) {
	var updateTransaction = dto.UpdateTransactionDto{
		Id:        transaction.Id,
		Date:      transaction.Date,
		TxHash:    transaction.TxHash,
		Status:    transaction.Status,
		Action:    transaction.Action,
		Amount:    transaction.Amount,
		AccountId: transaction.AccountId,
	}
	result := transactionRepository.DB.Model(&transaction).Where("id = ? AND account_id = ?", transaction.Id, transaction.AccountId).Updates(updateTransaction)
	helpers.ErrorPanic(result.Error)
}
