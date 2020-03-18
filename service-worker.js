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
    "url": "assets/css/0.styles.5e3bfe6d.css",
    "revision": "54fea93d16c912b758f20ef384a63fd5"
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
    "url": "assets/js/10.4e211c24.js",
    "revision": "25e5cd4d09b20d67ca649384b3cea8d6"
  },
  {
    "url": "assets/js/11.4de2d28f.js",
    "revision": "5d00ae51f9a0dce28030e1419009dd50"
  },
  {
    "url": "assets/js/12.9316d203.js",
    "revision": "d2b12bd046f22a63ff4fcb69432f97cb"
  },
  {
    "url": "assets/js/13.5951b3ce.js",
    "revision": "6c2f261c03c8e6f9340f4ec54b76282d"
  },
  {
    "url": "assets/js/14.adc349e6.js",
    "revision": "3be9a7e13b18c1381897fee15bda9e96"
  },
  {
    "url": "assets/js/15.de14786f.js",
    "revision": "d3c0fc1d6375b4d63404a7a325674ff9"
  },
  {
    "url": "assets/js/16.69458723.js",
    "revision": "dd49310d2dc6d208e9d956b5499a471d"
  },
  {
    "url": "assets/js/17.d4d4d50a.js",
    "revision": "2dfb7193b3d86be59570d1d738d922ae"
  },
  {
    "url": "assets/js/18.7e9a3f9b.js",
    "revision": "3ba41ea288f46b4e2f797c8fce58f900"
  },
  {
    "url": "assets/js/19.4cf90d61.js",
    "revision": "6e53f88944cbba036210d32ce4b8527d"
  },
  {
    "url": "assets/js/2.f5613a4d.js",
    "revision": "62feb208a4d4764d1399174e8bb4179a"
  },
  {
    "url": "assets/js/20.bd839db7.js",
    "revision": "73c4a1e3ee1b5551e4603419ce4f4c6b"
  },
  {
    "url": "assets/js/21.0327af69.js",
    "revision": "07a31db2c0e9269356c0fefd5339c019"
  },
  {
    "url": "assets/js/22.97936be8.js",
    "revision": "f9582ad0dbb907707938d3f43c4f9bb4"
  },
  {
    "url": "assets/js/23.8a607537.js",
    "revision": "76006182188728b6c78ad6db6fb5e302"
  },
  {
    "url": "assets/js/24.96e6fdfb.js",
    "revision": "9c4f67d350dbd0c3c2c091675d007ae8"
  },
  {
    "url": "assets/js/25.f3ea50e5.js",
    "revision": "99e1397c0a1c8f0f313c1eca99218a74"
  },
  {
    "url": "assets/js/26.1728e2e4.js",
    "revision": "b41b478075f42c00c57666081ca25f7a"
  },
  {
    "url": "assets/js/27.f8906149.js",
    "revision": "98e8a5869cd46f13b5c3dbbcd876f98b"
  },
  {
    "url": "assets/js/28.e20e289b.js",
    "revision": "00ff03794103e4265a2bf2b7d29eb737"
  },
  {
    "url": "assets/js/29.d0e2899e.js",
    "revision": "8e86089eda8ad6ac40af9a0eaf54f7bc"
  },
  {
    "url": "assets/js/3.1a7b4dc6.js",
    "revision": "d5e052c848457e3a0b150e87b70ba884"
  },
  {
    "url": "assets/js/30.9e728d47.js",
    "revision": "08e19a0686b23998901f0d203c75d0b8"
  },
  {
    "url": "assets/js/31.4c467df1.js",
    "revision": "824c8c66a0d60ac0135a5f5aed439626"
  },
  {
    "url": "assets/js/32.8a322b8b.js",
    "revision": "8bebf9d5f406f5d0c76569749b856acd"
  },
  {
    "url": "assets/js/33.425145d9.js",
    "revision": "9348b734eb34798b49fa5b01ff26df2c"
  },
  {
    "url": "assets/js/34.b5d1e426.js",
    "revision": "89e450b2aa32e4b74b79a25ac9eb9fe2"
  },
  {
    "url": "assets/js/35.c6a3fc58.js",
    "revision": "008694557af20ef594dac65aa26e0fe3"
  },
  {
    "url": "assets/js/36.88f62dc4.js",
    "revision": "91d5f0805acc22312b97d9867985b3fe"
  },
  {
    "url": "assets/js/37.279ee9c4.js",
    "revision": "ac610661d706ac9e327c5742a321e74f"
  },
  {
    "url": "assets/js/38.23be98cc.js",
    "revision": "d4a76959b694db70faef1f7957c6ff0e"
  },
  {
    "url": "assets/js/4.74a4cde8.js",
    "revision": "4757497344c0701bacde6cea2faf7cbb"
  },
  {
    "url": "assets/js/5.cd27f5b5.js",
    "revision": "26d88f8485b99f4afa162bba3370bcac"
  },
  {
    "url": "assets/js/6.817cc68b.js",
    "revision": "a1d4988c94710d709905662c6e82b2ba"
  },
  {
    "url": "assets/js/7.41fd2968.js",
    "revision": "2cf265e364539bea50352a731fbe8648"
  },
  {
    "url": "assets/js/8.0ca25d1a.js",
    "revision": "60fcfeb444a390ec27d121e3829657de"
  },
  {
    "url": "assets/js/9.bef03a53.js",
    "revision": "8dc749343401bbf02c6c08e1ad189e65"
  },
  {
    "url": "assets/js/app.b0f86cbb.js",
    "revision": "9b1d31b1892b064ce5b9806f93a7d10f"
  },
  {
    "url": "coding/c++/index.html",
    "revision": "4e14e5366277c317655d150d4ab7d549"
  },
  {
    "url": "coding/html/index.html",
    "revision": "d79c06f0736bcd27a28b8a8a57e1790f"
  },
  {
    "url": "coding/java/index.html",
    "revision": "0261608f4f171b26664eb587a92d7442"
  },
  {
    "url": "coding/javascript/index.html",
    "revision": "41ab24d13aa49cd096c599cc711529ed"
  },
  {
    "url": "coding/python/index.html",
    "revision": "e5897f30907b28c994d332617accc52d"
  },
  {
    "url": "coding/swift/index.html",
    "revision": "37fd9c9d75f869e7594f09b96cba42a4"
  },
  {
    "url": "collection/game/index.html",
    "revision": "b2e22dbe61fb648525dd18b9718569b1"
  },
  {
    "url": "collection/movie/index.html",
    "revision": "c411f2b4c071dfdfa004550f282ad4e9"
  },
  {
    "url": "collection/music/index.html",
    "revision": "bdd10d3fd719da95a8415e7279d9ceea"
  },
  {
    "url": "collection/novel/index.html",
    "revision": "c979707391746b8f915d8bbc5779fc6b"
  },
  {
    "url": "collection/reference/index.html",
    "revision": "ca7e687c6554cdd44c9755bb4c168a13"
  },
  {
    "url": "collection/website/index.html",
    "revision": "ffa8d6a4532e202235c60aea8721d065"
  },
  {
    "url": "design/icon/index.html",
    "revision": "cb10061dbf28643f9292ea784bd23afb"
  },
  {
    "url": "design/ui-ux/index.html",
    "revision": "3aacbf42c19be06efe6717eed7377102"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "0bf59c1279fd6ce0faca0ee1cd096e8d"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "08451ac24a4d19345ae7e94995e3d209"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "bc23bfddfc61083380aa4c93d7b0d891"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "f4454edccb7c607d7c96f7c513c0cbff"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "7c839ee89a358f86673ac46cfb401d9a"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "8bc320855aa5d50aff18bb76bd8bb6d7"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "6fae0d3dc82a7eb781bb9348e2f3fd7b"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "fdf0106c965dc244260dd2bee403b9a5"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "546452e2d9d13faa8de33676aeed3f47"
  },
  {
    "url": "icons/msapplication-icon.png",
    "revision": "003aecf7a61064d9bcc6d0cd0a2b9e5a"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "dbcbca28f7bfa6db2a20a3e6b712d92f"
  },
  {
    "url": "index.html",
    "revision": "487df042212794e8177ac17a703322c6"
  },
  {
    "url": "linux/command/index.html",
    "revision": "f2365838eeac3870805a34dab5b40ca9"
  },
  {
    "url": "linux/networking/index.html",
    "revision": "5f41cf8b8ce605b56d5099e2fdb7eb26"
  },
  {
    "url": "linux/optmization/index.html",
    "revision": "6fc1aaac2279b79fb98480fbc36446f9"
  },
  {
    "url": "linux/software/index.html",
    "revision": "2ada31ca6c90dcc466b3eb1a67f8f25b"
  },
  {
    "url": "programming/leet-code/index.html",
    "revision": "82379139aab96e5af13f146736cb05d8"
  },
  {
    "url": "programming/opencv/index.html",
    "revision": "6a31cfab09a93b83a8b4d5b5a7fee8e8"
  },
  {
    "url": "programming/pytorch/index.html",
    "revision": "7cb015acb0dbbc2e1e356ecea0b27a18"
  },
  {
    "url": "programming/tensorflow/index.html",
    "revision": "75d6fd3ff298bf2b79e1866aab7464cf"
  },
  {
    "url": "software/affinity/index.html",
    "revision": "5fc6f69daac95bd607d764a2d6a4cd65"
  },
  {
    "url": "software/qt-creator/index.html",
    "revision": "b9c9d9d1a44e2faa709dc46f6924b3cf"
  },
  {
    "url": "software/surge/index.html",
    "revision": "eb6990d0e7f2821be99d84da6a614916"
  },
  {
    "url": "software/vs-code/index.html",
    "revision": "e5397d48445814099f48a19c82dc6fed"
  },
  {
    "url": "software/vs-studio/index.html",
    "revision": "42f40c1d503041c9673ebd63bf124763"
  },
  {
    "url": "software/xcode/index.html",
    "revision": "0f9d60499d18b757348aeafb677ed112"
  },
  {
    "url": "writing/draft/index.html",
    "revision": "a0ca86fe6271794eefd643473f7165b9"
  },
  {
    "url": "writing/matrix/index.html",
    "revision": "fa051a92bd3b6fcc5c4a02c480414953"
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
