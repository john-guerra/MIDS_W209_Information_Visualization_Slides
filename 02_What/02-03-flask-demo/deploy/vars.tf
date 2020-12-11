variable "n_ec2_instances" {
  type    = string
  default = "1"
}

variable "keypair" {
  type = string
}

variable "stack_id" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "aws_instance_ami" {}

variable "route53_primary_zone" {
  type = string
}

variable "aws_instance_type" {
  type = string
}

variable "env" {
  type = string
}
