package dto

type CreateTransactionDto struct {
	CreatedAt string `validate:"required" json:"created_at"`
	UpdatedAt string `validate:"required" json:"updated_at"`
	TxHash    string `validate:"required" json:"tx_hash"`
	Date      string `validate:"required" json:"date"`
	Action    string `validate:"required" json:"action"`
	Amount    string `validate:"required" json:"amount"`
	Status    string `validate:"required" json:"status"`
	AccountId string `validate:"required" json:"account_id"`
}
