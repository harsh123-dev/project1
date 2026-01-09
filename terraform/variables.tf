variable "aws_region" {
  default = "ap-south-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "EC2 SSH key name"
}

variable "allowed_ssh_cidr" {
  default = "0.0.0.0/0"
}

