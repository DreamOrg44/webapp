build {
  sources = ["source.googlecompute.centos"]

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/tmp/"
  }
  provisioner "file" {
    source      = "./webapp.service"
    destination = "/tmp/"
  }
  provisioner "shell" {
    scripts = [
      "./packer/scripts/create-user.sh",
      "./packer/scripts/setup-dependencies.sh",
      "./packer/scripts/set-application-conf.sh",
      "./packer/scripts/systemd-file.sh"
    ]
  }

}
