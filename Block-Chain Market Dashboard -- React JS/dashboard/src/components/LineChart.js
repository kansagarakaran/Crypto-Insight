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
        height={400}
        options={options}
        width={800}
    />
  )
}

export default LineChart
