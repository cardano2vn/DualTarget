package routers

import (
	"github.com/gin-gonic/gin"
)

func Routers(app *gin.Engine) {
	root := app.Group("/api/v1")
	AccountRouter(root.Group("/account"))
	TransactionRouter(root.Group("/transaction"))
}
