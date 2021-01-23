import echarts from 'echarts'
export default {
    data() {
        return {
            myChart: {}
        }
    },
    async mounted() {
        if (this.initMap) await this.initMap()
        this.myChart = echarts.init(this.$refs.main);
        if (this.renderChart) this.renderChart()
    },
}