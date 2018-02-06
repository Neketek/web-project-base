# -*- mode: ruby -*-
# vi: set ft=ruby sw=2 :
#
# Title:       Vagrantfile
# Description: Bootstrap development environment with Vagrant, Virtualbox and
#              Ansible. All configuration is done through ./vagrant.yml file.
#              DO NOT EDIT Vagrantfile unless you really-really need to do so.
#              Instead edit ./vagrant.yml and all the changes will be fetched
#              by Vagrant on a next provision or up.
# Developer:   ddnomad
# Version:     1.0.1

require 'yaml'

# Load configuration file and sub-sections
VCONF = YAML.load_file('./vagrant.yml').freeze
VB_PROPS = VCONF['virtualbox'].freeze
ANS_PROPS = VCONF['ansible'].freeze
EXE_ON_SSH_PROPS = VCONF['ssh'].freeze

# Generic properties
BASE_BOX = VCONF['base_box'].freeze
VC_VERSION = VCONF['vc_version'].freeze

# Virtualbox properties
VB_NAME = VB_PROPS['name'].freeze
VB_CPUS = VB_PROPS['cpus'].freeze
VB_CAP = VB_PROPS['cpu_cap'].freeze
VB_RAM = VB_PROPS['ram'].freeze

# Ansible properties
ANS_BP = ANS_PROPS['base_path'].freeze
ANS_PB = ANS_PROPS['playbook'].freeze
ANS_CFG = ANS_PROPS['config'].freeze

# On SSH execution parameters
EXEC_PATH = EXE_ON_SSH_PROPS['path'].freeze
EXEC_CMDS = EXE_ON_SSH_PROPS['cmds'].freeze

# On call commands to execute
ON_CALL_CMDS = VCONF['exec'].freeze

# Ports to forward
FORW_PORTS = VCONF['forward'].freeze

# Actual Vagrant configuration block
Vagrant.configure(VC_VERSION) do |config|
  # Specifying base box
  config.vm.box = BASE_BOX

  # Configuring Virtualbox provider
  config.vm.provider :virtualbox do |vb|
    vb.name = VB_NAME
    vb.cpus = VB_CPUS
    vb.memory = VB_RAM
    vb.customize ['modifyvm', :id, '--cpuexecutioncap', VB_CAP]
  end

  # Provision the guest with Ansible
  config.vm.provision 'ansible_local' do |ansible|
    ansible.provisioning_path = ANS_BP
    ansible.playbook = ANS_PB
    ansible.config_file = ANS_CFG
  end

  # Taking care of session environment modification
  exec_cmds = "echo -n > #{EXEC_PATH}\n"
  EXEC_CMDS.each do |cmd|
    exec_cmds << "echo '#{cmd}' >> #{EXEC_PATH}\n"
  end
  config.vm.provision 'ssh_env_setup', type: 'shell', inline: exec_cmds

  # Forwarding ports
  FORW_PORTS.each do |guest_port, host_port|
    config.vm.network 'forwarded_port', guest: guest_port, host: host_port
  end

  # On call commands execution
  ON_CALL_CMDS.each do |cmd|
    `#{cmd}`
  end
end
