# Infrastructure

This directory contains Terraform configuration for deploying the website to AWS.

## Architecture

- **S3**: Static website hosting
- **CloudFront**: CDN for global content delivery
- **Origin Access Control (OAC)**: Secure access from CloudFront to S3
- **Terraform Cloud**: Remote state management and execution

## Prerequisites

- Terraform >= 1.0
- Terraform Cloud account
- AWS CLI configured with appropriate credentials
- AWS account with permissions to create S3 buckets and CloudFront distributions

## Setup

### 1. Terraform Cloud Configuration

1. Create a Terraform Cloud account at [https://app.terraform.io/](https://app.terraform.io/)
1. Create an organization
1. Create a workspace named `homepage-production` (or update `main.tf` with your workspace name)
1. Update `main.tf` with your organization name:

```hcl
cloud {
  organization = "your-organization-name"

  workspaces {
    name = "homepage-production"
  }
}
```

### 2. Terraform Cloud Authentication

Login to Terraform Cloud:

```bash
terraform login
```

Or set the `TF_TOKEN_app_terraform_io` environment variable with your Terraform Cloud API token.

### 3. AWS Credentials

Configure AWS credentials in Terraform Cloud workspace as environment variables:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Or use AWS OIDC integration for more secure authentication.

## Usage

### Initialize Terraform

```bash
terraform init
```

### Plan the deployment

```bash
terraform plan
```

### Apply the configuration

```bash
terraform apply
```

### Destroy the infrastructure

```bash
terraform destroy
```

## Customization

You can customize the deployment by creating a `terraform.tfvars` file or setting variables in Terraform Cloud workspace:

```hcl
aws_region   = "us-east-1"
project_name = "my-homepage"
environment  = "production"
```

## Outputs

After successful deployment, Terraform will output:

- S3 bucket name and ARN
- CloudFront distribution ID and domain name
- Website URL

## Deployment

### Automated Deployment (Recommended)

Deployment is automated via GitHub Actions when pushing to the `main` branch.
See `../.github/workflows/deploy.yml` for details.

### Manual Deployment

If you need to deploy manually:

```bash
# Build the frontend
cd ../frontend
pnpm build

# Get outputs from Terraform Cloud
cd ../infrastructure
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
DIST_ID=$(terraform output -raw cloudfront_distribution_id)

# Sync to S3
aws s3 sync ../frontend/dist/ "s3://$BUCKET_NAME/" --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*"
```

## GitHub Actions Integration

For CI/CD with GitHub Actions, set up the following secrets:

- `TF_API_TOKEN` - Terraform Cloud API token
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key

Or use OIDC for AWS authentication.
