package routes

import (
	"context"
	"log"
	"server/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ChatRequest struct {
	UserMessage  models.Chat `json:"userMessage"`
	ResponseData models.Chat `json:"responseData"`
}

func GetChats(c *fiber.Ctx, client *mongo.Client) error {
	coll := client.Database("aibuddysuite").Collection("chatbot")
	cursor, err := coll.Find(context.TODO(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.TODO())

	var posts []bson.M
	if err := cursor.All(context.TODO(), &posts); err != nil {
		return err
	}

	return c.JSON(posts)
}

func CreateChat(c *fiber.Ctx, client *mongo.Client) error {
	var chatRequest ChatRequest

	if err := c.BodyParser(&chatRequest); err != nil {
		log.Printf("Error parsing request body: %v", err)
		return c.Status(fiber.StatusBadRequest).SendString("Bad Request")
	}

	// Now you can access chatRequest.UserMessage and chatRequest.ResponseData
	// and insert them into MongoDB or perform any other desired operations

	coll := client.Database("aibuddysuite").Collection("chatbot")

	// Insert UserMessage into MongoDB
	_, err := coll.InsertOne(context.TODO(), chatRequest.UserMessage)
	if err != nil {
		log.Printf("Error inserting user message into MongoDB: %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
	}

	// ... Insert ResponseData into MongoDB or perform other operations as needed

	_, errBot := coll.InsertOne(context.TODO(), chatRequest.ResponseData)

	if errBot != nil {
		log.Printf("Error inserting response data into MongoDB: %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
	}

	return c.SendStatus(fiber.StatusCreated)
}
