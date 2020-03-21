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
    "url": "assets/css/0.styles.e8e0687e.css",
    "revision": "b4761fb2fe74d76716bec56f9de618de"
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
    "url": "assets/js/17.93ae8409.js",
    "revision": "17af72cfb59cf56f07426797d4f3915c"
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
    "url": "assets/js/3.fee81bc3.js",
    "revision": "ddac26339682118b71d9066cd257e1ce"
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
    "url": "assets/js/7.19de616b.js",
    "revision": "e91606670ae0e529bad63e860584c25c"
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
    "url": "assets/js/app.9fd2c807.js",
    "revision": "fa5d11d5a9b46ccc4bcd8c046903a727"
  },
  {
    "url": "coding/c++/index.html",
    "revision": "ebcdee6c9e95672b46f86b9639fd734f"
  },
  {
    "url": "coding/css/index.html",
    "revision": "6afc064d65e5cdf6f6dcc2335cd5f47d"
  },
  {
    "url": "coding/java/index.html",
    "revision": "a6098034c36badcf27ce3c70d8c6c4ad"
  },
  {
    "url": "coding/javascript/index.html",
    "revision": "dc116d071499f193bd3f22cd06847100"
  },
  {
    "url": "coding/python/index.html",
    "revision": "9098be71b04940527055eaefb4c5b705"
  },
  {
    "url": "coding/swift/index.html",
    "revision": "8b0001f5ad4592cdecb4a2e4df295f03"
  },
  {
    "url": "collection/game/index.html",
    "revision": "097bfbcb9c505d23f1250f63c44f78f5"
  },
  {
    "url": "collection/movie/index.html",
    "revision": "f1d63bfb5ff207d2f0ffb4a20a21230c"
  },
  {
    "url": "collection/music/index.html",
    "revision": "5dee5be31d661678f053610ceff28e23"
  },
  {
    "url": "collection/novel/index.html",
    "revision": "b98c5b7fecf932667895064bd5f31c8c"
  },
  {
    "url": "collection/reference/index.html",
    "revision": "cff724b2817875803738d98287cf910b"
  },
  {
    "url": "collection/website/index.html",
    "revision": "80312ae86504f0a0b27857eab94b7663"
  },
  {
    "url": "design/icon/index.html",
    "revision": "8e385a956d35917ef1d54064f85c76bb"
  },
  {
    "url": "design/product/index.html",
    "revision": "9515147408bb5d945c998376941369a4"
  },
  {
    "url": "design/ui-ux/index.html",
    "revision": "79754cf24ed814001afd8b27e1072e39"
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
    "revision": "22d820918d58931e29480e2d815a165c"
  },
  {
    "url": "linux/command/index.html",
    "revision": "f411f3488cf3b9e0a59ee148e6f0175f"
  },
  {
    "url": "linux/networking/index.html",
    "revision": "2b6289ffef6ef59f66fd65edcdbf54f8"
  },
  {
    "url": "linux/optmization/index.html",
    "revision": "c44f847bc067679dbcb6dffb747a7abc"
  },
  {
    "url": "linux/software/index.html",
    "revision": "93bab26132a7addbced9c265b4c47217"
  },
  {
    "url": "programming/leet-code/index.html",
    "revision": "1e5db736e397340e4a6f646426034239"
  },
  {
    "url": "programming/opencv/index.html",
    "revision": "d11da7cf1d3cceef4ba8157e959d55af"
  },
  {
    "url": "programming/pytorch/index.html",
    "revision": "f9ef839c3cf82877cce4ba40064a39de"
  },
  {
    "url": "programming/tensorflow/index.html",
    "revision": "fcec7ece5664e63ce21da52f1ec56544"
  },
  {
    "url": "software/affinity/index.html",
    "revision": "7e716b5f2ffbe12a6bc6bd7d09551952"
  },
  {
    "url": "software/qt-creator/index.html",
    "revision": "726e6e3c2b0b793d7108328644c7be42"
  },
  {
    "url": "software/surge/index.html",
    "revision": "603283de4c79fe3bbf942b2821a662b0"
  },
  {
    "url": "software/vs-code/index.html",
    "revision": "cb44c27bf8f62f205ab8c8a922ddf5ae"
  },
  {
    "url": "software/vs-studio/index.html",
    "revision": "a65da880dbefb297cc6171ce93e93a6e"
  },
  {
    "url": "software/xcode/index.html",
    "revision": "82f3e359ca3ea4d0d2b1233ee80a17d7"
  },
  {
    "url": "writing/draft/index.html",
    "revision": "c3ae5bdcca5640b759773b0594a86851"
  },
  {
    "url": "writing/matrix/index.html",
    "revision": "ea78bb343bfbe7ab0690b7609a98beef"
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
