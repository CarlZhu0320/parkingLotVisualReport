<template>
    <div id="couponStatus" style="height:3.8rem;width:6rem;" ></div>
</template>
<script>
export default {
  name: "couponStatus",
  data() {
    return {

    };
  },
  mounted() {
      this.couponStatusEchartsInit();
  },
  methods:{
      couponStatusEchartsInit(){
        // 基于准备好的dom，初始化echarts图表
        var myChart = this.$echarts.init(document.getElementById('couponStatus')); 
        
        var option = {
                 title : {
                    subtext: '优惠券使用情况',
                    x:'left'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                calculable : true,
                series: [
                    {
                        name:'优惠券使用情况',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        data:[
                            {value:700, name:'已领', itemStyle: { color: '#20FF16' }},
                            {value:300, name:'未领', itemStyle: { color: '#DDDDDD' }}
                        ]
                    },
                    {
                        name:'优惠券使用情况',
                        type:'pie',
                        radius: ['50%', '70%'],
                        data:[
                            {value:390, name:'已使用', itemStyle: { color: '#20FF16' }},
                            {value:310, name:'未使用', itemStyle: { color: '#00FFFF' }},
                            {value:300, name:'未领', itemStyle: { color: '#DDDDDD' }}
                        ]
                    }
                ]
            };
            myChart.setOption(option);
      }
  }
}
</script>