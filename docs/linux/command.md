---
title: Command
---

## Use proxy in commandline

Usually we got a system based proxy but it not works in command line tools like the terminal. We could easily add such proxy by replacing the proxy information below and run them in terminal.

```bash
export http_proxy=protocol://username:password@proxyhost:port/
export ftp_proxy=protocol://username:password@proxyhost:port/
export telnet_proxy=protocol://username:password@proxyhost:port/
```

The `protocol` should be `http`, `https` or `socks5` depends on what type of proxy you are using. Further more, we could add this to `~/.*shrc` to initialize proxy when terminal start by `sudo nano ~/.*shrc`.

### Proxy with `apt`

Let `apt` work with socks5 proxy, add arguments like this

```bash
-o Acquire::http::proxy="protocolh://proxyhost:proxyport/"
```

For example:

```bash
sudo apt-get -o Acquire::http::proxy="socks5h://127.0.0.1:1080/" update
```

### Proxy with `pip`

Another big problem is using a proxy like `socks5` in `pip`, `git` or even `brew`, let's have a try. For example, when setting up a socks5 proxy in pip, `pysocks` is required as a dependency and we add it by:

```bash
pip install pysocks
```

Then we cloud use pip with a socks5 proxy with command formarted like this:

```
pip install <yourpacakge> --proxy socks5:proxyhost:port
```

### Proxy with `git`

Similarly we replace `protocol` with the proxy type you have to configure git. After that we use git directly, all the data will throught the proxy.

```bash
git config --global http.proxy protocol://username:password@proxyhost:port
```

You can also try the command below to show all `http` proxy sections that set globally. If you set as local config then you should drop the _argv_ `--global` to see the current proxy config in local path.

```bash
git config --global --get-regexp http.*
```

### Proxy with `brew`

If you're a macOS user with homebrew, you can try

```bash
ALL_PROXY=protocol://username:password@proxyhost:port brew install <yourpackage>
```

### Disable commandline proxy

Finally you cloud easily disable these proxies. For `shell` in terminal you should remove the proxy settings in `~/.*shrc` first and restart your terminal, or use `unset <name_proxy>`. For git you're supposed to clean the configuration by cammand:

```bash
git config --global --unset http.proxy
```

### Handy proxy with alias

We simply add this as alias like this\(required to replace with your proxy information\):

```bash
alias proxy_enable="http_proxy=socks5://127.0.0.1:1080"
alias proxy_disable="unset http_proxy"
alias system_update="sudo apt-get -o Acquire::http::proxy="socks5h://127.0.0.1:1080/" update"
alias system_upgrade="sudo apt-get -o Acquire::http::proxy="socks5h://127.0.0.1:1080/" dist-upgrade"
```

Then just open _new BASH_ window and type `system_update`, it actually executes:

```bash
sudo apt-get -o Acquire::http::proxy="socks5h://127.0.0.1:1080/" update
```

And pass all `apt` traffic through socks5 proxy `127.0.0.1:1080`.
