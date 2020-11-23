---
title: Command
---

## man

The man command displays the “man pages” for a command in less. The man pages are the user manual for that command. Because man uses less to display the man pages, you can use the search capabilities of less.

## w

The `w` command lists the currently logged in users.

## tar

With the tar command, you can create an archive file (also called a tarball) that can contain many other files. This makes it much more convenient to distribute a collection of files. You can also use tar to extract the files from an archive file. It is common to ask tar to compress the archive. If you do not ask for compression, the archive file is created uncompressed.

To create an archive file, you need to tell tar which files to include in the archive file, and the name you wish the archive file to have.

In this example, the user is going to archive all of the files in the Ukulele directory, which is in the current directory.

```bash
ls -al
```

They have used the `-c` (create) option and the `-v` (verbose) option. The verbose option gives some visual feedback by listing the files to the terminal window as they are added to the archive. The `-f` (filename) option is followed by the desired name of the archive. In this case, it is `file.tar`.

```bash
tar -cvf file.tar file/
```

The files are listed to the terminal window as they are added to the archive file.

There are two ways to tell tar that you want the archive file to be compressed. The first is with the `-z` (gzip) option. This tells tar to use the gzip utility to compress the archive once it has been created.

It is usual to add “.gz” as suffix to this type of archive. That allows anyone who is extracting files from it to know which commands to pass to tar to correctly retrieve the files.

```bash
tar -cvzf file.tar.gz file/
```

The files are listed to the terminal window as they are added to the archive file as before, but the creation of the archive will take a little longer because of the time required for the compression.

To create an archive file that is compressed using a superior compression algorithm giving a smaller archive file use the `-j` (bzip2) option.

```bash
tar -cvjf file.tar.bz2 file/
```

Once again, the files are listed as the archive is created. The `-j` option is noticeably slower than the `-z` option.

If you are archiving a great many files, you must choose between the `-z` option for decent compression and reasonable speed, or the `-j` option for better compression and slower speed.

As can be seen in the screenshot below, the “.tar” file is the largest, the “.tar.gz” is smaller, and the “.tar.bz2” is the smallest of the archives.

To extract files from an archive file use the `-x` (extract) option. The `-v` (verbose) and `-f` (filename) options behave as they do when creating archives. Use ls to confirm which type of archive you are going to extract the files from, then issue the following command.

```bash
tar -xvf file.tar
```

The files are listed as they are extracted. Note that the Ukulele directory is also recreated for you.

To extract files from a “.tar.gz” archive, use the `-z` (gzip) option.

```bash
tar -xvzf file.tar.gz
```

Finally, to extract files from a “.tar.bz2” archive use the `-j` option instead of the `-z` (gzip) option.

```bash
tar -xvjf file.tar.bz2
```

## gzip

The gzip command compresses files. By default, it removes the original file and leaves you with the compressed version. To retain both the original and the compressed version, use the `-k` (keep) option.

## diff

The diff command compares two text files and shows the differences between them. There are many options to tailor the display to your requirements.

The `-y` (side by side) option shows the line differences side by side. The `-w` (width) option lets you specify the maximum line width to use to avoid wraparound lines. The `--suppress-common-lines` prevents diff from listing the matching lines, letting you focus on the lines which have differences.

## chmod

The chmod command sets the file permissions flags on a file or folder. The flags define who can read, write to or execute the file. When you list files with the `-l` (long format) option you’ll see a string of characters that look like

```
-rwxrwxrwx
```

If the first character is a - the item is a file, if it is a d the item is a directory. The rest of the string is three sets of three characters. From the left, the first three represent the file permissions of the owner, the middle three represent the file permissions of the group and the rightmost three characters represent the permissions for others. In each set, an *r* stands for read, a *w* stands for write, and an *x* stands for execute.

If the *r*, *w*, or *x* character is present that file permission is granted. If the letter is not present and a - appears instead, that file permission is not granted.

