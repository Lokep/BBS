<template>
  <div class="data_analysis">
    <!--点赞数排行-->
    <div id="agreeRank" :style="{width: '1000px', height: '400px', background: '#fff', 'padding': '10px 30px'}"></div>
    <!--话题关注人数排行-->
    <div id="topicSum"
         :style="{width: '1000px', height: '600px', background: '#fff', 'margin-top': '30px', 'padding': '30px'}"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        titleList: [],
        agreeList: [],
        topicNameList: [],
        topicDate: []
      }
    },
    mounted() {
      // 获取文章数据
      this.getArticlesData();
      // 获取话题数据
      this.getTopicsData()
    },
    methods: {
      // 绘画点赞数排行图表
      drawAgreeRank() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('agreeRank'));
        // 绘制图表
        myChart.setOption({
            title: {
              text: '点赞排行前十位'
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              containLabel: true
            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'value',
                boundaryGap: [0, 0.01]
              }
            ],
            yAxis: [
              {
                type: 'category',
                data: this.titleList
              }
            ],
            series: [
              {
                name: '点赞数',
                type: 'bar',
                data: this.agreeList
              }]
          }
        );
      },
      async getArticlesData() {
        await this.$axios.get("/articles").then(res => {
          if (res.data.code === "200") {
            let data = res.data.result;
            // 获取的数据按照点赞数排序，并截取前十位
            data = data.sort(this.compare("agrees")).slice(0, 10).reverse();
            data.map((item, index, arr) => {
              this.titleList.push(item.title);
              this.agreeList.push(item.agrees)
            });
            this.drawAgreeRank();
          }
        })
      },
      // 绘画话题关注数排行图表
      drawTopicSum() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('topicSum'));
        // 绘制图表
        myChart.setOption({
            title: {
              text: '话题关注排行前二十位',
              x: "center"
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: this.topicNameList
            },
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                  show: true,
                  type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: false,
            series: [
              {
                name: '关注人数',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, 70],

                // for funnel
                x: '20%',
                width: '40%',
                funnelAlign: 'right',
                max: 1548,
                data: this.topicDate.slice(10, 20)
              },
              {
                name: '关注人数',
                type: 'pie',
                radius: [140, 200],

                // for funnel
                x: '60%',
                width: '35%',
                funnelAlign: 'left',
                max: 1048,

                data: this.topicDate.slice(0, 10)
              }
            ]
          }
        );
      },
      async getTopicsData() {
        await this.$axios.get("/topics").then(res => {
          if (res.data.code === "200") {
            let data = res.data.result;
            // 获取的数据按照关注数排序，并截取前二十位
            data = data.sort(this.compare("topicSum")).slice(0, 20);
            console.log(data)
            data.map((item, index, arr) => {
              this.topicNameList.push(item.topicName);
              this.topicDate = [...this.topicDate, {value: item.topicSum, name: item.topicName}]
            });
            this.drawTopicSum();
          }
        })
      },
      // 数组排序方法
      compare(property) {
        return function (a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value2 - value1;
        }
      }
    }
  }
</script>
