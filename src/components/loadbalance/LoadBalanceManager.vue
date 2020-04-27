<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>注册方式与负载</el-breadcrumb-item>
        <el-breadcrumb-item>负载均衡</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      负载均衡
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadBalancer'
}
</script>

<style scoped>

</style>
