---
title: Networking
---

## Enable TFO and BBR

It is required to edit `/etc/sysctl.conf` by:

```bash
sudo nano /etc/sysctl.conf
```

And add the configuration below to the end of the file.

```
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr
net.ipv4.tcp_fastopen = 3
```

This means to config Google BBR and TCP fastopen support on your operation system. Want another choice or check if the Google BBR supported by default, type command

```bash
sysctl net.ipv4.tcp_available_congestion_control
```

to show all supported congestion control modules.

Use `sudo sysctl -p` to apply the changes to your operating system. Check if BBR module is installed in kernel use `lsmod | grep bbr` and find if string `bbr` is in outputs.
