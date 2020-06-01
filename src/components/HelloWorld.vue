<template>
  <div class="hello">
    <div class="line">
      <button @click="changeType">切换图表类型</button>
      <ve-chart :data="chartData"
                :settings="chartSettings"
                :loading="loading"
                :data-empty="dataEmpty">
      </ve-chart>
    </div>
    <div class="line">
      <ve-gauge :data="gaugeData"
                :settings="gaugeSettings"
                :loading="loading">
      </ve-gauge>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    this.typeArr = ['line', 'histogram', 'pie']
    this.index = 0
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
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1月1日', '访问用户': 1523 },
          { '日期': '1月2日', '访问用户': 1223 },
          { '日期': '1月3日', '访问用户': 2123 },
          { '日期': '1月4日', '访问用户': 4123 },
          { '日期': '1月5日', '访问用户': 3123 },
          { '日期': '1月6日', '访问用户': 7123 }
        ]
      },
      gaugeData: {
        columns: ['type', 'value'],
        rows: [
          { type: '占比', value: 0.8 }
        ]
      },
      chartSettings: { type: this.typeArr[this.index] }
    }
  },
  methods: {
    changeType: function () {
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings = { type: this.typeArr[this.index] }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line{
    width: 500px;
    height: 400px;
  }
</style>
