import { points } from "./points.js";
import { axisArrows } from "./axisArrows.js";

const Chart = window.Chart;

const xLabels = [11.6, 16.6, 21.6, 26.6, 31.6, 36.6]
const yLabels = [160, 200, 240, 280, 320, 360, 400, 440]

const xStep = xLabels[1] - xLabels[0]
const yStep = yLabels[1] - yLabels[0]

const xs = []
const ys = []

for (let x = xLabels[0] - xStep; x < xLabels[xLabels.length - 1] + xStep; x++) {
    xs.push(x)
    ys.push(7.91 * x + 108.6)
}

const ctx = document.getElementById("canvas")

new Chart(ctx, {
    type: 'scatter',
    data: {
        labels: xs,
        datasets: [
            {
                label: 'Наблюдения',
                data: points,
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Линия регрессии',
                type: 'line',
                data: ys,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointRadius: 0,
            },
        ],
    },
    options: {
        layout: {
            padding: {
                right: 55,  // место для стрелки и подписи X
                left: 15,   // место для стрелки Y
                bottom: 25,
                top: 25,
            },
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: xLabels[0] - xStep,
                max: xLabels[xLabels.length - 1] + xStep,
                ticks: {
                    stepSize: xStep
                },
            },
            y: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: yLabels[yLabels.length - 1] + yStep,
                ticks: {
                    stepSize: yStep
                },
            },
        },
    },
    plugins: [
        axisArrows
    ],
});