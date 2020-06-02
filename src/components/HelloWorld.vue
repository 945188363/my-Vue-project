<template>
  <div class="hello">
    <div class="layer">
      <div class="line">
        <!--一周访问统计-->
        <h4>一周访问统计</h4>
        <button @click="changeType">切换图表类型</button>
        <ve-chart :data="chartData"
                  :settings="chartSettings"
                  :loading="loading"
                  :data-empty="dataEmpty">
        </ve-chart>
      </div>
      <div class="line">
        <h4>服务器性能指标</h4>
        <ve-ring :data="ringData"></ve-ring>
      </div>
    </div>
    <div class="layer">
      <div class="line">
        <!--服务器性能指标-->
        <h4>服务器性能指标</h4>
        <ve-gauge :data="gaugeData"
                  :settings="gaugeSettings"
                  :loading="loading">
        </ve-gauge>
      </div>
      <div class="line">
        <!--整体数据展示-->
        <h4>整体数据展示</h4>
        <ve-funnel :data="funnelData"></ve-funnel>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0
    this.funnelSettings = {
      dimension: '状态',
      metrics: '数值'
    }
    this.gaugeSettings = {
      dataType: {
        '占比': 'percent'
      },
      seriesMap: {
        '占比': {
          min: 0,
          max: 1
        }
      }
    }
    return {
      dataEmpty: false,
      loading: true,
      chartSettings: { type: this.typeArr[this.index] },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
        ]
      },
      gaugeData: {
        columns: ['type', 'value'],
        rows: [
          { type: '占比', value: 0.8 }
        ]
      },
      funnelData: {
        columns: ['状态', '数值'],
        rows: [
          { '状态': '展示', '数值': 900 },
          { '状态': '访问', '数值': 600 },
          { '状态': '点击', '数值': 300 },
          { '状态': '订单', '数值': 100 }
        ]
      },
      ringData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 }
        ]
      }
    }
  },
  methods: {
    changeType: function () {
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings = { type: this.typeArr[this.index] }
    },
    async QueryCount () {
      this.loading = true
      // 当前日期
      const endTime = this.getNowFormatDate(1)
      // 七天前日期
      const startTime = this.getNowFormatDate(-7)
      // 拼接参数字符串
      const param = '?endTime=' + endTime + '&startTime=' + startTime
      const response = await this.$http.get('/queryCount' + param)
      console.log(response)
      let countData = new Map()
      response.data['data'].forEach((item) => {
        let time = this.parseDate(item['Time'].slice(0, 10))
        if (countData.has(time)) {
          countData.set(time, countData.get(time) + 1)
        } else {
          countData.set(time, 1)
        }
      })
      countData.forEach((v, k, map) => {
        this.chartData.rows.push(
          {
            '日期': k, '访问用户': v
          }
        )
      })
      console.log(this.chartData.rows)
      this.loading = false
    },
    parseDate (date) {
      let strArr = date.split('-')
      return strArr[1] + '月' + strArr[2] + '日'
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryCount()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line{
    width: 500px;
    height: 400px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .layer{
    margin-top: 5px;
    margin-bottom: 20px;
    justify-content: space-around;
    display: flex;
  }
</style>
