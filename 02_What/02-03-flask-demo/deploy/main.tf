resource "aws_instance" "demo" {
  ami                    = var.aws_instance_ami
  instance_type          = var.aws_instance_type
  key_name               = var.keypair
  count                  = var.n_ec2_instances
  vpc_security_group_ids = ["sg-xxxxxx"]

  root_block_device {
    delete_on_termination = true
    volume_type           = "gp2"
    volume_size           = 8
  }

  tags = {
    Name          = "${var.stack_id}-${var.env}-ec2"
    Provisioner   = "Terraform"
    application   = "${var.stack_id}"
    businessowner = "Andy Reagan///andy@andyreagan.com"
    environment   = "${var.env == "prod" ? "prod" : "dev"}"
    role          = "Infrastructure"
    supportowner  = "Andy Reagan///andy@andyreagan.com"
  }
}
