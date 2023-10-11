package router

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"

	"server/routes"
)

func RegisterApiRoutes(api fiber.Router, client *mongo.Client) {
	api.Get("/chatbot", func(c *fiber.Ctx) error {
		return routes.GetChats(c, client)
	})

	api.Get("/chatbot/user-chats", func(c *fiber.Ctx) error {
		return routes.GetUserChats(c, client)
	})

	api.Post("/chatbot", func(c *fiber.Ctx) error {
		return routes.CreateChat(c, client)
	})

	api.Delete("/chatbot", func(c *fiber.Ctx) error {
		return routes.ClearChatHistory(c, client)
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

	api.Delete("/codebot", func(c *fiber.Ctx) error {
		return routes.ClearCodeHistory(c, client)
	})

	api.Get("/imagebot/user-images", func(c *fiber.Ctx) error {
		return routes.GetUserImage(c, client)
	})

	api.Post("/imagebot", func(c *fiber.Ctx) error {
		return routes.CreateImage(c, client)
	})

	api.Delete("/imagebot", func(c *fiber.Ctx) error {
		return routes.ClearImageHistory(c, client)
	})
}
