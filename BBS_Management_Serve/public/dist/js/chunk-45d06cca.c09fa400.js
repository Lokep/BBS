(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45d06cca"],{"01c9":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"list"},[t._l(t.articleList,function(i,e){return n("div",{staticClass:"item cursor",on:{click:function(n){return t.toArticleInfo(i)}}},[n("img",{staticClass:"image fl",attrs:{src:i.imgurl?t.$IMG_URL+i.imgurl:"/img/home/list/list-img1.png",alt:""}}),n("div",{staticClass:"content fr",style:{width:t.contentWidth+"px"}},[n("a",{staticClass:"title cursor",style:{"margin-bottom":t.mb+"px"}},[t._v(t._s(i.title))]),n("p",{staticClass:"abstract"},[t._v(t._s(i.synopsis))]),n("div",{class:t.isLeft?"meta":"meta right"},[t._m(0,!0),n("div",{staticClass:"meta-item"},[n("i",{staticClass:"iconfont shijian"},[t._v("")]),n("span",[t._v(t._s(t.dateDiff(i.publishtime)))])])])])])}),n("Pagination",{attrs:{total:t.total}})],2)},a=[function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"meta-item"},[n("i",{staticClass:"iconfont"},[t._v("")]),n("span",[t._v("新闻资讯")])])}],r=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"pagination-wrapper tc"},[n("el-pagination",{attrs:{background:"",layout:"prev, pager, next, jumper","current-page":parseInt(t.$route.query.page)||1,"page-size":10,total:t.total},on:{"current-change":t.changePage}})],1)},s=[],o=n("441b"),c={name:"pagination",mixins:[o["a"]],props:["total"],methods:{changePage:function(t){this.$route.query.index?this.changeQuery({index:this.$route.query.index,page:t}):this.changeQuery({page:t})}}},u=c,l=(n("c35b"),n("2877")),f=Object(l["a"])(u,r,s,!1,null,"899599b8",null),d=f.exports,p={name:"articleList",props:["articleList","contentWidth","isLeft","mb","total","type"],components:{Pagination:d},methods:{dateDiff:function(t){var i=Date.now()-t,n=Math.floor(i/31104e6),e=Math.floor(i/2592e6),a=Math.floor(i/864e5),r=Math.floor(i/36e5),s=Math.floor(i/6e4);Math.floor(i/1e3);return n>0?n+"年前":e>0?e+"月前":a>0?a+"天前":r>0?r+"小时前":s>0?s+"分钟前":"刚刚"},toArticleInfo:function(t){"topic"===this.type?t.topicurl&&window.open(t.topicurl):window.open(location.origin+"/"+this.type+"/"+t.id)}}},v=p,m=(n("6350"),Object(l["a"])(v,e,a,!1,null,"04e95418",null));i["a"]=m.exports},"16d5":function(t,i,n){"use strict";var e=n("3f8c"),a=n.n(e);a.a},"1af6":function(t,i,n){var e=n("63b6");e(e.S,"Array",{isArray:n("9003")})},"1bb6":function(t,i,n){},"1fed":function(t,i,n){"use strict";i["a"]={methods:{goTop:function(){var t=setInterval(function(){var i=document.documentElement.scrollTop||document.body.scrollTop,n=Math.floor(-i);document.documentElement.scrollTop=document.body.scrollTop=i+n,0===i&&clearInterval(t)},30)}}}},"20c6":function(t,i,n){"use strict";var e=n("3ea2"),a=n.n(e);a.a},"20fd":function(t,i,n){"use strict";var e=n("d9f6"),a=n("aebd");t.exports=function(t,i,n){i in t?e.f(t,i,a(0,n)):t[i]=n}},"268f":function(t,i,n){t.exports=n("fde4")},"31b0":function(t,i,n){},"31c6":function(t,i,n){},3200:function(t,i,n){},"32a6":function(t,i,n){var e=n("241e"),a=n("c3a1");n("ce7e")("keys",function(){return function(t){return a(e(t))}})},3702:function(t,i,n){var e=n("481b"),a=n("5168")("iterator"),r=Array.prototype;t.exports=function(t){return void 0!==t&&(e.Array===t||r[a]===t)}},"3ea2":function(t,i,n){},"3f8c":function(t,i,n){},"40c3":function(t,i,n){var e=n("6b4c"),a=n("5168")("toStringTag"),r="Arguments"==e(function(){return arguments}()),s=function(t,i){try{return t[i]}catch(n){}};t.exports=function(t){var i,n,o;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(i=Object(t),a))?n:r?e(i):"Object"==(o=e(i))&&"function"==typeof i.callee?"Arguments":o}},"441b":function(t,i,n){"use strict";var e=n("268f"),a=n.n(e),r=n("e265"),s=n.n(r),o=n("a4bb"),c=n.n(o),u=n("85f2"),l=n.n(u);function f(t,i,n){return i in t?l()(t,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[i]=n,t}function d(t){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{},e=c()(n);"function"===typeof s.a&&(e=e.concat(s()(n).filter(function(t){return a()(n,t).enumerable}))),e.forEach(function(i){f(t,i,n[i])})}return t}i["a"]={methods:{changeQuery:function(t){var i=this.$router.history.current.query,n=this.$router.history.current.path,e=JSON.parse(JSON.stringify(i));e=d({},t),this.$router.push({path:n,query:e})}}}},"454f":function(t,i,n){n("46a7");var e=n("584a").Object;t.exports=function(t,i,n){return e.defineProperty(t,i,n)}},"45a7":function(t,i,n){},"46a7":function(t,i,n){var e=n("63b6");e(e.S+e.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"4ee1":function(t,i,n){var e=n("5168")("iterator"),a=!1;try{var r=[7][e]();r["return"]=function(){a=!0},Array.from(r,function(){throw 2})}catch(s){}t.exports=function(t,i){if(!i&&!a)return!1;var n=!1;try{var r=[7],o=r[e]();o.next=function(){return{done:n=!0}},r[e]=function(){return o},t(r)}catch(s){}return n}},"549b":function(t,i,n){"use strict";var e=n("d864"),a=n("63b6"),r=n("241e"),s=n("b0dc"),o=n("3702"),c=n("b447"),u=n("20fd"),l=n("7cd6");a(a.S+a.F*!n("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var i,n,a,f,d=r(t),p="function"==typeof this?this:Array,v=arguments.length,m=v>1?arguments[1]:void 0,g=void 0!==m,h=0,b=l(d);if(g&&(m=e(m,v>2?arguments[2]:void 0,2)),void 0==b||p==Array&&o(b))for(i=c(d.length),n=new p(i);i>h;h++)u(n,h,g?m(d[h],h):d[h]);else for(f=b.call(d),n=new p;!(a=f.next()).done;h++)u(n,h,g?s(f,m,[a.value,h],!0):a.value);return n.length=h,n}})},"54a1":function(t,i,n){n("6c1c"),n("1654"),t.exports=n("95d5")},6350:function(t,i,n){"use strict";var e=n("b0cd"),a=n.n(e);a.a},"6b5a":function(t,i,n){"use strict";var e=n("3200"),a=n.n(e);a.a},7185:function(t,i,n){},"75fc":function(t,i,n){"use strict";var e=n("a745"),a=n.n(e);function r(t){if(a()(t)){for(var i=0,n=new Array(t.length);i<t.length;i++)n[i]=t[i];return n}}var s=n("774e"),o=n.n(s),c=n("c8bb"),u=n.n(c);function l(t){if(u()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){return r(t)||l(t)||f()}n.d(i,"a",function(){return d})},"774e":function(t,i,n){t.exports=n("d2d5")},"7abe":function(t,i,n){"use strict";n.r(i);var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"home"},[n("div",{staticClass:"part-left fl"},[n("Swiper"),n("div",{staticClass:"part-left-content"},[n("article-list",{attrs:{total:t.total,articleList:t.newsList,contentWidth:460,isLeft:!0,mb:0,type:"news"}})],1)],1),n("div",{staticClass:"part-right fl"},[n("Advertise"),n("Hot"),n("Forum"),n("Activity")],1)])},a=[],r=n("75fc"),s=n("01c9"),o=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"swiper-wrapper"},[n("swiper",{attrs:{options:t.swiperOption}},[t._l(t.swiperList,function(i,e){return n("swiper-slide",{key:e},[n("a",{staticClass:"img100",attrs:{href:i.topicurl||"javascript:;",target:"__blank"}},[n("img",{staticClass:"swiper-img",attrs:{src:i.imgurl?t.$IMG_URL+i.imgurl:t.swiperImg,alt:""}})])])}),n("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1)},c=[],u=(n("dfa4"),n("7212")),l={name:"swiperWrapper",components:{swiper:u["swiper"],swiperSlide:u["swiperSlide"]},data:function(){return{swiperOption:{pagination:{el:".swiper-pagination",bulletClass:"bullet",bulletActiveClass:"bullet-active"},autoplay:!0,delay:1500},swiperImg:"/img/home/banner/banner1.png",swiperList:[]}},methods:{getBannerList:function(){var t=this;this.$axios.get("/activity/getbannerlist").then(function(i){0===i.data.code&&(t.swiperList=i.data.data)})}},mounted:function(){this.getBannerList()}},f=l,d=(n("bfac"),n("16d5"),n("2877")),p=Object(d["a"])(f,o,c,!1,null,"3f3346ac",null),v=p.exports,m=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("ul",{staticClass:"advertise"},t._l(t.adList,function(i){return n("li",{staticClass:"ad-item"},[n("a",{staticClass:"img100",attrs:{href:i.topicurl||"javascript:;",target:"__blank"}},[n("img",{attrs:{src:t.$IMG_URL+i.imgurl,alt:""}})])])}),0)])},g=[],h={name:"advertise",data:function(){return{adList:[]}},methods:{getTopicList:function(){var t=this;this.$axios.get("/activity/getSpecialTopicList",{params:{page:1}}).then(function(i){0===i.data.code&&(t.adList=Object(r["a"])(i.data.data))})}},mounted:function(){this.getTopicList()}},b=h,y=(n("cb21"),Object(d["a"])(b,m,g,!1,null,"4996aebe",null)),w=y.exports,x=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"forum"},[n("side-list",{attrs:{titleImg:t.titleImg,url:t.url,isActivity:t.isActivity}})],1)},_=[],L=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"side-list",on:{mouseleave:t.leaveList}},[n("img",{staticClass:"title-img",attrs:{src:t.titleImg,alt:""}}),t._l(t.list,function(i,e){return n("div",{staticClass:"side-item cursor",on:{click:function(n){return t.goArticle(i.id)},mouseenter:function(i){return t.hoverItem(e)}}},[e===t.i?n("div",[t.isActivity?n("div",[n("div",{staticClass:"news-content"},[n("img",{staticClass:"news-img-l",attrs:{src:t.$IMG_URL+i.imgurl,alt:""}}),n("p",{staticClass:"news-title news-title-r fr"},[t._v(t._s(i.title))])])]):n("div",[n("p",{staticClass:"news-content"},[n("i",{staticClass:"iconfont news-icon",class:"hot"===t.index?"red":"activity"===t.index?"blue":"brown"},[t._v(t._s("hot"===t.index?"":"activity"===t.index?"":""))]),n("span",{staticClass:"news-title textEllipsis"},[t._v(t._s(i.title))])]),n("img",{staticClass:"news-img",attrs:{src:t.$IMG_URL+i.imgurl,alt:""}})])]):n("p",{staticClass:"news-content"},[n("i",{staticClass:"iconfont news-icon",class:"hot"===t.index?"red":"activity"===t.index?"blue":"brown"},[t._v(t._s("hot"===t.index?"":"activity"===t.index?"":""))]),n("span",{staticClass:"news-title textEllipsis"},[t._v(t._s(i.title))])])])})],2)},C=[],A={name:"sideList",props:{isActivity:Boolean,titleImg:String,index:String,url:String},data:function(){return{list:[],i:0}},methods:{hoverItem:function(t){this.i=t},leaveList:function(){this.i=0},goArticle:function(t){"hot"===this.index&&window.open(location.origin+"/news/"+t),"activity"===this.index&&window.open(location.origin+"/activity/"+t)},getDataList:function(t){var i=this;this.$axios.get(this.url,{params:{page:t||1}}).then(function(t){if(0===t.data.code){var n=Object(r["a"])(t.data.data);"hot"===i.index?n.map(function(t){1===t.type&&i.list.push(t)}):"activity"===i.index?n.map(function(t){2===t.type&&i.list.push(t)}):i.list=n}})}},mounted:function(){this.getDataList()}},O=A,j=(n("20c6"),Object(d["a"])(O,L,C,!1,null,"0e378066",null)),I=j.exports,$={name:"forum",components:{sideList:I},data:function(){return{titleImg:"/img/home/side/forum.png",isActivity:!1,index:"forum",url:"/activity/getHotActivityList"}}},S=$,E=(n("a673"),Object(d["a"])(S,x,_,!1,null,"216ab576",null)),M=E.exports,k=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"hot"},[n("side-list",{attrs:{titleImg:t.titleImg,url:t.url,isActivity:t.isActivity,index:t.index}})],1)},T=[],P={name:"hot",components:{sideList:I},data:function(){return{titleImg:"/img/home/side/hot.png",isActivity:!1,index:"hot",url:"/information/getHotInformationActivityList"}}},D=P,q=(n("6b5a"),Object(d["a"])(D,k,T,!1,null,"e824fce6",null)),N=q.exports,U=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"activity"},[n("side-list",{attrs:{titleImg:t.titleImg,url:t.url,isActivity:t.isActivity,index:t.index}})],1)},F=[],G={name:"activity",components:{sideList:I},data:function(){return{titleImg:"/img/home/side/activity.png",isActivity:!0,index:"activity",url:"/information/getHotInformationActivityList"}}},H=G,R=Object(d["a"])(H,U,F,!1,null,null,null),J=R.exports,W=n("1fed"),B={name:"home",mixins:[W["a"]],components:{articleList:s["a"],Swiper:v,Advertise:w,Forum:M,Hot:N,Activity:J},data:function(){return{newsList:[],total:1}},methods:{getNewsList:function(t){var i=this;this.$axios.get("/information/",{params:{page:t||1}}).then(function(t){0===t.data.code&&(i.newsList=Object(r["a"])(t.data.data),i.total=t.data.count)})}},mounted:function(){this.getNewsList()},watch:{$route:function(t,i){this.getNewsList(t.query.page),this.goTop()}}},Q=B,z=(n("c933"),Object(d["a"])(Q,e,a,!1,null,"420b1832",null));i["default"]=z.exports},"7cd6":function(t,i,n){var e=n("40c3"),a=n("5168")("iterator"),r=n("481b");t.exports=n("584a").getIteratorMethod=function(t){if(void 0!=t)return t[a]||t["@@iterator"]||r[e(t)]}},"85f2":function(t,i,n){t.exports=n("454f")},"8aae":function(t,i,n){n("32a6"),t.exports=n("584a").Object.keys},"95d5":function(t,i,n){var e=n("40c3"),a=n("5168")("iterator"),r=n("481b");t.exports=n("584a").isIterable=function(t){var i=Object(t);return void 0!==i[a]||"@@iterator"in i||r.hasOwnProperty(e(i))}},a4bb:function(t,i,n){t.exports=n("8aae")},a673:function(t,i,n){"use strict";var e=n("1bb6"),a=n.n(e);a.a},a745:function(t,i,n){t.exports=n("f410")},b0cd:function(t,i,n){},b0dc:function(t,i,n){var e=n("e4ae");t.exports=function(t,i,n,a){try{return a?i(e(n)[0],n[1]):i(n)}catch(s){var r=t["return"];throw void 0!==r&&e(r.call(t)),s}}},bf90:function(t,i,n){var e=n("36c3"),a=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(t,i){return a(e(t),i)}})},bfac:function(t,i,n){"use strict";var e=n("31c6"),a=n.n(e);a.a},c35b:function(t,i,n){"use strict";var e=n("7185"),a=n.n(e);a.a},c8bb:function(t,i,n){t.exports=n("54a1")},c933:function(t,i,n){"use strict";var e=n("31b0"),a=n.n(e);a.a},cb21:function(t,i,n){"use strict";var e=n("45a7"),a=n.n(e);a.a},ce7e:function(t,i,n){var e=n("63b6"),a=n("584a"),r=n("294c");t.exports=function(t,i){var n=(a.Object||{})[t]||Object[t],s={};s[t]=i(n),e(e.S+e.F*r(function(){n(1)}),"Object",s)}},d2d5:function(t,i,n){n("1654"),n("549b"),t.exports=n("584a").Array.from},e265:function(t,i,n){t.exports=n("ed33")},ed33:function(t,i,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},f410:function(t,i,n){n("1af6"),t.exports=n("584a").Array.isArray},fde4:function(t,i,n){n("bf90");var e=n("584a").Object;t.exports=function(t,i){return e.getOwnPropertyDescriptor(t,i)}}}]);