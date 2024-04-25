package dto

type CreateAccountDto struct {
	WalletAddress string `validate:"require" json:"wallet_address"`
	StakeAddress  string `validate:"require" json:"stake_address"`
}
