package main

import (
	"dualtarget-backend/src/routers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	var app *gin.Engine = gin.Default()
	gin.SetMode(gin.ReleaseMode)
	app.Use(cors.New(cors.Config{
		// AllowOrigins:     []string{"https://foo.com"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			// return origin == "https://github.com"
			return true
		},
		MaxAge: 12 * time.Hour,
	}))

	routers.Routers(app)
	app.Run(":8080")
}
