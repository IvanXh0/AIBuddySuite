package routes

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ImageRequest struct {
	ImageUrls []string `json:"imageUrls"`
	UserEmail string   `json:"userEmail"`
}

func GetUserImage(c *fiber.Ctx, client *mongo.Client) error {
	userEmail := c.Query("userEmail")

	coll := client.Database("aibuddysuite").Collection("imagebot")

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

func CreateImage(c *fiber.Ctx, client *mongo.Client) error {
	var imageRequest ImageRequest

	if err := c.BodyParser(&imageRequest); err != nil {
		log.Printf("Error parsing request body: %v", err)
		return c.Status(fiber.StatusBadRequest).SendString("Bad Request")
	}

	coll := client.Database("aibuddysuite").Collection("imagebot")

	_, err := coll.InsertOne(context.TODO(), imageRequest)
	if err != nil {
		log.Printf("Error inserting image URL into MongoDB: %v", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
	}

	return c.SendStatus(fiber.StatusCreated)
}
