<template>
    <div id="newAddUsers" style="height:3.8rem;width:6rem;" ></div>
</template>
<script>
export default {
  name: "newAddUsers",
  data() {
    return {

    };
  },
  mounted() {
      this.newAddUsersEchartsInit();
  },
  methods:{
      newAddUsersEchartsInit(){
        // 基于准备好的dom，初始化echarts图表
        var myChart = this.$echarts.init(document.getElementById('newAddUsers')); 
        
        var option = {
                 title : {
                    subtext: '新增用户数',
                    textStyle: {
                        color: '#408829'
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
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['新增用户数'],
                    itemWidth:40,
                    itemHeight:20,
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                },
                
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                textStyle:{
                    fontSize:15,
                    color:'#fff'
                },
                series : [
                    {
                        name:'新增用户数',
                        type:'line',
                        data:[10, 12, 21, 54, 260, 830, 710],
                        lineStyle: {
                                color: 'red',
                                width: 1,
                                type: 'solid'
                            },
                        textStyle:{
                            color:'#fff'
                        }
                    }
                ],
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