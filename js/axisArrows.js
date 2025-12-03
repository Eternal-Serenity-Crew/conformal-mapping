export const axisArrows = {
    id: 'axisArrows',
    afterDraw(chart, args, opts) {
        const {ctx, chartArea} = chart;
        const {left, right, top, bottom} = chartArea;

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';

        // Ось X (горизонтальная линия + стрелка вправо)
        ctx.beginPath();
        ctx.moveTo(left, bottom);
        ctx.lineTo(right + 20, bottom); // чуть дальше области
        ctx.stroke();
        // стрелка на оси X
        ctx.beginPath();
        ctx.moveTo(right + 30, bottom);
        ctx.lineTo(right + 20, bottom - 5);
        ctx.lineTo(right + 20, bottom + 5);
        ctx.closePath();
        ctx.fill();

        // Подпись оси X
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('x', right + 30, bottom + 5);

        // Ось Y (вертикальная линия + стрелка вверх)
        ctx.beginPath();
        ctx.moveTo(left, bottom + 10);
        ctx.lineTo(left, top - 10);
        ctx.stroke();
        // стрелка на оси Y
        ctx.beginPath();
        ctx.moveTo(left, top - 20);
        ctx.lineTo(left - 5, top - 10);
        ctx.lineTo(left + 5, top - 10);
        ctx.closePath();
        ctx.fill();

        // Подпись оси Y
        ctx.save();
        ctx.translate(left - 15, top - 20);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('y', 0, 0);
        ctx.restore();

        ctx.restore();
    }
};