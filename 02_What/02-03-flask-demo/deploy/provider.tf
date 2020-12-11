terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}


# Use the AWS providers
provider "aws" {
  region  = "us-east-1"
}

# Zone in which to create DNS Entries
data "aws_route53_zone" "primary" {
  name = var.route53_primary_zone
}

# Information about the networking of the account. All variables should be set
# in the corresponding environment file in .env/*
data "aws_vpc" "default_vpc" {
  id = var.vpc_id
}