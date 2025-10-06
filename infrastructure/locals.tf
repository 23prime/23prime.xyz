# Local variables
locals {
  # Full domain name: subdomain.root_domain or just root_domain
  full_domain = var.subdomain != "" ? "${var.subdomain}.${var.root_domain}" : var.root_domain
}
