---
title: Computer Vision
---

Computer vision is an interdisciplinary scientific field that deals with how computers can gain high-level understanding from digital images or videos. Here I note some tricks or experience about OpenCV, OpenMV and other computer vision libraries.

## Add mask to faces

As the death toll from the Wuhan coronavirus still risen, I felt anxious and helpless through everyone here were talking and laughing on New Year's Eve. Not sure what should I do and I just wrote this _python3_ program to make people aware of the importance of wearing respirator masks when defeating the virus.

In this program, we use `CascadeClassifier` to add respirators masks to the recognized faces in the capture. Before everything start, we have to import the necessary packages:

```python
import argparse
import cv2
```

We use `argparse` to construct the argument parse for more flexible usage. The respirator image cloud be found on _eBay_, _Google_... and transparent background required as `.png` format. Firstly we need a `.xml` file as trained module:

```
haarcascade_frontalface_default.xml
```

It could be found at OpenCV official git repository at:

:::tip
[opencv/data/haarcascade](https://github.com/opencv/opencv/tree/master/data/haarcascade)
:::

```python
ap = argparse.ArgumentParser()
ap.add_argument('-c', '--camera', type = int, default = 0, help = 'camera device index')
ap.add_argument('-m', '--mask', default = 'respirator.png', help = 'path of mask .png')
ap.add_argument('-d', '--data', default = 'haarcascade_frontalface_default.xml', help = 'path of haarcascad data model')
ap.add_argument('-w', '--width', type = int, default = 720, help = 'camera frame width')
ap.add_argument('-l', '--height', type = int, default = 480, help = 'camera frame height')
args = vars(ap.parse_args())
```

Parse the arguments, open camera and load necessary files:

```python
cap = cv2.VideoCapture(args['camera'])
cap.set(cv2.CAP_PROP_FRAME_WIDTH, args['width'])
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, args['height'])
mask = cv2.imread(args['mask'], cv2.IMREAD_UNCHANGED)
face_cascade = cv2.CascadeClassifier(args['data'])
```

Create tracker bar based on the arguments we may use:

```python
def callBack(val):
    pass

cv2.createTrackbar('scale_factor', 'slider', 10, 100, callBack)
cv2.createTrackbar('min_neighbors', 'slider', 5, 100, callBack)
cv2.createTrackbar('min_size', 'slider', 80, max(args['width'], args['height']), callBack)
cv2.createTrackbar('max_size', 'slider', 360, max(args['width'], args['height']), callBack)
cv2.createTrackbar('mask_y_s_k', 'slider', 5, 100, callBack)
cv2.createTrackbar('mask_y_e_k', 'slider', 10, 100, callBack)
```

Before start frame processing, let's understand `CascadeClassifier` deeper. Here I just give a simple reference to the [official introduction](https://docs.opencv.org/3.4/db/d28/tutorial_cascade_classifier.html).

Object Detection using Haar feature-based cascade classifiers is an effective object detection method proposed by Paul Viola and Michael Jones in their paper, It is a machine learning based approach where a cascade function is trained from a lot of positive and negative images. It is then used to detect objects in other images.

Here we will work with face detection. Initially, the algorithm needs a lot of positive images and negative images to train the classifier. Then we need to extract features from it.

Then let's code a function `transparentOverlay` for blending frame and respirator image first, we loop over all pixels and apply the blending equation:

```python
def transparentOverlay(src, overlay): 
    for col in range(overlay.shape[0]):
        for row in range(overlay.shape[1]):
            if col <= src.shape[0] or row <= src.shape[1]:
                alpha = float(overlay[col][row][3] / 255)
                src[col][row] = alpha * overlay[col][row][:3] + (1 - alpha) * src[col][row]
    return src
```

Finally we process every frame from capture, recognize the faces, resize the respirators to fit the faces and apply the transparent overlay to each frame:

```python
while cap.isOpened():
    (ret, frame) = cap.read()
    (min_size, max_size) = cv2.getTrackbarPos('min_size', 'slider'), cv2.getTrackbarPos('max_size', 'slider')
    for (x, y, w, h) in face_cascade.detectMultiScale(image = frame, scaleFactor = 1 + cv2.getTrackbarPos('scale_factor', 'slider') / 100, minNeighbors = cv2.getTrackbarPos('min_neighbors', 'slider'), minSize = (min_size, min_size), maxSize = (max_size, max_size)):
        if w > 0 and h > 0:
            (overlay_y_s, overlay_y_e) = int(y + h * cv2.getTrackbarPos('mask_y_s_k', 'slider') / 10), int(y + h * cv2.getTrackbarPos('mask_y_e_k', 'slider') / 10)
            mask_resized = cv2.resize(src = mask, dsize = (w, overlay_y_e - overlay_y_s), interpolation = cv2.INTER_CUBIC)
            transparentOverlay(src = frame[overlay_y_s:overlay_y_e, x:x + w], overlay = mask_resized)
    cv2.imshow(winname = 'respirator', mat = frame)
    if cv2.waitKey(1) > 0:
        break
```

Forming a sound habit, close capture and destroy windows when program ended:

```python
cap.release()
cv2.destroyAllWindows()
```

## Compute with GPU

First your OpenCV should be compiled with CUDA \(_and OpenGL_\) support to test all this features. Detect your CUDA hardware with OpenCV CUDA by:

```cpp
#include <iostream>
using namespace std;

#include <opencv2/core.hpp>
using namespace cv;

#include <opencv2/cudaarithm.hpp>
using namespace cv::cuda;

int main()
{
    printShortCudaDeviceInfo(getDevice());
    int cuda_devices_number = getCudaEnabledDeviceCount();
    cout << "CUDA Device(s) Number: "<< cuda_devices_number << endl;
    DeviceInfo _deviceInfo;
    bool _isd_evice_compatible = _deviceInfo.isCompatible();
    cout << "CUDA Device(s) Compatible: " << _isd_evice_compatible << endl;
    return 0;
}
```

Run and debug the code in your C++ IDE and see if it shows like this below to check hardware compatibility of CUDA.

```
Device 0:  "GeForce GTX 1650"  4096Mb, sm_75, Driver/Runtime ver.10.10/10.10
CUDA Device(s) Number: 1
CUDA Device(s) Compatible: 1
```

Obviously when adding CUDA support to your code, nothing is more important than adding the **header** first. All the `.hpp` file stored as the install path like:

```
~\include\opencv2
~\include\opencv2\cudalegacy
```

For example we add the headers below when liner blending two images:

```cpp
#include <iostream>
using namespace std;

#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
using namespace cv;

//Add CUDA support
#include <opencv2/cudaarithm.hpp>
#include <opencv2/cudafeatures2d.hpp>
using namespace cv::cuda;
```

Then we should declare the difference between the basic class `cv::Mat` and `cv::gpu::GpuMat`. Firstly `GpuMat` added two member function as:

```cpp
cv::gpu::GpuMat::upload(cv::Mat::InputArray arr)
cv::gpu::GpuMat::download(cv::OutputArray dst)
```

We use them to link _RAM_ with _GPU Memory_ but actually it not temporarily link, because `Mat` and `GpuMat` both have data pointer and both data pointer pointed to different memory block which causes memory copy between RAM and GPU Memory.

It seems for better access speed, `GpuMat` only supports 2D array and filled with blank bytes in the end in empty or not fully filled cols to align the RAM and the real memory of a row is stored in member `cv::gpu::GpuMat::step`.

Let's look deeper, the function `cv::gpu::GpuMat::upload` and `cv::gpu::GpuMat::download` in OpenCV 3 is actually designed for asynchronous processing form its definition:

```cpp
void upload(InputArray arr);
void upload(InputArray arr, Stream& stream);

void download(OutputArray dst) const;
void download(OutputArray dst, Stream& stream) const;
```

And now let's see 3 special examples to learn how the `GpuMat` is structed in different ways\([_GpuMat Class Reference_](https://docs.opencv.org/4.1.2/d0/d60/classcv_1_1cuda_1_1GpuMat.html)\).

```cpp
//Default constructor
cv::cuda::GpuMat::GpuMat(GpuMat::Allocator* allocator = GpuMat::defaultAllocator())

//Constructs GpuMat of the specified size and type
cv::cuda::GpuMat::GpuMat(int rows, int cols, int type, Scalar s, GpuMat::Allocator* allocator = GpuMat::defaultAllocator())

//Builds GpuMat from host memory (Blocking call)
cv::cuda::GpuMat::GpuMat(InputArray arr, GpuMat::Allocator* allocator = GpuMat::defaultAllocator())
```

We have to declare how copy works between `GpuMat`. There're 2 types of copying, one is _shallow copy_ and another is _deep copy_. Examples here:

```cpp
//Shallow copy, allocate data pointer and GPU(Memory)-GPU(Memory)
cv::cuda::GpuMat dst1 = dst0;

//Deep copy, allocate memory and GPU(Memory)-GPU(Memory)
cv::cuda::GpuMat dst0, dst1;
dst0.copyTo(dst1);

//Deep copy, allocate memory and upload to CPU(RAM)-GPU(Memory)
cv::cuda::GpuMat dst1.upload(dst1);
cv::cuda::GpuMat dst1 = dst0.clone();
```

OpenCV designed _shallow copy_ to only copy the **header** and **data pointer** which uses same real memory and affect each other when perform a change in one of each, only useable in same memory space. The different of _deep copy_ is its **temporarily copy the data** with no affection of each when one is changed, not restricted to the type of the memory whether RAM or GPU Memory.

Now we found that our main idea to use CUDA is increase the performance when processing data with the complex algorithm but not a huge amount of data in real time. Because too many data transferred instantly causes IO overflow and transferring data from RAM and GPU Memory requires amount of computing performance and increases its delay, through OpenCV developer designed `PtrStepSz` and `PtrStep` two light-weighted class in OpenCV2 to reduce copying data size for fast and low latency computing.

I still confused about how to pass `VideoCapture` stream directly to GPU Memory, in that case we don't need to _upload_ or _download_ frames from GPU Memory to RAM, just grab frames from stream in `GpuMat`. Because NVIDIA Video Decoder\(_NVCUVID_\) is deprecated and the funtion below is no longer working.

```cpp
cv::Ptr<cv::cudacodec::VideoReader> d_reader = cv::cudacodec::createVideoReader(fname)
```

For older CUDA version 8 the `createVideoReader()` would pass camera frames directly to GPU Memory.

Here I wrote a function that grab frame from streams and liner blend with a static image part example using OpenCV CUDA:

```cpp
Mat video_frame_temp, temp_frame_downloaded;
GpuMat mask_image, video_frame, temp_frame;

void initWindow()
{
    namedWindow(WINDOW_NAME, WINDOW_AUTOSIZE);
}

void blendFrame()
{
    while (getWindowProperty(WINDOW_NAME, WINDOW_AUTOSIZE) != -1)
    {        
        grabFrame();
        if (video_frame_temp.empty())
        {
            break;
        }
        video_frame.upload(video_frame_temp);
        blendImage();
        outputImage();
        waitKey(GRAB_DELAY);
    }
}

void grabFrame()
{
    capture >> video_frame_temp;
}

void blendImage()
{
    cv::cuda::addWeighted(video_frame, ALPHA, mask_image, BETA, 0.0, temp_frame);
}

void outputImage()
{
    temp_frame.download(temp_frame_downloaded);
    imshow(WINDOW_NAME, temp_frame_downloaded);
}
```

With _OpenGL_ support, we could easily write using built-in function:

```cpp
namedWindow(WINDOW_NAME, WINDOW_AUTOSIZE)
namedWindow(WINDOW_NAME, WINDOW_OPENGL)
```

Using `WINDOW_OPENGL` and then we could access `temp_frame` directly by enabling function `imshow` to directly access to _GPU Memory_. For example `outputImage` could be write like this:

```cpp
void outputImage()
{
    imshow(WINDOW_NAME, temp_frame);
}
```

It saves valuable time when copying GPU Memory to RAM and makes processed image displayed faster.
