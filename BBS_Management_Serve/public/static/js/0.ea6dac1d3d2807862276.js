webpackJsonp([0],{FDxe:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{adminForm:{}}},mounted:function(){"修改信息"===this.$route.name&&(this.adminForm=this.$route.params)},methods:{onSubmit:function(){var t=this;this.$axios.post("/admins",this.adminForm).then(function(e){"200"===e.data.code&&(t.$message(e.data.message),t.onCancel())})},onCancel:function(){this.adminForm={},this.$router.go(-1)},onUpdate:function(){var t=this;this.$axios.post("/admins/update_info",this.adminForm).then(function(e){"200"===e.data.code&&(t.$message({type:"success",message:e.data.message+"，请重新登录"}),t.onCancel(),localStorage.setItem("user",""),t.$store.commit("delUserInfo",""))})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"create_page"},[a("h2",[t._v(t._s("添加管理员"===t.$route.name?"添加新管理员":"修改信息"))]),t._v(" "),a("el-form",{staticClass:"admin_form",attrs:{model:t.adminForm,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"账号名称"}},[a("el-input",{attrs:{size:"small"},model:{value:t.adminForm.admin,callback:function(e){t.$set(t.adminForm,"admin",e)},expression:"adminForm.admin"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"账户密码"}},[a("el-input",{attrs:{size:"small"},model:{value:t.adminForm.password,callback:function(e){t.$set(t.adminForm,"password",e)},expression:"adminForm.password"}})],1),t._v(" "),a("el-form-item",["添加管理员"===t.$route.name?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onSubmit}},[t._v("立即创建")]):a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.onUpdate}},[t._v("立即修改")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:t.onCancel}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(n,s,!1,function(t){a("zzGa")},null,null);e.default=o.exports},zzGa:function(t,e){}});
//# sourceMappingURL=0.ea6dac1d3d2807862276.js.map