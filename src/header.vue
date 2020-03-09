<template>
  <div class="douban-header">
    <div class="douban-header-container">
      <div class="douban-search">
        <a class="title">推荐电影</a>
        <div class="search-container">
          <el-input placeholder="电影、影人、影院、电视剧" v-model="content">
            <el-button slot="append" icon="search" @click="searchMovie"></el-button>
          </el-input>
        </div>
        <el-button @click="loginVisible = true">登录</el-button>
        <el-button @click="registerVisible = true">注册</el-button>
      </div>
    </div>
    <el-dialog title="登录" :visible.sync="loginVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="password" v-model="loginForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
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
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model.number="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="douban-bar">
      <ul>
        <li v-for="bar in barList" @click="choiceUrl(bar.title)">
          <router-link :to="bar.url" :class="title===bar.title? 'active':''">{{bar.title}}</router-link>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
  export default {
    data () {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'))
        }
        /*
        else {
          callback()
        }
        */
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'))
            } else {
              callback()
            }
          }
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
        content: '',
        loginVisible: false,
        registerVisible: false,
        title: '正在热映',
        barList: [{
          title: '正在热映',
          url: '/'
        }, {
          title: '即将上映',
          url: '/upcoming'
        }, {
          title: 'Top250',
          url: '/top250'
        }],
        registerForm: {
          pass: '',
          checkPass: '',
          name: ''
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
        }
      }
    },
    methods: {
      choiceUrl (title) {
        this.title = title
      },
      searchMovie () {
        this.$store.commit('SEARCH_TEXT', {searchText: this.content})
        this.$store.dispatch('getSearchList')
        this.$store.commit('SEARCH_LOADING', {loading: true})
        this.$router.push({path: '/search', query: {searchText: this.content}})
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
            alert('login!')
            this.$store.dispatch('userLogin')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../style/color";

  .douban-header {
    background: @mainColor;
    width: 100%;
    height: 114px;

    .douban-bar {

      width: 950px;
      margin: 0 auto;
      height: 20px;

      ul {
        li {
          list-style: none;
          float: left;
          line-height: 20px;
          cursor: pointer;

          a {
            display: inline-block;
            padding: 8px;
            font-size: 12px;
            color: #aaa;
            text-decoration: none;
          }

          a.active {
            color: @doubanColor;
          }
        }
      }
    }

    .douban-header-container {
      width: 100%;
      margin: 0 auto;
      border-bottom: 1px solid @line;

      .douban-search {
        width: 950px;
        margin: 0 auto;
        height: 75px;

        .title {
          color: @doubanColor;
          font-size: 30px;
          font-weight: bold;
          line-height: 75px;
        }

        .search-container {
          display: inline-block;
          line-height: 75px;
          vertical-align: top;
          width: 500px;
          margin-left: 50px;

          input {
            height: 34px;
          }
        }

        .douban-title-img {
          width: 175px;
          height: 90px;
          float: right;
          margin-top: 10px;
        }
      }
    }

    .el-dialog--small {
      width: 30%;
    }

    .customed {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #c4c4c4;
      color: #1f2d3d;
      margin: 10px;
      padding: 10px 15px;
      border-radius: 4px;
      float: right;
    }
  }
</style>
