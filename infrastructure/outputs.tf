output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.website.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.website.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "website_url" {
  description = "URL of the website"
  value       = "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "github_actions_role_arn" {
  description = "ARN of the IAM role for GitHub Actions"
  value       = aws_iam_role.github_actions.arn
}

output "acm_certificate_arn" {
  description = "ARN of the ACM certificate"
  value       = aws_acm_certificate.website.arn
}

output "custom_domain_url" {
  description = "URL of the website with custom domain"
  value       = "https://${local.full_domain}"
}

output "route53_zone_id" {
  description = "ID of the Route 53 hosted zone"
  value       = data.aws_route53_zone.main.zone_id
}
