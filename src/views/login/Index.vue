<template>
  <div class="container">
    <nav class="login">
      
      <div class="login-title">
        <span class="subtext">系&nbsp;统&nbsp;登&nbsp;录</span>
      </div>
      <el-form
        ref="formRef"
        :model="form"
        label-position="top"
      >
        <el-form-item
          label="用户名"
          size="large"
        >
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            autofocus
            @keyup="showErrorTip = false"
            :prefix-icon="User"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            size="large"
            show-password
            @keyup.enter="login"
            @keydown="showErrorTip = false"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <p class="errorMsg">
        <span v-if="showErrorTip">用户名或密码错误!</span>
      </p>
      <el-button @click="login()" class="login-btn" type="primary" size="large" :disabled="disabled">登录</el-button>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, onMounted } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { loginRequest } from "@/axios/api"
import Request from "@/axios/request"
import { cookie } from "@/utils/Application"
import { useRoute, LocationQuery, useRouter } from "vue-router"
import { AxiosError, AxiosResponse } from 'axios';
import { useStore, mapState } from "vuex"

export default defineComponent({
  setup() {
    
    const showErrorTip = ref(false);
    const router = useRouter();
    const route = useRoute();
    const store = useStore()
    console.log("mapState:", store.state)
    console.log("mapState:", store.state.user.name)
    
    const state = reactive({
      redirect: '',
      otherQuery: {}
    });
    
    const form = reactive({
      username: '',
      password: ''
    });

    /** 登录 */
    const login = (): void => {
      const params = {
        ...form,
        "grant_type": "password",
        "client_id": "dt-id"
      }
      loginRequest(params).then(
        async res => {
          cookie.set("accessToken", res.access_token);
          router.push({
            path: state.redirect || '/',
            query: state.otherQuery
          })
          const response = await Request.post("special/dictionary/queryDicrionaryByAppId", { appId: "ruxian", timestamp: "" });
          console.log("response:", response);
        }
      ).catch(
        (error: AxiosError) => {
          if(error.response?.status === 400) {
            console.log("用户名或密码错误!");
            showErrorTip.value = true;
          } else {
            console.log("服务器访问失败!");
          }
        }
      );
    }

    function getOtherQuery(query: LocationQuery) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {} as LocationQuery)
    }

    watch(() => route.query, query => {
      if (query) {
        state.redirect = query.redirect?.toString() ?? ''
        state.otherQuery = getOtherQuery(query)
      }
    }, { immediate: true })

    const disabled = computed(() => {
      return !Boolean(form.username && form.password)
    })
    
    const map = computed( () => mapState({ num: (state: any) => state.num}))
    
    console.log("map:", map.value);
    
    return {
      form,
      login,
      disabled,
      showErrorTip,
      User,
      Lock
    }
  }
})
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
    background-color: #e1e7f0;
    display: flex;
    justify-content: center;
    align-items: center;
    .login{
      width: 400px;
      background: #fff;
      border-radius: 4px;
      // border-bottom: 10px solid #40a9ff;
      padding: 46px;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);
      &-title{
        text-align: center;
        padding-bottom: 24px;
        font-weight: 600;
        font-size: 24px;
      }
      ::v-deep .el-input__inner{
        background-color: #edf2f7;
        box-shadow: inset 0 2px 4px 0 rgba(0,0,0,.06);
      }

      .errorMsg{
        color: red;
        height: 22px;
        display: flex;
        align-items: center;
        margin: 0;
        position: relative;
        top: -8px;
      }
    }
    .login-btn{
      width: 100%;
      letter-spacing: 12px;
      margin: 6px 0 12px;
    }
  }
</style>