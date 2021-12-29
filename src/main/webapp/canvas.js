let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let width = 540;
let height = 540;
let separator_step = 50;
let separator_length = 5;

canvas.width = width;
canvas.height = height;
ctx.font = 'normal 14px monospace';

canvas.addEventListener('mousedown', event => clickOnCanvas(canvas, event));

function drawCanvas(rValue) {
    drawAxes();
	rValue *= separator_step;
    drawRectangle(rValue);
    drawTriangle(rValue);
	drawQuarter(rValue);
}

function drawAxes() {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
	// draw Y
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
	// draw X
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
	ctx.strokeText("y", 253, 9);
	ctx.strokeText("x", 531, height / 2 - 12);

	for (let i = -5; i <= 5; i++) {
		ctx.beginPath();
		let x = width / 2 + separator_step * i;
		ctx.moveTo(x, height / 2 + separator_length);
		ctx.lineTo(x, height / 2 - separator_length);
		if (i !== 0) {
			ctx.fillText(i.toString(), x - separator_length / 2, height / 2 + 3 * separator_length);
		} else {
			ctx.fillText(i.toString(), x + separator_length / 2, height / 2 + 3 * separator_length);
		}
		ctx.stroke();
	}
	
	for (let i = -5; i <= 5; i++) {
		ctx.beginPath();
		let y = height / 2 + separator_step * i;
		ctx.moveTo(width / 2 + separator_length, y);
		ctx.lineTo(width / 2 - separator_length, y);
		if (i !== 0) {
			ctx.fillText((-i).toString(), width / 2 + separator_length, y + separator_length);
		}
		ctx.stroke();
	}

	ctx.beginPath();
	canvas_arrow(ctx, 530, height / 2, 540, height / 2);
	canvas_arrow(ctx, width / 2, 10, width / 2, 0);
	ctx.stroke();
}

function canvas_arrow(ctx, fromx, fromy, tox, toy) {
  let headlen = 10;
  let dx = tox - fromx;
  let dy = toy - fromy;
  let angle = Math.atan2(dy, dx);
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function drawTriangle(rValue) {
	ctx.strokeStyle = '#8B00FF';
	ctx.fillStyle = 'rgba(139,0,255,0.4)';
	ctx.beginPath();
	ctx.moveTo(width / 2, height / 2);
	ctx.lineTo(width / 2 - rValue, height / 2);
	ctx.lineTo(width / 2, height / 2 + rValue / 2);
	ctx.fill();
	ctx.stroke();
}

function drawQuarter(rValue) {
	ctx.strokeStyle = '#8B00FF';
	ctx.fillStyle = 'rgba(139,0,255,0.4)';
	ctx.beginPath();
	ctx.arc(width / 2, height / 2, rValue, 0, Math.PI / 2);
	ctx.lineTo(width / 2, height / 2);
	ctx.fill();
	ctx.stroke();
}

function drawRectangle(rValue) {
	ctx.strokeStyle = '#8B00FF';
	ctx.fillStyle = 'rgba(139,0,255,0.4)';
	ctx.beginPath();
	ctx.rect(width / 2, height / 2, -rValue, -rValue / 2);
	ctx.fill();
	ctx.stroke();
}

function drawHitPoint(x, y) {
    ctx.beginPath();
    ctx.arc(width / 2 + x * separator_step, height / 2 - y * separator_step, separator_length - 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245,15,15,0.4)';
    ctx.strokeStyle = '#f50f0f';
    ctx.fill();
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

drawCanvas(3);






