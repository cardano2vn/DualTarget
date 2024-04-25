package response

type TransactionResponse struct {
	Id        string `json:"id"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
	TxHash    string `json:"ts_hash"`
	Date      string `json:"date"`
	Action    string `json:"action"`
	Amount    string `json:"amount"`
	Status    string `json:"status"`
	AccountId string `json:"account_id"`
}
