<template>
  <div>
    <div style="height: 620px;">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>监控设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div  style="margin-top: 25px;margin-bottom: 20px">
        <el-card class="box-card">
          <!--prometheus监控-->
          <div class="monitor">
            <span>API监控模块对接Prometheus</span>
            <el-switch
              v-model="prometheusMonitor"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="showPrometheusSettings">
            </el-switch>
          </div>
          <!--ELK监控-->
          <div class="monitor" style="margin-top: 25px;margin-bottom: 5px" >
            <span>API监控模块对接ELK</span>
            <el-switch
              v-model="elkMonitor"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="showELKSettings">
            </el-switch>
          </div>
        </el-card>
      </div>
      <!--隐藏配置区域-->
      <div>
        <div :style="prometheusVisualAble">
          <div style="margin-top: 25px;margin-bottom: 20px" >
            <!--prometheus监控-->
            <el-card class="box-card">
              <div class="monitor">
                <span>Prometheus</span>
              </div><hr>
              <div>
              <span>监控数据读取：http://{节点IP}:{节点管理地址的端口}/prometheus/metrics
              <span class="prometheusInfo">节点的 [管理地址端口] 可在节点信息处查看</span>
              </span>
              </div>
            </el-card>
          </div>
        </div>
        <div :style="elkVisualAble">
          <div style="margin-top: 25px;margin-bottom: 20px;" >
            <!--ELK监控-->
            <el-card class="box-card">
              <div class="monitor">
                <span>ELK</span>
              </div><hr>
              <div>
                <span>接入地址</span><br>
                <el-input style="width: 450px;margin-top: 15px;" v-model="ELKUrl" placeholder="请输入内容"></el-input>
                <el-row style="margin-top: 15px;">
                  <el-button type="primary" @click="SaveELKUrl" >保存</el-button>
                  <el-button type="info" @click="CancelELKUrl">取消</el-button>
                </el-row>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Monitor',
  data () {
    return {
      prometheusMonitor: false,
      elkMonitor: false,
      ELKUrl: 'http://192.168.1.1:8080/EKL/metrix',
      prometheusVisualAble: 'display:none',
      elkVisualAble: 'display:none'
    }
  },
  methods: {
    showPrometheusSettings () {
      if (this.prometheusMonitor) {
        this.prometheusVisualAble = 'display:block'
      } else {
        this.prometheusVisualAble = 'display:none'
      }
    },
    showELKSettings () {
      if (this.elkMonitor) {
        this.elkVisualAble = 'display:block'
      } else {
        this.elkVisualAble = 'display:none'
      }
    },
    async SaveELKUrl () {
      this.$message.success('保存成功！')
      const response = await this.$http.post('/saveELKUrl', this.ELKUrl)
      console.log(response)
    },
    CancelELKUrl () {
      this.elkMonitor = false
      this.elkVisualAble = 'display:none'
    }
  }
}
</script>

<style scoped>
  .monitor{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .prometheusInfo{
    font-size: 13px;
    color: grey;
    float: right;
  }
</style>
