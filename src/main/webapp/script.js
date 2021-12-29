function send(xArray, y, r, fromCanvas) {
    $.get('controller', {
        'xArray': xArray,
        'y': y,
        'r': r,
		'fromCanvas': fromCanvas
    }).done((data) => {
			$('.result_table tbody tr').remove();
            let arrayOfResults = JSON.parse(data);
            arrayOfResults.forEach(object => {
				let tableRow = "<tr>";
				for (let key in object) {
					if (object[key] == "NO")
						tableRow += `<td class="false">${object[key]}</td>`;
					else if (object[key] == "YES")
						tableRow += `<td class="true">${object[key]}</td>`;
					else
						tableRow += `<td>${object[key]}</td>`;
				}
				tableRow += "</tr>";
				$('.result_table tbody').append(tableRow);
			});
    });
}


function reload() {
	send("main.php?reload=true");
}

function clearHistory() {
	refreshCanvas();
	$.get('controller', {
		'delete': true
	}).done(function (data) {
		$('.result_table tbody tr').remove();
	})
}

function checkY() {
	if (y.trim() === "") {
		fieldY.textContent = "Поле Y должно быть заполнено!";
		return false;
	}
	y = y.trim();
	y = y.substring(0, 10).replace(',', '.');
	if (!(y && !isNaN(y))) {
		fieldY.textContent = "Y должен быть числом!";
		return false;
	}
	if (y <= -3 || y >= 3) {
		fieldY.textContent = "Y должен принадлежать промежутку: (-3; 3)!";
		return false;
	}
	fieldY.textContent = '';
	return true;
}

function checkX() {
    let xButtons = document.getElementsByName("xArray");
    let counter = 0;
    xButtons.forEach(x => {
        if (x.checked)
            counter++;
    });
    if (counter === 0) {
        fieldX.textContent = "Вы должны выбрать минимум одно значение X!";
        return false;
    }
	fieldX.textContent = '';
    return true;
}

function checkR() {
	if (r.trim() === "") {
		fieldR.textContent = "Поле R должно быть заполнено!";
		return false;
	}
	r = r.trim();
	r = r.substring(0, 10).replace(',', '.');
	if (!(r && !isNaN(r))) {
		fieldR.textContent = "R должен быть числом!";
		return false;
	}
	if (r <= 2 || r >= 5) {
		fieldR.textContent = "R должен принадлежать промежутку: (2; 5)!";
		return false;
	}
	fieldR.textContent = '';
	return true;
}

// function submit() {
// 	y = document.querySelector('input[name="y"]').value;
// 	r = document.querySelector('input[name="r"]').value;
// 	if (checkX() && checkY() && checkR()) {
// 		xArray = document.querySelectorAll('input[name="xArray"]:checked');
// 		xArray = Object.values(xArray);
//         xArray = xArray.map(element => element.value);
//         xArray.forEach(x => drawHitPoint(x, y));
// 		send(xArray, y, r, false);
// 	}
// }

function readyForm(e) {
	y = document.querySelector('input[name="y"]').value;
	r = document.querySelector('input[name="r"]').value;
	if (!(checkX() && checkY() && checkR())) {
		e.preventDefault();
	}
}

function refreshCanvas() {
	r = document.querySelector('input[name="r"]').value;
	if (checkR()) {
		clearCanvas();
		drawCanvas(r);
	}
}

function clickOnCanvas(canvas, event) {
	r = document.querySelector('input[name="r"]').value;
	if (checkR()) {
		let rect = canvas.getBoundingClientRect();
		let x = (event.clientX - rect.left - width / 2) / separator_step;
		let y = (height / 2 - event.clientY + rect.top) / separator_step;
		x = x.toFixed(2).replace(".00", "");
        y = y.toFixed(2).replace(".00", "");
		// setTimeout(function() {
		// 	drawHitPoint(x, y);
		// }, 10);
		drawHitPoint(x, y);
		send(x, y, r, true);
	}
}


let xArray, y, r;

let fieldX = document.getElementById("fieldX");
let fieldY = document.getElementById("fieldY");
let fieldR = document.getElementById("fieldR");


document.getElementById('input-r').addEventListener('input', refreshCanvas);
document.querySelector('input[name="r"]').value = 3;

//reload();

//document.getElementById('send').addEventListener('click', submit);
document.getElementById("send").addEventListener("click", readyForm);
document.getElementById('clear').addEventListener('click', clearHistory);