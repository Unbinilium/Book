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

## Color area

:::tip

```cpp
ubn::colorArea(ubn::StreamProp stream_prop, ubn::RectProp rect_prop, std::vector<ubn::ColorRange> color, unsigned int tries)
```

:::

A basic function used for calculating the area size of specialized colors and find the color which has the biggest area size using *OpenCV*, multithreading featured.


```cpp
/* Written by Unbinilium Jan, 12, 2020 :( */

//Include basic headers
#include <vector>
#include <string>
#include <iostream>

//Include opencv headers
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/imgproc.hpp>

//Include multithreading headers
#include <thread>
#include <semaphore.h>

//Create my own namespace
namespace ubn {
    
    //Struct video streaming prop class
    class StreamProp
    {
    public:
        const int camera_id;
        const int api_id;
        const int frame_width;
        const int frame_height;
        const int camrea_exposure_mode;
        const int camera_exposure;
        int frame_threshold[4];
        int camera_angle_V;
        int waitkey_delay;
    };
    
    //Struct color area threshold prop class
    class RectProp
    {
    public:
        int contour_depth;
        double canny_threshold;
        double area_threshold;
        double cosine_max_threshold;
        double approx_epsilon;
    };
    
    //Struct color range threshold class
    class ColorRange
    {
    public:
        const std::string color_name;
        int lowerb[3];
        int upperb[3];
        int threshold;
        int color_location;
    };
    //Struct call back function for opencv trackbar
    void callBack(int, void *)
    {}
    
    //Calculate the distance between 2 point p1 and p2
    template <typename T>
    static double calPointDist(T &p1, T &p2)
    {
        int a = int(p1.x - p2.x), b = int(p1.y - p2.y);
        
        return std::sqrt(a * a + b * b);
    }
    
    //Calculate the intersect point between 2 line a and b
    static cv::Point2f calIntersect(cv::Vec4i &a, cv::Vec4i &b)
    {
        cv::Point2f pt;
        int S[4] = { a[0] - a[2],a[1] - a[3],b[0] - b[2],b[1] - b[3] };
        int A = a[0] * a[3] - a[1] * a[2], B = b[0] * b[3] - b[1] * b[2], C = S[0] * S[3] - S[1] * S[2];
        
        pt.x = (A * S[2] - B * S[0]) / C;
        pt.y = (A * S[3] - B * S[1]) / C;
        
        return pt;
    }
    
    //Calculate the cross line's angle by 3 point pt0, pt1 and pt2
    static double calAngle(cv::Point &pt1, cv::Point &pt2, cv::Point &pt0)
    {
        double dx1 = pt1.x - pt0.x, dy1 = pt1.y - pt0.y, dx2 = pt2.x - pt0.x, dy2 = pt2.y - pt0.y;
        
        return (dx1 * dx2 + dy1 * dy2) / std::sqrt((dx1 * dx1 + dy1 * dy1) * (dx2 * dx2 + dy2 * dy2) + 1e-10);
    }
    
    //Find the maxium rectangle as recognition screen
    static bool findRects(cv::Mat &input_image, cv::Mat &output_image, std::vector<std::vector<cv::Point>> &rects, ubn::RectProp &rect_prop)
    {
        cv::Mat input_image_pyr, input_image_tmp, input_image_gray, input_image_gray_tmp(input_image.size(), CV_8U);
        
        //Scale the image to 1/2 and restore it's original size to denoise
        cv::pyrDown(input_image, input_image_pyr, cv::Size(input_image.cols / 2, input_image.rows / 2));
        cv::pyrUp(input_image_pyr, input_image_tmp, input_image.size());
        
        std::vector<std::vector<cv::Point>> contours;
        
        //Do something on each channel of input image
        for(int i = 0; i != 3; i++)
        {
            int ch[] = {i, 0};
            
            //Separate hue channel from input image
            cv::mixChannels(&input_image_tmp, 1, &input_image_gray_tmp, 1, ch, 1);
            
            //Extract contours, loop serval times
            for(int j = 0; j != rect_prop.contour_depth; j++)
            {
                
                //Canny and dilate for the first time, threshold from the second time
                if(j == 0)
                {
                    cv::Canny(input_image_gray_tmp, input_image_gray, 0, rect_prop.canny_threshold, 5);
                    cv::dilate(input_image_gray, input_image_gray, cv::Mat(), cv::Point(-1,-1));
                }
                else
                {
                    input_image_gray = input_image_gray_tmp >= (j + 1) * 255 / rect_prop.contour_depth;
                }
                
                //Find contours
                cv::findContours(input_image_gray, contours, cv::RETR_LIST, cv::CHAIN_APPROX_SIMPLE);
                
                std::vector<cv::Point> approx;
                
                //For each contour in contours
                for(auto& _contours : contours)
                {  
                    //Approximates a polygonal curve with the specified precision
                    cv::approxPolyDP(_contours, approx, cv::arcLength(_contours, true) * rect_prop.approx_epsilon, true);
                    
                    //Test contour convexity and if contour area is larger than threshold
                    if(approx.size() == 4 && std::fabs(cv::contourArea(approx)) > rect_prop.area_threshold && cv::isContourConvex(approx))
                    {
                        double cosine_max = 0;
                        
                        for(int l = 2; l != 5; l++)
                        {
                            double cosine = std::fabs(ubn::calAngle(approx[uint(l % 4)], approx[uint(l - 2)], approx[uint(l - 1)]));
                            
                            cosine_max = MAX(cosine_max, cosine);
                        }
                        
                        //Select the rects which each corner angle cosine is less than 0.3
                        if(cosine_max < 0.3)
                        {
                            rects.push_back(approx);
                        }
                    }
                }
                
                contours.clear();
                approx.clear();
            }
        }
        
        //No rectangles find
        if(rects.size() == 0)
        {
            return false;
        }
        
        unsigned int area_max_tag = 0;
        double area_cur_tmp = 0, area_max_tmp = 0;
        
        //Find the maxium rectangle contour
        for(unsigned int i = 0; i != rects.size(); i++)
        {
            area_cur_tmp = cv::contourArea(rects[i]);
            
            if(area_cur_tmp > area_max_tmp)
            {
                area_max_tmp = area_cur_tmp;
                area_max_tag = i;
            }
        }
        
        std::vector<cv::Vec4i> edges;
        
        //Inspect 4 edges form maxium rectangle contour
        for(unsigned int i = 0; i != rects[area_max_tag].size(); i++)
        {
            cv::Point p1 = rects[area_max_tag][i];
            cv::Point p2 = rects[area_max_tag][(i + 1) % rects[area_max_tag].size()];
            
            if(ubn::calPointDist(p1, p2) > 2 * cv::arcLength(rects[area_max_tag], true) * rect_prop.approx_epsilon)
            {
                edges.push_back(cv::Vec4i(p1.x, p1.y, p2.x, p2.y));
            }
        }
        
        std::vector<cv::Point> corners;
        
        //Inspect 4 corner form maxium rectangle contour
        for(unsigned int i = 0; i != edges.size(); i++)
        {
            cv::Point cornor = ubn::calIntersect(edges[i], edges[(i + 1) % edges.size()]);
            
            corners.push_back(cornor);
        }
        
        edges.clear();
        
        //Transform cornor data type
        std::vector<cv::Point2f> corners2f;
        std::transform(corners.begin(), corners.end(), std::back_inserter(corners2f), [](const cv::Point &p) { return cv::Point2f(p); });
        
        corners.clear();
        
        //Sort cornor by point location
        if(corners2f.size() != 0)
        {
            unsigned int corner_index = 0;
            cv::Point2f corner_tmp = corners2f[0];
            
            //Sort cornor from left to right
            for(unsigned int i = 1; i != corners2f.size(); i++)
            {
                if(corner_tmp.x > corners2f[i].x)
                {
                    corner_tmp = corners2f[i];
                    corner_index = i;
                }
            }
            
            corners2f[corner_index] = corners2f[0];
            corners2f[0] = corner_tmp;
            
            //Sort cornor from up to down
            for(unsigned int i = 1; i != corners2f.size(); i++)
            {
                for(unsigned int j = i + 1; j != corners2f.size(); j++)
                {
                    if((corners2f[i].y - corners2f[0].y) / (corners2f[i].x - corners2f[0].x) > (corners2f[j].y - corners2f[0].y) / (corners2f[j].x - corners2f[0].x))
                    {
                        cv::Point2f tmp = corners2f[i];
                        corners2f[i] = corners2f[j];
                        corners2f[j] = tmp;
                    }
                }
            }
        }
        
        //Calculate perspective anchor
        cv::Point2f anchor[4] = { corners2f[0],corners2f[1],corners2f[2],corners2f[3] };
        double anchor_dist[4] = { ubn::calPointDist(anchor[0], anchor[1]),ubn::calPointDist(anchor[1], anchor[2]),ubn::calPointDist(anchor[2], anchor[3]),ubn::calPointDist(anchor[3], anchor[0]) };
        int width = int(MAX(anchor_dist[1], anchor_dist[3]));
        int height = int(MAX(anchor_dist[0], anchor_dist[2]));
        
        input_image_tmp = input_image.clone();
        output_image = cv::Mat::zeros(height, width, CV_8UC3);
        
        std::vector<cv::Point2f> output_image_anchor;
        
        output_image_anchor.push_back(cv::Point2f(0, output_image.rows));
        output_image_anchor.push_back(cv::Point2f(0, 0));
        output_image_anchor.push_back(cv::Point2f(output_image.cols, 0));
        output_image_anchor.push_back(cv::Point2f(output_image.cols, output_image.rows));
        
        //Applies the perspective transformation to input image
        cv::warpPerspective(input_image_tmp, output_image, cv::getPerspectiveTransform(corners2f , output_image_anchor), output_image.size());
        
        corners2f.clear();
        output_image_anchor.clear();
        
        return true;
    }
    
    //Struct color area class
    class ColorArea
    {
    public:
        double area_sum = 0;
        
        //Threshold image in color range
        void inRangeColorArea(cv::Mat input_img, ubn::ColorRange input_color);
        
        //Display image
        void inRangeColorView(const std::string window_name)
        {
            cv::imshow(window_name, input_img_tmp);
        }
        
    private:
        cv::Mat input_img_tmp;
        cv::Scalar input_lowerb_tmp;
        cv::Scalar input_upperb_tmp;
    };
    
    class FrameHelper
    {
    public:
        std::vector<sem_t *> sem;
        cv::Mat *frame;
        ubn::StreamProp *stream_prop;
        ubn::RectProp *rect_prop;
    };

    class ColorAreaHelper
    {
    public:
        sem_t *sem[2];
        cv::Mat *frame;
        ubn::ColorArea *color_area;
        ubn::ColorRange *input_color;
    };

    class SortHelper
    {
    public:
        std::vector<sem_t *> sem;
        ubn::StreamProp *stream_prop;
        std::vector<ubn::ColorArea *> color_area;
        std::vector<ubn::ColorRange *> input_color;
        const unsigned int *color_variety;
        unsigned int *tries;
        unsigned int *color_area_freq_max_tag;
    };
    
    //Calculate the area of one color
    static void areaOfColor(cv::Mat *p_input_img, cv::Scalar *p_input_lowerb, cv::Scalar *p_input_upperb, double *p_area_sum, int *p_threshold)
    {
        *p_area_sum = 0;
        double area_tmp;
        
        std::vector<std::vector<cv::Point>> contours;
        std::vector<cv::Vec4i> hierarchy;
        
        //Find contours
        cv::inRange(*p_input_img, *p_input_lowerb, *p_input_upperb, *p_input_img);
        cv::findContours(*p_input_img, contours, hierarchy, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_SIMPLE);
        
        //Sum the area of all founded contours
        for(auto& _contours : contours)
        {
            area_tmp = cv::contourArea(_contours);
            if(area_tmp > *p_threshold)
            {
                *p_area_sum += area_tmp;
            }
        }
        
        contours.clear();
        hierarchy.clear();
    }
    
    //Clone image in ColorArea, pass to areaOfColor function
    void ColorArea::inRangeColorArea(cv::Mat input_img, ubn::ColorRange input_color)
    {
        input_img_tmp = input_img.clone();
        input_lowerb_tmp = cv::Scalar(input_color.lowerb[0], input_color.lowerb[1], input_color.lowerb[2]);
        input_upperb_tmp = cv::Scalar(input_color.upperb[0], input_color.upperb[1], input_color.upperb[2]);
        
        //Pass cloned image and HSV threshold to calculate color area
        areaOfColor(&input_img_tmp, &input_lowerb_tmp, &input_upperb_tmp, &area_sum, &input_color.threshold);
    }
    
    //Read frame from camera and find the display
    static void frameHelper(ubn::FrameHelper *helper)
    { 
        //Open camera
        cv::VideoCapture capture;
        capture.open(helper->stream_prop->camera_id + helper->stream_prop->api_id);
        if(capture.isOpened() == false)
        {
            std::cerr << "colorArea: capture not opened" << std::endl;
            
            return;
        }
        capture.set(cv::CAP_PROP_FRAME_WIDTH, helper->stream_prop->frame_width);
        capture.set(cv::CAP_PROP_FRAME_HEIGHT, helper->stream_prop->frame_height);
        capture.set(cv::CAP_PROP_AUTO_EXPOSURE, helper->stream_prop->camrea_exposure_mode);
        capture.set(cv::CAP_PROP_EXPOSURE, helper->stream_prop->camera_exposure);
        
        std::cout << "colorArea: capture set->" << helper->stream_prop->camera_id + helper->stream_prop->api_id << "->" << helper->stream_prop->frame_width << ":" << helper->stream_prop->frame_height << std::endl;
        
        cv::Mat frame;
        std::vector<std::vector<cv::Point>> rects;
        
        //Grab frames from camera
        while(true)
        {
            capture.read(frame);
            
            //Avoid empty frame
            if(frame.empty())
            {
                continue;
            }
            
            //Crop frame
            frame = frame(cv::Range(helper->stream_prop->frame_threshold[2], helper->stream_prop->frame_threshold[3]), cv::Range(helper->stream_prop->frame_threshold[0], helper->stream_prop->frame_threshold[1]));
            
            //Display frame
            cv::imshow("frame", frame);
            cv::waitKey(helper->stream_prop->waitkey_delay);
            
            //Find maxium rect display in frame
            if(ubn::findRects(frame, frame, rects, *helper->rect_prop))
            {
                continue;
            }
            rects.clear();
            
            //Convert frame color from HSV to BGR
            cv::cvtColor(frame, frame, cv::COLOR_HSV2BGR_FULL);
            
            //Decrease singal sem[0]
            sem_wait(helper->sem[0]);

            //Copy frame data to *helper->frame
            frame.copyTo(*helper->frame);

            //Increase the singal for colorAreaHelper threads
            const unsigned int loop = u_int((helper->sem.size() - 1) / 2 + 1);
            for(unsigned int i = 1; i != loop; i++)
            {
                sem_post(helper->sem[i]);
            }
        }
    }
    
    //Calculate area size for each colors
    [[noreturn]]static void colorAreaHelper(ubn::ColorAreaHelper *helper)
    { 
        while(true)
        {
            //Wait singal sem[0]
            sem_wait(helper->sem[0]);
            
            //Calculate area size for one color
            helper->color_area->inRangeColorArea(*helper->frame, *helper->input_color);
            
            //Increase singal sem[1]
            sem_post(helper->sem[1]);
        }
    }
    

    static void sortHelper(ubn::SortHelper *helper)
    {
        int tries = int(*helper->tries);
        unsigned int color_area_max_tag = 0;
        std::vector<unsigned int> color_area_freq(*helper->color_variety, 0);
        
        int cur_color = 0;
        int cur_color_tag = int(long(helper->color_variety - 1));
        
        std::string cur_name;
        std::string cur_slider_name;
        
        //Display color and HSV threshold slider window
        cv::namedWindow(helper->input_color[uint(cur_color)]->color_name, cv::WINDOW_AUTOSIZE);
        cv::namedWindow((helper->input_color[uint(cur_color)]->color_name + " slider"), cv::WINDOW_AUTOSIZE);
        
        //Sort all areas
        while(true && tries--)
        {
            //Wait colorAreaHelper threads finish
            const unsigned int loop = *helper->color_variety + 1;
            for(unsigned int i = loop; i != helper->sem.size(); i++)
            {
                sem_wait(helper->sem[i]);
            }
            
            //Increase signal sem[0]
            sem_post(helper->sem[0]);

            double color_area_max = 0;
            
            //Find the maxium color area's color index
            for(unsigned int i = 0; i != *helper->color_variety; i++)
            {
                if(helper->color_area[i]->area_sum > color_area_max)
                {
                    color_area_max = helper->color_area[i]->area_sum;
                    color_area_max_tag = i;
                }
            }
            
            //Increase color_area_freq for maxium color area's color index
            color_area_freq[color_area_max_tag]++;
            
            std::cout << "colorArea: " << helper->input_color[color_area_max_tag]->color_name << "->" << color_area_freq[color_area_max_tag] << ":" << color_area_max << std::endl;
            
            //Create and refreash sliderbar if current color window is changed
            if(cur_color_tag != cur_color)
            {
                cur_name = helper->input_color[uint(cur_color)]->color_name;
                cur_slider_name = cur_name + " slider";
                
                if(int(cv::getWindowProperty(helper->input_color[uint(cur_color_tag)]->color_name, cv::WINDOW_AUTOSIZE)) != -1)
                {
                    cv::destroyWindow(std::string(helper->input_color[uint(cur_color_tag)]->color_name));
                    cv::namedWindow(cur_name, cv::WINDOW_AUTOSIZE);
                }
                if(int(cv::getWindowProperty(std::string(helper->input_color[uint(cur_color_tag)]->color_name + " slider"), cv::WINDOW_AUTOSIZE)) != -1)
                {
                    cv::destroyWindow(std::string(helper->input_color[uint(cur_color_tag)]->color_name + " slider"));
                    cv::namedWindow(cur_slider_name, cv::WINDOW_AUTOSIZE);
                }
                
                cv::createTrackbar("Color", cur_slider_name, &cur_color, int(*helper->color_variety - 1), ubn::callBack);
                cv::createTrackbar("T_Area", cur_slider_name, &helper->input_color[uint(cur_color)]->threshold, helper->stream_prop->frame_width * helper->stream_prop->frame_height, ubn::callBack);
                cv::createTrackbar("T_x_s", cur_slider_name, &helper->stream_prop->frame_threshold[0], helper->stream_prop->frame_width, ubn::callBack);
                cv::createTrackbar("T_x_e", cur_slider_name, &helper->stream_prop->frame_threshold[1], helper->stream_prop->frame_width, ubn::callBack);
                cv::createTrackbar("T_y_s", cur_slider_name, &helper->stream_prop->frame_threshold[2], helper->stream_prop->frame_height, ubn::callBack);
                cv::createTrackbar("T_y_e", cur_slider_name, &helper->stream_prop->frame_threshold[3], helper->stream_prop->frame_height, ubn::callBack);
                cv::createTrackbar("H_L", cur_slider_name, &helper->input_color[uint(cur_color)]->lowerb[0], 360, ubn::callBack);
                cv::createTrackbar("H_U", cur_slider_name, &helper->input_color[uint(cur_color)]->upperb[0], 360, ubn::callBack);
                cv::createTrackbar("S_L", cur_slider_name, &helper->input_color[uint(cur_color)]->lowerb[1], 255, ubn::callBack);
                cv::createTrackbar("S_U", cur_slider_name, &helper->input_color[uint(cur_color)]->upperb[1], 255, ubn::callBack);
                cv::createTrackbar("V_L", cur_slider_name, &helper->input_color[uint(cur_color)]->lowerb[2], 255, ubn::callBack);
                cv::createTrackbar("V_U", cur_slider_name, &helper->input_color[uint(cur_color)]->upperb[2], 255, ubn::callBack);
            }
            
            cur_color_tag = cur_color;
            
            helper->color_area[uint(cur_color)]->inRangeColorView(cur_name);
            cv::waitKey(helper->stream_prop->waitkey_delay);
            
        }
        
        //Find the maxium color_area_freq and set as color_area_freq_max_tag
        for(unsigned int i = 0; i != color_area_freq.size(); i++)
        {
            if(color_area_freq[i] > color_area_freq[*helper->color_area_freq_max_tag])
            {
                *helper->color_area_freq_max_tag = i;
            }
        }
        
        std::cout << "colorArea: " << "maxarea" << "->" << helper->input_color[*helper->color_area_freq_max_tag]->color_name << ":" << color_area_freq[*helper->color_area_freq_max_tag] << std::endl;
        std::cout << "colorArea: ended->" << *helper->tries << std::endl;
        
        color_area_freq.clear();
        
        cv::destroyAllWindows();
        
        return;
    }
    
    unsigned int colorArea(ubn::StreamProp stream_prop, ubn::RectProp rect_prop, std::vector<ubn::ColorRange> color, unsigned int tries)
    {
        cv::Mat frame;
        unsigned int color_area_freq_max_tag = 0;
        unsigned int color_variety = color.size();
        
        std::vector<std::thread> threads;
        std::vector<sem_t> sem(color_variety * 2 + 1);

        sem_post(&sem[0]);
        
        //Create frameHelper thread
        ubn::FrameHelper frame_helper;
        frame_helper.frame = &frame;
        for(auto& _sem : sem)
        {
            frame_helper.sem.push_back(&_sem);
        }
        frame_helper.stream_prop = &stream_prop;
        frame_helper.rect_prop = &rect_prop;
        threads.push_back(std::thread(ubn::frameHelper, &frame_helper));
        
        //Create colorArea thread
        std::vector<ubn::ColorArea> color_area(color_variety);
        std::vector<ubn::ColorAreaHelper> color_area_helper(color_variety);
        for(unsigned int i = 0; i != color_variety; i++)
        {
            color_area_helper[i].frame = &frame;
            color_area_helper[i].sem[0] = &sem[i + 1];
            color_area_helper[i].sem[1] = &sem[i + color_variety + 1];
            color_area_helper[i].color_area = &color_area[i];
            color_area_helper[i].input_color = &color[i];
            threads.push_back(std::thread(ubn::colorAreaHelper, &color_area_helper[i]));
        }
        
        //Create sortHelper thread
        ubn::SortHelper sort_helper;
        for(auto& _sem : sem)
        {
            sort_helper.sem.push_back(&_sem);
        }
        sort_helper.stream_prop = &stream_prop;
        for(unsigned int i = 0; i != color_variety; i++)
        {
            sort_helper.color_area.push_back(&color_area[i]);
            sort_helper.input_color.push_back(&color[i]);
        }
        sort_helper.color_variety = &color_variety;
        sort_helper.tries = &tries;
        sort_helper.color_area_freq_max_tag = &color_area_freq_max_tag;
        threads.push_back(std::thread(ubn::sortHelper, &sort_helper));
        
        threads[threads.size() - 1].join();
        for(unsigned int i = 0; i != threads.size() - 1; i++)
        {
            threads[i].detach();
        }

        for(auto& _sem : sem)
        {
            sem_close(&_sem);
        }

        threads.clear();
        sem.clear();
        color_area.clear();
        color_area_helper.clear();
        
        return color_area_freq_max_tag;
    } 
}
```

