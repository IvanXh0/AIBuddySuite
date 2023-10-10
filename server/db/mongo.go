package db

import (
	"context"
	"errors"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitializeMongoDB() (*mongo.Client, error) {

	err := godotenv.Load()
	MONGODB_URI := os.Getenv("MONGODB_URI")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	if MONGODB_URI == "" {
		return nil, errors.New("MONGODB_URI is not set")
	}



    clientOptions := options.Client().ApplyURI(MONGODB_URI)
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        return nil, err
    }

    err = client.Ping(context.TODO(), nil)
    if err != nil {
        return nil, err
    }

    log.Println("Connected to MongoDB")
    return client, nil
}