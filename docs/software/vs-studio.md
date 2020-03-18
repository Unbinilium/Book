---
title: VS Studio
---

## Advanced build for OpenCV

OpenCV is a library of programming functions mainly aimed at real-time computer vision and it officially compiled without support for NVIDIA CUDA, INTEL TTB and OpenCL library, that's why we need to rebuild OpenCV with a custom configuration manually.

_CUDA is a parallel computing platform and programming model developed by Nvidia for general computing on its own GPUs \(graphics processing units\). CUDA enables developers to speed up compute-intensive applications by harnessing the power of GPUs for the parallelizable part of the computation._

_Intel TBB \(Threading Building Blocks\) makes parallel performance and scalability accessible to software developers who are writing loop- and task-based applications. Build robust applications that abstract platform details and threading mechanisms while achieving performance that scales with increasing core count._

To begin with, these software libraries should be pre-installed and **configured correctly**:

* [Visual Studio Community](https://visualstudio.microsoft.com/vs/)  2019  or later with `Desktop development with C++` workload installed
* [CMake \(cmake-gui\)](https://cmake.org/download/) 3.5 or later with `Path` configured
* [NVIDIA GPU Driver](https://www.nvidia.com/Download/index.aspx) 436 or later with `Path` configured
* [NVIDIA GPU Computing Toolkit](https://developer.nvidia.com/cuda-toolkit) 10 or later with `Path` configured
* [NVIDIA Video Codec SDK](https://developer.nvidia.com/nvidia-video-codec-sdk/download) 9.1 or later and copy to _NVIDIA GPU Computing Toolkit_ install path
* [Intel Threading Building Blocks](https://visualstudio.microsoft.com/vs/) 2019 or later with `Path` configured
* [Python3.7](https://www.python.org/downloads/) or later with `Path` configured

If there's a Anaconda user, make sure Anaconda is your default Python. You can also try tick _Register Anaconda as my default Python_ button when installing Anaconda.

* [Anaconda3](https://www.anaconda.com/) 2019 or later `Path` configured

To accelerate C++ build speed, try Ninja build system as optional software:

* [Ninja build system](https://ninja-build.org/) 1.9.0 or later with `Path` configured

For system, I recommend you at least meet the minimal requirements below:

* CPU: Core i7 9750H or higher
* RAM: 8G DDR4 or bigger
* STROAGE: 60GB or bigger
* NETWORK: 10Mbps or higher with no dependencies' host blocked or proxy passthrough

Then download both OpenCV and OpenCV Contrib same version source from Github release and **unzip** them after download finished with **MD5 checked**.

* [OpenCV](https://github.com/opencv/opencv/releases) 4.1 or later
* [OpenCV Contrib](https://github.com/opencv/opencv_contrib/releases) 4.1 or later

To compile by MSBuild with CMake configured, **open CMake-GUI** first. Firstly click _Browse Source_ button, select path to the folder **OpenCV** unzipped folder. Secondly click _Browse Build_, create a folder named `build` in the path to the folder **OpenCV** unzipped folder, then select path to the `build` folder. For example the path should be like this:

```
Where is the source code: C
Where to build the binaries: C:/opencv/build
```

Click _Configure_ button then it pop-up a window, you have to change **Specify the generator for the project** to _Visual Studio XX 20XX_ \(See the newest Visual Studio you have installed, If you want to use Ninja to accelerate build you have to set generator to _Ninja_\) and keep other selection as default if it had already configured.

Then click _Finish_ button. The missing or unconfigured part will covered with **RED background**, the other error is in **RED text in output window**, click _Configure_ button again to check if it solved.

Next we add `OPEVCV_EXTRA_MODULES_PATH` with path to the folder **OpenCV Contrib** unzipped, use the **modules** folder `~/modules`, for example my own path listed here:

```
C:/opencv_contrib/modules
```

Next click _Configure_ button again and **fix missing path** or **any error** until there is no errors displayed.

When finished default build configuration, it's time to **add our custom configuration**. Use `Search` bar which located on the top of CMake-GUI to search flags `WITH_CUDA`, `WITH_TBB` and `WITH_OPENGL`, all tick selected\(If you want to build OpenCV Python version, tick `OPENCV_PYTHON3_VERSION` selected\).

Since NVIDA Developer removed _cudacodec_, for _OpenGL_ support you have to unzip _NVIDIA Video Codec SDK_, then rename `Lib` folder to `lib` and copy `include` & `lib` folder to _NVIDIA GPU Computing Toolkit_ install path like:

```
C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.X
```

Last you have to tick `WITH_NVCUVID` selected in _CMake-GUI_.

Then click _Configure_ button again and find error the RED background covered. Generally the Intel TBB install path is like this:

```
C:\Program Files(x86)\IntelSWTools\compilers_and_libraries\windows
```

The configurations example here:

* TBB\_DIR

  ```
  C:\Program Files (x86)\IntelSWTools\compilers_and_libraries\windows\redist\intel64_win\tbb\vc_mt
  ```

* TBB\_ENV\_INCLUDE

  ```
  C:\Program Files (x86)\IntelSWTools\compilers_and_libraries\windows\tbb\include
  ```

* TBB\_ENV\_LIB

  ```
  C:/Program Files (x86)/IntelSWTools/compilers_and_libraries/windows/tbb/lib/intel64/vc_mt/tbb.lib
  ```

* TBB\_ENV\_LIB\_DEBUG

  ```
  C:/Program Files (x86)/IntelSWTools/compilers_and_libraries/windows/tbb/lib/intel64/vc_mt/tbb_debug.lib
  ```

* TBB\_VER\_FILE \(If TBB\_DIR not found\)

  ```
  C:/Program Files (x86)/IntelSWTools/compilers_and_libraries/windows/tbb/include/tbb/tbb_stddef.h
  ```

Next click _Configure_ button again and **fix missing path or error** until there is **no error** in output as RED background covered. Now click _Generate_ button to generate `INSTALL.vcxproj` in folder `~\opencv\build` and make there's no error displayed.

Now we start build with `MSBuild` and we'd better declare how many CPU cores in order to increase build speed. Firstly we open **CMD** and enter command:

```
wmic cpu get NumberOfLogicalProcessors
```

And the outputs like this:

```
NumberOfLogicalProcessors
12
```

It means we have `12 logical processor` for compiling if 1 thread uses 1 logical processor. Secondly we open **xXX Native Tools Command Prompt for VS 20XX** and use `cd <~\opencv\build>` to enter `build` folder. For example:

```
cd C:\opencv\build
```

Then build OpenCV for `RELEASE` use command:

```
msbuild INSTALL.vcxproj /m:12 /p:Configuration=Release
```

The arguments `/m:12` means use 12 threads to build. Be patient, it takes a long time to build.

At last the build finished and shows:

```
9232 Warning(s)
0 Error(s
Time Elapsed 02:06:53.91
```

Don't mind the Warnings. Take a look in folder`~\opencv\build\install`, all the compiled files here are ready to use. Just set up OpenCV variables path in your VS project and build you project with **Release** Windows Local Debugger.

Add `.lib` may be annoying, try command:

```
ls '~\opencv\install\x64\vc16\lib' | Select-Object -Property Name
```

In **PowerShell** and copy it when editing **Property Pages-&gt;Linker-&gt;Input-&gt;Additional Dependencies** in Visual Studio project.
