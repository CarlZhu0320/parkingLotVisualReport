<template>
    <div id="transactionNum" style="height:3.8rem;width:6rem;" ></div>
</template>
<script>
export default {
  name: "transactionNum",
  data() {
    return {

    };
  },
  mounted() {
      this.transactionNumEchartsInit();
  },
  methods:{
      transactionNumEchartsInit(){
        // 基于准备好的dom，初始化echarts图表
        var myChart = this.$echarts.init(document.getElementById('transactionNum')); 
        
        var option = {
                 title : {
                    subtext: '测试柱状图'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['交易笔数'],
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                },
                dataZoom: [　　//x轴是否可以滑动
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    start: 0,
                    end: 50,
                    bottom: 5,
                    height: 10,
                    textStyle: {
                        color: "#FFFFFF"
                    }
                }],
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'交易笔数',
                        type:'bar',
                        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                grid: {　　//这个是用来设置echarts图标的位置和其他设置
                    left: '5%',
                    right: '12%',
                    bottom: '8%',
                    top: '25%',
                    containLabel: true,　//一般都带上这个，否则x,y轴的刻度值会被截取掉
                }
            };
            myChart.setOption(option);
      }
  }
}
</script>