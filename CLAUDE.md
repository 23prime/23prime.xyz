# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Policy

- You may communicate with users in Japanese
- All code, comments, documentation, and deliverables must be written in English
- Technical explanations can be in Japanese, but code artifacts must be in English

## Important: Task Command Usage

**ALWAYS use `mise` tasks for formatting and checks after making changes:**

- After editing frontend code → `mise fe-check`
- After editing infrastructure code → `mise infra-check`
- After editing E2E test code → `mise e2e-check`
- After editing Markdown files → `mise md-check`
- For comprehensive checks → `mise check`

**DO NOT** run individual commands like `terraform fmt`, `pnpm lint`, etc. directly. Always use the corresponding `mise` task to ensure consistency.

## UI Verification Workflow

**When making UI-related changes to the frontend:**

1. Run `mise fe-check` to verify code quality
2. Use Chrome DevTools MCP or Playwright MCP to verify the UI works correctly:
   - Navigate to `http://localhost:5173` (ensure dev server is running)
   - Take screenshots to verify visual appearance
   - Test interactive elements (buttons, links, theme toggle, etc.)
   - Verify responsive design if applicable
3. **ALWAYS delete any screenshots created during verification**:
   - Chrome DevTools screenshots are not saved to disk (no cleanup needed)
   - Playwright MCP screenshots are saved to `frontend/.playwright-mcp/`
   - Delete the directory: `rm -rf frontend/.playwright-mcp`

This ensures both code quality and user-facing functionality are validated before committing changes.

## Architecture Overview

This is a personal homepage project with a **React SPA frontend** deployed to **AWS S3 + CloudFront** using **Terraform**. The project uses **mise** for both tool version management and task automation.

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

4. **E2E Testing**: Independent Playwright project in `e2e/`
   - Separate from frontend to remain framework-agnostic
   - Tests run against local dev server or production
   - Configurable base URL via environment variable

5. **Tool Management**: mise installs all tools (terraform, pnpm, actionlint, etc.) and runs all tasks defined in `mise.toml`

## Common Commands

### Setup

```bash
mise setup          # Install all tools and configure hooks
```

### Frontend Development

```bash
mise fe-dev              # Start dev server (http://localhost:5173)
mise fe-build            # Build for production
mise fe-deps-add pkg     # Add frontend dependencies
mise fe-deps-add-dev pkg # Add frontend dev dependencies
mise fe-check            # Run linter + type-check + build
mise fe-lint-fix         # Auto-fix ESLint issues
mise fe-add-component button  # Add shadcn/ui component
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
mise infra-init     # Initialize Terraform (requires aws-vault)
mise infra-check    # Format + validate
mise infra-plan     # Show execution plan
mise infra-apply    # Apply changes
mise infra-output   # Show outputs (bucket name, CloudFront domain, etc.)
```

### E2E Testing

```bash
mise e2e-install         # Install E2E dependencies and browsers
mise e2e-deps-add pkg    # Add E2E dependencies
mise e2e-deps-add-dev pkg # Add E2E dev dependencies
mise e2e-test            # Run E2E tests (requires dev server running)
mise e2e-test-ui         # Run tests in UI mode
mise e2e-test-debug      # Run tests in debug mode
mise e2e-test-headed     # Run tests with browser visible
mise e2e-test-prod       # Run tests against production (https://23prime.xyz)
mise e2e-report          # Show test report
```

**Important**: Before running E2E tests, start the frontend dev server in another terminal:

```bash
mise fe-dev
```

### Checks

```bash
mise check          # Run all checks (Markdown, GitHub Actions, Frontend, Infrastructure)
mise md-check       # Check Markdown files
mise gh-check       # Check GitHub Actions workflows
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
├── e2e/                   # E2E tests (independent project)
│   ├── tests/             # Test specs (*.spec.ts)
│   ├── playwright.config.ts # Playwright configuration
│   └── package.json       # Independent dependencies
├── infrastructure/        # Terraform IaC
│   ├── main.tf            # Provider, backend, S3 bucket
│   ├── cloudfront.tf      # CloudFront distribution, OAC, custom error responses
│   ├── variables.tf       # Input variables
│   └── outputs.tf         # Outputs (bucket name, CloudFront domain, etc.)
└── mise.toml              # Tool versions and task definitions
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
mise fe-build
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

- node, pnpm
- terraform
- actionlint, shellcheck, zizmor, markdownlint-cli2
- lefthook, gitleaks

Run `mise setup` to install all tools.
