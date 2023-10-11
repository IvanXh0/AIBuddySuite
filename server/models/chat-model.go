package models

type Chat struct {
	Role      string `json:"role"`
	Content   string `json:"content"`
	UserEmail string `json:"email"`
}

type Code struct {
	Role      string `json:"role"`
	Content   string `json:"content"`
	UserEmail string `json:"email"`
}
