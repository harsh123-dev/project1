resource "aws_instance" "devops_ec2" {
  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = var.instance_type
  key_name      = aws_key_pair.devops_key.key_name
  security_groups = [aws_security_group.devops_sg.name]

  tags = {
    Name = "devops-project-ec2"
  }
}

