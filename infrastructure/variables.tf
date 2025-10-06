variable "aws_account_id" {
  description = "AWS Account ID"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-northeast-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "root_domain" {
  description = "Root domain name (e.g., example.com, 23prime.xyz)"
  type        = string
}

variable "subdomain" {
  description = "Subdomain (e.g., www). Leave empty for root domain."
  type        = string
  default     = ""
}

variable "github_org" {
  description = "GitHub organization or user name"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}
