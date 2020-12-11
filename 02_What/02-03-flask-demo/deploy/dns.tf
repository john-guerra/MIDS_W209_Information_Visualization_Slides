resource "aws_route53_record" "demo_ns" {
  zone_id = data.aws_route53_zone.primary.zone_id
  name    = "demo.${var.route53_primary_zone}"
  type    = "A"
  ttl     = "300"
  records = aws_instance.demo.*.public_ip
}
