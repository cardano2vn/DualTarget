package request

type UpdateAccount struct {
	Id            string `validate:"required"`
	WalletAddress string `json:"wallet_address"`
	StakeAddress  string `json:"stake_address"`
}
