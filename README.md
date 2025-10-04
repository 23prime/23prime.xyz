# Personal Homepage

A personal homepage built with React and deployed on AWS.

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
- **Terraform Cloud** - Remote state management and execution

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
- [Terraform Cloud](https://app.terraform.io/) - for remote state management
- AWS CLI configured

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

#### Terraform Cloud Configuration

1. Create a Terraform Cloud account at [https://app.terraform.io/](https://app.terraform.io/)
1. Create an organization
1. Create a workspace named `homepage-production` (or update `infrastructure/main.tf`)
1. Update `infrastructure/main.tf` with your organization name:

```hcl
cloud {
  organization = "your-organization-name"

  workspaces {
    name = "homepage-production"
  }
}
```

#### Authentication

Login to Terraform Cloud:

```bash
terraform login
```

Or set the `TF_TOKEN_app_terraform_io` environment variable.

#### AWS Credentials

Configure in Terraform Cloud workspace:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Or use AWS OIDC integration (recommended).

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

#### Customization

Create a `terraform.tfvars` file or set variables in Terraform Cloud:

```hcl
aws_region   = "us-east-1"
project_name = "my-homepage"
environment  = "production"
```

#### Outputs

After deployment, Terraform outputs:

- S3 bucket name and ARN
- CloudFront distribution ID and domain name
- Website URL

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

Configure the following secrets in your GitHub repository:

**Terraform Cloud:**

- `TF_API_TOKEN` - Terraform Cloud API token

**AWS Credentials (choose one method):**

Option 1 - Access Keys:

- `AWS_ACCESS_KEY_ID` - AWS access key ID
- `AWS_SECRET_ACCESS_KEY` - AWS secret access key
- `AWS_REGION` - AWS region (e.g., us-east-1)

Option 2 - OIDC (recommended):

- `AWS_ROLE_ARN` - AWS IAM role ARN for OIDC
- `AWS_REGION` - AWS region (e.g., us-east-1)

## Styling

Tailwind CSS is configured with custom CSS variables for theming. The theme supports both light and dark modes.

CSS variables are defined in `frontend/src/index.css` and can be customized in `tailwind.config.js`.

## License

MIT
