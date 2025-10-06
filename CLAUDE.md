# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Policy

- You may communicate with users in Japanese
- All code, comments, documentation, and deliverables must be written in English
- Technical explanations can be in Japanese, but code artifacts must be in English

## Important: Task Command Usage

**ALWAYS use `task` commands for formatting and checks after making changes:**

- After editing frontend code → `task front:check`
- After editing infrastructure code → `task infra:check`
- After editing YAML files → `task yml:check`
- After editing JSON files → `task json:check`
- After editing Markdown files → `task md:check`
- For comprehensive checks → `task check`

**DO NOT** run individual commands like `terraform fmt`, `pnpm lint`, etc. directly. Always use the corresponding `task` command to ensure consistency.

## Architecture Overview

This is a personal homepage project with a **React SPA frontend** deployed to **AWS S3 + CloudFront** using **Terraform**. The project uses **Taskfile** for task automation and **mise** for tool version management.

### Key Architectural Decisions

1. **Frontend**: React 19 + TypeScript + Vite + React Router for CSR (Client-Side Rendering)
   - Path alias: `@/` maps to `src/`
   - UI components from shadcn/ui (installed on-demand)
   - Tailwind CSS for styling

2. **Infrastructure**: AWS S3 (static hosting) + CloudFront (CDN)
   - Origin Access Control (OAC) for secure S3 access
   - Custom error responses (404/403 → 200) redirect to `/index.html` for SPA routing
   - Terraform state stored in S3 with encryption

3. **Deployment**: GitHub Actions on push to `main`
   - Builds frontend → Syncs to S3 → Invalidates CloudFront cache
   - Uses AWS OIDC for authentication (no long-lived credentials)

4. **Tool Management**: mise installs all tools (terraform, pnpm, actionlint, etc.) defined in `mise.toml`

## Common Commands

### Setup

```bash
task setup          # Install all tools via mise
```

### Frontend Development

```bash
task front:dev      # Start dev server (http://localhost:5173)
task front:build    # Build for production
task front:check    # Run linter + type-check
task front:lint:fix # Auto-fix ESLint issues
task front:add-component -- button  # Add shadcn/ui component
```

Or use pnpm directly in `frontend/`:

```bash
cd frontend
pnpm dev
pnpm build
pnpm lint
```

### Infrastructure

**Important**: All Terraform commands use `aws-vault exec default` for credential management. The S3 backend bucket must exist before running `terraform init`.

```bash
task infra:init     # Initialize Terraform (requires aws-vault)
task infra:check    # Format + validate
task infra:plan     # Show execution plan
task infra:apply    # Apply changes
task infra:output   # Show outputs (bucket name, CloudFront domain, etc.)
```

### Checks

```bash
task check          # Run all checks (YAML, JSON, Markdown, GitHub Actions, Frontend, Infrastructure)
task yml:check      # Check YAML files
task json:check     # Check JSON files
task md:check       # Check Markdown files
task gh:check       # Check GitHub Actions workflows
```

## Project Structure

```txt
.
├── frontend/              # React SPA
│   ├── src/
│   │   ├── components/ui/ # shadcn/ui components (installed on-demand)
│   │   ├── lib/           # Utilities (e.g., cn() for class merging)
│   │   ├── App.tsx        # React Router routes
│   │   └── main.tsx       # Entry point
│   └── vite.config.ts     # Path alias: @ → src/
├── infrastructure/        # Terraform IaC
│   ├── main.tf            # Provider, backend, S3 bucket
│   ├── cloudfront.tf      # CloudFront distribution, OAC, custom error responses
│   ├── variables.tf       # Input variables
│   └── outputs.tf         # Outputs (bucket name, CloudFront domain, etc.)
└── tasks/                 # Taskfile task definitions (Frontend, Infrastructure, etc.)
```

## Infrastructure Details

### Prerequisites

**GitHub OIDC Provider must exist in the AWS account before applying infrastructure:**

```bash
# Check if OIDC Provider exists
aws-vault exec default -- aws iam list-open-id-connect-providers | grep token.actions.githubusercontent.com

# If it doesn't exist, create it manually (only once per AWS account):
aws-vault exec default -- aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

The OIDC Provider is **shared across all GitHub Actions workflows** in the AWS account and is not project-specific.

### Terraform Backend

- **S3 Bucket**: `tfstate-23prime-xyz-678084882233`
- **Region**: `ap-northeast-1`
- **Encryption**: Enabled
- **State Locking**: Enabled with `use_lockfile = true`

### Required Variables

Create `infrastructure/terraform.tfvars`:

```hcl
aws_account_id = "678084882233"
aws_region     = "ap-northeast-1"
project_name   = "23prime-xyz"
domain         = "23prime.xyz"
github_org     = "23prime"
github_repo    = "23prime.xyz"
```

### CloudFront SPA Routing

The infrastructure uses `custom_error_response` blocks to redirect 404/403 errors to `/index.html` with a 200 status code. This enables React Router's client-side routing when users access URLs directly (e.g., `/about`).

## Deployment

### Automated (Recommended)

Push to `main` branch triggers GitHub Actions:

1. Build frontend
2. Sync to S3
3. Invalidate CloudFront cache

### Manual

```bash
task front:build
cd infrastructure
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
DIST_ID=$(terraform output -raw cloudfront_distribution_id)
aws s3 sync ../frontend/dist/ "s3://$BUCKET_NAME/" --delete
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*"
```

## GitHub Actions Configuration

Configure these **variables** (not secrets) in your GitHub repository (Settings → Secrets and variables → Actions → Variables):

- `AWS_ROLE_ARN`: IAM role ARN for OIDC authentication (from `terraform output github_actions_role_arn`)
- `S3_BUCKET_NAME`: S3 bucket name (from `terraform output s3_bucket_name`)
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID (from `terraform output cloudfront_distribution_id`)

The workflow uses AWS OIDC authentication, so no long-lived AWS credentials (secrets) are needed.

## Tool Versions

All tools are managed by mise (defined in `mise.toml`):

- pnpm (latest)
- terraform (latest)
- biome (latest)
- actionlint, shellcheck, yamllint, markdownlint-cli

Run `task setup` to install all tools.
