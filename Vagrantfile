Vagrant.configure("2") do |config|
  is_arm = RUBY_PLATFORM.include?("arm64") || RUBY_PLATFORM.include?("aarch64")

  ubuntu_box = is_arm ? "bento/ubuntu-22.04" : "ubuntu/focal64"

  config.vm.define "proxy" do |proxy|
    proxy.vm.box = ubuntu_box
    proxy.vm.box_architecture = "arm64" if is_arm
    proxy.vm.hostname = "proxy"

    proxy.vm.network "private_network", ip: "192.168.56.10"
    proxy.vm.network "private_network",
                     ip: "192.168.57.10",
                     netmask: "255.255.255.0",
                     virtualbox__intnet: "task-internal"

    proxy.vm.provider "virtualbox" do |vb|
      vb.gui = !is_arm
      vb.memory = "1024"
      vb.cpus = 1
      vb.name = "task-proxy"
    end

    proxy.vm.provision "shell", path: "scripts/provision/proxy.sh"
  end

  config.vm.define "app" do |app|
    app.vm.box = ubuntu_box
    app.vm.box_architecture = "arm64" if is_arm
    app.vm.hostname = "app"

    app.vm.network "private_network",
                   ip: "192.168.57.11",
                   netmask: "255.255.255.0",
                   virtualbox__intnet: "task-internal"

    app.vm.provider "virtualbox" do |vb|
      vb.gui = !is_arm
      vb.memory = "1024"
      vb.cpus = 1
      vb.name = "task-app"
    end

    app.vm.provision "shell", path: "scripts/provision/app.sh"
  end

  config.vm.define "db" do |db|
    db.vm.box = ubuntu_box
    db.vm.box_architecture = "arm64" if is_arm
    db.vm.hostname = "db"

    db.vm.network "private_network",
                  ip: "192.168.57.12",
                  netmask: "255.255.255.0",
                  virtualbox__intnet: "task-internal"

    db.vm.provider "virtualbox" do |vb|
      vb.gui = !is_arm
      vb.memory = "1024"
      vb.cpus = 1
      vb.name = "task-db"
    end

    db.vm.provision "shell", path: "scripts/provision/db.sh"
  end
end
