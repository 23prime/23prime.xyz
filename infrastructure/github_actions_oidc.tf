# GitHub OIDC Provider
# This references the existing GitHub OIDC provider in the AWS account
# The provider is shared across all GitHub Actions workflows in this account
data "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"
}

# IAM Role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name               = "${var.project_name}-github-actions-role"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json

  tags = {
    Name    = "${var.project_name}-github-actions-role"
    Project = var.project_name
  }
}

# Trust policy for GitHub Actions
data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = [data.aws_iam_openid_connect_provider.github_actions.arn]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_org}/${var.github_repo}:*"]
    }
  }
}

# IAM Policy for GitHub Actions deployment
data "aws_iam_policy_document" "github_actions_deploy" {
  # S3 permissions for deploying frontend
  statement {
    sid    = "S3BucketAccess"
    effect = "Allow"
    actions = [
      "s3:ListBucket",
    ]
    resources = [aws_s3_bucket.website.arn]
  }

  statement {
    sid    = "S3ObjectAccess"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl",
      "s3:GetObject",
      "s3:DeleteObject",
    ]
    resources = ["${aws_s3_bucket.website.arn}/*"]
  }

  # CloudFront permissions for cache invalidation
  statement {
    sid    = "CloudFrontInvalidation"
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
    ]
    resources = [aws_cloudfront_distribution.website.arn]
  }
}

resource "aws_iam_policy" "github_actions_deploy" {
  name        = "${var.project_name}-github-actions-deploy"
  description = "Policy for GitHub Actions to deploy to S3 and invalidate CloudFront cache"
  policy      = data.aws_iam_policy_document.github_actions_deploy.json

  tags = {
    Name    = "${var.project_name}-github-actions-deploy"
    Project = var.project_name
  }
}

# Attach policy to role
resource "aws_iam_role_policy_attachment" "github_actions_deploy" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.github_actions_deploy.arn
}