One way to use chmod is to provide the permissions you wish to give to the *owner*, *group*, and *others* as a 3 digit number.  The leftmost digit represents the owner. The middle digit represents the group. The rightmost digit represents the others. The digits you can use and what they represent are listed here:

- `0` - No permission
- `1` - Execute permission
- `2` - Write permission
- `3` - Write and execute permissions
- `4` - Read permission
- `5` - Read and execute permissions
- `6` - Read and write permissions
- `7` - Read, write and execute permissions

## top

The `top` command shows you a real-time display of the data relating to your Linux machine. The top of the screen is a status summary.

The first line shows you the time and how long your computer has been running for, how many users are logged into it, and what the load average has been over the past one, five, and fifteen minutes.

The second line shows the number of tasks and their states: running, stopped, sleeping and zombie.

The third line shows CPU information. Here’s what the fields mean:

- `us` - value is the CPU time the CPU spends executing processes for users, in “user space”
- `sy` - value is the CPU time spent on running system “kernel space” processes
- `ni` - value is the CPU time spent on executing processes with a manually set nice value
- `id` - is the amount of CPU idle time
- `wa` - value is the time the CPU spends waiting for I/O to complete
- `hi` - The CPU time spent servicing hardware interrupts
- `si` - The CPU time spent servicing software interrupts
- `st` - The CPU time lost due to running virtual machines (“steal time”)

The fourth line shows the total amount of physical memory, and how much is free, used and buffered or cached.

The fifth line shows the total amount of swap memory, and how much is free, used and available (taking into account memory that is expected to be recoverable from caches).

The user has pressed the `E` key to change the display into more humanly digestible figures instead of long integers representing bytes.

The columns in the main display are made up of:

- `PID` - Process ID
- `USER` - Name of the owner of the process
- `PR` - Process priority
- `NI` - The nice value of the process
- `VIRT` - Virtual memory used by the process
- `RES` - Resident memory used by the process
- `SHR` - Shared memory used by the process
- `S` - Status of the process. See the list below of the values this field can take
- `%CPU` - the share of CPU time used by the process since last update
- `%MEM` - share of physical memory used
- `TIME+` - total CPU time used by the task in hundredths of a second
- `COMMAND` - command name or command line (name + options)
(The command column didn’t fit into the screenshot.)

The status of the process can be one of:

- `D` - Uninterruptible sleep
- `R` - Running
- `S` - Sleeping
- `T` - Traced (stopped)
- `Z` - Zombie

Press the `Q` key to exit from top

## kill

The kill command allows you to terminate a process from the command line. You do this by providing the process ID (PID) of the process to kill. Don’t kill processes willy-nilly. You need to have a good reason to do so.

To find the PID of shutter we’ll use our ps and grep trick from the section about the alias command, above. We can search for the shutter process and obtain its PID as follows:

```bash
ps -e | grep <process name>
kill <PID>
```
## uname

You can obtain some system information regarding the Linux computer you’re working on with the uname command.

- `-a` (all) option to see everything.
- `-s` (kernel name) option to see the type of kernel.
- `-r` (kernel release) option to see the kernel release.
- `-v` (kernel version) option to see the kernel version.

## tail

The tail command gives you a listing of the last 10 lines of a file. If you want to see fewer or more lines, use the `-n` (number) option.

## less

The less command allows you to view files without opening an editor. It’s faster to use, and there’s no chance of you inadvertently modifying the file. With less you can scroll forward and backward through the file using the *Up* and *Down* Arrow keys, the *PgUp* and *PgDn* keys and the Home and End keys. Press the `Q` key to quit from less.

## ftp

The FTP (File Transfer Protocol) utility program is commonly used for copying files to and from other computers. These computers may be at the same site or at different sites thousands of miles apart. FTP is a general protocol that works on UNIX systems as well as a variety of other (non-UNIX) systems.

To connect your local machine to the remote machine, type:

