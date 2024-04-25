package controllers

import (
	"dualtarget-backend/src/data/request"
	"dualtarget-backend/src/data/response"
	"dualtarget-backend/src/helpers"
	"dualtarget-backend/src/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TAccountController struct {
	AccountService services.IAccountService
}

func AccountController(service services.IAccountService) *TAccountController {
	return &TAccountController{
		AccountService: service,
	}
}

func (controller *TAccountController) Create(context *gin.Context) {
	createAccountRequest := request.CreateAccount{}
	err := context.ShouldBindJSON(&createAccountRequest)
	helpers.ErrorPanic(err)

	existingAccount := controller.AccountService.FindByAddress(createAccountRequest.WalletAddress)
	if existingAccount.WalletAddress == createAccountRequest.WalletAddress {
		result := response.Response{
			Data: existingAccount,
		}
		context.Header("Content-Type", "application/json")
		context.JSON(http.StatusOK, result)
		return
	}

	account := controller.AccountService.Create(createAccountRequest)
	result := response.Response{
		Data: account,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TAccountController) Update(context *gin.Context) {
	updateAccountRequest := request.UpdateAccount{}
	err := context.ShouldBindJSON(&updateAccountRequest)
	helpers.ErrorPanic(err)

	id := context.Param("id")
	helpers.ErrorPanic(err)

	updateAccountRequest.Id = id
	controller.AccountService.Update(updateAccountRequest)

	result := response.Response{
		Data: nil,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TAccountController) Delete(context *gin.Context) {
	accountId := context.Param("id")
	controller.AccountService.Delete(accountId)

	result := response.Response{
		Data: nil,
	}

	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TAccountController) FindById(context *gin.Context) {
	accountId := context.Param("id")
	account := controller.AccountService.FindById(accountId)

	result := response.Response{
		Data: account,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, result)
}

func (controller *TAccountController) FindAll(context *gin.Context) {
	accounts := controller.AccountService.FindAll()
	webResponse := response.Response{

		Data: accounts,
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, webResponse)

}
