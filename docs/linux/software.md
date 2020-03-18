---
title: Software
---

## Build Shadowsocks

With no time updating [Twist](https://unbinilium.github.io/Twist), I wrote this extremely simple script to setup shadowsocks-libev both server and client.

```bash
apt-get update -y
apt-get upgrade -y
apt-get dist-upgrade -y
apt-get autoremove -y
apt-get install --no-install-recommends -y gettext build-essential autoconf libtool libpcre3-dev asciidoc xmlto libev-dev libc-ares-dev automake golang golang-go fail2ban apache2 unzip git
git clone https://github.com/jedisct1/libsodium --branch master
pushd libsodium
bash autogen.sh
./configure --prefix=/usr
make
make install
ldconfig
popd
mbedtlsver="$(wget -qO- https://tls.mbed.org/download-archive | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | cut -d'.' -f1,2,3 | sort -V | tail -1)"
wget -t 3 -T 30 -nv -O mbedtls-${mbedtlsver}-gpl.tgz https://tls.mbed.org/download/mbedtls-${mbedtlsver}-gpl.tgz
tar xf mbedtls-${mbedtlsver}-gpl.tgz
pushd mbedtls-${mbedtlsver}
make SHARED=1 CFLAGS=-fPIC
make DESTDIR=/usr install
ldconfig
popd
git clone https://github.com/shadowsocks/shadowsocks-libev.git
pushd shadowsocks-libev
git submodule update --init --recursive
bash autogen.sh
./configure --disable-documentation
make
make install
ldconfig
popd
git clone https://github.com/shadowsocks/simple-obfs.git
pushd simple-obfs
git submodule update --init --recursive
./autogen.sh
./configure
make
make install
ldconfig
popd
git clone https://github.com/shadowsocks/v2ray-plugin.git
pushd v2ray-plugin
go get
go build
ldconfig
popd
rm -fr libsodium mbedtls-${mbedtlsver}-gpl.tgz mbedtls-${mbedtlsver} shadowsocks-libev simple-obfs v2ray-plugin
sleep 3
reboot
```

Server-side configuration should be like this before replaced by customized configuration. It stored in `/etc/shadowsocks-libev/config.json` by default, we can o edit it by command:

```bash
sudo nano /etc/shadowsocks-libev/config.json
```

Editing it like this:

```json
{
    "server":["0.0.0.0","[::0]"],
    "server_port":serverport,
    "password":"serverpassword",
    "method":"encryptmethod",
    "timeout":7200,
    "udp_timeout":7200,
    "fast_open":true,
    "reuse_port":true,
    "plugin":"obfs-server",
    "plugin_opts":"obfs=tls;fast-open;failover=obfshost:serverport",
    "nofile":512000,
    "nameserver":"nameserver1,nameserver2",
    "dscp":"EF",
    "mode":"tcp_and_udp",
    "mptcp":false,
    "ipv6_first":false,
    "no_delay":true,
}
```

This would be client configuration example which is always stored in `/etc/shadowsocks-libev/config.json` and you edit it using the same command:

```bash
sudo nano /etc/shadowsocks-libev/config.json
```

It necessary to replace all the information which matches to your server-side configuration.

```json
{
    "local_port":"localport",
    "server":"serverhost",
    "fast_open":true,
    "reuse_port":true,
    "nameserver":"nameserver1,nameserver2",
    "mode":"tcp_and_udp",
    "no_delay":true,
    "server_port":serverport,
    "password":"serverpassword",
    "method":"encryptmethod",
    "plugin":"obfs-local",
    "plugin_opts":"obfs=tls;fast-open;obfs-host=obfshost",
    "timeout":5
}
```

To start server, it's better to use command `systemctl`:

```bash
systemctl enable shadowsocks-libev
systemctl start shadowsocks-libev
```

And this will set shadowsocks-libev to start while starting system.

Staring shadowsocks-libev client is a little different from starting server. Firstly the configuration file should be change by editing it using command:

```bash
sudo nano /etc/systemd/system/shadowsocks-libev.service
```

Then replace the line matches `ExecStart=` with:

```bash
ExecStart=/usr/bin/ss-local -c $CONFFILE $DAEMON_ARGS
```

Last use the same command as starting server to start shadowsocks-libev client.

You can also monitor the status of your server both client by `systemctl status shadowsocks-libev` and for shadowsocks-libev client it shows like this as `ss-local`:

```bash
shadowsocks-libev.service - Shadowsocks-libev Default Server Service
   Loaded: loaded (/etc/systemd/system/shadowsocks-libev.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2019-10-29 09:20:31 CST; 4h 54min ago
     Docs: man:shadowsocks-libev(8)
 Main PID: 890 (ss-local)
    Tasks: 2 (limit: 9442)
   CGroup: /system.slice/shadowsocks-libev.service
           ├─890 /usr/bin/ss-local -c /etc/shadowsocks-libev/config.json -u
           └─933 obfs-local
```


## Build PyTorch

* Install dependencies

  ```bash
  sudo apt-get install -y libopenblas-dev libblas-dev m4 cmake cython python3-dev python3-yaml python3-setuptools libavutil-dev libavcodec-dev libavformat-dev libswscale-dev
  ```

* Build PyTorch from the source

  ```bash
  git clone --recursive https://github.com/pytorch/pytorch
  pushd pytorch
  git submodule update --remote third_party/protobuf
  python3 setup.py build
  sudo python3 setup.py install
  ```

* Build PyTorch Vision from the source

  ```bash
  git clone --recursive https://github.com/pytorch/vision
  cd vision
  python3 setup.py build
  sudo python3 setup.py install
  ```
  