package request

type UpdateTransaction struct {
	Id        string `validate:"required" json:"id"`
	TxHash    string `validate:"required" json:"ts_hash"`
	Date      string `validate:"required" json:"date"`
	Action    string `validate:"required" json:"action"`
	Amount    string `validate:"required" json:"amount"`
	Status    string `validate:"required" json:"status"`
	AccountId string `validate:"required" json:"account_id"`
}
