(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{132:function(t,e,s){"use strict";s.r(e);var a=s(3),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"enable-tfo-and-bbr"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#enable-tfo-and-bbr"}},[t._v("#")]),t._v(" Enable TFO and BBR")]),t._v(" "),s("p",[t._v("It is required to edit "),s("code",[t._v("/etc/sysctl.conf")]),t._v(" by:")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("nano")]),t._v(" /etc/sysctl.conf\n")])])]),s("p",[t._v("And add the configuration below to the end of the file.")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("net.core.default_qdisc = fq\nnet.ipv4.tcp_congestion_control = bbr\nnet.ipv4.tcp_fastopen = 3\n")])])]),s("p",[t._v("This means to config Google BBR and TCP fastopen support on your operation system. Want another choice or check if the Google BBR supported by default, type command")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("sysctl net.ipv4.tcp_available_congestion_control\n")])])]),s("p",[t._v("to show all supported congestion control modules.")]),t._v(" "),s("p",[t._v("Use "),s("code",[t._v("sudo sysctl -p")]),t._v(" to apply the changes to your operating system. Check if BBR module is installed in kernel use "),s("code",[t._v("lsmod | grep bbr")]),t._v(" and find if string "),s("code",[t._v("bbr")]),t._v(" is in outputs.")])])}),[],!1,null,null,null);e.default=n.exports}}]);