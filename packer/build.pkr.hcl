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
      "./scripts/createUser.sh",
      "./scripts/setupDependencies.sh",
      "./scripts/setApplicationconf.sh",
      "./scripts/systemd-file.sh"
    ]
  }

}
