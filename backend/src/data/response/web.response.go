package response

type Response struct {
	TotalPage int         `json:"total_page"`
	Data      interface{} `json:"data,omitempty"`
}
