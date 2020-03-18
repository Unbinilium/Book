---
title: Optimization
---

## Update Ubuntu kernel

For Ubuntu users who wandering to support newer versions of hardware or getting new features, it's recommend to update Ubuntu kernel. We could do it by command:

```bash
sudo nano updatekernel.sh && chmod u+x updatekernel.sh && bash updatekernel.sh
```

This will create a shell script named `updatekernel.sh` in current folder and you're suppose to paste the code below before it got saved. Then it automatically set executable permission and run to update your Ubuntu kernel to the newest version.

```bash
KERNELVER="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/ | awk -F'\"v' '/v[4-9]./{print $2}' | cut -d/ -f1 | grep -v -  | sort -V | tail -1)"
SYSTYPE="$(dpkg --print-architecture)"
[ "$SYSTYPE" = "amd64" ] && KERNEL="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/ | grep "linux-image" | grep "generic" | awk -F'\">' '/amd64.deb/{print $2}' | cut -d'<' -f1 | head -1)"
[ "$SYSTYPE" = "i386" ] && KERNEL="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/ | grep "linux-image" | grep "generic" | awk -F'\">' '/i386.deb/{print $2}' | cut -d'<' -f1 | head -1)"
[ "$SYSTYPE" = "armhf" ] && KERNEL="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/ | grep "linux-image" | grep "generic" | awk -F'\">' '/armhf.deb/{print $2}' | cut -d'<' -f1 | head -1)"
[ "$SYSTYPE" = "arm64" ] && KERNEL="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/ | grep "linux-image" | grep "generic" | awk -F'\">' '/arm64.deb/{print $2}' | cut -d'<' -f1 | head -1)"
[ "$SYSTYPE" = "ppc64el" ] && KERNEL="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/ | grep "linux-image" | grep "generic" | awk -F'\">' '/ppc64el.deb/{print $2}' | cut -d'<' -f1 | head -1)"
[ "$SYSTYPE" = "s390x" ] && KERNEL="$(wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/ | grep "linux-image" | grep "generic" | awk -F'\">' '/s390x.deb/{print $2}' | cut -d'<' -f1 | head -1)"
wget -t 3 -T 30 -nv -O "$KERNEL" "http://kernel.ubuntu.com/~kernel-ppa/mainline/v${KERNELVER}/${KERNEL}"
dpkg -i $KERNEL
rm -f $KERNEL
update-grub
apt-get autoremove -y
```

By default we use command to find the newest compiled kernel by Ubuntu official:

```bash
wget -qO- http://kernel.ubuntu.com/~kernel-ppa/mainline/ | awk -F'\"v' '/v[4-9]./{print $2}' | cut -d/ -f1 | grep -v - | sort -V | tail -1
```

The architecture supported by Ubuntu kernel official compiled are `amd64`, `i386`, `armhf`, `arm64`, `ppc64el` and `s390x`. For some specially use such as low-latency required image or audio processing, replace the `grep "generic"` with `grep "lowlatency"`.

Pay attention to the last line `apt-get autoremove -y` which means remove old or not used kernel, comment it with `#` at first character if you're not sure your system is bootable with the new kernel.


## Enlarge file limit

UNIX/Linux operating systems have the ability to limit the amount of various system resources available to a user process. These limitations include how many files a process can have open, how large of a file the user can create, and how much memory can be used by the different components of the process such as the stack, data and text segments.

To enlarge the max number of opened files, use command:

```bash
sudo nano /etc/security/limits.conf
```

Editing `/etc/security/limits.conf` and add something like this below.

```
*                soft    nofile           512000
*                hard    nofile          1024000
```

The `soft` is for enforcing the soft limits and the `hard` is for enforcing hard limits. For this both number type is unsigned integer.


## CMake multi-cores

Normally we build from source code by `sudo make`, but it seems always slow in a more awkward way. Let's see the `flags` by `sudo make -h`:

```
Usage: make [options] [target] ...
Options:
  -b, -m                      Ignored for compatibility.
  -B, --always-make           Unconditionally make all targets.
  -C DIRECTORY, --directory=DIRECTORY
                              Change to DIRECTORY before doing anything.
  -d                          Print lots of debugging information.
  --debug[=FLAGS]             Print various types of debugging information.
  -e, --environment-overrides
                              Environment variables override makefiles.
  --eval=STRING               Evaluate STRING as a makefile statement.
  -f FILE, --file=FILE, --makefile=FILE
                              Read FILE as a makefile.
  -h, --help                  Print this message and exit.
  -i, --ignore-errors         Ignore errors from recipes.
  -I DIRECTORY, --include-dir=DIRECTORY
                              Search DIRECTORY for included makefiles.
  -j [N], --jobs[=N]          Allow N jobs at once; infinite jobs with no arg.
  -k, --keep-going            Keep going when some targets can't be made.
  -l [N], --load-average[=N], --max-load[=N]
                              Don't start multiple jobs unless load is below N.
  -L, --check-symlink-times   Use the latest mtime between symlinks and target.
  -n, --just-print, --dry-run, --recon
                              Don't actually run any recipe; just print them.
  -o FILE, --old-file=FILE, --assume-old=FILE
                              Consider FILE to be very old and don't remake it.
  -O[TYPE], --output-sync[=TYPE]
                              Synchronize output of parallel jobs by TYPE.
  -p, --print-data-base       Print make's internal database.
  -q, --question              Run no recipe; exit status says if up to date.
  -r, --no-builtin-rules      Disable the built-in implicit rules.
  -R, --no-builtin-variables  Disable the built-in variable settings.
  -s, --silent, --quiet       Don't echo recipes.
  -S, --no-keep-going, --stop
                              Turns off -k.
  -t, --touch                 touch targets instead of remaking them.
  --trace                     Print tracing information.
  -v, --version               Print the version number of make and exit.
  -w, --print-directory       Print the current directory.
  --no-print-directory        Turn off -w, even if it was turned on implicitly.
  -W FILE, --what-if=FILE, --new-file=FILE, --assume-new=FILE
                              Consider FILE to be infinitely new.
  --warn-undefined-variables  Warn when an undefined variable is referenced.

This program built for x86_64-pc-linux-gnu
Report bugs to <bug-make@gnu.org>
```

Pay attention to `-j [N], --jobs[=N]`. Normally `sudo make -j 4` means build using 4 threads as 4 cores. In order to use this feature, we'd better find how many CPU cores do we have by command:

```bash
grep -c ^processor /proc/cpuinfo
```

Finally we got this command which makes the build process much faster:

```bash
[ -z "$(grep -c ^processor /proc/cpuinfo)" ] || make -j $(grep -c ^processor /proc/cpuinfo) || make
```
