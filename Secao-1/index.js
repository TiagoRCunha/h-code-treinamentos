/** Primeira aula de Javascript Udemy - Basico 1  (28/11/2018)


//console.log('Olá mundo!');

// let é um comando novo que leva em consideração onde foi declarado

// const declara uma constante

// instanseof diz de onde vem esta variável

let cor = "azul";

switch (cor) {

  case "verde":
    console.log("siga");
    break;

  case "amarelo":
    console.log("atenção");
    break;

  case "vermelho":
  console.log("pare");
  break;

  default:
    console.log("nao sei");

}
  // criando a taboada de 7
let n = 7;

for (let i = 0; i <= 10; i++){

  console.log(`${i} X ${n} = ${i * n}`);
  //é o mesmo que:
//console.log(i + " X " + n + " = " +(i * n));
}

// template string "$" permite que pule linhas. Pode ser trabalhado como blocos
*/

/** Segunda aula de Javascript Udemy - Basico 2 (29/11/2018)

  //arrow function
let calc = (x1, x2, operator) => {
  // eval é uma função nativa do javascript para validar, por exemplo, uma string como um operador ou numero
  return eval(`${x1} ${operator} ${x2}`);

}

let resultado = calc(1, 2, "+");

console.log(resultado);


// adicionando eventos
// window usa toda a janela
window.addEventListener('focus', event => {

  console.log("focus");
});

document.addEventListener('click', event => {

  console.log('click');
});


//let agora = new Date();
//console.log(agora.toLocaleDateString("pt-BR"));

// Array

let carros = ["palio 98", "toro", "uno", 10, true, new Date(), function(){}];
// podemos pegar um elemento dentro do array "[5]" e transformar ele "getFullYear()" por exemplo
console.log(carros[5].getFullYear());
// forEach, para cada um dentro da array podemos fazer uma função
carros.forEach(function(value, index){
  console.log(index, value);
});

// Orientação ao objeto

// Classes, as classes são conjuntos de atributos (variáveis) e métodos (funções)
//this é um comando que chama um metodo ou atrbuto dentro de uma mesma classe
// instancia, quando um objeto representa uma classe

// forma antiga de se escrever
 let celular = function(){
  //toda vez que se usa "." voce esta dizendo, eu tenho um objeto e estou acessando este método, ou atributo, dentro do objeto
  this.cor = "prata";

  this.ligar = function()
  {

    console.log("uma ligação");

    return "ligando";
   }
}

// mesma função de cima mas com escrita moderna
  class celular {

  constructor(){

    this.cor = "prata";
  }

  ligar(){

    console.log("uma ligação");

    return "ligando";

  }
}
let objeto = new celular();

console.log(objeto);
console.log(objeto.ligar());

*/