```bash
ftp machinename
```

Where machinename is the full machine name of the remote machine If the name of the machine is unknown, you may type:

```bash
ftp machinennumber
```

Where machinennumber is the net address of the remote machine. In either case, this command is similar to logging onto the remote machine. If the remote machine has been reached successfully, FTP responds by asking for a loginname and password.

When you enter your own loginname and password for the remote machine, it returns the prompt `ftp>` and permits you access to your own home directory on the remote machine. You should be able to move around in your own directory and to copy files to and from your local machine using the FTP interface commands.

- `?` - to request help or information about the FTP commands
- `ascii` - to set the mode of file transfer to ASCII
(this is the default and transmits seven bits per character)
- `binary` - to set the mode of file transfer to binary
(the binary mode transmits all eight bits per byte and thus provides less chance of a transmission error and must be used to transmit files other than ASCII files)
- `bye` - to exit the FTP environment (same as quit)
- `mget` - to copy multiple files from the remote machine to the local machine; you are prompted for a `y/n` answer before transferring each file.
    - `mget *` - copies all the files in the current remote directory to your current local directory, using the same filenames. Notice the use of the wild card character, *.
- `mput` - to copy multiple files from the local machine to the remote machine; you are prompted for a `y/n` answer before transferring each file.
- `open` - to open a connection with another computer.
- `put` - to copy one file from the local machine to the remote machine.

## scp

Secure Copy allows files to be copied to, from, or between different hosts. It uses ssh for data transfer and provides the same authentication and same level of security as ssh.

Copy the file "foobar.txt" from a remote host to the local host:

```bash
scp username@remotehost:foobar.txt /local/directory
```

Copy the file "foobar.txt" from the local host to a remote host:

```bash
scp foobar.txt username@remotehost:/remote/directory
```

- `-r` - copy the directory

Copy multiple files from the remote host to your current directory on the local host:

```bash
scp username@remotehost:~/\{foo.txt,bar.txt\} .
```

## git

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Git is easy to learn and has a tiny footprint with lightning fast performance.

#### General

- `git config` - this command sets the author name and email address respectively to be used with your commits.

```bash
git config –global user.name “<name>”
git config –global user.email “<email address>”
```

- `git init` - this command is used to start a new repository.

```bash
git init <repository name>
```

- `git clone` - this command is used to obtain a repository from an existing URL.

```bash
git clone <url>
```

- `git add` - this command adds a file to the staging area.

```bash
git add <file> # or git add *
```

- `git commit` - this command records or snapshots the file permanently in the version history.

```bash
git commit -m “< Type in the commit message>”
git commit -a # commits any files you’ve added with the git add command and also commits any files you’ve changed since then
```

- `git diff` - this command shows the file differences which are not yet staged.

```bash
git diff
git diff –staged                        # hows the differences between the files in the staging area and the latest version present
git diff <first branch> <second branch> # shows the differences between the two branches mentioned
```

- `git reset` - this command unstages the file, but it preserves the file contents.

```bash
git reset <file>
git reset <commit>       # discards all the commits after the specified commit and preserves the changes locally
git reset –hard <commit> # discards all history and goes back to the specified commit
```

- `git status` - this command lists all the files that have to be committed.

```bash
git status
```

- `git rm` - this command deletes the file from your working directory and stages the deletion.

```bash
git rm <file>
```

- `git log` - this command is used to list the version history for the current branch.

```bash
git log
git log –follow<file> # lists version history for a file, including the renaming of files also
```

- `git show` - this command shows the metadata and content changes of the specified commit.

```bash
git show <commit>
```

- `git tag` - this command is used to give tags to the specified commit.

```bash
git tag <commitID>
```

- `git branch` - this command lists all the local branches in the current repository.

```bash
git branch
git branch <branch name>    # creates a new branch
git branch -d <branch name> # deletes the feature branch
```

- `git checkout` - this command is used to switch from one branch to another.

