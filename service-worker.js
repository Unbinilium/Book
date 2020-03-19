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
    "url": "assets/css/0.styles.4b7e2858.css",
    "revision": "3c1d9273764b5f87494002e7674c6103"
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
    "url": "assets/js/19.b93e5a39.js",
    "revision": "6e53f88944cbba036210d32ce4b8527d"
  },
  {
    "url": "assets/js/2.f5613a4d.js",
    "revision": "62feb208a4d4764d1399174e8bb4179a"
  },
  {
    "url": "assets/js/20.5a20d8ae.js",
    "revision": "a4e524cdbfcc488c86d10e37487f086b"
  },
  {
    "url": "assets/js/21.14b28521.js",
    "revision": "6e3e030d17cedce4373e2fe9727a236a"
  },
  {
    "url": "assets/js/22.4103ef3f.js",
    "revision": "3c6c53b110b482119d5e3d5aeb8c74fe"
  },
  {
    "url": "assets/js/23.0310c61b.js",
    "revision": "4c5b72924bdaffb893a6dd745a3eeeee"
  },
  {
    "url": "assets/js/24.988e1c17.js",
    "revision": "d889a1859405da71e30f1a5d20408582"
  },
  {
    "url": "assets/js/25.e5cc4252.js",
    "revision": "a75cbd3ce95c8223111ff54b7d4a4e99"
  },
  {
    "url": "assets/js/26.93266c94.js",
    "revision": "745fa8cc23a58af1e3d70fe26b8489ea"
  },
  {
    "url": "assets/js/27.481ab05e.js",
    "revision": "2e9fed05ad8863097f1e8cb39c79b9fa"
  },
  {
    "url": "assets/js/28.29ef28f3.js",
    "revision": "00ff03794103e4265a2bf2b7d29eb737"
  },
  {
    "url": "assets/js/29.95a736b7.js",
    "revision": "8e86089eda8ad6ac40af9a0eaf54f7bc"
  },
  {
    "url": "assets/js/3.0f135a11.js",
    "revision": "919c4f42a998ead9d14d1fc4ea26e639"
  },
  {
    "url": "assets/js/30.503d1a49.js",
    "revision": "de44b538c0eef2c6bf094302ed06b460"
  },
  {
    "url": "assets/js/31.0a42eabb.js",
    "revision": "9998086f123836abf1d45f332c13a64d"
  },
  {
    "url": "assets/js/32.5a9323af.js",
    "revision": "8bebf9d5f406f5d0c76569749b856acd"
  },
  {
    "url": "assets/js/33.6c1aa0e5.js",
    "revision": "041d20c376b101ef031ac0537eb97f1c"
  },
  {
    "url": "assets/js/34.c3aa7093.js",
    "revision": "6a2a0d7d0720d5f76ad46be0bd8c240e"
  },
  {
    "url": "assets/js/35.86facf3c.js",
    "revision": "008694557af20ef594dac65aa26e0fe3"
  },
  {
    "url": "assets/js/36.39073e68.js",
    "revision": "91d5f0805acc22312b97d9867985b3fe"
  },
  {
    "url": "assets/js/37.f7e50974.js",
    "revision": "fea5d1a7efbd6d44d221affa81bcd3e6"
  },
  {
    "url": "assets/js/38.27d8a2b2.js",
    "revision": "d685f4a2512e4b339b58adc82c15e439"
  },
  {
    "url": "assets/js/39.7d37c475.js",
    "revision": "ba72dba938019a9b1abf005f2e2a60fe"
  },
  {
    "url": "assets/js/4.6dee130a.js",
    "revision": "8139bc359b506f1aa629576bdf05745a"
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
    "url": "assets/js/app.ca75aa58.js",
    "revision": "bc2e8e21db0bafdf12b45c1771d5433f"
  },
  {
    "url": "coding/c++/index.html",
    "revision": "5cbde7f1f2c45d1404edca47ab4cc95f"
  },
  {
    "url": "coding/html/index.html",
    "revision": "191c147f2a43226087282fadda82528b"
  },
  {
    "url": "coding/java/index.html",
    "revision": "dddd379123e97f4944e67b20a28b8c39"
  },
  {
    "url": "coding/javascript/index.html",
    "revision": "bfe219ec7b29f293fcd8885923282b13"
  },
  {
    "url": "coding/python/index.html",
    "revision": "f8db3b1fda667c6c243952a08841c9d4"
  },
  {
    "url": "coding/swift/index.html",
    "revision": "4cb1c5e30c38d2a36de4d475a61180c8"
  },
  {
    "url": "collection/game/index.html",
    "revision": "94c8f3085d583bb2f2a346545f0ecfa0"
  },
  {
    "url": "collection/movie/index.html",
    "revision": "06bda6237db322461e61c0a3a30d72c7"
  },
  {
    "url": "collection/music/index.html",
    "revision": "2111a982a9367cd533fcf53dbf569a8d"
  },
  {
    "url": "collection/novel/index.html",
    "revision": "cb1fa382a49bf827dd6c570f93608aab"
  },
  {
    "url": "collection/reference/index.html",
    "revision": "ba7b8e93b79b3f73ab4fc0e162266e85"
  },
  {
    "url": "collection/website/index.html",
    "revision": "6241a28d1a38c81829f36c27859d53a4"
  },
  {
    "url": "design/icon/index.html",
    "revision": "782e23faa5e191b6945808f45b543e62"
  },
  {
    "url": "design/product/index.html",
    "revision": "3796d482c8db859e65a81aed39cb688d"
  },
  {
    "url": "design/ui-ux/index.html",
    "revision": "376da12852cfadecb6b8b0c9aa1e9352"
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
    "revision": "aaff0b2d5de050c7511c7137ff07c859"
  },
  {
    "url": "linux/command/index.html",
    "revision": "642d61e3ced1c1f134fa55792c727379"
  },
  {
    "url": "linux/networking/index.html",
    "revision": "e37958e18ca890e6ee3081d18181966f"
  },
  {
    "url": "linux/optmization/index.html",
    "revision": "fb18ba61b063cb47054a3c2ed5259c66"
  },
  {
    "url": "linux/software/index.html",
    "revision": "3db8c69d8f6ffce91e966c011154d9cb"
  },
  {
    "url": "programming/leet-code/index.html",
    "revision": "5d7b306931dce31e8cf2c8b33c10c03f"
  },
  {
    "url": "programming/opencv/index.html",
    "revision": "5af1ab404e46ace3a540b579cb82bd95"
  },
  {
    "url": "programming/pytorch/index.html",
    "revision": "bb80dd87e7731ec4c80fcb9f26f48a9a"
  },
  {
    "url": "programming/tensorflow/index.html",
    "revision": "bb2c3df2a2f694e90aee14651104b3db"
  },
  {
    "url": "software/affinity/index.html",
    "revision": "eebc2dd36db122b97b96d8db5cbcbcfd"
  },
  {
    "url": "software/qt-creator/index.html",
    "revision": "f04a32f26c555a0a4ae8408dbd07033b"
  },
  {
    "url": "software/surge/index.html",
    "revision": "242e176367adf936073dffc7a38a5581"
  },
  {
    "url": "software/vs-code/index.html",
    "revision": "4eca51fe27a4d00363c2bb9f11442479"
  },
  {
    "url": "software/vs-studio/index.html",
    "revision": "17df216e6a9eaf68a5e51c4fa686ceef"
  },
  {
    "url": "software/xcode/index.html",
    "revision": "937574a17c44cbdb4defa59febaac3a2"
  },
  {
    "url": "writing/draft/index.html",
    "revision": "a4d1bd57060c5f6c852da556be1aadaa"
  },
  {
    "url": "writing/matrix/index.html",
    "revision": "8506fcb1e08779f0d4f263e9317587be"
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
