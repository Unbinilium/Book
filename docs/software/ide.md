---
title: IDE
---

## Xcode

Xcode is a complete developer toolset for creating apps for Mac, iPhone, iPad, Apple Watch, and Apple TV. Xcode brings user interface design, coding, testing, debugging, and submitting to the App Store all into a unified workflow.

### Getstarted with OpenCV

Setting up OpenCV and C++ environment on macOS using Xcode.

#### Pre Requirements

- Install Homebrew

Aptly titled *"The missing package manager for macOS"* is enough said. Homebrew is the macOS equivalent of the Ubuntu/Debian-based `apt-get`.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Install OpenCV

Simply we use *brew* to install the latest pre-compiled *OpenCV* to our computer:

```bash
brew install opencv
```

- Install pkg-config

The pkg-config is a helper tool used when compiling applications and libraries. It helps you insert the correct compiler options on the command line rather than hard-coding values. This will be helpful for finding the correct linker flags for OpenCV. This will be more clear in the subsequent steps.

```bash
brew install pkg-config
```

- View OpenCV linker flags

To view the linker flags for OpenCV, we should find `.pc` file first. It's common to see this file in:

```
/usr/local/Cellar/opencv/<version_number>/lib/pkgconfig/opencv.pc
```

Then view the linker flags by specifing the location of opencv.pc file:

```bash
pkg-config --cflags --libs <path/to/opencv.pc>
```

#### Commandline

Running code in the terminal, the code should be compiled first:

```bash
g++ $(pkg-config --cflags --libs <path/to/opencv.pc>) -std=c++17  main.cpp -o main.o
```

Then run the binary:

```bash
chmod +x main.o
./main.o
```

#### Xcode developing

##### Configure enviroment

- Create project

    Before following the below steps to run OpenCV C++ code in Xcode, a C++ project in Xcode should be created first.

    1. Click on `File > New > Project`
    1. Under Choose a template for new project click on **macOS**
    1. Under Application click on **Command Line Tool**
    1. Get the above screen. Fill in the details and set the Language to **C++**.

- Set Header Search Paths

    1. To set Header Search Path in Xcode, first click on the Xcode project, then go to **Build Settings** and then search for **Header Search Paths**.
    1. Set the Header Search Path to the path of OpenCV include folder:
    ```
    /usr/local/Cellar/opencv/<version_number>/include/opencv4/opencv2
    /usr/local/Cellar/opencv/<version_number>/include/opencv4
    /usr/local/Cellar/opencv/<version_number>/include
    ```

- Set Library Search Paths

    1. In this case, follow steps similar to *Set Header Search Paths* above but search for **Library Search Paths** in the search bar.
    1. Set the Library Search Path to the path of OpenCV library folder.
    ```
    /usr/local/Cellar/opencv/<version_number>/lib
    ```

- Set Other Linker Flags

Search for **Other Linker Flags** in the search bar.
Set the other linker flags with all the flag values obtained after running `pkg-config` command above.

##### Apply permitions

- To allow camera access, first click on the Xcode project, then go to **TARGETS > Signing & Capabilities** and check **Disable Library Validation**, **Debugging Tool**, **Audio Input** and **Camera**.

- Create `Info.plist`, add access requirement details:

    ```
    Key: Privacy - Camera Usage Description
    Value: $(PRODUCT_NAME) camera use
    ```

    Then go to **TARGETS > Build Phases > Copy Files**, select *Destnation* to **Products Directory**, leave *Subpath* blank and click `+` to select file `Info.plist`.


:::tip

