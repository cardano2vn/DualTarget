package constants

import (
	"dualtarget-backend/src/helpers"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Env struct {
	DATABASE_HOST                       string
	DATABASE_PORT                       string
	DATABASE_USER                       string
	DATABASE_PASSWORD                   string
	DATABASE_NAME                       string
	BLOCKFROST_NETWORK_NAME_PREPROD     string
	BLOCKFROST_NETWORK_NAME_PREVIEW     string
	BLOCKFROST_NETWORK_NAME_MAINNET     string
	BLOCKFROST_RPC_URL_MAINNET          string
	BLOCKFROST_RPC_URL_PREPROD          string
	BLOCKFROST_RPC_URL_PREVIEW          string
	BLOCKFROST_PROJECT_API_KEY_MAINNET  string
	BLOCKFROST_PROJECT_API_KEY_PREPROD  string
	BLOCKFROST_PROJECT_API_KEY_PREVIEW  string
	KOIOS_RPC_URL_PREPROD               string
	KOIOS_RPC_URL_PREVIEW               string
	KOIOS_RPC_URL_MAINNET               string
	DUALTARGET_CONTRACT_ADDRESS_PREPROD string
	EXCHANGE_ADDRESS_FREE_PREPROP       string
}

func ReadEnv() *Env {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error: ", err)
	}
	var (
		DATABASE_HOST                       = os.Getenv("POSTGRES_HOST")
		DATABASE_PORT                       = os.Getenv("POSTGRES_PORT")
		DATABASE_USER                       = os.Getenv("POSTGRES_USER")
		DATABASE_PASSWORD                   = os.Getenv("POSTGRES_PASSWORD")
		DATABASE_NAME                       = os.Getenv("POSTGRES_DB")
		BLOCKFROST_NETWORK_NAME_PREPROD     = os.Getenv("BLOCKFROST_NETWORK_NAME_PREPROD")
		BLOCKFROST_NETWORK_NAME_PREVIEW     = os.Getenv("BLOCKFROST_NETWORK_NAME_PREVIEW")
		BLOCKFROST_NETWORK_NAME_MAINNET     = os.Getenv("BLOCKFROST_NETWORK_NAME_MAINNET")
		BLOCKFROST_RPC_URL_MAINNET          = os.Getenv("BLOCKFROST_RPC_URL_MAINNET")
		BLOCKFROST_RPC_URL_PREPROD          = os.Getenv("BLOCKFROST_RPC_URL_PREPROD")
		BLOCKFROST_RPC_URL_PREVIEW          = os.Getenv("BLOCKFROST_RPC_URL_PREVIEW")
		BLOCKFROST_PROJECT_API_KEY_MAINNET  = os.Getenv("BLOCKFROST_PROJECT_API_KEY_MAINNET")
		BLOCKFROST_PROJECT_API_KEY_PREPROD  = os.Getenv("BLOCKFROST_PROJECT_API_KEY_PREPROD")
		BLOCKFROST_PROJECT_API_KEY_PREVIEW  = os.Getenv("BLOCKFROST_PROJECT_API_KEY_PREVIEW")
		KOIOS_RPC_URL_PREPROD               = os.Getenv("KOIOS_RPC_URL_PREPROD")
		KOIOS_RPC_URL_PREVIEW               = os.Getenv("KOIOS_RPC_URL_PREVIEW")
		KOIOS_RPC_URL_MAINNET               = os.Getenv("KOIOS_RPC_URL_MAINNET")
		DUALTARGET_CONTRACT_ADDRESS_PREPROD = os.Getenv("DUALTARGET_CONTRACT_ADDRESS_PREPROD")
		EXCHANGE_ADDRESS_FREE_PREPROP       = os.Getenv("EXCHANGE_ADDRESS_FREE_PREPROP")
	)

	if err != nil {
		helpers.ErrorPanic(err)
	}

	return &Env{
		DATABASE_HOST:                       DATABASE_HOST,
		DATABASE_PORT:                       DATABASE_PORT,
		DATABASE_USER:                       DATABASE_USER,
		DATABASE_PASSWORD:                   DATABASE_PASSWORD,
		DATABASE_NAME:                       DATABASE_NAME,
		BLOCKFROST_NETWORK_NAME_PREPROD:     BLOCKFROST_NETWORK_NAME_PREPROD,
		BLOCKFROST_NETWORK_NAME_PREVIEW:     BLOCKFROST_NETWORK_NAME_PREVIEW,
		BLOCKFROST_NETWORK_NAME_MAINNET:     BLOCKFROST_NETWORK_NAME_MAINNET,
		BLOCKFROST_RPC_URL_MAINNET:          BLOCKFROST_RPC_URL_MAINNET,
		BLOCKFROST_RPC_URL_PREPROD:          BLOCKFROST_RPC_URL_PREPROD,
		BLOCKFROST_RPC_URL_PREVIEW:          BLOCKFROST_RPC_URL_PREVIEW,
		BLOCKFROST_PROJECT_API_KEY_MAINNET:  BLOCKFROST_PROJECT_API_KEY_MAINNET,
		BLOCKFROST_PROJECT_API_KEY_PREPROD:  BLOCKFROST_PROJECT_API_KEY_PREPROD,
		BLOCKFROST_PROJECT_API_KEY_PREVIEW:  BLOCKFROST_PROJECT_API_KEY_PREVIEW,
		KOIOS_RPC_URL_PREPROD:               KOIOS_RPC_URL_PREPROD,
		KOIOS_RPC_URL_PREVIEW:               KOIOS_RPC_URL_PREVIEW,
		KOIOS_RPC_URL_MAINNET:               KOIOS_RPC_URL_MAINNET,
		DUALTARGET_CONTRACT_ADDRESS_PREPROD: DUALTARGET_CONTRACT_ADDRESS_PREPROD,
		EXCHANGE_ADDRESS_FREE_PREPROP:       EXCHANGE_ADDRESS_FREE_PREPROP,
	}
}