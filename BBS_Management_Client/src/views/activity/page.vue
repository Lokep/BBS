<template>
  <div class="create_page">
    <el-form class="activity_form" :model="activityForm" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="activityForm.title" size="small"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-input v-model="activityForm.time" size="small"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="activityForm.city" placeholder="请选择" size="small">
          <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动图片">
        <el-input v-model="activityForm.imgSrc" size="small"></el-input>
      </el-form-item>
      <el-form-item label="活动链接">
        <el-input v-model="activityForm.link" size="small"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-radio-group v-model="activityForm.type" size="small">
          <el-radio-button label="1">线上</el-radio-button>
          <el-radio-button label="0">线下</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button size="small">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { city } from '../../utils/city'
  export default {
    data() {
      return {
        activityForm: {
          type: 1,
          city: null
        },
        cities: city
      }
    },
    methods: {
      onSubmit() {
        this.activityForm.cityCode = this.activityForm.city
        this.$axios.post("/activities", this.activityForm)
          .then(res => {
            if(res.data.code === '200') {
              this.$message(res.data.message);
              this.onCancel()
            }
          })
      },
      onCancel() {
        this.activityForm = {
          type: 1,
          city: null
        };
        this.$router.push({
          name: "创建活动"
        })
      }
    }
  }
</script>

<style>
  .activity_form {
    width: 400px;
    margin: 0 auto;
  }
</style>
