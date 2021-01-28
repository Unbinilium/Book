/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/css/0.styles.c86a7820.css",
    "revision": "0f205bf4648853b60c9d9827a899a84c"
  },
  {
    "url": "assets/fonts/MathJax_AMS-Regular.07173fb7.woff",
    "revision": "07173fb77d2ee655811499d40c8388e7"
  },
  {
    "url": "assets/fonts/MathJax_Fraktur-Bold.bc421258.woff",
    "revision": "bc42125861bd5bfc8686deeb612dcbb3"
  },
  {
    "url": "assets/fonts/MathJax_Fraktur-Regular.b80e08d5.woff",
    "revision": "b80e08d5a79acbd1fafb1ca6f3515664"
  },
  {
    "url": "assets/fonts/MathJax_Main-Bold.c9423d5d.woff",
    "revision": "c9423d5dc9d82a38ca215f74e9cdd9f2"
  },
  {
    "url": "assets/fonts/MathJax_Main-Italic.7e83626b.woff",
    "revision": "7e83626ba8bf2d20dc41565f1e6d0afc"
  },
  {
    "url": "assets/fonts/MathJax_Main-Regular.9995de47.woff",
    "revision": "9995de4787f908d8237dba7007f6c3fe"
  },
  {
    "url": "assets/fonts/MathJax_Math-BoldItalic.77dbcee3.woff",
    "revision": "77dbcee3c3d9a82a0c04a4ae7992b895"
  },
  {
    "url": "assets/fonts/MathJax_Math-Italic.5589d1a8.woff",
    "revision": "5589d1a8fc62be6613020ef2fa13e410"
  },
  {
    "url": "assets/fonts/MathJax_SansSerif-Bold.07281897.woff",
    "revision": "07281897a98a61c3733e1670f82a9fd5"
  },
  {
    "url": "assets/fonts/MathJax_SansSerif-Italic.3d580bd5.woff",
    "revision": "3d580bd561716bfb1f0b4fdd7063a802"
  },
  {
    "url": "assets/fonts/MathJax_SansSerif-Regular.bc3af04f.woff",
    "revision": "bc3af04f9a671fcabd6498042c57478f"
  },
  {
    "url": "assets/fonts/MathJax_Script-Regular.4c74e33b.woff",
    "revision": "4c74e33b0feb1fdbda49403a5e7ed604"
  },
  {
    "url": "assets/fonts/MathJax_Typewriter-Regular.72815766.woff",
    "revision": "72815766b08ca24d4d29ad1f5d4ecb45"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.469d6b72.js",
    "revision": "e50c9be6231ab272b4d654d40a80cf23"
  },
  {
    "url": "assets/js/11.c6524284.js",
    "revision": "2578a37905408ff7972a392f07ff7e12"
  },
  {
    "url": "assets/js/12.ce88ebf9.js",
    "revision": "a7f082966333b6d9985290becbdcb1a3"
  },
  {
    "url": "assets/js/13.ab2b84d3.js",
    "revision": "199067cb9ccba974ff91944e4022e06e"
  },
  {
    "url": "assets/js/14.fe038601.js",
    "revision": "88e6476ca5f31b5a7273887e05822e06"
  },
  {
    "url": "assets/js/15.a0555c26.js",
    "revision": "c7442ae84728738f424c3e8bbe8896f9"
  },
  {
    "url": "assets/js/16.f55579dd.js",
    "revision": "d8e4f28b06f1478a7832724a97a3ee30"
  },
  {
    "url": "assets/js/17.ebad19b1.js",
    "revision": "5b88405f2fc17a2257dac1946a47da57"
  },
  {
    "url": "assets/js/18.fadf84da.js",
    "revision": "e00767a6b5618dbc49a3291bee3acceb"
  },
  {
    "url": "assets/js/19.43a71af3.js",
    "revision": "9bbb853f2d4b3e745682a9e4eea182e4"
  },
  {
    "url": "assets/js/2.30d40f56.js",
    "revision": "f2c003dec56ce3e8bce90effae1b3bb4"
  },
  {
    "url": "assets/js/20.946ff141.js",
    "revision": "4fe4dd43a536382720965d85f06d5099"
  },
  {
    "url": "assets/js/21.811b4ca6.js",
    "revision": "b28221afee962e5e80c2b96c540f6ca8"
  },
  {
    "url": "assets/js/22.4d4a6949.js",
    "revision": "438f32ddc6e98a66759f3243803b6542"
  },
  {
    "url": "assets/js/23.db0b25e6.js",
    "revision": "31f0d5416ccdde4cbaef9e22d33110f0"
  },
  {
    "url": "assets/js/24.63f564f1.js",
    "revision": "ff7c7491b720cf3dd64a5456e0040182"
  },
  {
    "url": "assets/js/25.ef3461c4.js",
    "revision": "040b88214873c7ef1f35644255a37999"
  },
  {
    "url": "assets/js/26.6354f890.js",
    "revision": "9dcb6106b66f4510b0cb7284191eba3e"
  },
  {
    "url": "assets/js/27.1b44817a.js",
    "revision": "cbbae583bd4cd2e55322acb0eb93c821"
  },
  {
    "url": "assets/js/28.30ebeba7.js",
    "revision": "035a110da0687ca1c7701b0966fa9717"
  },
  {
    "url": "assets/js/29.fd0c526c.js",
    "revision": "8188c69ed458a9fccd7b227492c4d036"
  },
  {
    "url": "assets/js/3.9032db0e.js",
    "revision": "e829f33b0ae529a14fdf4f780c3ee5ab"
  },
  {
    "url": "assets/js/30.3294a55b.js",
    "revision": "f90cd5adf336f05ef34df262f8595aea"
  },
  {
    "url": "assets/js/4.5e92b263.js",
    "revision": "7dd7f6caac909a6842353532ba91b264"
  },
  {
    "url": "assets/js/5.665901b5.js",
    "revision": "09103fbeb5962a270e45c9a9a3d554aa"
  },
  {
    "url": "assets/js/6.6ba3b61b.js",
    "revision": "ed67690a390b34730dedcdd5c1132369"
  },
  {
    "url": "assets/js/7.d31a3cd7.js",
    "revision": "6dc1a80a7cad5fbf2cb2e01c00f82de8"
  },
  {
    "url": "assets/js/8.d4661bf2.js",
    "revision": "d9b1a8720748caae462d9d5626913d3e"
  },
  {
    "url": "assets/js/9.168171d4.js",
    "revision": "bb91fd86b75f3c1a5e5f19d454edafa1"
  },
  {
    "url": "assets/js/app.041ccf91.js",
    "revision": "30c693eb0042de2dcead58fd1e96d461"
  },
  {
    "url": "coding/c++/index.html",
    "revision": "25d957865c8e267c1c2492e7f3c67d68"
  },
  {
    "url": "coding/javascript/index.html",
    "revision": "c4b49e5c3e51fb927fe1dad157b7f257"
  },
  {
    "url": "coding/python/index.html",
    "revision": "90999ca9d4d859dfea2cbff654e4e63b"
  },
  {
    "url": "coding/swift/index.html",
    "revision": "dfd0a7581cdf4af5477c421b88014b59"
  },
  {
    "url": "coding/web/index.html",
    "revision": "ebad7006f3ee798516c9f475053143ab"
  },
  {
    "url": "collection/game/index.html",
    "revision": "25e625b5c556860a98d1e0eef08791bc"
  },
  {
    "url": "collection/novel/index.html",
    "revision": "06e47b71d3f27f18bc88181ac749ffe1"
  },
  {
    "url": "collection/website/index.html",
    "revision": "44dd7c3654907e451f132fb0976880cb"
  },
  {
    "url": "design/icon/index.html",
    "revision": "9f84d311e4094681e1a72ef1d58f7d3a"
  },
  {
    "url": "design/ui-ux/index.html",
    "revision": "4f3ce10ea81c4160d7bcddb543bb1bbd"
  },
  {
    "url": "favicon.png",
    "revision": "27f93085f32ad1a35126bb395e2e5818"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "33eaf5f06f5641f28a2e1c5d54f30204"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "2595a8a9780962aed8db68b762b278aa"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "8bc5eb43efe9d5d4f99b34e2887deb11"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "6a817ea6096ffcdaea816d9c6c44a215"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "de5f776712ab68fcea4e4ade3aa500e1"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "dc5b7299cb5aeaa4b14ec5cbb75db34c"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "3baa68e06ecfee0a9cbfbd810c4dddda"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "2bad1419dbed7e9236f8c218632e24dd"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "76e3ef3db14c6db70319cd755d6bbe00"
  },
  {
    "url": "icons/msapplication-icon.png",
    "revision": "4c47008943e83c08191b1b8c2f10c3f0"
  },
  {
    "url": "index.html",
    "revision": "f864132fa5dcc164c2b68f4f1616d5a7"
  },
  {
    "url": "linux/command/index.html",
    "revision": "af535827c4bbe396a41ff9f9d9eaf3d1"
  },
  {
    "url": "linux/networking/index.html",
    "revision": "c48023221b9304ad543556d3b167067a"
  },
  {
    "url": "linux/optmization/index.html",
    "revision": "0a25ab448566b0f0eb2b8689abc0ef07"
  },
  {
    "url": "open_graph_logo.png",
    "revision": "944e58d06f6286745c57f7398a5a0ad2"
  },
  {
    "url": "programming/algorithm/index.html",
    "revision": "b8537ad632f17c3c1d296b8368518210"
  },
  {
    "url": "programming/computer-vision/index.html",
    "revision": "b7038fc12226b6646cf6bfded0fe9cc1"
  },
  {
    "url": "programming/machine-learning/index.html",
    "revision": "5f370a4e7d3e31a556bd045512192dc6"
  },
  {
    "url": "security/cipher/index.html",
    "revision": "2af90e34c43d8b0f8742c38d15f48d2d"
  },
  {
    "url": "security/cyber/index.html",
    "revision": "e1fcdf4adc876a286d14da57ad4c25e8"
  },
  {
    "url": "software/ide/index.html",
    "revision": "27fbfb94caa1189250e6312ff2b417d7"
  },
  {
    "url": "software/opensourced/index.html",
    "revision": "7a02013aab297ca062e9b88daf47c396"
  },
  {
    "url": "writing/draft/index.html",
    "revision": "59cd973947795414f589d76648284b6c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
