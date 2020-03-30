---
title: IDE
---

## Xcode

## Visual Studio Code

## Visual Studio

### Advanced build for OpenCV

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

## Qt Creator

### Config OpenCV

Firstly we installed OpenCV by compiling it form its source and libraries installed in `/usr/local/lib`. We could show the files in this directory by command:

```bash
la /usr/local/lib | grep libopencv
```

And then it shows:

```
libopencv_calib3d.so
libopencv_calib3d.so.4.1
libopencv_calib3d.so.4.1.2
libopencv_core.so
libopencv_core.so.4.1
libopencv_core.so.4.1.2
libopencv_dnn.so
libopencv_dnn.so.4.1
libopencv_dnn.so.4.1.2
libopencv_features2d.so
libopencv_features2d.so.4.1
libopencv_features2d.so.4.1.2
libopencv_flann.so
libopencv_flann.so.4.1
libopencv_flann.so.4.1.2
libopencv_gapi.so
libopencv_gapi.so.4.1
libopencv_gapi.so.4.1.2
libopencv_highgui.so
libopencv_highgui.so.4.1
libopencv_highgui.so.4.1.2
libopencv_imgcodecs.so
libopencv_imgcodecs.so.4.1
libopencv_imgcodecs.so.4.1.2
libopencv_imgproc.so
libopencv_imgproc.so.4.1
libopencv_imgproc.so.4.1.2
libopencv_ml.so
libopencv_ml.so.4.1
libopencv_ml.so.4.1.2
libopencv_objdetect.so
libopencv_objdetect.so.4.1
libopencv_objdetect.so.4.1.2
libopencv_photo.so
libopencv_photo.so.4.1
libopencv_photo.so.4.1.2
libopencv_stitching.so
libopencv_stitching.so.4.1
libopencv_stitching.so.4.1.2
libopencv_videoio.so
libopencv_videoio.so.4.1
libopencv_videoio.so.4.1.2
libopencv_video.so
libopencv_video.so.4.1
libopencv_video.so.4.1.2
```

Definitely we refer and use `libopencv_*.so` by default in Qt Creator. Then take a look in `/usr/local/include` by command:

```bash
tree /usr/local/include -d
```

It because successfully compiling your code requires the necessarily header file. Package `tree` could be installed by command:

```bash
sudo apt-get install tree -y
```

And we simply use by `tree` and the outputs:

```
/usr/local/include
└── opencv4
    └── opencv2
        ├── calib3d
        ├── core
        │   ├── cuda
        │   │   └── detail
        │   ├── detail
        │   ├── hal
        │   ├── opencl
        │   │   └── runtime
        │   │       └── autogenerated
        │   └── utils
        ├── dnn
        │   └── utils
        ├── features2d
        │   └── hal
        ├── flann
        ├── gapi
        │   ├── cpu
        │   ├── fluid
        │   ├── gpu
        │   ├── infer
        │   ├── ocl
        │   ├── own
        │   ├── streaming
        │   └── util
        ├── highgui
        ├── imgcodecs
        │   └── legacy
        ├── imgproc
        │   ├── detail
        │   └── hal
        ├── ml
        ├── objdetect
        ├── photo
        │   └── legacy
        ├── stitching
        │   └── detail
        ├── video
        │   └── legacy
        └── videoio
            └── legacy

42 directories
```

The header files of opencv we used by `#include <opencv.hpp>` is stored in `/usr/local/include/opencv4/opencv2` by command:

```bash
tree /usr/local/include/opencv4/opencv2
```

Then outputs:

