# Data source for existing hosted zone
data "aws_route53_zone" "main" {
  name         = "${var.root_domain}."
  private_zone = false
}

# A record (IPv4) for CloudFront distribution
resource "aws_route53_record" "website_a" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.full_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# AAAA record (IPv6) for CloudFront distribution
resource "aws_route53_record" "website_aaaa" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.full_domain
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
