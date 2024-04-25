package routers

import (
	"dualtarget-backend/src/configs"
	"dualtarget-backend/src/controllers"
	"dualtarget-backend/src/repository"
	"dualtarget-backend/src/services"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func AccountRouter(router *gin.RouterGroup) {
	validate := validator.New()
	database := configs.Database()
	accountRepository := repository.AccountRepositoryImplement(database)
	accountService := services.AccountServiceImplement(accountRepository, validate)
	accountController := controllers.AccountController(accountService)

	router.GET("/", accountController.FindAll)
	router.GET("/:id", accountController.FindById)
	router.POST("/", accountController.Create)
	router.PATCH("/:id", accountController.Update)
	router.DELETE("/:id", accountController.Delete)
}
