package routers

import (
	"dualtarget-backend/src/configs"
	"dualtarget-backend/src/controllers"
	"dualtarget-backend/src/repository"
	"dualtarget-backend/src/services"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func TransactionRouter(router *gin.RouterGroup) {
	validate := validator.New()
	database := configs.Database()
	transactionRepository := repository.TransactionRepositoryImplement(database)
	transactionService := services.TransactionServiceImplement(transactionRepository, validate)
	transactionController := controllers.TransactionController(transactionService)

	router.GET("/", transactionController.FindAll)
	router.GET("/:id", transactionController.FindById)
	router.POST("/", transactionController.Create)
	router.PATCH("/:id", transactionController.Update)
	router.DELETE("/:id", transactionController.Delete)
}
