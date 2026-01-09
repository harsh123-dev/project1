output "ec2_public_ip" {
  value = aws_instance.devops_ec2.public_ip
}

output "ec2_ssh_command" {
  value = "ssh ubuntu@${aws_instance.devops_ec2.public_ip}"
}

