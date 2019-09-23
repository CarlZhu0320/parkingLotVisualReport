<template>
    <div :id="echartsId" style="height:1.1rem;width:1.65rem;" ></div>
</template>
<script>
export default {
  name: "echartsInit",
  props: ['echartsId', 'option'],
  data() {
    return {
      myChart: {}
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById(this.echartsId)); 
    this.echartsInit();
  },
  // watch: {
  //     data() {
  //         this.myChart.clear();
  //         console.log("111");
  //         this.setOptions();
  //     }
  // },
  methods:{
      echartsInit(){
        // 基于准备好的dom，初始化echarts图表
        this.myChart.setOption(this.option);
      },
      setOptions() {
        this.myChart = this.$echarts.init(document.getElementById(this.echartsId));
        this.myChart.setOption(this.option);
      }
  }
}
</script>