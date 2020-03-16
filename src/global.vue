<template>
  <div id="db-global-nav" class="global-nav">

    <div v-if="this.$store.getters.isLogin === 0">
      <div class="bd">
        <div class="top-nav-info">
          <a class="nav-login" rel="nofollow" @click="loginVisible = true">登录</a>
          <a class="nav-login" rel="nofollow" @click="registerVisible = true">注册</a>
        </div>
      </div>
      <el-dialog title="登录" :visible.sync="loginVisible">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="loginForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="registerVisible">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="80px"
                 class="registerForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model.number="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input v-model.number="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register('registerForm')">提交</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div v-else>
      <div class="bd">
        <div class="top-nav-info">
          {{this.$store.getters.username}},欢迎登录
        </div>
      </div>
    </div>
    <el-dialog>
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        closable
        :type="tag.type">
        {{tag.name}}
      </el-tag>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'))
        }
        setTimeout(() => {
          callback()
        }, 1000)
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        loginVisible: false,
        registerVisible: false,
        registerForm: {
          pass: '',
          checkPass: '',
          name: '',
          email: ''
        },
        loginForm: {
          name: '',
          pass: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          name: [
            {validator: checkName, trigger: 'blur'}
          ]
        },
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      }
    },
    mounted () {
      this.$store.commit('loginVisible', {loginVisible: false})
      this.$store.commit('registerVisible', {registerVisible: false})
      this.$store.dispatch('findTags')
    },
    methods: {
      register (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('USERNAME', {username: this.registerForm.name})
            this.$store.commit('PASSWORD', {password: this.registerForm.pass})
            this.$store.commit('EMAIL', {email: this.registerForm.email})
            this.$store.dispatch('userRegister')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      login (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('USERNAME', {username: this.loginForm.name})
            this.$store.commit('PASSWORD', {password: this.loginForm.pass})
            this.$store.dispatch('userLogin')
            this.loginVisible = this.$store.getters.loginVisible
            //检查有没有设置标签
          } else {
            console.log('error submit!!')
            this.loginVisible = this.$store.getters.loginVisible
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../style/color";

  #db-global-nav ul {
    margin: 0;
    padding: 0;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  #db-global-nav {
    height: 28px;
    color: #d5d5d5;
    background-color: #545652;
    min-width: 950px;
  }

  #db-global-nav {
    font: 12px Helvetica, Arial, sans-serif;
    line-height: 1.62;
    font-size: 12px;
  }

  #db-global-nav .top-nav-info a {
    display: inline-block;
    *display: inline;
    zoom: 1;
    margin: 0;
    padding: 0 12px;
    height: 28px;
  }

  #db-global-nav a:link, #db-global-nav a:visited, #db-global-nav a:hover, #db-global-nav a:active {
    color: #d5d5d5;
  }

  #db-global-nav a {
    cursor: pointer;
    text-decoration: none;
  }

  #db-global-nav .top-nav-info {
    float: right;
    margin: 0 12px 0 0;
    line-height: 28px;
  }
</style>