```bash
git checkout <branch name>
git checkout -b <branch name> # creates a new branch and also switches to it
```

- `git merge` - this command merges the specified branch’s history into the current branch.

```bash
git merge <branch name>
```

- `git remote` - this command is used to connect your local repository to the remote server.

```bash
git remote add <variable name> <Remote Server Link>
```

- `git push` - this command sends the committed changes of main branch to your remote repository.

```bash
git push <variable name> main
git push <variable name> <branch>       # sends the branch commits to your remote repository
git push –all <variable name>           # pushes all branches to your remote repository
git push <variable name> :<branch name> # deletes a branch on your remote repository
```

- `git pull` - this command fetches and merges changes on the remote server to your working directory.

```bash
git pull <Repository Link>
```

- `git stash` - this command temporarily stores all the modified tracked files.

```bash
git stash save
git stash pop  # restores the most recently stashed files
git stash list # lists all stashed changesets
git stash drop # discards the most recently stashed changeset
```

#### Merge master to main

1. Create *main* branch locally, taking the history from *master*:

```bash
git branch -m master main
```

2. Push the new local *main* branch to the remote repo:

```bash
git push -u origin main
```

3. Switch the current HEAD to the *main* branch:

```bash
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main
```

4. Change the default branch on GitHub to *main*.

5. Delete the master branch on the remote:

```bash
git push origin --delete master
```

6. Set git init default to `main`:
```bash
git config --global init.defaultBranch main
```

## gcc

The GNU Compiler Collection includes front ends for C, C++, Objective-C, Fortran, Ada, Go, and D, as well as libraries for these languages (libstdc++,...). GCC was originally written as the compiler for the GNU operating system.

:::tip

