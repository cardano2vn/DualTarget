package api

import (
	"log"

	"github.com/blockfrost/blockfrost-go"
)

func Blockfrost(ProjectID string, Server string) blockfrost.APIClient {
	if ProjectID == "" && Server == "" {
		log.Fatal("ProjectID and Server has been required")
	}

	var api blockfrost.APIClient = blockfrost.NewAPIClient(blockfrost.APIClientOptions{
		ProjectID: ProjectID,
		Server:    Server,
	})

	return api
}
