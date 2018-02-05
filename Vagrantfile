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
# Version:     0.1.1

require 'yaml'

CONFIG_FILE_PATH = './vagrant.yml'.freeze
CONFIG_SCHEMA = [
  'base_box': [ String, 1, nil ],
  'vc_version': [ Integer, 1, nil ],
  'ansible': [ Hash, 0, {
].freeze

def load_yaml(path)
  unless File.exist?(path)
    puts "[-] Vagrant wrapper error: yaml file do not exist: #{path}"
    exit 1
  end
  return YAML.load_file(path)
end

# load configuration file and sub-sections
VCONF = load_yaml(CONFIG_FILE_PATH).freeze
VB_PROPS = VCONF['vb_props'].freeze
ANS_PROPS = VCONF['ansible_props'].freeze
EXE_ON_SSH_PROPS = VCONF['exec_on_ssh'].freeze

# generic properties
BASE_BOX = VCONF['base_box'].freeze
VC_VERSION = VCONF['vc_version'].freeze

# virtualbox properties
VB_NAME = VB_PROPS['name'].freeze
VB_CPUS = VB_PROPS['cpus'].freeze
VB_CAP = VB_PROPS['cpu_cap'].freeze
VB_RAM = VB_PROPS['ram'].freeze

# ansible properties
ANS_PB = ANS_PROPS['playbook'].freeze
ANS_CFG = ANS_PROPS['_config'].freeze
ANS_ARGS = ANS_PROPS['args'].freeze

# on-ssh execution parameters
EXEC_PATH = EXE_ON_SSH_PROPS['path'].freeze
EXEC_CMDS = EXE_ON_SSH_PROPS['cmds'].freeze

# on-call commands to execute
ON_CALL_CMDS = VCONF['exec_on_call'].freeze

# ports to forward
FORW_PORTS = VCONF['forward_ports'].freeze

# actual Vagrant configuration block
Vagrant.configure(VC_VERSION) do |config|
  # specifying base box
  config.vm.box = BASE_BOX

  # configuring Virtualbox provider
  config.vm.provider :virtualbox do |vb|
    vb.name = VB_NAME
    vb.cpus = VB_CPUS
    vb.memory = VB_RAM
    vb.customize ['modifyvm', :id, '--cpuexecutioncap', VB_CAP]
  end

  # fix "stdin: is not a tty" error
  config.vm.provision 'fix_no_tty', type: 'shell' do |s|
    s.privileged = false
    s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' " \
               '/root/.profile'
  end

  # provision the guest with Ansible
  config.vm.provision 'ansible' do |ansible|
    ansible.playbook = ANS_PB
    ansible.config_file = ANS_CFG
    ansible.raw_arguments = ANS_ARGS
  end

  # taking care of session environment modification
  exec_cmds = "echo -n > #{EXEC_PATH}\n"
  EXEC_CMDS.each do |cmd|
    exec_cmds << "echo '#{cmd}' >> #{EXEC_PATH}\n"
  end
  config.vm.provision 'ssh_env_setup', type: 'shell', inline: exec_cmds

  # forwarding ports
  FORW_PORTS.each do |guest_port, host_port|
    config.vm.network 'forwarded_port', guest: guest_port, host: host_port
  end

  # on-call commands execution
  ON_CALL_CMDS.each do |cmd|
    `#{cmd}`
  end
end