[Using the GNU Compiler Collection](https://gcc.gnu.org/onlinedocs/gcc.pdf)

:::

#### General

```cpp
#include <iostream>

int main(void) {
    std::cout << "Hello World !" << std::endl;
    return 0;
}
```

For preprocessing, compiling, assembling and then finally linking the simple aforementioned hello world program, follow the steps below:

1. Preprocess `main.c` to generate `main.i`:

```bash
gcc -E main.c -o main.i
```

2. Compile `main.i` to generate `main.s`:

```bash
gcc -S main.i -o main.s
```

3. Assemble `main.s` to generate `main.o`:

```bash
as main.s -o main.o
```

Simply we use `-c` flag:

```bash
gcc -c main.s -o main.o
```

#### Optmization

:::tip

[Recommended compiler and linker flags for GCC](https://developers.redhat.com/blog/2018/03/21/compiler-and-linker-flags-gcc/)

:::

| **Flag**                                       | **Purpose**                                             | **Applicable Red Hat Enterprise Linux versions** | **Applicable Fedora versions**         |
| :--------------------------------------------- | :------------------------------------------------------ | :----------------------------------------------- | :------------------------------------- |
| `-D_FORTIFY_SOURCE=2`                          | Run-time buffer overflow detection                      | All                                              | All                                    |
| `-D_GLIBCXX_ASSERTIONS`                        | Run-time bounds checking for C++ strings and containers | All (but ineffective without DTS 6 or later)     | All                                    |
| `-fasynchronous-unwind-tables`                 | Increased reliability of backtraces                     | All (for aarch64, i386, s390, s390x, x86_64)     | All (for aarch64, i386, s390x, x86_64) |
| `-fexceptions`                                 | Enable table-based thread cancellation                  | All                                              | All                                    |
| `-fpie -Wl,-pie`                               | Full ASLR for executables                               | 7 and later (for executables)                    | All (for executables)                  |
| `-fpic -shared`                                | No text relocations for shared libraries                | All (for shared libraries)                       | All (for shared libraries)             |
| `-fplugin=annobin`                             | Generate data for hardening quality control             | Future                                           | Fedora 28 and later                    |
| `-fstack-clash-protection`                     | Increased reliability of stack overflow detection       | Future (after 7.5)                               | 27 and later (except armhfp)           |
| `-fstack-protector` or `-fstack-protector-all` | Stack smashing protector                                | 6 only                                           | n/a                                    |
| `-fstack-protector-strong`                     | Likewise                                                | 7 and later                                      | All                                    |
| `-g`                                           | Generate debugging information                          | All                                              | All                                    |
| `-grecord-gcc-switches`                        | Store compiler flags in debugging information           | All                                              | All                                    |
| `-mcet -fcf-protection`                        | Control flow integrity protection                       | Future                                           | 28 and later (x86 only)                |
| `-O2`                                          | Recommended optimizations                               | All                                              | All                                    |
| `-pipe`                                        | Avoid temporary files, speeding up builds               | All                                              | All                                    |
| `-Wall`                                        | Recommended compiler warnings                           | All                                              | All                                    |
| `-Werror=format-security`                      | Reject potentially unsafe format string arguents        | All                                              | All                                    |
| `-Werror=implicit-function-declaration`        | Reject missing function prototypes                      | All (C only)                                     | All (C only)                           |
| `-Wl,-z,defs`                                  | Detect and reject underlinking                          | All                                              | All                                    |
| `-Wl,-z,now`                                   | Disable lazy binding                                    | 7 and later                                      | All                                    |
| `-Wl,-z,relro`                                 | Read-only segments after relocation                     | 6 and later                                      | All                                    |

This table does not list flags for managing an executable stack or the `.bss` section, under the assumption that these historic features have been phased out by now.

**Documentation for compiler flags** is available in the [GCC manual](https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html). Those flags (which start with `-Wl`) are passed to the linker and are described in the [documentation for ld](https://sourceware.org/binutils/docs/ld/Options.html).

For some flags, additional explanations are in order:

- `-D_GLIBCXX_ASSERTIONS` enables additional **C++ standard library hardening**. It is implemented in libstdc++ and described in the [libstdc++ documentation ](https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_macros.html). Unlike the C++ containers with full debugging support, its use does not result in ABI changes.
- `-fasynchronous-unwind-tables` is required for many **debugging and performance tools** to work on most architectures (armhfp, ppc, ppc64, ppc64le do not need these tables due to architectural differences in stack management). Even though it is necessary on aarch64, upstream GCC does not enable it by default. The compilers for Red Hat Enterprise Linux and Fedora carry a patch to enable it by default.
- `-fexceptions` is recommended for **hardening of multi-threaded C and C++ code.** Without it, the implementation of thread cancellation handlers (introduced by `pthread_cleanup_push`) uses a completely unprotected function pointer on the stack. This function pointer can simplify the exploitation of stack-based buffer overflows even if the thread in question is never canceled.
- `-fstack-clash-protection` prevents attacks based on an **overlapping heap and stack**. This is a new compiler flag in GCC 8, which has been backported to the system compiler in Red Hat Enterprise Linux 7.5 and Fedora 26 (and later versions of both). We expect this compiler feature to reach maturity in Red Hat Enterprise Linux 7.6. The GCC implementation of this flag comes in two flavors: generic and architecture-specific. The generic version shares many of its problems with the older `-fstack-check` flag (which is not recommended for use). For the architectures supported by Red Hat Enterprise Linux, improved architecture-specific versions are available. This includes aarch64, for which only problematic generic support is available in upstream GCC (as of mid-February 2018). The Fedora armhfp architecture also lacks upstream and downstream support, so the flag cannot be used there.
- `-fstack-protector-strong` completely supersedes the earlier **stack protector** options. It only instruments functions that have addressable local variables or use `alloca`. Other functions cannot be subject to direct stack buffer overflows and are not instrumented. This greatly reduces the performance and code size impact of the stack protector.
- To enable **address space layout randomization (ASLR)** for the main program (executable), `-fpie -Wl,-pie` has to be used. However, while the code produced this way is position-independent, it uses some relocations which cannot be used in shared libraries (dynamic shared objects). For those, use `-fpic`, and link with `-shared` (to avoid text relocations on architectures which support position-dependent shared libraries). Dynamic shared objects are always position-independent and therefore support ASLR. Furthermore, the kernel in Red Hat Enterprise Linux 6 uses an unfortunate address space layout for PIE binaries under certain circumstances ([bug 1410097](https://bugzilla.redhat.com/show_bug.cgi?id=1410097)) which can severely interfere with debugging (among other things). This is why it is not recommended to build PIE binaries on Red Hat Enterprise Linux 6.
- `-fplugin=annobin` enables the [annobin compiler plugin](https://developers.redhat.com/blog/2018/02/20/annobin-storing-information-binaries/), which captures additional metadata to allow a determination of which compiler flags were used during the build. Annobin is currently available only on Fedora, and it is automatically [enabled as part of the Fedora 28 build flags ](https://fedoraproject.org/wiki/Changes/Annobin), where it shows up as `-specs=/usr/lib/rpm/redhat/redhat-annobin-cc1`.
- To generate **debugging information** we recommend (using `-g`), even for optimized production builds. Having only partly usable debugging information (due to optimization) certainly beats having none at all. With GCC, generating debugging information does not alter code generation. It is possible to use tools such as `eu-strip` to separate debugging information before distributing binaries (which automatically happens during RPM builds).
- `-grecord-gcc-switches` captures compiler flags, which can be useful to determine whether the intended compiler flags are used throughout the build.
- `-mcet -fcf-protection` enables support for the **Control-Flow Enforcement Technology (CET)** feature in future Intel CPUs. This involves the generation of additional NOPs, which are ignored by the current CPUs. It is recommended that you enable this flag now, to detect any issues caused by them (e.g., interactions with dynamic instrumentation frameworks, or performance issues).
- For many applications, `-O2` is a good choice because the additional inlining and loop unrolling introduced by `-O3` increases the instruction cache footprint, which ends up reducing performance. `-O2` or higher is also required by `-D_FORTIFY_SOURCE=2`.
- By default, GCC allows code to call **undeclared functions**, treating them as returning `int`. `-Werror=implicit-function-declaration` turns such calls into errors. This avoids difficult-to-track-down run-time errors because the default `int` return type is not compatible with `bool` or pointers on many platforns. For C++, this option is not needed because the C++ compiler rejects calls to undeclared functions.
- `-Wl,-z,defs` is required to detect **underlinking**, which is a phenomenon caused by missing shared library arguments when invoking the linked editor to produce another shared library. This produces a shared library with incomplete ELF dependency information (in the form of missing `DT_NEEDED` tags), and the resulting shared object may not be forward compatible with future versions of libraries which use symbol versioning (such as glibc), because symbol versioning information is missing from it.
- `-Wl,-z,now` (also referred to as `BIND_NOW`) is not recommended for use on Red Hat Enterprise Linux 6 because the dynamic linker processes non-lazy relocations in the wrong order ([bug 1398716](https://bugzilla.redhat.com/show_bug.cgi?id=1398716)), causing IFUNC resolvers to fail. IFUNC resolver interactions remain an open issue even for later versions, but `-Wl,-z,defs` will catch the problematic cases involving underlinking.


## minicom

The minicom is a serial communication program that connects to devices through a GNU/Linux PC's serial ports.

The use of a terminal emulator, such as minicom, is required when connecting to an EMAC board via a serial console. This page sets out to provide general information about using minicom to communicate between EMAC machines and a development PC.

The following list of arguments can be used to alter minicom's behavior from the command line:

- `-b <baudrate>` - The serial port baud rate used by the external device–typically a SOM.

- `-D <device_name>` - The device name for the serial port being used.

- `-h` - Show a list of arguments that minicom accepts.
