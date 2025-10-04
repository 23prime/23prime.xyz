terraform {
  required_version = ">= 1.0"

  # Terraform Cloud backend configuration
  # Update organization and workspace names according to your setup
  cloud {
    organization = "your-organization"

    workspaces {
      name = "homepage-production"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
