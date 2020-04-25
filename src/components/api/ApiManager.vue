<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>API管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-top: 30px;">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="api创建" name="first">
            <!--卡片视图-->
            <el-card class="box-card">
                <div>
                  <!--api组-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >api组&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" clearable v-model="ApiGroup" placeholder="请选择">
                      <el-option
                        v-for="item in groups"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--api名称-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >api名称&nbsp;:&nbsp;</span><br></p>
                    <el-input style="width: 300px;" v-model="ApiName" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api转发地址-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15">
                      <span>转发地址&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="目前你只支持Http协议接口" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip>
                      <br>
                    </p>
                    <el-input style="width: 500px;" placeholder="请输入内容" v-model="ApiUrl">
                      <template slot="prepend">Http://</template>
                    </el-input>
                  </div>
                  <!--api返回数据格式-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span>返回格式&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" v-model="ApiReturnType" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--api请求方式-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span>请求方式&nbsp;:&nbsp;</span><br></p>
                    <el-radio v-model="ApiMethod" label="GET">GET</el-radio>
                    <el-radio v-model="ApiMethod" label="POST">POST</el-radio>
                    <el-radio v-model="ApiMethod" label="HEAD">HEAD</el-radio>
                    <el-radio v-model="ApiMethod" label="PATCH">PATCH</el-radio>
                    <el-radio v-model="ApiMethod" label="DELETE">DELETE</el-radio>
                    <el-radio v-model="ApiMethod" label="PUT">PUT</el-radio>
                    <el-radio v-model="ApiMethod" label="OPTIONS">OPTIONS</el-radio>
                  </div>

                  <!--api请求超时时间-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >超时限制(ms)&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="网关转发时若遇到后端超时未返回，此时网关会对客户端返回504表示超时" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input style="width: 300px;" v-model="ApiTimeout" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api请求重试次数-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >重试次数&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="网关转发失败后，再次对后端发送请求的次数" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input style="width: 300px;" v-model="ApiRetry" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api请求错误返回-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >异常返回&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="当API出现超时等异常时，网关会返回以下内容" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input
                      style="width: 300px;"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="ApiReturnContent">
                    </el-input>
                  </div>
                </div>
              </el-card>
          </el-tab-pane>
          <el-tab-pane label="api组创建" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ApiManager',
  data () {
    return {
      groups: [{
        value: '112',
        label: '112'
      }],
      options: [{
        value: 'RAW',
        label: 'RAW'
      }, {
        value: 'JSON',
        label: 'JSON'
      }, {
        value: 'XML',
        label: 'XML'
      }],
      ApiGroup: '',
      ApiReturnType: '',
      ApiUrl: '192.168.1.1',
      ApiName: 'test',
      ApiMethod: '',
      ApiTimeout: '3000',
      ApiRetry: '3',
      ApiReturnContent: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .lh_15{
    line-height: 15px;
  }
  .box-card{
    background-color: honeydew;
  }
</style>
