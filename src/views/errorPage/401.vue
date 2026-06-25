<template>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">403!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>如需访问，请联系您领导</h6>
        <ul class="list-styled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/">回关于本系统</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="err_gif" width="313" height="428" alt="Girl has dropped her ice cream." />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="js" setup>
import errGif from '@/assets/401_images/401.gif'
import { useRouter } from 'vue-router'

const err_gif = errGif + '?' + +new Date()

const router = useRouter()
const noGoBack = router.currentRoute.value.query.noGoBack
const back = () => {
  noGoBack ? router.push({ path: '/dashboard' }) : router.go(-1)
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-styled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