```
/usr/local/include/opencv4/opencv2
├── calib3d
│   ├── calib3d_c.h
│   └── calib3d.hpp
├── calib3d.hpp
├── core
│   ├── affine.hpp
│   ├── async.hpp
│   ├── base.hpp
│   ├── bindings_utils.hpp
│   ├── bufferpool.hpp
│   ├── check.hpp
│   ├── core_c.h
│   ├── core.hpp
│   ├── cuda
│   │   ├── block.hpp
│   │   ├── border_interpolate.hpp
│   │   ├── color.hpp
│   │   ├── common.hpp
│   │   ├── datamov_utils.hpp
│   │   ├── detail
│   │   │   ├── color_detail.hpp
│   │   │   ├── reduce.hpp
│   │   │   ├── reduce_key_val.hpp
│   │   │   ├── transform_detail.hpp
│   │   │   ├── type_traits_detail.hpp
│   │   │   └── vec_distance_detail.hpp
│   │   ├── dynamic_smem.hpp
│   │   ├── emulation.hpp
│   │   ├── filters.hpp
│   │   ├── funcattrib.hpp
│   │   ├── functional.hpp
│   │   ├── limits.hpp
│   │   ├── reduce.hpp
│   │   ├── saturate_cast.hpp
│   │   ├── scan.hpp
│   │   ├── simd_functions.hpp
│   │   ├── transform.hpp
│   │   ├── type_traits.hpp
│   │   ├── utility.hpp
│   │   ├── vec_distance.hpp
│   │   ├── vec_math.hpp
│   │   ├── vec_traits.hpp
│   │   ├── warp.hpp
│   │   ├── warp_reduce.hpp
│   │   └── warp_shuffle.hpp
│   ├── cuda.hpp
│   ├── cuda.inl.hpp
│   ├── cuda_stream_accessor.hpp
│   ├── cuda_types.hpp
│   ├── cv_cpu_dispatch.h
│   ├── cv_cpu_helper.h
│   ├── cvdef.h
│   ├── cvstd.hpp
│   ├── cvstd.inl.hpp
│   ├── cvstd_wrapper.hpp
│   ├── detail
│   │   ├── async_promise.hpp
│   │   └── exception_ptr.hpp
│   ├── directx.hpp
│   ├── eigen.hpp
│   ├── fast_math.hpp
│   ├── hal
│   │   ├── hal.hpp
│   │   ├── interface.h
│   │   ├── intrin_avx512.hpp
│   │   ├── intrin_avx.hpp
│   │   ├── intrin_cpp.hpp
│   │   ├── intrin_forward.hpp
│   │   ├── intrin.hpp
│   │   ├── intrin_msa.hpp
│   │   ├── intrin_neon.hpp
│   │   ├── intrin_sse_em.hpp
│   │   ├── intrin_sse.hpp
│   │   ├── intrin_vsx.hpp
│   │   ├── intrin_wasm.hpp
│   │   └── msa_macros.h
│   ├── mat.hpp
│   ├── mat.inl.hpp
│   ├── matx.hpp
│   ├── neon_utils.hpp
│   ├── ocl_genbase.hpp
│   ├── ocl.hpp
│   ├── opencl
│   │   ├── ocl_defs.hpp
│   │   ├── opencl_info.hpp
│   │   ├── opencl_svm.hpp
│   │   └── runtime
│   │       ├── autogenerated
│   │       │   ├── opencl_clamdblas.hpp
│   │       │   ├── opencl_clamdfft.hpp
│   │       │   ├── opencl_core.hpp
│   │       │   ├── opencl_core_wrappers.hpp
│   │       │   ├── opencl_gl.hpp
│   │       │   └── opencl_gl_wrappers.hpp
│   │       ├── opencl_clamdblas.hpp
│   │       ├── opencl_clamdfft.hpp
│   │       ├── opencl_core.hpp
│   │       ├── opencl_core_wrappers.hpp
│   │       ├── opencl_gl.hpp
│   │       ├── opencl_gl_wrappers.hpp
│   │       ├── opencl_svm_20.hpp
│   │       ├── opencl_svm_definitions.hpp
│   │       └── opencl_svm_hsa_extension.hpp
│   ├── opengl.hpp
│   ├── operations.hpp
│   ├── optim.hpp
│   ├── ovx.hpp
│   ├── persistence.hpp
│   ├── saturate.hpp
│   ├── simd_intrinsics.hpp
│   ├── softfloat.hpp
│   ├── sse_utils.hpp
│   ├── traits.hpp
│   ├── types_c.h
│   ├── types.hpp
│   ├── utility.hpp
│   ├── utils
│   │   ├── allocator_stats.hpp
│   │   ├── allocator_stats.impl.hpp
│   │   ├── filesystem.hpp
│   │   ├── logger.defines.hpp
│   │   ├── logger.hpp
│   │   ├── logtag.hpp
│   │   └── trace.hpp
│   ├── va_intel.hpp
│   ├── version.hpp
│   └── vsx_utils.hpp
├── core.hpp
├── cvconfig.h
├── dnn
│   ├── all_layers.hpp
│   ├── dict.hpp
│   ├── dnn.hpp
│   ├── dnn.inl.hpp
│   ├── layer.details.hpp
│   ├── layer.hpp
│   ├── shape_utils.hpp
│   ├── utils
│   │   └── inference_engine.hpp
│   └── version.hpp
├── dnn.hpp
├── features2d
│   ├── features2d.hpp
│   └── hal
│       └── interface.h
├── features2d.hpp
├── flann
│   ├── all_indices.h
│   ├── allocator.h
│   ├── any.h
│   ├── autotuned_index.h
│   ├── composite_index.h
│   ├── config.h
│   ├── defines.h
│   ├── dist.h
│   ├── dummy.h
│   ├── dynamic_bitset.h
│   ├── flann_base.hpp
│   ├── flann.hpp
│   ├── general.h
│   ├── ground_truth.h
│   ├── hdf5.h
│   ├── heap.h
│   ├── hierarchical_clustering_index.h
│   ├── index_testing.h
│   ├── kdtree_index.h
│   ├── kdtree_single_index.h
│   ├── kmeans_index.h
│   ├── linear_index.h
│   ├── logger.h
│   ├── lsh_index.h
│   ├── lsh_table.h
│   ├── matrix.h
│   ├── miniflann.hpp
│   ├── nn_index.h
│   ├── object_factory.h
│   ├── params.h
│   ├── random.h
│   ├── result_set.h
│   ├── sampling.h
│   ├── saving.h
│   ├── simplex_downhill.h
│   └── timer.h
├── flann.hpp
├── gapi
│   ├── core.hpp
│   ├── cpu
│   │   ├── core.hpp
│   │   ├── gcpukernel.hpp
│   │   └── imgproc.hpp
│   ├── fluid
│   │   ├── core.hpp
│   │   ├── gfluidbuffer.hpp
│   │   ├── gfluidkernel.hpp
│   │   └── imgproc.hpp
│   ├── garg.hpp
│   ├── garray.hpp
│   ├── gasync_context.hpp
│   ├── gcall.hpp
│   ├── gcommon.hpp
│   ├── gcompiled_async.hpp
│   ├── gcompiled.hpp
│   ├── gcompoundkernel.hpp
│   ├── gcomputation_async.hpp
│   ├── gcomputation.hpp
│   ├── gkernel.hpp
│   ├── gmat.hpp
│   ├── gmetaarg.hpp
│   ├── gproto.hpp
│   ├── gpu
│   │   ├── core.hpp
│   │   ├── ggpukernel.hpp
│   │   └── imgproc.hpp
│   ├── gscalar.hpp
│   ├── gstreaming.hpp
│   ├── gtransform.hpp
│   ├── gtyped.hpp
│   ├── gtype_traits.hpp
│   ├── imgproc.hpp
│   ├── infer
│   │   └── ie.hpp
│   ├── infer.hpp
│   ├── ocl
│   │   ├── core.hpp
│   │   ├── goclkernel.hpp
│   │   └── imgproc.hpp
│   ├── opencv_includes.hpp
│   ├── operators.hpp
│   ├── own
│   │   ├── assert.hpp
│   │   ├── convert.hpp
│   │   ├── cvdefs.hpp
│   │   ├── exports.hpp
│   │   ├── mat.hpp
│   │   ├── saturate.hpp
│   │   ├── scalar.hpp
│   │   └── types.hpp
│   ├── streaming
│   │   ├── cap.hpp
│   │   └── source.hpp
│   └── util
│       ├── any.hpp
│       ├── compiler_hints.hpp
│       ├── optional.hpp
│       ├── throw.hpp
│       ├── util.hpp
│       └── variant.hpp
├── gapi.hpp
├── highgui
│   ├── highgui_c.h
│   └── highgui.hpp
├── highgui.hpp
├── imgcodecs
│   ├── imgcodecs_c.h
│   ├── imgcodecs.hpp
│   ├── ios.h
│   └── legacy
│       └── constants_c.h
├── imgcodecs.hpp
├── imgproc
│   ├── detail
│   │   └── gcgraph.hpp
│   ├── hal
│   │   ├── hal.hpp
│   │   └── interface.h
│   ├── imgproc_c.h
│   ├── imgproc.hpp
│   └── types_c.h
├── imgproc.hpp
├── ml
│   ├── ml.hpp
│   └── ml.inl.hpp
├── ml.hpp
├── objdetect
│   ├── detection_based_tracker.hpp
│   └── objdetect.hpp
├── objdetect.hpp
├── opencv.hpp
├── opencv_modules.hpp
├── photo
│   ├── cuda.hpp
│   ├── legacy
│   │   └── constants_c.h
│   └── photo.hpp
├── photo.hpp
├── stitching
│   ├── detail
│   │   ├── autocalib.hpp
│   │   ├── blenders.hpp
│   │   ├── camera.hpp
│   │   ├── exposure_compensate.hpp
│   │   ├── matchers.hpp
│   │   ├── motion_estimators.hpp
│   │   ├── seam_finders.hpp
│   │   ├── timelapsers.hpp
│   │   ├── util.hpp
│   │   ├── util_inl.hpp
│   │   ├── warpers.hpp
│   │   └── warpers_inl.hpp
│   └── warpers.hpp
├── stitching.hpp
├── video
│   ├── background_segm.hpp
│   ├── legacy
│   │   └── constants_c.h
│   ├── tracking.hpp
│   └── video.hpp
├── video.hpp
├── videoio
│   ├── cap_ios.h
│   ├── legacy
│   │   └── constants_c.h
│   ├── registry.hpp
│   ├── videoio_c.h
│   └── videoio.hpp
└── videoio.hpp

40 directories, 276 files
```

Obviously we could now write the `.pro` configuration what we want like this, create and save it in you project in Qt Creator.

```
SOURCES += main.cpp

INCLUDEPATH += /usr/local/include/opencv4 \
               /usr/local/include/opencv4/opencv2

LIBS += /usr/local/lib/libopencv_*.so
```