Ref: [Setting up OpenCV and C++ development environment in Xcode for Computer Vision projects](https://medium.com/@jaskaranvirdi/setting-up-opencv-and-c-development-environment-in-xcode-b6027728003)

:::

## Visual Studio Code

Editing and debugging on any OS.

### Using Clang in Visual Studio Code

:::tip

[C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp)

:::

In this tutorial, you configure Visual Studio Code on macOS to use the Clang/LLVM compiler and debugger.

After configuring VS Code, you will compile and debug a simple C++ program in VS Code. This tutorial does not teach you about Clang or the C++ language. For those subjects, there are many good resources available on the Web.

If you have any trouble, feel free to file an issue for this tutorial in the [VS Code documentation repository](https://github.com/microsoft/vscode-docs/issues).

#### Prerequisites

To successfully complete this tutorial, you must do the following:

- Install [Visual Studio Code on macOS](https://code.visualstudio.com/docs/setup/mac.md).

- Install the [C++ extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools).

    You can install the C/C++ extension by searching for `c++` in the Extensions view (⇧⌘X).

- Ensure Clang is installed.

    Clang may already be installed on your Mac. To verify that it is, open a macOS Terminal window and enter the following command:

    ```bash
    clang --version
    ```

    If Clang isn't installed, enter the following command to install the command line developer tools:

    ```bash
    xcode-select --install
    ```

#### Coding

- Create Hello World

    From the macOS Terminal, create an empty folder called `projects` where you can store all your VS Code projects, then create a subfolder called `helloworld`, navigate into it, and open VS Code in that folder by entering the following commands:

    ```bash
    mkdir projects
    pushd projects
    mkdir helloworld
    pushd helloworld
    code .
    ```

    The `code .` command opens VS Code in the current working folder, which becomes your "workspace". As you go through the tutorial, you will create three files in a `.vscode` folder in the workspace:

    - `tasks.json` (compiler build settings)
    - `launch.json` (debugger settings)
    - `c_cpp_properties.json` (compiler path and IntelliSense settings)

- Add hello world source code file

    In the File Explorer title bar, select **New File** and name the file `helloworld.cpp`.

    Paste in the following source code:

    ```cpp
    #include <iostream>
    #include <vector>
    #include <string>

    using namespace std;

    int main()
    {
        vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

        for (const string& word : msg)
        {
            cout << word << " ";
        }
        cout << endl;
    }
    ```

    Now press (⇧⌘S) to save the file. Notice that your files are listed in the **File Explorer** view in the side bar of VS Code:

    You can also enable [Auto Save](https://code.visualstudio.com/docs/editor/codebasics.md#saveauto-save) to automatically save your file changes, by checking **Auto Save** in the main **File** menu.

    The Activity Bar on the edge of Visual Studio Code lets you open different views such as **Search**, **Source Control**, and **Run**. You'll look at the **Run** view later in this tutorial. You can find out more about the other views in the VS Code [User Interface documentation](https://code.visualstudio.com/docs/getstarted/userinterface.md).

:::tip

**Note**: When you save or open a C++ file, you may see a notification from the C/C++ extension about the availability of an Insiders version, which lets you test new features and fixes. You can ignore this notification by selecting the `X` (**Clear Notification**).

:::

- Explore IntelliSense

    In the `helloworld.cpp` file, hover over `vector` or `string` to see type information. After the declaration of the `msg` variable, start typing `msg.` as you would when calling a member function. You should immediately see a completion list that shows all the member functions, and a window that shows the type information for the `msg` object.

    You can press the (Tab) key to insert the selected member. Then, when you add the opening parenthesis, you'll see information about arguments that the function requires.

#### Build

Next, you'll create a `tasks.json` file to tell VS Code how to build (compile) the program. This task will invoke the Clang C++ compiler to create an executable file from the source code.

It's important to have `helloworld.cpp` open in the editor because the next step uses the active file in the editor as context to create the build task in the next step.

From the main menu, choose **Terminal > Configure Default Build Task**.

A dropdown will appear listing various predefined build tasks for the compilers that VS Code found on your machine. Choose **C/C++ clang++ build active file** to build the file that is currently displayed (active) in the editor.

This will create a `tasks.json` file in the `.vscode` folder and open it in the editor.

Replace the contents of that file with the following:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "type": "shell",
            "label": "clang++ build active file",
            "command": "/usr/bin/clang++",
            "args": [
                "-std=c++17",
                "-stdlib=libc++",
                "-g",
                "${file}",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

The JSON above differs from the default template JSON in the following ways:

- `"args"` is updated to compile with C++17 because our `helloworld.cpp` uses C++17 language features.

-  *C++ Standards:*

    - C++98
    - C++11 (aka C++0x)
    - C++14 (aka C++1y)
    - C++17 (aka C++1z)
    - C++2a (next planned standard in 2020)

- Changes the current working directory directive (`"cwd"`) to the folder where `helloworld.cpp` is.

The `command` setting specifies the program to run. In this case, `"clang++"` is the driver that causes the Clang compiler to expect C++ code and link against the C++ standard library.

The `args` array specifies the command-line arguments that will be passed to clang++. These arguments must be specified in the order expected by the compiler.

This task tells the C++ compiler to compile the active file (`${file}`), and create an output file (`-o` switch) in the current directory (`${fileDirname}`) with the same name as the active file (`${fileBasenameNoExtension}`), resulting in `helloworld` for our example.

The `label` value is what you will see in the tasks list. Name this whatever you like.

The `problemMatcher` value selects the output parser to use for finding errors and warnings in the compiler output. For clang++, you'll get the best results if you use the `$gcc` problem matcher.

The `"isDefault": true` value in the `group` object specifies that this task will be run when you press `kb(workbench.action.tasks.build)`. This property is for convenience only; if you set it to `false`, you can still build from the Terminal menu with **Terminal > Run Build Task**.

:::tip

**Note**: You can learn more about `task.json` variables in the [variables reference](/docs/editor/variables-reference.md).

:::

-  Running the build

    1. Go back to `helloworld.cpp`. Because we want to build `helloworld.cpp` it is important that this file be the one that is active in the editor for the next step.

    1. To run the build task that you defined in tasks.json, press `kb(workbench.action.tasks.build)` or from the **Terminal** main menu choose **Run Build Task**.

    1. When the task starts, you should see the Integrated Terminal window appear below the code editor. After the task completes, the terminal shows output from the compiler that indicates whether the build succeeded or failed.

    1. Create a new terminal using the **+** button and you'll have a new terminal with the `helloworld` folder as the working directory. Run `ls` and you should now see the executable `helloworld` along with the debugging file (`helloworld.dSYM`).

    1. You can run `helloworld` in the terminal by typing `./helloworld`.

-  Modifying tasks.json

    You can modify your `tasks.json` to build multiple C++ files by using an argument like `"${workspaceFolder}/*.cpp"` instead of `${file}`. This will build all `.cpp` files in your current folder. You can also modify the output filename by replacing `"${fileDirname}/${fileBasenameNoExtension}"` with a hard-coded filename (for example `"${workspaceFolder}/myProgram.out"`).

- Debug helloworld.cpp

    Next, you'll create a `launch.json` file to configure VS Code to launch the LLDB debugger when you press `kb(workbench.action.debug.start)` to debug the program.

    From the main menu, choose **Run** > **Add Configuration...** and then choose **C++ (GDB/LLDB)**.

    You'll then see a dropdown for predefined debugging configurations. Choose **clang++ build and debug active file**.

    VS Code creates a `launch.json` file, opens it in the editor, and builds and runs 'helloworld'. Your `launch.json` file will look something like this:

    ```json
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "name": "clang++ - Build and debug active file",
                "type": "cppdbg",
                "request": "launch",
                "program": "${fileDirname}/${fileBasenameNoExtension}",
                "args": [],
                "stopAtEntry": true,
                "cwd": "${workspaceFolder}",
                "environment": [],
                "externalConsole": false,
                "MIMode": "lldb",
                "preLaunchTask": "clang++ build active file"
            }
        ]
    }
    ```

    The `program` setting specifies the program you want to debug. Here it is set to the active file folder `${fileDirname}` and active filename `${fileBasenameNoExtension}`, which if `helloworld.cpp` is the active file will be `helloworld`.

    By default, the C++ extension won't add any breakpoints to your source code and the `stopAtEntry` value is set to `false`.

    Change the `stopAtEntry` value to `true` to cause the debugger to stop on the `main` method when you start debugging.

    Ensure that the `preLaunchTask` value matches the `label` of the build task in the `task.json` file.

-  Start a debugging session

    1. Go back to `helloworld.cpp` so that it is the active file in the editor. This is important because VS Code uses the active file to determine what you want to debug.

    1. Press (⌘R) or from the main menu choose **Run > Start Debugging**. Before you start stepping through the source code, let's take a moment to notice several changes in the user interface:

    - The Integrated Terminal appears at the bottom of the source code editor. In the **Debug Output** tab, you see output that indicates the debugger is up and running.

    - The editor highlights the first statement in the `main` method. This is a breakpoint that the C++ extension automatically sets for you.

    - The Run view on the left shows debugging information. You'll see an example later in the tutorial.

    - At the top of the code editor, a debugging control panel appears. You can move this around the screen by grabbing the dots on the left side.

- Step through the code

    Now you're ready to start stepping through the code.

    1. Click or press the **Step over** icon in the debugging control panel so that the `for (const string& word : msg)` statement is highlighted.

        The **Step Over** command skips over all the internal function calls within the `vector` and `string` classes that are invoked when the `msg` variable is created and initialized. Notice the change in the **Variables** window. The contents of `msg` are visible because that statement has completed.

    1. Press **Step over** again to advance to the next statement (skipping over all the internal code that is executed to initialize the loop). Now, the **Variables** window shows information about the loop variable.

    1. Press **Step over** again to execute the `cout` statement. **Note** As of the March 2019 version of the extension, no output will appear in the DEBUG CONSOLE until the last `cout` completes.

- Set a watch

    You might want to keep track of the value of a variable as your program executes. You can do this by setting a **watch** on the variable.

    1. Place the insertion point inside the loop. In the **Watch** window, click the plus sign and in the text box, type `word`, which is the name of the loop variable. Now view the **Watch** window as you step through the loop.

    1. To quickly view the value of any variable while execution is paused, you can hover over it with the mouse pointer.

#### C/C++ configuration

For more control over the C/C++ extension, create a `c_cpp_properties.json` file, which allows you to change settings such as the path to the compiler, include paths, which C++ standard to compile against (such as C++17), and more.

View the C/C++ configuration UI by running the command **C/C++: Edit Configurations (UI)** from the Command Palette (`kb(workbench.action.showCommands)`).

This opens the **C/C++ Configurations** page.

Visual Studio Code places these settings in `.vscode/c_cpp_properties.json`. If you open that file directly, it should look something like this:

```json
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "intelliSenseMode": "clang-x64"
        }
    ],
    "version": 4
}
```

You only need to modify the **Include path** setting if your program includes header files that are not in your workspace or the standard library path.

- Compiler path

    The `compilerPath` is an important configuration setting. The extension uses it to infer the path to the C++ standard library header files. When the extension knows where to find those files, it can provide useful features like smart completions and **Go to Definition** navigation.

    The C/C++ extension attempts to populate `compilerPath` with the default compiler location based on what it finds on your system. The `compilerPath` search order is:

    * Your PATH for the names of known compilers. The order the compilers appear in the list depends on your PATH.

    * Then hard-coded XCode paths are searched, such as `/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/`

- Mac framework path

    On the C/C++ Configuration screen, scroll down and expand **Advanced Settings** and ensure that **Mac framework path** points to the system header files. For example: `/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks`

- Reusing your C++ configuration

    VS Code is now configured to use Clang on macOS. The configuration applies to the current workspace. To reuse the configuration, just copy the JSON files to a `.vscode` folder in a new project folder (workspace) and change the names of the source file(s) and executable as needed.

#### Troubleshooting

- Compiler and linking errors

    The most common cause of errors (such as `undefined _main`, or `attempting to link with file built for unknown-unsupported file format`, and so on) occurs when `helloworld.cpp` is not the active file when you start a build or start debugging. This is because the compiler is trying to compile something that isn't source code, like your `launch.json`, `tasks.json`, or `c_cpp_properties.json` file.

    If you see build errors mentioning "C++11 extensions", you may not have updated your `task.json` build task to use the clang++ argument `--std=c++17`. By default, clang++ uses the C++98 standard, which doesn't support the initialization used in `helloworld.cpp`. Make sure to replace the entire contents of your `task.json` file with the code block provided in the [Build helloworld.cpp](#build-helloworldcpp) section.

- Next steps

    - Explore the [VS Code User Guide](https://code.visualstudio.com/docs/editor/codebasics.md).
    - Review the [Overview of the C++ extension](https://code.visualstudio.com/docs/languages/cpp.md)
    - Create a new workspace, copy your .json files to it, adjust the necessary settings for the new workspace path, program name, and so on, and start coding!

## Visual Studio

Full-featured IDE to code, debug, test, and deploy to any platform.

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

* [OpenCV](https://github.com/opencv/opencv/releases) 4.5 or later
* [OpenCV Contrib](https://github.com/opencv/opencv_contrib/releases) 4.5 or later

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

Obviously we could now write the `.pro` configuration what we want like this, create and save it in you project in Qt Creator.

```
SOURCES += main.cpp

INCLUDEPATH += /usr/local/include/opencv4 \
               /usr/local/include/opencv4/opencv2

LIBS += /usr/local/lib/libopencv_*.so
```
