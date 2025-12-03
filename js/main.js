import { points } from "./points.js";
import { axisArrows } from "./axisArrows.js";
import { axisAtZero} from "./axisZero.js";

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
                label: 'Распределение автомашин',
                data: points,
                backgroundColor: '#00b4d8',
                pointRadius: 4
            },
            {
                label: 'Линия регрессии',
                type: 'line',
                data: ys,
                borderColor: '#ff4d6d',
                borderWidth: 2,
                pointRadius: 0,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                right: 85,
                left: 35,
                bottom: 25,
                top: 45,
            },
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: xLabels[0] - xStep,
                max: xLabels[xLabels.length - 1] + xStep,
                ticks: {
                    stepSize: xStep,
                    callback: value => parseFloat((value + xStep).toFixed(1)) === xLabels[0]
                        ? ''
                        : value.toFixed(1),
                    font: {
                        size: 16,
                    }
                },
            },
            y: {
                type: 'linear',
                position: 'bottom',
                min: 120,
                max: yLabels[yLabels.length - 1] + yStep,
                ticks: {
                    stepSize: yStep,
                    callback: value => parseInt((value + yStep)) === yLabels[0]
                        ? ''
                        : value,
                    font: {
                        size: 16
                    }
                },
            },
        },
    },
    plugins: [
        axisArrows,
        axisAtZero
    ],
});