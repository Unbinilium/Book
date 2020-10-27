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
  
## Build OpenCV

**OpenCV** (*Open Source Computer Vision Library*) is a [library of programming functions](https://en.wikipedia.org/wiki/Library_(computing)) mainly aimed at real-time [computer vision](https://en.wikipedia.org/wiki/Computer_vision).

Here I introduced some ways to compile OpenCV with Contrib for different devices like **Jetson TX2**, **Raspberry Pi 4B** and **x86_64 PC**.

### Install dependencies

- Update source and upgrade packages, clean and remove unused packages

  ```shell
  sudo apt update
  sudo apt upgrade -y
  sudo apt clean
  sudo apt autoremove -y
  ```

- Install `python3` , `pip3` and necessary wheels for Python support

  ```shell
  sudo apt install python3-dev python3-pip -y
  sudo pip3 install cython setuptools numpy
  ```

- Install third-party software libraries that require to build

  ```shell
  sudo apt install gcc-arm* build-essential cmake git unzip pkg-config -y
  sudo apt install protobuf-compiler libgflags-dev libgoogle-glog-dev -y
  sudo apt install libjpeg-dev libpng-dev libtiff-dev -y
  sudo apt install libavcodec-dev libavformat-dev libavutil-dev libxvidcore-dev libswscale-dev libx264-dev -y
  sudo apt install liblapack-dev libxine2-dev gfortran -y
  sudo apt install libpostproc-dev libswscale-dev -y
  sudo apt install libmpikmeans-dev libmpikmeans1 mpi-default-dev -y
  sudo apt install libgtk-3-dev -y
  ```

  For a special package called `libjasper-dev`, which only available before *Ubuntu Xenial*, we add Xenial sources(Here for Ubuntu restricted systems, we could use *Tsinghua mirrors*)

  ```shell
  sudo echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ xenial main multiverse restricted universe" >> /etc/apt/sources.list
  sudo apt update
  sudo apt install libjasper-dev -y
  ```

:::tip

Reboot recommended.

:::

### Custom configuration

For different hardwares, it's better to compile acceleration enabled OpenCV.

#### GPU with CUDA

Like Jetson TX2, which hardware has standalone GPU support, that we could enable GPU acceleration by add its CUDA libs while compiling.

- Install CUDA from `dpkg`

  ```shell
  sudo dpkg -i <CUDA deb path>
  sudo dpkg -i <CuDnn deb path>
  sudo dpkg -i <NightSystems deb path>
  ```

- Confirm installation using apt

  ```shell
  apt search cuda
  sudo apt install <CUDA name>
  
  apt search cudnn
  sudo apt install <CuDnn name>
  
  apt search NightSystems
  sudo apt install <NightSystems>
  ```

:::tip

Reboot recommended.

:::

#### Low-memory devices

For the devices which has small RAM size like Raspberry Pi 4B (2G), it's recommended that to use large swap.

- Create 2G or larger blank file to disk

  ```shell
  sudo fallocate -l 2G /swapfile
  ```

- Protect memory, only the root user should be able to write and read the swap file

  ```shell
  sudo chmod 600 /swapfile
  ```

- Use the `mkswap` utility to set up the file as Linux swap area

  ```shell
  sudo mkswap /swapfile
  ```

- Enable the swap and verify

  ```shell
  sudo swapon /swapfile
  sudo swapon --show
  ```

  To make the change permanent open the `/etc/fstab` file and append the following line by this command

  ```shell
  sudo echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
  ```

Furthermore, you could custom the swappiness value. Swappiness is a Linux kernel property that defines how often the system will use the swap space. Swappiness can have a value between 0 and 100. A low value will make the kernel to try to avoid swapping whenever possible, while a higher value will make the kernel to use the swap space more aggressively.

- Set your *swappiness*, the default is *60*

  ```shell
  sudo sysctl vm.swappiness=60
  ```

To remove swap file, deactivate the swap and delete swapfile

```shell
sudo swapoff -v /swapfile
sudo sed -i ‘/swapfile/d’ /etc/fstab
sudo rm /swapfile
```

#### Gstreamer

GStreamer is a library for constructing graphs of media-handling components. The applications it supports range from simple Ogg/Vorbis playback, audio/video streaming to complex audio (mixing) and video (non-linear editing) processing.

```shell
sudo apt install libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev -y
```

#### Threading building blocks

Threading Building Blocks (Intel^®^ TBB) makes parallel performance and scalability accessible to software developers who are writing loop- and task-based applications. Build robust applications that abstract platform details and threading mechanisms while achieving performance that scales with increasing core count.

```shell
sudo apt install libtbb2 libtbb-dev -y
```

#### Handing medias

The *v4l-utils* are a series of packages for handling media devices, *libdc1394* is a library that provides a complete high level application programming interface (API) for developers who wish to control IEEE 1394 based cameras that conform to the 1394-based Digital Camera Specifications (also known as the IIDC or DCAM Specifications).

```shell
sudo apt install v4l-utils libv4l-dev libdc1394-22-dev -y
```

#### BLAS

BLAS (Basic Linear Algebra Subroutines) is a set of efficient routines for most of the basic vector and matrix operations. They are widely used as the basis for other high quality linear algebra software, for example lapack and linpack. 

```shell
sudo apt install libopenblas-dev libatlas-base-dev libblas-dev -y
```

#### QT5

Qt is a cross-platform C++ application framework. Qt's primary feature is its rich set of widgets that provide standard GUI functionality.

```shell
sudo apt install libgtk-3-dev qt5-default -y
```

#### HDF5

**Hierarchical Data Format** (**HDF**) is a set of file formats (**HDF4**, **HDF5**) designed to store and organize large amounts of data.

```shell
sudo apt install libhdf5-serial-dev hdf5-tools libhdf5-dev -y
```

#### Tesseract

Tesseract is an open source Optical Character Recognition (OCR) Engine. It can be used directly, or (for programmers) using an API to extract printed text from images. It supports a wide variety of languages. 

```shell
sudo apt install libtesseract-dev tesseract-ocr -y
```

#### Eigen

Eigen is a versatile, fast, reliable and elegant C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms.

```shell
sudo apt install libeigen3-dev -y
```

### Download sources

:::tip

[OpenCV Release - GitHub](https://github.com/opencv/opencv/releases)



[OpenCV Contrib Release - GitHub](https://github.com/opencv/opencv_contrib/releases)

:::

- Source code can be founded on GitHub, then we download it.

  ```shell
  pushd /tmp
  
  wget -O opencv.zip https://github.com/opencv/opencv/archive/4.5.0.zip
  wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.5.0.zip
  ```

- Unzip source and enter OpenCV source, create build folder.

  ```shell
  unzip opencv.zip opencv_contrib.zip
  pushd opencv-*.*.*
  mkdir build
  pushd build
  ```

###  Optimized compiling

CMake is a cross-platform build system generator. Projects specify their build process with platform-independent CMake listfiles included in each directory of a source tree with the name CMakeLists.txt. Users build a project by using CMake to generate a build system for a native tool on their platform.

Here I compile OpenCV with OpenCV Contrib by default:

```shell
cmake -D CMAKE_BUILD_TYPE=RELEASE \
      -D OPENCV_EXTRA_MODULES_PATH=../../opencv_contrib-*.*.*/modules \
      -D WITH_OPENMP=ON \
      -D WITH_TBB=ON \
      -D BUILD_TBB=ON \
      -D BUILD_TIFF=ON \
      -D WITH_GSTREAMER=ON \
      -D WITH_V4L=ON \
      -D WITH_LIBV4L=ON \
      -D OPENCV_ENABLE_NONFREE=ON \
      -D INSTALL_C_EXAMPLES=OFF \
      -D INSTALL_PYTHON_EXAMPLES=OFF \
      -D BUILD_NEW_PYTHON_SUPPORT=ON \
      -D BUILD_opencv_python3=TRUE \
      -D WITH_QT=ON \
      -D BUILD_EXAMPLES=OFF \
      ..
```

#### Arch

While the devices has both AArch (ARMv8) CPU and software environment (64bit kernel and 64bit compiler), such as Jetson TX2, Raspberry Pi 4B with 64bit OS, there would be something different for CMake flags.

- AArch32

  ```shell
  -D ENABLE_NEON=ON \
  -D ENABLE_VFPV3=ON \
  ```

- AArch64

  ```shell
  -D ENABLE_NEON=ON \
  ```

#### GPU

We have noticed that in most scenarios OpenCV utilizes CPU, which doesn’t always guarantee our the desired performance.

- CUDA

  ```shell
  -D WITH_CUDA=ON \
  -D WITH_CUBLAS=ON \
  -D CUDA_FAST_MATH=ON \
  -D ENABLE_FAST_MATH=ON \
  -D WITH_OPENGL=ON \
  ```

#### Java API

Build OpenCV Java API requires Java runtime, make sure *jdk* is installed first, and then **reconfigure** CMake flags.

```shell
sudo apt install openjdk-11-jdk ant -y
```

*Note: Compile OpenCV with Contrib may require unblocked Internet connection.*

###  Compile and Test

:::tip

[CMake multi-cores](https://book.unbinilium.me/linux/optmization/#cmake-multi-cores)

:::

Finally we got this command which makes the build process much faster.

```shell
make -j "$(grep -c ^processor /proc/cpuinfo)"
```

If there’s no errors displayed, it means you compiled OpenCV successfully. Then, we install and linking.

```shell
sudo make install
sudo ldconfig
```

For Jetson TX2, Here's an example to test onboard camera and if Gstreamer works.

```cpp
#include <opencv2/core.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/highgui.hpp>
using namespace cv;

#include <iostream>
using namespace std;

int main()
{
    Mat frame;
    VideoCapture cap;
    
    cap.open("nvarguscamerasrc ! video/x-raw(memory:NVMM), width=(int)720, height=(int)480, format=(string)NV12, framerate=(fraction)30/1 ! nvvidconv ! video/x-raw, format=BGRx ! videoconvert ! video/x-raw, format=BGR ! appsink");
    if (!cap.isOpened()) return -1;
    
    for (;;)
    {
        cap.read(frame);
        
        if (frame.empty()) continue;
        
        imshow("frame", frame);
        
        if (waitKey(1) >= 0) break;
    }
    
    return 0;
}
```
