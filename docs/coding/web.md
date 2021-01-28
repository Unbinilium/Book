---
title: Web
---

Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.


## Dark Mode

Light-on-dark color scheme, also called dark mode, dark theme or night mode, is a color scheme that uses light-colored text, icons, and graphical user interface elements on a dark background and is often discussed in terms of computer user interface design and web design.

### API with CSS

Thanks to Safari Technology Preview, we now have `prefers-color-scheme` support in CSS, making dynamic light and dark modes for your visitors easier than ever.

Simply add this to the _style config_, the browser will automatically choose the color and render the webpage. It real-time, adaptive and may affected by system-side settings or browser settings.

```css
body {
  background-color: black;
  color: white;
}

@media screen and (prefers-color-scheme: light) {
  body {
    background-color: white;
    color: black;
  }
}
```

Further more we can use as this:

```css
html {
  --background-color: black;
  --text-color: white;
}

html[data-theme='light'] {
  --background-color: white;
  --text-color: black;
}
```

Or another code style with `image` elements transition for better user experience:

```css
:root {
  --background-color: white;
  --text-color: black;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: black;
    --text-color: white;
  }
}

@media (prefers-color-scheme: dark) {
  img {
    opacity: .75;
    transition: opacity .5s ease-in-out;
  }
  img:hover {
    opacity: 1;
  }
}
```

In these case we user color variable like `var(--text-color)` in _HTML_.

### JavaScript with CSS

Firstly we create a _Toggle dark mode_ `button` element in `html`:

```html
<button onclick="myFunction()">Toggle dark mode</button>
```
Then we define the light color and dark color in `css`:

```css
body {
  padding: 25px;
  background-color: white;
  color: black;
  font-size: 25px;
}

.dark-mode {
  background-color: black;
  color: white;
}
```

Lastly, create a `javascript` function to handle the action triggered by the button:

```js
function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}
```

## Delivering Video

```html
<video controls width="100%" height="auto" preload="metadata" playsinline poster="https://examples.com/video_poster.png" loop muted>
  <source src="https://examples.com/video.mp4" type="video/mp4">
  <source src="https://examples.com/video.webm" type="video/webm">
  <p>
    Your browser doesn't support HTML5 video. Here is a
    <a href="https://examples.com/video.mp4">link to the video</a>
    instead.
  </p>
</video>
```

- `width` and `height`

  You can control the video size either with these attributes or with CSS. In both cases, videos maintain their native width-height ratio — known as the aspect ratio. If the aspect ratio is not maintained by the sizes you set, the video will grow to fill the space horizontally, and the unfilled space will just be given a solid background color by default.

- `autoplay`

  Video elements that include `<video autoplay>` play automatically when the video loads in Safari on macOS and iOS, only if those elements also include the playsinline attribute.

- `preload`

  For better user experience, we need *preload attribute*. The HTML audio preload Attribute is used to specify the way when the video should be loaded while the page loads. Syntax here:

  ```html
  <video preload="auto | metadata | none">
  ```

  - `auto`: It is used to specify that the browser should load the entire video when the page loads.

  - `metadata`: It is used to specify that the browser should load only metadata when the page loads.

  - `none`: It is used to specify that the browser should NOT load the video when the page loads.

- `playsinline`

  When you want to display short-form content, it is more optimal to play your video inline. Use `<video playsinline>` to play videos inline.

  Without the `playsinline` attribute, videos must be in full-screen mode for playback on iPhone. If videos do play in full-screen mode, they will continue to play inline when the user exits full-screen mode, even if the video element doesn’t contain the playsinline property.

- `loop`

  Makes the video (or audio) start playing again whenever it finishes. This can also be annoying, so only use if really necessary.

- `muted`

  Causes the media to play with the sound turned off by default.

- `poster`

  The URL of an image which will be displayed before the video is played. It is intended to be used for a splash screen or advertising screen.

- `type`

  Video format support varies among browsers, so a web page can provide video in multiple formats. For other features, browser sniffing is used sometimes, which may be error-prone: any web developer's knowledge of browsers will inevitably be incomplete or not up-to-date.

  - `vp8` with `webm` - `type='video/webm; codecs="vp8, vorbis"'`
  - `vp9` with `webm` - `type='video/webm; codecs="vp9, vorbis"'`
  - `h264` with `mp4` - `type='video/mp4; codecs="avc1"'`
  - `hevc` with `mp4` - `type='video/mp4; codecs="hvc1"'`
  - `theora` with `ogg` - `type='video/ogg; codecs="theora, vorbis"'`

