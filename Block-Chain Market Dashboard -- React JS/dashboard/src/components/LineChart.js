import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {

    const [data, setData] = useState([["Data", "Prices"]])

    useEffect(() => {
        let dataCopy = [["Data", "Prices"]];

        if( historicalData.prices ){
            historicalData.prices.map((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]])
            })
            setData(dataCopy)
        }
    }, [historicalData])

    const options = {
        hAxis: { title: "Time (in Day)"},
        hAxis: { textStyle:{color: '#FEE715'}},
        vAxis: { title: "Price"},
        vAxis: { textStyle:{color: '#FEE715'}, gridlines: {color: "#4c4c4c"}},
        is3D: true,
        legend: "none",
        colors: ["#FEE715"],
        backgroundColor: { fill:'transparent' },
        animation: {
            "startup": true,
            duration: 500,
            easing: "inAndOut"
        },
        crosshair: { trigger: 'focus', opacity: 0.5 },

      };

  return (
    <Chart
        chartType='LineChart'
        data={data}
        className='w-[800px] h-[400px] max-md:h-[300px] max-md:w-[650px] max-[600px]:h-[250px] max-[600px]:w-[500px] max-[455px]:h-[200px] max-[455px]:w-[400px] max-[355px]:h-[150px] max-[355px]:w-[350px]'
        options={options}
    />
  )
}

export default LineChart
