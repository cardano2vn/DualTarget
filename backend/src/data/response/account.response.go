package response

type AccountResponse struct {
	Id            string `json:"id"`
	CreatedAt     string `json:"created_at"`
	UpdatedAt     string `json:"updated_at"`
	WalletAddress string `json:"wallet_address"`
	StakeAddress  string `json:"stake_address"`
}
