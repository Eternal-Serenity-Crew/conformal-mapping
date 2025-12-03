export const axisAtZero = {
    id: 'axisAtZero',
    afterDraw(chart) {
        const {ctx, chartArea} = chart;
        const {left, bottom} = chartArea;

        ctx.save();
        ctx.fillStyle = '#555555';
        ctx.lineWidth = 1.5;

        ctx.font = '16px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('0', left - 10, bottom + 10);

        ctx.restore();
    }
};
