package routes

import (
	"context"
	"log"
	"server/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type CodeRequest struct {
	UserMessage  models.Code `json:"userMessage"`
	ResponseData models.Code `json:"responseData"`
	UserEmail    string      `json:"userEmail"`
}

func GetCode(c *fiber.Ctx, client *mongo.Client) error {
	coll := client.Database("aibuddysuite").Collection("codebot")
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

func GetUserCodes(c *fiber.Ctx, client *mongo.Client) error {
	userEmail := c.Query("userEmail")

	coll := client.Database("aibuddysuite").Collection("codebot")

	filter := bson.M{"useremail": userEmail}

	cursor, err := coll.Find(context.TODO(), filter)
	if err != nil {
		return err
	}
	defer cursor.Close(context.TODO())

	var chats []bson.M
	if err := cursor.All(context.TODO(), &chats); err != nil {
		return err
	}

	return c.JSON(chats)
}

func CreateCodes(c *fiber.Ctx, client *mongo.Client) error {
	var codeRequest CodeRequest

	if err := c.BodyParser(&codeRequest); err != nil {
		log.Printf("Error parsing request body: %v", err)
		return c.Status(fiber.StatusBadRequest).SendString("Bad Request")
	}

	coll := client.Database("aibuddysuite").Collection("codebot")

	_, err := coll.InsertOne(context.TODO(), codeRequest.UserMessage)
	if err != nil {
		log.Printf("Error inserting user message into MongoDB: %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
	}

	_, errBot := coll.InsertOne(context.TODO(), codeRequest.ResponseData)

	if errBot != nil {
		log.Printf("Error inserting response data into MongoDB: %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
	}

	return c.SendStatus(fiber.StatusCreated)
}

func ClearCodeHistory(c *fiber.Ctx, client *mongo.Client) error {
	userEmail := c.Query("userEmail")

	coll := client.Database("aibuddysuite").Collection("codebot")

	filter := bson.M{"useremail": userEmail}

	_, err := coll.DeleteMany(context.TODO(), filter)

	if err != nil {
		return err
	}

	return c.SendStatus(fiber.StatusOK)
}
