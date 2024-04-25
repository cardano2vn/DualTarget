package controllers

import (
	"dualtarget-backend/src/data/request"
	"dualtarget-backend/src/data/response"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TTransactionController struct {
	transactionService services.ITransactionService
}

func TransactionController(service services.ITransactionService) *TTransactionController {
	return &TTransactionController{
		transactionService: service,
	}
}

func (controller *TTransactionController) Create(context *gin.Context) {
	createTransactionRequest := request.CreateTransaction{}
	err := context.ShouldBindJSON(&createTransactionRequest)
	helpers.ErrorPanic(err)

	existTransaction := controller.transactionService.FindByTxHash(createTransactionRequest.TxHash)
	if createTransactionRequest.TxHash == existTransaction.TxHash {
		result := response.Response{
			Data: existTransaction,
		}
		context.Header("Content-Type", "application/json")
		context.JSON(http.StatusOK, result)
		return
	}

	transaction := controller.transactionService.Create(createTransactionRequest)
	result := response.Response{
		Data: transaction,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TTransactionController) Update(context *gin.Context) {
	updateTransactionRequest := request.UpdateTransaction{}
	err := context.ShouldBindJSON(&updateTransactionRequest)
	helpers.ErrorPanic(err)

	id := context.Param("id")

	updateTransactionRequest.Id = id

	controller.transactionService.Update(updateTransactionRequest)

	result := response.Response{
		Data: nil,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)

}

func (controller *TTransactionController) Delete(context *gin.Context) {
	id := context.Param("id")
	controller.transactionService.Delete(id)
	result := response.Response{
		Data: nil,
	}

	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TTransactionController) FindById(context *gin.Context) {
	id := context.Param("id")
	tagResponse := controller.transactionService.FindById(id)

	result := response.Response{
		Data: tagResponse,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TTransactionController) FindAll(context *gin.Context) {
	accountId := context.Query("account_id")
	countQuery := context.Query("count")
	sizeQuery := context.Query("size")
	if countQuery == "" || sizeQuery == "" {
		errorMessage := "count and size query parameters are required"
		context.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}
	count, err := strconv.Atoi(countQuery)
	if err != nil {
		errorMessage := "count parameter is not a valid integer"
		context.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}
	size, err := strconv.Atoi(sizeQuery)
	if err != nil {
		errorMessage := "size parameter is not a valid integer"
		context.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}
	if accountId != "" {
		transactions, totalPage := controller.transactionService.FindByAccountId(count, size, accountId)
		responseData := map[string]interface{}{
			"transactions": transactions,
			"total_page":   totalPage,
		}

		webResponse := response.Response{
			Data: responseData,
		}
		context.Header("Content-Type", "application/json")
		context.JSON(http.StatusOK, webResponse)
		return
	}
	transactions, totalPage := controller.transactionService.FindAll(count, size)
	responseData := map[string]interface{}{
		"transactions": transactions,
		"total_page":   totalPage,
	}

	webResponse := response.Response{
		Data: responseData,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, webResponse)

}

func (controller *TTransactionController) FindByAccountId(context *gin.Context) {
	accountId := context.Query("account_id")
	countQuery := context.Query("count")
	sizeQuery := context.Query("size")
	if countQuery == "" || sizeQuery == "" {
		errorMessage := "count and size query parameters are required"
		context.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}
	count, err := strconv.Atoi(countQuery)
	if err != nil {
		errorMessage := "count parameter is not a valid integer"
		context.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}
	size, err := strconv.Atoi(sizeQuery)
	if err != nil {
		errorMessage := "size parameter is not a valid integer"
		context.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}
	transactions, totalPage := controller.transactionService.FindByAccountId(count, size, accountId)
	responseData := map[string]interface{}{
		"transactions": transactions,
		"total_page":   totalPage,
	}

	webResponse := response.Response{
		Data: responseData,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, webResponse)

}
