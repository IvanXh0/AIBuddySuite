package main

import (
	"context"
	"log"
	"os"

	"server/db"
	"server/routes"

	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type Post struct {
	Title string
	Body  string
	Email string
}

func main() {

	app := fiber.New()

	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(cors.New())

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")

	client, err := db.InitializeMongoDB()

	if err != nil {
		log.Fatal("Failed to connect to mongodb", err)
	}

	defer client.Disconnect(context.Background())

	port := PORT
	if port == "" {
		port = "3000"
	}

	app.Get("/chatbot", func(c *fiber.Ctx) error {
		return routes.GetChats(c, client)
	})

	app.Get("/chatbot/user-chats", func(c *fiber.Ctx) error {
		return routes.GetUserChats(c, client)
	})

	app.Post("/chatbot", func(c *fiber.Ctx) error {
		return routes.CreateChat(c, client)
	})

	log.Printf("Listening on port %s\n", port)

	log.Fatal(app.Listen(":" + port))

}
