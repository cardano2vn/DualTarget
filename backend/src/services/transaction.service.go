package services

import (
	"dualtarget-backend/src/data/request"
	"dualtarget-backend/src/data/response"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/models"
	"dualtarget-backend/src/repository"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type ITransactionService interface {
	Create(transaction request.CreateTransaction) response.TransactionResponse
	Update(transaction request.UpdateTransaction)
	Delete(transactionId string)
	FindById(transactionId string) response.TransactionResponse
	FindByTxHash(transactionHash string) response.TransactionResponse
	FindAll(count int, take int) ([]response.TransactionResponse, int)
	FindByAccountId(count int, size int, accountId string) ([]response.TransactionResponse, int)
}

type TTransactionService struct {
	TransactionRepository repository.ITransactionRepository
	Validate              *validator.Validate
}

func TransactionServiceImplement(transactionRepository repository.ITransactionRepository, validate *validator.Validate) ITransactionService {
	return &TTransactionService{
		TransactionRepository: transactionRepository,
		Validate:              validate,
	}
}

func (transactionService *TTransactionService) Create(transactionRequest request.CreateTransaction) response.TransactionResponse {
	err := transactionService.Validate.Struct(transactionRequest)
	helpers.ErrorPanic(err)
	transactionModel := models.Transaction{
		Id:        uuid.NewString(),
		TxHash:    transactionRequest.TxHash,
		Status:    transactionRequest.Status,
		AccountId: transactionRequest.AccountId,
		Action:    transactionRequest.Action,
		Date:      transactionRequest.Date,
		Amount:    transactionRequest.Amount,
	}

	transaction, err := transactionService.TransactionRepository.Save(transactionModel)
	helpers.ErrorPanic(err)

	result := response.TransactionResponse{
		Id:        transaction.Id,
		CreatedAt: transaction.CreatedAt.String(),
		UpdatedAt: transaction.UpdatedAt.String(),
		TxHash:    transaction.TxHash,
	}

	return result

}

func (transactionService *TTransactionService) Delete(transactionId string) {
	transactionService.TransactionRepository.Delete(transactionId)
}

func (transactionService *TTransactionService) Update(transaction request.UpdateTransaction) {
	existTransaction, err := transactionService.TransactionRepository.FindById(transaction.Id)
	helpers.ErrorPanic(err)

	existTransaction.TxHash = transaction.TxHash
	existTransaction.AccountId = transaction.AccountId
	existTransaction.Action = transaction.Action
	existTransaction.Amount = transaction.Amount
	existTransaction.Date = transaction.Date
	existTransaction.Status = transaction.Status

	transactionService.TransactionRepository.Update(existTransaction)
}

func (transactionService *TTransactionService) FindById(transactionId string) response.TransactionResponse {
	existTransaction, err := transactionService.TransactionRepository.FindById(transactionId)
	helpers.ErrorPanic(err)

	result := response.TransactionResponse{
		Id:        existTransaction.Id,
		CreatedAt: existTransaction.CreatedAt.String(),
		UpdatedAt: existTransaction.UpdatedAt.String(),
		TxHash:    existTransaction.TxHash,
		Date:      existTransaction.Date,
		Action:    existTransaction.Action,
		Amount:    existTransaction.Amount,
		Status:    existTransaction.Status,
		AccountId: existTransaction.AccountId,
	}

	return result
}

func (transactionService *TTransactionService) FindByTxHash(txHash string) response.TransactionResponse {
	existTransaction, err := transactionService.TransactionRepository.FindByTxHash(txHash)

	helpers.ErrorPanic(err)

	result := response.TransactionResponse{
		Id:        existTransaction.Id,
		CreatedAt: existTransaction.CreatedAt.String(),
		UpdatedAt: existTransaction.UpdatedAt.String(),
		TxHash:    existTransaction.TxHash,
		Date:      existTransaction.Date,
		Action:    existTransaction.Action,
		Amount:    existTransaction.Amount,
		Status:    existTransaction.Status,
		AccountId: existTransaction.AccountId,
	}

	return result
}

func (transactionService *TTransactionService) FindAll(count int, size int) ([]response.TransactionResponse, int) {
	result, totalPage := transactionService.TransactionRepository.FindAll(count, size)

	var accounts []response.TransactionResponse
	for _, value := range result {
		account := response.TransactionResponse{
			Id:        value.Id,
			CreatedAt: value.CreatedAt.String(),
			UpdatedAt: value.UpdatedAt.String(),
			TxHash:    value.TxHash,
			Date:      value.Date,
			Action:    value.Action,
			Amount:    value.Amount,
			Status:    value.Status,
			AccountId: value.AccountId,
		}
		accounts = append(accounts, account)
	}

	return accounts, totalPage
}

func (transactionService *TTransactionService) FindByAccountId(count int, size int, accountId string) ([]response.TransactionResponse, int) {
	result, totalPage := transactionService.TransactionRepository.FindByAccountId(count, size, accountId)

	var accounts []response.TransactionResponse
	for _, value := range result {
		account := response.TransactionResponse{
			Id:        value.Id,
			CreatedAt: value.CreatedAt.String(),
			UpdatedAt: value.UpdatedAt.String(),
			TxHash:    value.TxHash,
			Date:      value.Date,
			Action:    value.Action,
			Amount:    value.Amount,
			Status:    value.Status,
			AccountId: value.AccountId,
		}
		accounts = append(accounts, account)
	}

	return accounts, totalPage
}
