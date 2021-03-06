---
title: Machine Learning

---

**Machine learning** (**ML**) is the study of computer algorithms that improve automatically through experience. Here I wrote some notes about Tensorflow, PyTorch, Keras and some mainstream machine learning frameworks.

## DeepFont

It was first introduced by Adobe, which uses deep learning to identify font type. Inspired by their works, I made this reproduction using [Keras](https://keras.io).

:::tip

[DeepFont: Identify Your Font from An Image](https://arxiv.org/pdf/1507.03196v1.pdf)

:::

Their technical contributions are listed below:

- **AdobeVFR Dataset** A large set of labeled real-world images as well as a large corpus of unlabeled real-world data are collected for both training and testing, which could be found at the link below.

  :::tip

  [ Adobe Visual Font Recognition (VFR)](https://github.com/tensorflow/datasets/issues/431)

  :::

- **Domain Adapted CNN** This real-to-synthetic domain gap caused poor generalization to new real data in previous VFR methods. They address this domain mismatch problem by leveraging synthetic data to obtain effective classification features, while introducing a domain adaptation technique based on Stacked Convolutional Auto Encoder (SCAE) with the help of unlabeled real-world data.

- **Learning-based Model Compression** They introduce a novel learning-based approach to obtain a losslessly compressible model, for a high compression ratio with- out sacrificing its performance. An exact low-rank constraint is enforced on the targeted weight matrix.

### Datasets

To apply machine learning to VFR problem, both synthetic and realistic text images with ground truth font labels is required. The way to overcome the training data challenge is to synthesize the training set by rendering text fragments for all the necessary fonts.

#### Synthetic Text

It's easy to generate dataset based custom font image patches using **TextRecognitionDataGenerator**.

:::tip

[GitHub - TextRecognitionDataGenerator](https://github.com/Belval/TextRecognitionDataGenerator)

:::

Words will be randomly chosen from a dictionary of a specific language. Then an image of those words will be generated by using font, background, and modifications (skewing, blurring, etc.) as specified.

TextRecognitionDataGenerator comes with an easy to use CLI and Python Module. It has a nice written tutorial.

:::tip

[TextRecognitionDataGenerator Tutorial](https://textrecognitiondatagenerator.readthedocs.io/en/latest/tutorial.html#)

:::

#### Realistic Text

**AdobeVFR Dataset** obtain 4,384 real-world test images with reliable labels, covering 617 classes (out of 2,383). Compared to the synthetic data, these images typically have much larger appearance variations caused by scaling, back- ground clutter, lighting, noise, perspective distortions, and compression artifacts.

### Preprocessing

Fonts are different with objects, which have huge spatial information when classify features. Aimed to reduce the mismatch, preprocessing is required and exampled by the paper.

Firstly, import needed modules.

```python
import PIL
import cv2
import numpy as np
```

:::warning

Add `%matplotlib inline` as Magic Function if uses IPython to render images directly in browser. Otherwise, It would cause errors if you're not using IPython.

:::

Then code image load function.

```python
def pil_image(img_path):
    pil_img = PIL.Image.open(img_path).convert('L')
    pil_img = pil_img.resize((105, 105))
    return pil_img
```

#### Legacy

It is usual to artificially augment training data using label-preserving transformations to reduce overfitting.

- **Noise** a small Gaussian noise with 0 mean and standard deviation 3 is added to input.

  ```python
  def noise_image(img):
      img_array = np.asarray(img)
      mean = 0.0
      std = 3
      noisy_img = img_array + np.random.normal(mean, std, img_array.shape)
      noisy_img_clipped = np.clip(noisy_img, 0, 255)
      noise_img = PIL.Image.fromarray(np.uint8(noisy_img_clipped))
      noise_img = noise_img.resize((105, 105))
      return noise_img
  ```

- **Blur** a random Gaussian blur with standard deviation from 2.5 to 3.5 is added to input.

  ```python
  def blur_image(img):
      blur_img = img.filter(PIL.ImageFilter.GaussianBlur(radius = 3))
      blur_img = blur_img.resize((105, 105))
      return blur_img
  ```

- **Perspective Rotation** a randomly-parameterized affine transformation is added to input.

  ```python
  def affine_rotation(img):
      rows, columns = img.shape
  
      point1 = np.float32([[10, 10], [30, 10], [10, 30]])
      point2 = np.float32([[20, 15], [40, 10], [20, 40]])
  
      anchor = cv2.getAffineTransform(point1, point2)
  
      output = cv2.warpAffine(img, anchor, (columns, rows))
      affine_img = PIL.Image.fromarray(np.uint8(output))
      affine_img = affine_img.resize((105, 105))
      return affine_img
  ```

- **Shading** the input background is filled with a gradient in illumination.

  ```python
  def gradient_fill(img):
      output = cv2.Laplacian(img, cv2.CV_64F)
      laplacian_img = PIL.Image.fromarray(np.uint8(output))
      laplacian_img = laplacian_img.resize((105, 105))
      return laplacian_img
  ```

#### Additional

As a very particular type of images, text images have various real-world appearances caused by specific handlings. Based on the observations in the paper, they identify two additional font-specific augmentation steps to the training data.

- **Variable Character Spacing** when rendering each synthetic image, set the character spacing (by pixel) to be a Gaussian random variable of mean 10 and standard deviation 40, bounded by [0, 50].
- **Variable Aspect Ratio** Before cropping each image into a input patch, the image, with heigh fixed, is squeezed in width by a random ratio, drawn from a uniform distribution between $\frac 56$ and $\frac 76$.

It not convenient to do the additional steps for each characters, so loosely speaking, we could done this before legacy steps, at the beginning we generate our datasets using *TextRecognitionDataGenerator*.

```shell
python3 run.py -c 10 -k 15 -rk -d 3 -do 2 -f 64 -ft ['Font1', 'Font2', 'Font3'] -t $(grep -c ^processor /proc/cpuinfo)
```

This generate 10 examples with *Font1*, *Font2* and *Font3* which characters sized 64x64 with a skewing angle between -15 and 15 and a random distorsions both vertical and horizontal, multi-threads acceleration enabled.

Otherwise, it would be more difficult if we do as same as the paper. Firstly we generate single characters in same font with random aspect ratio follow the paper advice, the we flatten all these single characters with random spacing into many word, again we got a sentence in one image labeled by the font. Lastly by repeating these steps, we got images datasets with different fonts before applying legacy steps.

However, we’re supposed to do something which is similar to this at the end of datasets importing and actually I did it this way. To be clear why we could  and should do this, I would clear that there’re something that I misunderstood and it totally different, just imaging the real situation when people tring to identify a font, the font would always be some part of some texts which has strong and clear characteristic, It’s the most important connection to our datasets, but the preprocessing solution I suggested before, just using the opponent side to undermine the most print font’s characteristic, through it may did some help on handwriting font recognition.

### Architecture

Domain adapted CNN employs a Convolutional Neural Network (CNN) architecture, which is further decomposed into two sub-networks:

- **A "shared" low-level sub-network** which is learned from the composite set of synthetic and real-world data.
- **A high-level sub-network** that learns a deep classifier from the low-level features.

#### Generate Datasets

Here we use the *Text Recognition Data Generator* CLI `trdg` to generate the random datasets.

- `ttf_path` is a folder contains all the font file with correct font name and `.ttf` extension.

- `data_path` is a folder stores or contains generated datasets.

```python
import os

ttf_path = 'ttf_path'
data_path = 'datasets_path'

for file in os.listdir(ttf_path):
    if file.endswith('.ttf'):
        path = os.path.join(ttf_path, file)
        name, ext = os.path.splitext(os.path.basename(path))
        out_path = data_path + '/' + name
        command = 'trdg -l en -c 10 -rs -let -num -r --length 1 -b 1 -e .png -fi -f 105 -ft ' + path + ' --output_dir ' + out_path 
        os.system(command)
```

#### Import Datasets

Import pre-generated synthetic and realistic text images from `datasets_path` *(here especially the datasets we generated before)*.

```python
import os
from imutils import paths
from random import seed, shuffle

image_paths = sorted(list(paths.list_images(data_path)))
random.seed(10)
random.shuffle(image_paths)

font_names = []

for f in os.listdir(data_path):
    if not f.startswith('.'):
        font_names.append(f)
        
font_names.sort()

print('Font Names -> ', font_names)
```

#### Tag Labels

Convert font name string to integer and use the matched number as a font label when training models.

```python
def conv_label(label):
    return font_names.index(label)
```

#### Preprocessing Datasets

Preprocessing functions are already finished, for each font patch images, effects should be applied randomly, so firstly we generate random combinations in 4 legacy preprocessing functions. Then apply the effects following the generated combinations list for all the font patch images.

```python
import os
import itertools
import numpy as np
from keras.preprocessing.image import img_to_array

data = []
labels = []
auguments = ["blur", "noise", "affine", "gradient"]

for path in image_paths:
    label = path.split(os.path.sep)[-2]
    
    if not label.startswith('.'):
        label = conv_label(label)
    else:
        continue
    
    pil_img = pil_image(path)
    org_img = img_to_array(pil_img)
    
    data.append(org_img)
    labels.append(label)
    
    for i in range(0, len(auguments)):
        for augument in list(itertools.combinations(auguments, i + 1)):
            
            temp_img = pil_img
            combinations = list(augument)
            
            for method in combinations:
                if method == 'noise':
                    temp_img = noise_image(temp_img)
                    
                elif method == 'blur':
                    temp_img = blur_image(temp_img)
                    
                elif method == 'affine':
                    open_cv_affine = np.array(pil_img)
                    temp_img = affine_rotation(open_cv_affine)

                elif method == 'gradient':
                    open_cv_gradient = np.array(pil_img)
                    temp_img = gradient_fill(open_cv_gradient)
  
            temp_img = img_to_array(temp_img)
    
            data.append(temp_img)
            labels.append(label)
```

According to the paper, 75% of the datasets is for training and the remaining 25% is for testing, so partition the data into training and testing is required. 

```python
from sklearn.model_selection import train_test_split

data = np.asarray(data, dtype = "float") / 255.0
labels = np.array(labels)

(trainX, testX, trainY, testY) = train_test_split(data, labels, test_size = 0.25, random_state = 10)
```

For further processing, both train and test labels of the datasets should be converted from integers to vectors.

```python
from keras.utils import to_categorical

trainY = to_categorical(trainY, num_classes = len(font_names))
testY = to_categorical(testY, num_classes = len(font_names))
```

Then process the  datasets using additional preprocessing steps.

```python
from keras.preprocessing.image import ImageDataGenerator

augmented_images = ImageDataGenerator(
  	rotation_range = 30,
  	width_shift_range = 0.1,
  	height_shift_range = 0.1,
  	shear_range = 0.2,
  	zoom_range = 0.2,
  	horizontal_flip = True
)
```

#### Create Model

When the CNN model is trained fully on a synthetic dataset, it witnesses a significant performance drop when testing on real-world data, compared to when applied to another synthetic validation set. It alludes to discrepancies between the distributions of synthetic and real-world examples. They propose to decompose the *N CNN* layers into two sub-networks to be learned sequentially:

- **Unsupervised cross-domain sub-network ${C_u}$**, which consists of the first *K* layers of *CNN*. It accounts for extracting low-level visual features shared by both syn- thetic and real-world data domains. ${C_u}$ will be trained in a unsupervised way, using unlabeled data from both domains. It constitutes the crucial step that further minimizes the low-level feature gap, beyond the previous data augmentation efforts.

- **Supervised domain-specific sub-network ${C_s}$**, which consists of the remaining *N − K* layers. It accounts for learning higher-level discriminative features for classi- fication, based on the shared features from ${C_u}$. ${C_s}$ will be trained in a supervised way, using labeled data from the synthetic domain only.

Firstly we modify the order of picture channels to avoid `OverflowError`.

```python
from keras import backend as K

K.set_image_data_format('channels_last')
```

:::tip

Note the difference about the format which `keras` use in different versions.

```python
K.set_image_dim_ordering('tf') --> K.set_image_data_format('channels_last')
K.set_image_dim_ordering('th') --> K.set_image_data_format('channels_first')
```

:::

Secondly code create model function to define the architecture of the CNN layers.

```python
from keras.models import Sequential
from keras.layers.normalization import BatchNormalization
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D , UpSampling2D ,Conv2DTranspose

def create_model():
  	model = Sequential()

  	#Cu Layers 
  	model.add(Conv2D(64, kernel_size = (48, 48), activation = 'relu', input_shape = (105, 105, 1)))
  	model.add(BatchNormalization())
  	model.add(MaxPooling2D(pool_size = (2, 2)))

  	model.add(Conv2D(128, kernel_size = (24, 24), activation = 'relu'))
  	model.add(BatchNormalization())
  	model.add(MaxPooling2D(pool_size = (2, 2)))

  	model.add(Conv2DTranspose(128, (24, 24), strides = (2, 2), activation = 'relu', padding = 'same', kernel_initializer = 'uniform'))
  	model.add(UpSampling2D(size = (2, 2)))

  	model.add(Conv2DTranspose(64, (12, 12), strides = (2, 2), activation = 'relu', padding = 'same', kernel_initializer = 'uniform'))
  	model.add(UpSampling2D(size = (2, 2)))

  	#Cs Layers
  	model.add(Conv2D(256, kernel_size=(12, 12), activation = 'relu'))
  	model.add(Conv2D(256, kernel_size=(12, 12), activation = 'relu'))
  	model.add(Conv2D(256, kernel_size=(12, 12), activation = 'relu'))

  	model.add(Flatten())
  	model.add(Dense(4096, activation = 'relu'))
  	model.add(Dropout(0.5))
  	model.add(Dense(4096, activation = 'relu'))
  	model.add(Dropout(0.5))
  	model.add(Dense(2383, activation = 'relu'))
  	model.add(Dense(len(font_names), activation = 'softmax'))
 
  	return model
```

Then create and compile model using Gradient descent (with momentum) optimizer with the CNN architecture network we created just now.

```python
from keras import optimizers

batch_size = 128
epochs = 50
model= create_model()
opt = optimizers.SGD(lr = 0.01, decay = 1e-6, momentum = 0.9, nesterov = True)
model.compile(loss = 'mean_squared_error', optimizer = opt, metrics = ['accuracy'])
```

Periodically save my model to disk and get a view on internal states and statistics of a model during training.

```python
from keras import callbacks

model_path = "model_store_path"
my_callbacks = [
  	callbacks.EarlyStopping(monitor = 'val_loss', min_delta = 0, patience = 10, verbose = 0, mode = 'min')
  	callbacks.ModelCheckpoint(model_path, monitor = 'val_loss', verbose = 1, save_best_only = True, mode = 'min')
]

model.fit(
  	trainX,
  	trainY,
  	shuffle = True,
    batch_size = batch_size,
    epochs = epochs,
    verbose = 1,
    validation_data = (testX, testY),
  	callbacks = my_callbacks
)
```

### Evaluate

It's necessary to evaluate a model after training to test whether it has meet our exceptions. If not, it means there would be some problem with our datasets or arguments used to compile. 

#### Load Model

Load the model from `model_store_path` and print model evaluation information on the screen.

```python
from keras.models import load_model

model_path = "model_store_path"
model = load_model(model_path)
score = model.evaluate(testX, testY, verbose = 0)

print('Test loss ->', score[0])
print('Test accuracy ->', score[1])
```

#### Load Image

Load the test image from `image_path` and preprocess with `blur_img` function, conver image to array.

```python
import PIL
from keras.preprocessing.image import img_to_array

img_path = "image_path"

org_img = PIL.Image.open(img_path).convert('L')
pil_img = blur_image(org_img)
pil_img = img_to_array(pil_img)
```

#### Inference

Firstly code the lable restore function to convert font name from integer to string.

```python
def rev_conv_label(label):
    return font_names[label]
```

Then use loaded model to predict image array.

```python
import numpy as np

data = []
data.append(pil_img)
data = np.asarray(data, dtype = "float") / 255.0
y = np.argmax(model.predict(data), axis = -1)
```

Lastly, show the prediction results.

```python
import matplotlib.cm as cm
import matplotlib.pylab as plt

label = rev_conv_label(int(y[0]))
fig, ax = plt.subplots(1)
ax.imshow(org_img, interpolation = 'nearest', cmap = cm.gray)
ax.text(5, 5, label, bbox = {'facecolor': 'white', 'pad': 8})
plt.show()
```
