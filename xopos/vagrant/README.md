# vagrant-configuration-validator

Sketch of a configuration file changes:
``` yaml
# -*- mode: yaml -*-
# vi: set ft=yaml sw=2 :
---
# TODO: it's an external ruby class that should process this file
# TODO: make sure it does not break Vagrant when it runs `box remove *`
default:
  # Vagrant specific settings
  # NOTE: readonly key
  vagrant:
    base_box: debian/stretch64
    vc_version: 2
    plugins: [ 'vagrant-vbguest' ]

  # Virtualbox properties
  virtualbox:
    name: vagrant_arachnid42_web-project-base_debian9
    cpus: 2
    cpu_cap: 100
    ram: 4096

  # Ansible provisioning properties
  # NOTE: readonly key
  ansible:
    compat_mode: '2.0'
    install_mode: 'pip'
    base_path: /vagrant/xopos/ansible
    playbook: vagrant.yml
    config: ansible.cfg

  # execute command for each SSH session
  ssh:
    # NOTE: readonly key
    path: /etc/profile.d/exec_on_ssh.sh
    # NOTE: append only key
    cmds:
      - cd /vagrant

  # what ports to forward to host
  # <guest_port>: <to_host_port>
  forward:
    8080: 8080  # flask
    9000: 9000  # webpack dev server

ddnomad:
  ssh:
    path: /stab  # NOTE: should be banned
    cmds:
      # shadow "- cd /vagrant" entry as append-only
      - set -o vi
      - bind -m vi-insert "\C-l":clear-screen
```
