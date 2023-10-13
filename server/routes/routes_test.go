package routes

import (
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

func TestGetChats(t *testing.T) {

	tests := []struct {
		description  string
		route        string
		expectedCode int
	}{
		{
			description:  "get chats",
			route:        "/api/chatbot",
			expectedCode: 200,
		},
		{
			description:  "get 404 when route doesnt exist",
			route:        "/api/404",
			expectedCode: 404,
		},
	}

	app := fiber.New()

	app.Get("/api/chatbot", func(c *fiber.Ctx) error {
		return c.SendStatus(200)
	})

	for _, test := range tests {

		req := httptest.NewRequest("GET", test.route, nil)

		resp, _ := app.Test(req)

		assert.Equal(t, test.expectedCode, resp.StatusCode)
	}
}

func TestCreateChat(t *testing.T) {
	tests := []struct {
		description  string
		route        string
		expectedCode int
	}{
		{
			description:  "post chat",
			route:        "/api/chatbot",
			expectedCode: 201,
		},
	}

	app := fiber.New()

	app.Post("/api/chatbot", func(c *fiber.Ctx) error {
		return c.SendStatus(201)
	})

	for _, test := range tests {

		req := httptest.NewRequest("POST", test.route, nil)

		resp, _ := app.Test(req)

		assert.Equal(t, test.expectedCode, resp.StatusCode)
	}
}

func TestGetCodes(t *testing.T) {

	tests := []struct {
		description  string
		route        string
		expectedCode int
	}{
		{
			description:  "get codes",
			route:        "/api/codebot",
			expectedCode: 200,
		},
		{
			description:  "get 404 when route doesnt exist",
			route:        "/api/404",
			expectedCode: 404,
		},
	}

	app := fiber.New()

	app.Get("/api/codebot", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	for _, test := range tests {

		req := httptest.NewRequest("GET", test.route, nil)

		resp, _ := app.Test(req)

		assert.Equal(t, test.expectedCode, resp.StatusCode)
	}
}

func TestCreateCode(t *testing.T) {
	tests := []struct {
		description  string
		route        string
		expectedCode int
	}{
		{
			description:  "post code",
			route:        "/api/codebot",
			expectedCode: 201,
		},
	}

	app := fiber.New()

	app.Post("/api/codebot", func(c *fiber.Ctx) error {
		return c.SendStatus(201)
	})

	for _, test := range tests {

		req := httptest.NewRequest("POST", test.route, nil)

		resp, _ := app.Test(req)

		assert.Equal(t, test.expectedCode, resp.StatusCode)
	}
}

func TestGetImages(t *testing.T) {

	tests := []struct {
		description  string
		route        string
		expectedCode int
	}{
		{
			description:  "get images",
			route:        "/api/imagebot",
			expectedCode: 200,
		},
		{
			description:  "get 404 when route doesnt exist",
			route:        "/api/404",
			expectedCode: 404,
		},
	}

	app := fiber.New()

	app.Get("/api/imagebot", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	for _, test := range tests {

		req := httptest.NewRequest("GET", test.route, nil)

		resp, _ := app.Test(req)

		assert.Equal(t, test.expectedCode, resp.StatusCode)
	}
}

func TestCreateImages(t *testing.T) {
	tests := []struct {
		description  string
		route        string
		expectedCode int
	}{
		{
			description:  "post image",
			route:        "/api/imagebot",
			expectedCode: 201,
		},
	}

	app := fiber.New()

	app.Post("/api/imagebot", func(c *fiber.Ctx) error {
		return c.SendStatus(201)
	})

	for _, test := range tests {

		req := httptest.NewRequest("POST", test.route, nil)

		resp, _ := app.Test(req)

		assert.Equal(t, test.expectedCode, resp.StatusCode)
	}
}
