$(function() {
    "use strict";
    // ------------------------------
    // Basic bar chart
    // ------------------------------
    // based on prepared DOM, initialize echarts instance
      
    // ------------------------------
    // Stacked bar chart
    // ------------------------------
    // based on prepared DOM, initialize echarts instance
        var stackedChart = echarts.init(document.getElementById('stacked-bar'));

        // specify chart configuration item and data
        var dataLegend = ['Facebook', 'Instagram', 'Twitter', 'Whatsapp', 'Email', 'Call'];
        var option = {
                // Setup grid
                grid: {
                    x: 40,
                    x2: 40,
                    y: 45,
                    y2: 25
                },

                // Add tooltip
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // Axis indicator axis trigger effective
                        type : 'shadow'        // The default is a straight line, optionally: 'line' | 'shadow'
                    }
                },

                // Add legend
                legend: {
                    data: dataLegend
                },

                // Add custom colors
            color: ['#689f38', '#38649f', '#389f99', '#ff8f00', '#ee1044', '#ffdc99'],

                // Horizontal axis
                xAxis: [{
                    type: 'value',
                }],

                // Vertical axis
                yAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }],

                // Add series
                series : [
                    {
                        name:'Facebook',
                        type:'bar',
                        stack: 'Total',
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data:[10, 7, 10, 9, 19, 32, 21]
                    },
                    {
                        name:'Instagram',
                        type:'bar',
                        stack: 'Total',
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data: [4, 9, 3, 20, 54, 11, 12]
                    },
                    {
                        name:'Twitter',
                        type:'bar',
                        stack: 'Total',
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data: [16, 17, 20, 29, 41, 10, 15]
                    },
                    {
                        name:'Whatsapp',
                        type:'bar',
                        stack: 'Total',
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data: [8, 7, 5, 6, 2, 1, 2]
                    },
                    {
                        name:'Email',
                        type:'bar',
                        stack: 'Total',
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data: [11, 12, 13, 14, 15, 16, 17]
                    }
                    ,
                    {
                        name: 'Call',
                        type: 'bar',
                        stack: 'Total',
                        itemStyle: { normal: { label: { show: true, position: 'insideRight' } } },
                        data: [1, 2, 3, 4, 5, 6, 7]
                    }
                ]
            };
        // use configuration item and data specified to show chart
        stackedChart.setOption(option);
       
    
        //***************************
       // Stacked chart
       //***************************
        
        
        //***************************
       // Stacked Area chart
       //***************************
        var stackedbarcolumnChart = echarts.init(document.getElementById('stacked-column'));
        var option = {
            
             // Setup grid
                grid: {
                    x: 40,
                    x2: 40,
                    y: 45,
                    y2: 25
                },

                // Add tooltip
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // Axis indicator axis trigger effective
                        type : 'shadow'        // The default is a straight line, optionally: 'line' | 'shadow'
                    }
                },

                // Add legend
                legend: {
                    data: [  'Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data7']
                },

                // Add custom colors
                color: ['#689f38', '#38649f', '#389f99', '#ff8f00', '#ee1044'],

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                }],

                // Add series
                series : [
                    
                    {
                        name:'Data1',
                        type:'bar',
                        stack: 'data1',
                        data:[178, 241, 210, 147, 299, 358, 487]
                    },
                    {
                        name:'Data2',
                        type:'bar',
                        data:[875, 845, 985, 1254, 1425, 1235, 1425],
                        markLine : {
                            itemStyle:{
                                normal:{
                                    lineStyle:{
                                        type: 'dashed'
                                    }
                                }
                            },
                            data : [
                                [{type : 'min'}, {type : 'max'}]
                            ]
                        }
                    },
                    {
                        name:'Data3',
                        type:'bar',
                        barWidth : 12,
                        stack: 'data',
                        data:[654, 758, 754, 854, 1245, 1100, 1140]
                    },
                    {
                        name:'Data4',
                        type:'bar',
                        stack: 'data',
                        data:[104, 134, 125, 158, 245, 236, 278]
                    },
                    {
                        name:'Data5',
                        type:'bar',
                        stack: 'data',
                        data:[54, 123, 147, 85, 165, 158, 123]
                    },
                    {
                        name:'Data6',
                        type:'bar',
                        stack: 'data',
                        data:[21, 84, 79, 86, 135, 158, 210]
                    }
                ]
                // Add series
                
        };
        stackedbarcolumnChart.setOption(option);
        
    // ------------------------------
    // Basic line chart
    // ------------------------------
    // based on prepared DOM, initialize echarts instance
        var barbasicChart = echarts.init(document.getElementById('bar-basic'));

        var option = {

             // Setup grid
                grid: {
                    x: 60,
                    x2: 40,
                    y: 45,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['2018', '2019']
                },

                // Add custom colors
                color: ['#ee1044', '#389f99'],

                // Horizontal axis
                xAxis: [{
                    type: 'value',
                    boundaryGap: [0, 0.01]
                }],

                // Vertical axis
                yAxis: [{
                    type: 'category',
                    data: ['Data1', 'Data2', 'Data3', 'Data4', 'Data5', 'Data6']
                }],

                // Add series
                series : [
                    {
                        name:'2018',
                        type:'bar',
                        data:[845, 542, 348, 298, 548, 398]
                    },
                    {
                        name:'2019',
                        type:'bar',
                        data:[689, 754, 498, 123, 489, 598]
                    }
                ]
        };
        // use configuration item and data specified to show chart
        barbasicChart.setOption(option);
    
    
       //------------------------------------------------------
       // Resize chart on menu width change and window resize
       //------------------------------------------------------
        $(function () {

                // Resize chart on menu width change and window resize
                $(window).on('resize', resize);
                $(".sidebartoggler").on('click', resize);

                // Resize function
                function resize() {
                    setTimeout(function() {

                        // Resize chart
                        myChart.resize();
                        stackedChart.resize();
                        stackedbarcolumnChart.resize();
                        barbasicChart.resize();
                    }, 200);
                }
            });
});