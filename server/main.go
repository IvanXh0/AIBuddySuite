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
		log.Fatal("Failed to connect to MongoDB", err)
	}

	defer client.Disconnect(context.Background())

	port := PORT
	if port == "" {
		port = "3000"
	}

	api := app.Group("/api") // Define a group with the "/api" prefix

	api.Get("/chatbot", func(c *fiber.Ctx) error {
		return routes.GetChats(c, client)
	})

	api.Get("/chatbot/user-chats", func(c *fiber.Ctx) error {
		return routes.GetUserChats(c, client)
	})

	api.Post("/chatbot", func(c *fiber.Ctx) error {
		return routes.CreateChat(c, client)
	})

	api.Get("/codebot", func(c *fiber.Ctx) error {
		return routes.GetCode(c, client)
	})

	api.Get("/codebot/user-codes", func(c *fiber.Ctx) error {
		return routes.GetUserCodes(c, client)
	})

	api.Post("/codebot", func(c *fiber.Ctx) error {
		return routes.CreateCodes(c, client)
	})

	api.Get("/imagebot/user-images", func(c *fiber.Ctx) error {
		return routes.GetUserImage(c, client)
	})

	api.Post("/imagebot", func(c *fiber.Ctx) error {
		return routes.CreateImage(c, client)
	})

	log.Printf("Listening on port %s\n", port)

	log.Fatal(app.Listen(":" + port))
}
