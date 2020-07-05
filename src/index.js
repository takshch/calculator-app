import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fa/icons.min.css';
import * as serviceWorker from './serviceWorker';


class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      themeClassName: 'light-theme',
      calcString: "0",
      action: null,
    }
    this.calc = this.calc.bind(this);
  }
  clear = () =>{
    if(this.state.calcString !== ""){
      if(this.state.action !== "" && this.state.action !== null){
        let node = ReactDOM.findDOMNode(this.refs[this.state.action]);
        console.log(node);
        node.classList.remove("selected");
        this.setState({action: ""});
      }
      this.setState({calcString: "0"});
    }
  }

  themeChange = () => {
    if(this.state.themeClassName === "light-theme")
      this.setState({themeClassName: "dark-theme"});
    else if(this.state.themeClassName === "dark-theme")
      this.setState({themeClassName: "light-theme"});
  }
  
  // calc(e){
  //   this.
  // }
  
  isInt = (n) => {
    return Number(n) === n && n % 1 === 0;
  }

  isFloat = (n) => {
      return Number(n) === n && n % 1 !== 0;
  }
  calculation(num){
    if(num !== undefined && num !== "" && this.state.calcString !== ""){
      let num2 = Number(num), num1 = Number(this.state.calcString), returnValue = null;
      console.log(`num1 = ${num1},num2 = ${num2}`)
      if(this.state.action === "+")
          returnValue = num1 + num2;
      else if(this.state.action === "-")
          returnValue =  num1 - num2;
      else if(this.state.action === "x")
          returnValue = num1 * num2;
      else if(this.state.action ===  '/')
          returnValue = num1 / num2;
      else if(this.state.action === "%")
          returnValue = num1 % num2;
      return returnValue;
    }
    else{
      console.log("Calculation Fn: Something Wrong");
    }
  }
  calc(e){
    let innerValue = e.target.innerText;
    if(innerValue){
      console.log(`innerValue: ${innerValue}`);
      if(innerValue !== undefined && innerValue !== "%"){
        if(this.state.calcString !== "" && this.state.action !== null && this.state.action !== ""){
          let resultValue = this.calculation(innerValue);
          this.setState({calcString: resultValue});
          let node = ReactDOM.findDOMNode(this.refs[this.state.action]);
          console.log(node);
          node.classList.remove("selected");
          console.log(resultValue);
          this.setState({action: ""});
        }else if(this.state.calcString !== Infinity && this.state.calcString !== "0"){ 
          console.log(`Number : ${this.state.calcString}`);
          let calcString  = `${this.state.calcString}${innerValue}`;
          this.setState({calcString});
        }else if(this.state.calcString === Infinity || this.state.calcString === "0"){
          let calcString  = `${innerValue}`;
          this.setState({calcString});
        }
      }
      else if(innerValue !== undefined && innerValue === "%" && this.state.calcString !== ""){
        let node = ReactDOM.findDOMNode(this.refs[innerValue]);
        console.log(node);
        node.classList.add("selected");
        this.setState({action: "%"});
      }
      else{
        console.log("Check calcString: line 43");
      }        
    }
    else if(e.target.childNodes[0].className && this.state.calcString !== ""){
      let target = e.target.childNodes[0];
      console.log(target.className);
      let character = "";
      if(target.className === "fal fa-minus")
        character = "-"; 
      else if(target.className === "fal fa-times")
        character = "x";
      else if(target.className === "fal fa-divide")
        character = "/";
      else if(target.className === "fal fa-plus")
        character = "+";
      else{
        console.log("Check calcString: line 58");
      }
      if(character !== ""){
        this.setState({action: character});
        let node = ReactDOM.findDOMNode(this.refs[character]);
        node.classList.add("selected");
      }
    }else{
      console.log("Something Wrong!");
    }

  }
  plusMinus = () =>{
    if(Number(this.state.calcString) > 0 ){
      this.setState({calcString: `-${this.state.calcString}`});
    }else if(Number(this.state.calcString) < 0 ){
      this.setState({calcString: `${this.state.calcString.replace(/-([0-9])/g,"$1")}`});
    }
    
  }




  render(){
    return (<React.Fragment>
      <div className={`container ${this.state.themeClassName}`}>
        <div className="wrapper calculator">
          <div className="calculator-head">
            <div className="icons">
              <input type="checkbox" className="toggle" onClick={this.themeChange}/>
            </div>
            <div className="innerText">
               <div className="result">
              {(this.state.calcString !== "") ? <small>{this.state.calcString}</small> : this.state.resultValue}
               </div>
            </div>
          </div>
          <div className="calculator-body">
            <div className="body-wrapper">
              <div>
                <button onClick={this.clear}>AC</button>
                <button onClick={this.plusMinus}>+/-</button>
                <button onClick={this.calc} ref="%">%</button>
                <button onClick={this.calc} ref="/">
                  <span className="fal fa-divide"></span>
                </button>
              </div>
              <div>
                <button onClick={this.calc}>7</button>
                <button onClick={this.calc}>8</button>
                <button onClick={this.calc}>9</button>
                <button onClick={this.calc} ref="x">
                  <span className="fal fa-times"></span>
                </button>
              </div>
              <div>
                <button onClick={this.calc}>4</button>
                <button onClick={this.calc}>5</button>
                <button onClick={this.calc}>6</button>
                <button onClick={this.calc} ref="-">
                  <span className="fal fa-minus"></span>
                </button>
              </div>
              <div>
                <button onClick={this.calc}>1</button>
                <button onClick={this.calc}>2</button>
                <button onClick={this.calc}>3</button>
                <button onClick={this.calc} ref="+">
                  <span className="fal fa-plus"></span>
                </button>
              </div>
              <div>
                <button onClick={this.calc}>0</button>
                <button onClick={this.calc}>.</button>
                <button onClick={this.calc}>
                  <span className="fal fa-equals" ref="="></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>);
  }
}


ReactDOM.render(<Home />,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