:::tip
[The Video Embed element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

[Web video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)

[Delivering Video Content for Safari](https://developer.apple.com/documentation/webkit/safari_tools_and_features/delivering_video_content_for_safari)

[New video Policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/)
:::

### HTTP Live Streaming

HTTP Live Streaming (also known as HLS) is an HTTP-based adaptive bitrate streaming communications protocol developed by Apple Inc. and released in 2009. Support for the protocol is widespread in media players, web browsers, mobile devices, and streaming media servers.

Futhermore we can embed videos which extension is `.m3u8` liked using [HTTP Live Streaming](https://en.wikipedia.org/wiki/HTTP_Live_Streaming) protocol:

```html
<video width="100%" height="auto"
       playsinline webkit-playsinline
       autoplay controls preload="auto"
       x-webkit-airplay="true"
       src="https://examples.com/video.m3u8"
       type="application/x-mpegURL">
</video>
```

If you are not only targeting evergreen browsers, you'd better use `video.js` for better compatible:

```html
<video id="hls-video" class="video-js vjs-default-skin"
       width="100%" height="auto"
       playsinline webkit-playsinline
       autoplay controls preload="auto"
       x-webkit-airplay="true">
    <source src="https://examples.com/video.m3u8" type="application/x-mpegURL">
</video>

<script src="http://cdn.bootcss.com/video.js/*.*.*/video.js"></script>
<script src="http://cdn.bootcss.com/videojs-contrib-hls/*.*.*/videojs-contrib-hls.js"></script>
```

Then handle the play action using `video.js`:

```js
var player = videojs('hls-video');
player.play();
```

:::tip
[HTTP Live Streaming](https://developer.apple.com/streaming/)

[VIDEO JS](https://videojs.com/)
:::

### Picture in Picture

Picture-in-Picture made its first appearance on the web in the Safari browser with the release of macOS Sierra in 2016, allows users to watch videos in a floating window (always on top of other windows). It made it possible for a user to pop a video out into a small floating window that stays above all others, so that they can keep watching while doing other things.

```html
<video id="video" autopictureinpicture></video>
```

We simply use the auto picture in picture API to let browsers to deal with that or custom a button to toggle it as the code below:

```html
<video id="video" src="https://example.com/video.mp4"></video>
<button id="togglePipButton"></button>
```

```js
const video = document.getElementById('video');
const togglePipButton = document.getElementById('togglePipButton');

// Hide button if Picture-in-Picture is not supported or disabled.
togglePipButton.hidden = !document.pictureInPictureEnabled || video.disablePictureInPicture;

togglePipButton.addEventListener('click', function() {
  // If there is no element in Picture-in-Picture yet, let’s request
  // Picture-in-Picture for the video, otherwise leave it.
  if (!document.pictureInPictureElement) {
    video.requestPictureInPicture()
    .catch(error => {
      // Video failed to enter Picture-in-Picture mode.
    });
  } else {
    document.exitPictureInPicture()
    .catch(error => {
      // Video failed to leave Picture-in-Picture mode.
    });
  }
});
```

:::tip
[Picture-in-Picture](https://w3c.github.io/picture-in-picture/#request-picture-in-picture-algorithm)

[An Introduction to the Picture-in-Picture Web API](https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/)

[Watch video using Picture-in-Picture](https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture)
:::

### Manipulating with canvas

By combining the capabilities of the `video` element with a `canvas`, you can manipulate video data in real time to incorporate a variety of visual effects to the video being displayed.

```html
<div>
  <video controls width="100%" height="auto" id="video" src="https://example.com/video.mp4"/>
</div>
<div>
  <canvas id="c1" width="100%" height="auto"></canvas>
  <canvas id="c2" width="100%" height="auto"></canvas>
</div>
<script type="text/javascript" src="processor.js"></script>
```

:::tip
The JavaScript code is imported from a script named `processor.js`.

Find more on [Manipulating video using canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas).
:::

## Hide Scrollbar

For Microsoft Edge or IE browser, add the code below in style config `body` part in _CSS_:

```css
body {
  -ms-overflow-style: none
}
```

:::tip
Auto hide after inactive, we can use this flag:

```css
-ms-overflow-style: -ms-autohiding-scrollbar;
```
:::

For the browsers using [WebKit](https://webkit.org/) like Apple Safari, add the code below alone to _CSS_:

```css
::-webkit-scrollbar {
  display: none
}
```

## Open Graph tags

The Open Graph protocol enables any web page to become a rich object in a social graph. For instance this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook.

While many different technologies and schemas exist and could be combined together, there isn't a single technology which provides enough information to richly represent any web page within the social graph.

```html
<head>
  <meta property="og:title" content="Unbinilium">
  <meta property="og:description" content="The page of unbinilium">
  <meta property="og:url" content="https://unbinilium.me/">
  <meta property="og:image" content="https://unbinilium.me/open_graph_logo.png">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Unbinilium">
</head>
```

:::tip
[The Open Graph protocol](https://ogp.me)
