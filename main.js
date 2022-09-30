let botonEncriptar = document.querySelector('#encriptar');
let botonDesencriptar = document.querySelector('#desencriptar');
let textarea = document.querySelector('.text-received');
let botonCopiar = document.querySelector('.boton-copiar');
let mensajeTextoInicial = document.querySelector('.informacion-inicial');
let containerResultado = document.querySelector('.container_result');
let textoAlmacenado = document.querySelector('.texto');

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
botonCopiar.onclick = copiarTexto;

function encriptar() {
	let textReceived = textarea.value;
	const esTextoValido = validarLetras(textReceived);
	if (esTextoValido == false) {
		textarea.value = '';
		return;
	}
	let textoEncriptado = encriptarTexto(textReceived);
	mostrarResultado(textoEncriptado);
	textarea.value = '';
}

function desencriptar() {
	let textReceived = textarea.value;
	const esTextoValido = validarLetras(textReceived);
	if (esTextoValido == false) {
		textarea.value = '';
		return;
	}
	let textoDesencriptado = desencriptarTexto(textReceived);
	mostrarResultado(textoDesencriptado);
	textarea.value = '';
}

function encriptarTexto(textReceived) {
	textReceived = textReceived.toLowerCase();
	const vocales = 'aeiou';
	let resultado = '';
	for (let i = 0; i < textReceived.length; i++) {
		const letra = textReceived[i];
		if (vocales.includes(letra)) {
			if (letra === 'a') {
				resultado += 'ai';
			} else if (letra === 'e') {
				resultado += 'enter';
			} else if (letra === 'i') {
				resultado += 'imes';
			} else if (letra === 'o') {
				resultado += 'ober';
			} else if (letra === 'u') {
				resultado += 'ufat';
			} else {
				resultado += letra;
			}
		} else {
			resultado += letra;
		}
	}
	return resultado;
}

function desencriptarTexto(textReceived) {
	textReceived = textReceived.toLowerCase();
	if (textReceived.includes('ai')) textReceived = textReceived.replaceAll('ai', 'a');
	if (textReceived.includes('enter'))
		textReceived = textReceived.replaceAll('enter', 'e');
	if (textReceived.includes('imes')) textReceived = textReceived.replaceAll('imes', 'i');
	if (textReceived.includes('ober')) textReceived = textReceived.replaceAll('ober', 'o');
	if (textReceived.includes('ufat')) textReceived = textReceived.replaceAll('ufat', 'u');
	return textReceived;
}

function copiarTexto() {
	let texto = document.getElementById('parrafo-texto-almacenado').innerText;
	navigator.clipboard.writeText(texto);
	alert('copiado');
}

function mostrarResultado(textReceived) {
	if (textReceived) {
		mensajeTextoInicial.style.display = 'none';
		let parrafo = document.createElement('p');
		parrafo.id = 'parrafo-texto-almacenado';
		textoAlmacenado.innerText = '';
		parrafo.innerText = textReceived;
		textoAlmacenado.appendChild(parrafo);
		botonCopiar.style.display = 'block';
	} else {
		mensajeTextoInicial.style.display = 'block';
		botonCopiar.style.display = 'none';
		textoAlmacenado.style.display = 'none';
	}
}

function validarLetras(texto) {
	const patron = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]|\d/;
	console.log(patron.test(texto));
	// comprobando "si" introduce caracteres especiales o números
	if (patron.test(texto) == true) {
		alert(
			'Estás agregando un caracter especial o números. Por favor introduce solo letras.',
		);
		textarea.focus();
		return false;
	}
	return true;
}
