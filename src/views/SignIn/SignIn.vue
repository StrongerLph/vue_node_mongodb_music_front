<template>
  <div style="height: 100%">

    <div style="height: 100%; display: flex; flex-direction: column; align-items: center; background: rgba(0, 0, 0, 0.5)">
      <i
        class="el-icon-arrow-left"
        style="padding: 10px; font-size: 48px; position: absolute; top: 0; left: 0; color: #ccc"
        @click="handleBack"
      ></i>
      <div class="input-focus" style="display: flex; align-items: center; width: 80%; margin-top: 40%">
        <label for="email" style="display: inline-block; padding: 10px; color: #fff">
          邮　箱:
        </label>
        <input type="email" id="email" v-model="signInForm.email" placeholder="请输入邮箱" style="flex-grow: 1; padding: 10px 0; border: 0; outline: none; background: rgba(0, 0, 0, 0); font-size: 16px; color: #fff">
      </div>

      <div class="input-focus" style="display: flex; align-items: center; width: 80%; margin-top: 20px">
        <label for="username" style="display: inline-block; padding: 10px; color: #fff">
          用户名:
        </label>
        <input type="text" id="username" v-model="signInForm.username" placeholder="请输入用户名" style="flex-grow: 1; padding: 10px 0; border: 0; outline: none; background: rgba(0, 0, 0, 0); font-size: 16px; color: #fff">
      </div>

      <div class="input-focus" style="display: flex; align-items: center; width: 80%; margin-top: 20px">
        <label for="password" style="display: inline-block; padding: 10px; color: #fff">
          密　码:
        </label>
        <input type="password" id="password" v-model="signInForm.password" placeholder="请输入密码" autocomplete="new-password" style="flex-grow: 1; padding: 10px 0; border: 0; outline: none; background: rgba(0, 0, 0, 0); font-size: 16px; color: #fff">
      </div>

      <div style="width: 80%; display: flex; margin-top: 20px">
        <div class="input-focus" style="display: flex; align-items: center; width: 75%">
          <label for="captcha" style="display: inline-block; padding: 10px; color: #fff">
            验证码:
          </label>
          <input type="text" id="captcha" v-model="signInForm.captcha" placeholder="请输入验证码" style="width: 152px; padding: 10px 0; border: 0; outline: none; background: rgba(0, 0, 0, 0); font-size: 16px; color: #fff">
        </div>
        <button :disabled="showTime" style="width: 75px; padding: 5px; font-size: 12px; border: 0; outline: none; border-radius: 25px; background: #67C23A; color: #eee" @click="sendCaptcha">
          <span v-show="!showTime">发送邮箱验证码</span>
          <span v-show="showTime" v-text="'已发送(' + time + 's)'"></span>
        </button>
      </div>
      <el-button type="success" style="width: 80%; margin-top: 80px" @click="signIn">
        确认注册
      </el-button>
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
import { getCaptcha, signIn } from '@/api/default'
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'SignIn',
  data () {
    return {
      dialogVisible: false,
      msgText: '',
      time: 60,
      showTime: false,
      signInForm: {
        email: '',
        username: '',
        password: '',
        captcha: ''
      }
    }
  },
  methods: {
    sendCaptcha () {
      if (!this.signInForm.email) {
        this.msgText = '请输入邮箱'
        this.dialogVisible = true
        return
      }
      if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.signInForm.email)) {
        this.msgText = '邮箱格式不正确'
        this.dialogVisible = true
        return
      }
      getCaptcha({ email: this.signInForm.email }).then(res => {
        this.showTime = true
        const timeId = setInterval(() => {
          if (this.time <= 0) {
            this.showTime = false
            this.time = 60
            clearInterval(timeId)
            return
          }
          this.time -= 1
        }, 1000)
      }).catch(err => {
        throw err
      })
    },
    signIn () {
      // 注册
      if (!this.signInForm.email) {
        this.msgText = '请输入邮箱'
        this.dialogVisible = true
        return
      }
      if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.signInForm.email)) {
        this.msgText = '邮箱格式不正确'
        this.dialogVisible = true
        return
      }
      if (!this.signInForm.username) {
        this.msgText = '请输入用户名'
        this.dialogVisible = true
        return
      }
      if (!this.signInForm.password) {
        this.msgText = '请输入密码'
        this.dialogVisible = true
        return
      }
      if (!this.signInForm.captcha) {
        this.msgText = '请输入验证码'
        this.dialogVisible = true
        return
      }
      signIn(this.signInForm).then(res => {
        if (res.success) {
          this.msgText = '注册成功！'
          this.dialogVisible = true
          setTimeout(() => {
            this.$router.replace('/login-password')
          }, 3000)
        }
      }).catch(err => {
        throw err
      })
    },
    handleBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .input-focus {
    border-bottom: 2px solid #d7d7d7;
  }

  .input-focus:focus-within {
    border-bottom-color: #67C23A;
  }

  ::-webkit-input-placeholder {
    color: #ccc
  }
</style>
