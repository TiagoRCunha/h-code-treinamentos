
class CalcController {

  constructor(){

    this._audio = new Audio('click.mp3');
    this._audioOnOff = false;
    // para repetir a ultima operação
    this._lastOperator = '';
    this._lastNumber = '';

    this._operation = [];
    // underlane (é uma convenção) quer dizer que é privado, porem no javascript é possivel chamar estes atributos em outro documento
    // querySelector substitui o seletor getElementById('id')
    // El é uma convenção para elemento
    this._locale = 'pt-BR';
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentDate;
    // dataAtual para currentDate para o codigo ficar em ingles para ter um padrao
    this.initialize();
    this.initButtonsEvents();
    this.initKeyboard();

  }

  pasteFromClipboard(){

    document.addEventListener('paste', e=>{

      let text = e.clipboardData.getData('Text');

      this.displayCalc = parseFloat(text);

    });

  }

  copyToClipboard(){

    let input = document.createElement('input');

    input.value = this.displayCalc;

    document.body.appendChild(input);

    input.select();

    document.execCommand("Copy");

    input.remove();

  }
  // DOM document object model
  // BOM browser object model
  initialize(){

    this.setDisplayDateTime();

    // atualiza a cada 1000 milisegundos
    setInterval(()=>{

      this.setDisplayDateTime();
    }, 1000);

    this.setLastNumberToDisplay();
    this.pasteFromClipboard();

    document.querySelectorAll('.btn-ac').forEach(btn=>{

      btn.addEventListener('dblclick', e=>{

        this.toggleAudio();
      });

    });

  }

  toggleAudio(){

    this._audioOnOff = !this._audioOnOff;

  }

  playAudio(){

    if (this._audioOnOff) {

      this._audio.currentTime = 0;
      this._audio.play();

    }

  }

  initKeyboard(){

    document.addEventListener('keyup', e=>{

      this.playAudio();

      switch (e.key){

        case 'Escape':
          this.clearAll();
        break;
        case 'Backspace':
          this.clearEntry();
        break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
          this.addOperation(e.key);
        break;
        case 'Enter':
        case '=':
          this.calc();
        break;
        case '.':
        case ',':
          this.addDot();
        break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.addOperation(parseInt(e.key));
        break;
        case 'c':
        if (e.ctrlKey) this.copyToClipboard();
        break;
      }

    });

  }

  addEventListenerAll(element, events, fn){

    events.split(' ').forEach(event => {

      element.addEventListener(event, fn, false);

    });


  }

  clearAll(){

    this._operation = [];
    this._lastNumber = '';
    this._lastOperator = '';

    this.setLastNumberToDisplay();

  }

  clearEntry(){

    this._operation.pop();

    this.setLastNumberToDisplay();

  }
  // a[a.length-1] para pegar o ultimo numero
  getLastOperation(){

    return this._operation[this._operation.length - 1];

  }

  setLastOperation(value){

    this._operation[this._operation.length - 1] = value;

  }

  isOperator(value){
    // operadores da calculadora
    return (['+','-','*','%','/'].indexOf(value) > - 1);

  }

  pushOperation(value){

    this._operation.push(value);

    if (this._operation.length > 3){

      this.calc();

    }
  }

  getResult(){

    try{
      return eval(this._operation.join(""));
    }catch(e){
      setTimeout(()=>{

        this.setError();

        }, 1);

    }

  }

  calc(){
    let last = '';

    this._lastOperator = this.getLastItem();

    if (this._operation.length < 3) {

      let firstItem = this._operation[0];
      this._operation = [firstItem, this._lastOperator, this._lastNumber];

    }

    // só pode tirar o ultimo de for maior que 3, clicando no 'igual'
    if (this._operation.length > 3) {

        last = this._operation.pop();
        // se repetir o clique no igual
        this._lastNumber = this.getResult();

    } else if (this._operation.length == 3) {

      this._lastNumber = this.getLastItem(false);

    }

    let result = this.getResult();

    if (last == '%'){

      result /= 100;
      this._operation = [result];

    } else {

      this._operation = [result];

      if (last) this._operation.push(last);
    }

    this.setLastNumberToDisplay();
  }
  // retorna o ultimo operador e se clicar no igual novamente vai fazer a operação de novo
  getLastItem(isOperator = true) {

    let lastItem;

    for (let i = this._operation.length - 1; i >= 0; i--){

      if (this.isOperator(this._operation[i]) == isOperator){
          lastItem = this._operation[i];
          break;
      }

    }

    if(!lastItem) {
      // if ternario, "?" sigfica então, ":" significa senão
      lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

    }

    return lastItem;

  }

  setLastNumberToDisplay(){

    let lastNumber = this.getLastItem(false);

    if (!lastNumber) lastNumber = 0;

    this.displayCalc = lastNumber;

  }

  addOperation(value){

    if(isNaN(this.getLastOperation())){
      // String
      if(this.isOperator(value)){
      // Trocar operador
        this.setLastOperation(value);

      } else if(!isNaN(value)){

        this.pushOperation(value);
        this.setLastNumberToDisplay();

        }

      } else {

          if(this.isOperator(value)){
            this.pushOperation(value);

          }else {

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);

            // atualizar display
            this.setLastNumberToDisplay();
          }
        }
  }

  setError(){

    this.displayCalc = "Error";

  }

  addDot(){

    let lastOperation = this.getLastOperation();

    if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

    if (this.isOperator(lastOperation) || !lastOperation) {

      this.pushOperation('0.');

    } else {

      this.setLastOperation(lastOperation.toString() + '.');

    }

    this.setLastNumberToDisplay();

  }

  execBtn(value){

    this.playAudio();
    switch (value){

      case 'ac':
        this.clearAll();
      break;
      case 'ce':
        this.clearEntry();
      break;
      case 'soma':
        this.addOperation('+');
      break;
      case 'subtracao':
        this.addOperation('-');
      break;
      case 'divisao':
        this.addOperation('/');
      break;
      case 'multiplicacao':
        this.addOperation('*');
      break;
      case 'porcento':
      // % em javascript é o módulo de uma divisão, ou seja o resto
        this.addOperation('%');
      break;
      case 'igual':
        this.calc();
      break;
      case 'ponto':
        this.addDot();
      break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value));
      break;
      default:
      this.setError();
      break;
    }

  }

  initButtonsEvents(){

    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index)=>{

      this.addEventListenerAll(btn, 'click drag', e => {

        let txtBtn = btn.className.baseVal.replace("btn-","");

        this.execBtn(txtBtn);

      });

      this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {

        btn.style.cursor = "pointer";

      });

    });


  }

  setDisplayDateTime(){

    this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

  }

  get displayTime(){
    return this._timeEl.innerHTML;
  }

  set displayTime(value){
    this._timeEl.innerHTML = value;
  }

  get displayDate(){
    return this._dateEl.innerHTML;
  }

  set displayDate(value){
    this._dateEl.innerHTML = value;
  }
  // recupera o atributo _displayCalc
  get displayCalc(){

    return this._displayCalcEl.innerHTML;

  }
  // atribue valor ao _displayCalc
  set displayCalc(value){
    // não execultar numeros maior que 10
    if (value.toString().length > 10) {
      this.setError();
      return false;
    }

    this._displayCalcEl.innerHTML = value;

  }

  get currentDate(){
    return new Date();
  }

  set currentDate(value){
    this._currentDate = value;
  }

}
