<template>
    <div :id="echartsId" style="height:3.8rem;width:6rem;" ></div>
</template>
<script>
export default {
  name: "echartsInit",
  props: ['echartsId', 'option'],
  data() {
    return {

    };
  },
  mounted() {
      this.echartsInit();
  },
  methods:{
      echartsInit(){
        // 基于准备好的dom，初始化echarts图表
        var myChart = this.$echarts.init(document.getElementById(this.echartsId)); 
        myChart.setOption(this.option);
      }
  }
}
</script>