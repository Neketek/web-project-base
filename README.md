# web-project-base
Our sexy base project that is deemed to be super awesome.
## Development environment
Current setup is rather a pilot one (or as some might choose to say it's just
an alpha version). Nevertheless, to get up and running you need to do the
following:
* Install **latest** version of [Vagrant](https://www.vagrantup.com). By latest
    I mean version that is greater then `2.0.1`. Preferred way of installing it is
    from an official web site
    ([link](https://www.vagrantup.com/downloads.html)) unless you use
    [Arch](https://www.archlinux.org). Otherwise install `vagrant` from AUR
    with AUR helper of your choice (e.g. `pacaur -S vagrant`).
* Install **latest** version of [VirtualBox](https://www.virtualbox.org) from
    official website ([link](https://www.virtualbox.org/wiki/Downloads)). If
    you are Arch user you're lucky once again as you can simply run `sudo pacman -S
    virtualbox`.
* Run `vagrant up` and pray to [Linus](https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.facesofopensource.com%2Fwp-content%2Fuploads%2F2017%2F02%2F09202215%2Flinus.faces22052.web_.jpg&f=1)
    that everything will be provisioned without errors.
* Get into the box with `vagrant ssh` and enjoy.

If there are some weirdness going on during `vagrant up` please contact
[ddnomad](https://github.com/ddnomad) ~~чтобы он поахуевал вместе с вами~~ to
receive some hopefully valuable assistance.
