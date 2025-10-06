# 23prime.xyz

My page.

## Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components
- **pnpm** - Package manager

### Infrastructure

- **AWS S3** - Static website hosting
- **AWS CloudFront** - CDN for global content delivery
- **Origin Access Control (OAC)** - Secure access from CloudFront to S3
- **Terraform** - Infrastructure as Code
- **AWS S3** - Remote state management with state locking

### Development Tools

- **[mise](https://mise.jdx.dev)** - Tool version management
- **[Taskfile](https://taskfile.dev)** - Task runner and build automation
- **pnpm** - Package manager

## Project Structure

```text
.
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── lib/           # Utility functions
│   │   ├── App.tsx        # Main app with routes
│   │   ├── main.tsx       # Application entry point
│   │   └── index.css      # Global styles
│   ├── public/
│   └── package.json
├── infrastructure/    # Terraform configuration
│   ├── main.tf
│   ├── cloudfront.tf
│   ├── variables.tf
│   └── outputs.tf
└── tasks/            # Taskfile task definitions
    ├── FrontendTasks.yml
    ├── InfrastructureTasks.yml
    ├── MiseTasks.yml
    └── ...
```

## Getting Started

### Prerequisites

- [mise](https://mise.jdx.dev) - for tool version management
- [Task](https://taskfile.dev) - for running tasks
- [aws-vault](https://github.com/99designs/aws-vault) - for AWS credential management (recommended)
- AWS CLI configured with appropriate credentials

### Setup

1. Run the setup task:

```bash
task setup
```

This will install all necessary tools defined in `mise.toml`.

## Development

### Available Tasks

Run `task` or `task list` to see all available tasks:

```bash
task list
```

Common tasks:

- `task check` - Run all checks (YAML, JSON, Markdown, GitHub Actions, Frontend, Infrastructure)
- `task setup` - Setup project and install tools
- `task md:check` - Check Markdown files
- `task md:fix` - Auto-fix Markdown issues
- `task yml:check` - Check YAML files
- `task json:check` - Check JSON files
- `task gh:check` - Check GitHub Actions workflows

Frontend tasks:

- `task front:dev` - Start development server
- `task front:build` - Build for production
- `task front:check` - Check frontend (lint + type-check)
- `task front:lint` - Run ESLint
- `task front:lint:fix` - Auto-fix ESLint issues
- `task front:add-component -- [name]` - Add shadcn/ui component

Infrastructure tasks:

- `task infra:init` - Initialize Terraform
- `task infra:check` - Check Terraform configuration (format + validate)
- `task infra:plan` - Show Terraform execution plan
- `task infra:apply` - Apply Terraform configuration

### Frontend Development

#### Quick Start

Start the development server:

```bash
task front:dev
```

Or using pnpm directly:

```bash
cd frontend
pnpm install
pnpm dev
```

The application will be available at `http://localhost:5173`.

#### Frontend Commands

Using Taskfile:

- `task front:dev` - Start development server
- `task front:build` - Build for production
- `task front:preview` - Preview production build
- `task front:check` - Run lint and type-check
- `task front:lint` - Run ESLint
- `task front:lint:fix` - Auto-fix ESLint issues
- `task front:type-check` - Run TypeScript type checking
- `task front:clean` - Clean build artifacts

Using pnpm directly:

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

#### Path Aliases

The project uses `@/` as a path alias for the `src/` directory:

```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

#### Adding UI Components

Add shadcn/ui components:

```bash
task front:add-component -- button
```

Or using pnpm:

```bash
cd frontend
pnpm dlx shadcn@latest add button
```

Examples:

```bash
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog
```

### Infrastructure Setup

#### AWS Credentials

Configure AWS credentials using aws-vault:

```bash
aws-vault add default
```

#### Infrastructure Prerequisites

##### 1. GitHub OIDC Provider

The GitHub OIDC Provider must exist in your AWS account before applying infrastructure. This provider is shared across all GitHub Actions workflows in the account and only needs to be created once.

Check if it exists:

```bash
aws-vault exec default -- aws iam list-open-id-connect-providers | grep token.actions.githubusercontent.com
```

If it doesn't exist, create it:

```bash
aws-vault exec default -- aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

##### 2. S3 Backend Setup

The Terraform state is stored in an S3 bucket. Ensure the bucket exists before running `terraform init`:

- Bucket: `tfstate-23prime-xyz-678084882233`
- Region: `ap-northeast-1`
- Encryption: Enabled

##### 3. Configure Variables

Copy the example file and configure your values:

```bash
cp infrastructure/terraform.tfvars.example infrastructure/terraform.tfvars
```

Edit `infrastructure/terraform.tfvars`:

```hcl
# AWS Configuration
aws_account_id = "123456789012"
aws_region     = "ap-northeast-1"

# Project Configuration
project_name = "your-project-name"
domain       = "example.com"

# GitHub Configuration for OIDC Authentication
github_org  = "your-github-org"
github_repo = "your-repo-name"
```

#### Deploy Infrastructure

Using Taskfile:

```bash
task infra:init
task infra:check
task infra:plan
task infra:apply
```

Using Terraform directly:

```bash
cd infrastructure
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

#### Infrastructure Commands

- `task infra:init` - Initialize Terraform
- `task infra:check` - Check configuration (format + validate)
- `task infra:fmt` - Format Terraform files
- `task infra:validate` - Validate configuration
- `task infra:plan` - Show execution plan
- `task infra:apply` - Apply configuration
- `task infra:output` - Show outputs
- `task infra:show` - Show state
- `task infra:destroy` - Destroy infrastructure
- `task infra:clean` - Clean Terraform files

#### Outputs

After deployment, get outputs for GitHub Actions configuration:

```bash
task infra:output
```

Outputs include:

- `github_actions_role_arn` - IAM role ARN for GitHub Actions
- `s3_bucket_name` - S3 bucket name
- `cloudfront_distribution_id` - CloudFront distribution ID
- `cloudfront_domain_name` - CloudFront domain
- `website_url` - Website URL

## Deployment

### Automated Deployment (Recommended)

Push to the `main` branch to trigger automatic deployment via GitHub Actions:

1. Build frontend
1. Deploy to S3
1. Invalidate CloudFront cache

See `.github/workflows/deploy.yml` for details.

### Manual Deployment

If you need to deploy manually:

```bash
# Build the frontend
task front:build

# Get infrastructure outputs
cd infrastructure
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
DIST_ID=$(terraform output -raw cloudfront_distribution_id)

# Deploy to S3
aws s3 sync ../frontend/dist/ "s3://$BUCKET_NAME/" --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*"
```

### GitHub Actions Configuration

Configure the following **variables** (not secrets) in your GitHub repository (Settings → Secrets and variables → Actions → Variables):

- `AWS_ROLE_ARN` - IAM role ARN from `task infra:output` (`github_actions_role_arn`)
- `S3_BUCKET_NAME` - S3 bucket name from `task infra:output` (`s3_bucket_name`)
- `CLOUDFRONT_DISTRIBUTION_ID` - CloudFront distribution ID from `task infra:output` (`cloudfront_distribution_id`)

The workflow uses AWS OIDC authentication, so no long-lived AWS credentials (secrets) are needed.

## Styling

Tailwind CSS is configured with custom CSS variables for theming. The theme supports both light and dark modes.

CSS variables are defined in `frontend/src/index.css` and can be customized in `tailwind.config.js`.

## License

MIT
