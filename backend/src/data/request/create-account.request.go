package request

type CreateAccount struct {
	WalletAddress string `validate:"required" json:"wallet_address"`
	StakeAddress  string `validate:"required" json:"stake_address"`
}
