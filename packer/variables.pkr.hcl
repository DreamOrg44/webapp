
variable "project_id" {
  type        = string
  description = "The GCP project ID"
}

variable "zone" {
  type        = string
  description = "The GCP zone of the image"
}

variable "region" {
  type        = string
  description = "The GCP region of the image, there can be zones inside"
}

variable "vpc_name" {
  type        = string
  description = "The GCP network we've created"
}

variable "subnet_name" {
  type        = string
  description = "The GCP subnetwork created inside a network"
}