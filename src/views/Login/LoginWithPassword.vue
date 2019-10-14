<template>
  <div style="height: 100%">
    
    <div style="height: 100%; display: flex; align-items: center; background: rgba(0, 0, 0, 0.5)">
      <i
        class="el-icon-arrow-left"
        style="padding: 10px; font-size: 48px; position: absolute; top: 0; left: 0; color: #ccc"
        @click="handleBack"
      ></i>
      <el-form
        :model="loginForm"
        label-width="80px"
        style="width: 80%; margin: 0 auto; padding: 40px 20px; border: 1px solid #ccc; border-radius: 5px; border-shadow: 10px; box-shadow: 4px 4px 10px yellowgreen"
      >
        <el-form-item class="label-color">
          <span slot="label" style="font-size: 16px; color: #fff">账 号:</span>
          <el-input type="text" v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item class="label-color">
          <span slot="label" style="font-size: 16px; color: #fff">密 码:</span>
          <el-input type="password" v-model="loginForm.password" autocomplete="new-password" clearable></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="success" style="width: 80%; font-size: 16px" @click="login">登 录</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" :show-close="false" :center="true" width="80%" top="60%">
      <div style="text-align: center">
        <span style="font-size: 16px" v-text="msgText"></span>
      </div>
      <span slot="footer">
        <el-button type="primary" style="width: 70%" @click="dialogVisible = false">确　定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LoginWithPassword",
  data() {
    return {
      dialogVisible: false,
      msgText: '',
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      // 请求登录
      if (!this.loginForm.username) {
        this.msgText = '请输入用户名'
        this.dialogVisible = true
        return
      }
      if (!this.loginForm.password) {
        this.msgText = '请输入密码'
        this.dialogVisible = true
        return
      }
      this.$store.dispatch("login", this.loginForm)
      .then(() => {
        this.$router.push('/search')
      })
    },
    handleBack() {
      this.$router.push("/")
    }
  }
}
</script>

<style>
</style>
