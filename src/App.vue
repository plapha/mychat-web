<template>
  <v-app>
    <v-main>
      <v-container>
        <router-view></router-view> <!-- 渲染当前路由对应的组件 -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";

export default {
  data: () => ({
    messages: []
  }),
  methods: {
    handleMessageSent(message) {
      this.messages.push(message);
    },
    executeSql(sql) {
      // 发送 SQL 语句到后端执行
      axios.post('http://127.0.0.1:5000/api/execute', { sql })
          .then(response => {
            const chartData = response.data.data;
            this.messages.push({
              role: '系统',
              content: 'SQL 执行结果',
              chartData: chartData
            });
          })
          .catch(error => {
            console.error("SQL 执行失败", error);
          });
    },
    renderChart(chartData, index) {
      const chartDom = document.getElementById('chart_' + index);
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          xAxis: {
            type: 'category',
            data: chartData.map(item => item.name)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: chartData.map(item => item.value),
              type: 'bar'
            }
          ]
        };
        myChart.setOption(option);
      }
    }
  },
  watch: {
    messages(newMessages) {
      newMessages.forEach((message, index) => {
        if (message.chartData) {
          this.$nextTick(() => {
            this.renderChart(message.chartData, index);
          });
        }
      });
    }
  }
};
</script>

<style>
/* 根据需要添加样式 */
</style>