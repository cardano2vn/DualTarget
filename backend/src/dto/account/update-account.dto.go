package dto

type UpdateAccountDto struct {
	Id            string `json:"id"`
	WalletAddress string `validate:"required" json:"wallet_address"`
	StakeAddress  string `validate:"required" json:"stake_address"`
}
