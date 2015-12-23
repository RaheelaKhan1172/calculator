var calc = {
  currAns:0,
  prevVal:0,
  newVal:0,
  currSym:"",
  symCount:0
}
calc.accumVal = function(num) {
  if (calc.prevVal === 0) {
    calc.prevVal = num;
  } else {
    calc.prevVal += num;
  }
  $(".display").text(calc.prevVal);
  console.log('hello',calc.currAns);
}

calc.accumValTwo = function(num) {
  console.log(num);
  if (calc.newVal === 0) {
    calc.newVal = num;
  } else {
    calc.newVal += num;
  }
  $(".display").text(calc.newVal);

}

calc.add = function() {
  console.log(calc.prevVal,calc.newVal);
  if (calc.prevVal === 0) {
    calc.currAns = Number(calc.currAns) +  Number(calc.newVal);
  } else {
    calc.currAns = Number(calc.prevVal) + Number(calc.newVal);
  }
  $(".display").text(calc.currAns);
}
calc.minus = function() {
  console.log(calc.prevVal, calc.newVal);
  calc.currAns = (calc.prevVal === 0) ? Number(calc.currAns) - Number(calc.newVal) : Number(calc.prevVal) - Number(calc.newVal);
  $(".display").text(calc.currAns);
}
calc.mult = function() {
    calc.currAns = (calc.prevVal === 0) ? Number(calc.currAns) * Number(calc.newVal) : Number(calc.prevVal) * Number(calc.newVal);
  $(".display").text(calc.currAns);
}

calc.div = function() {
    calc.currAns = (calc.prevVal === 0) ? Number(calc.currAns) / Number(calc.newVal) : Number(calc.prevVal) / Number(calc.newVal);
  $(".display").text(calc.currAns);
}

calc.reset = function() {
  calc.prevVal = 0;
  calc.newVal = 0;
  calc.currAns = 0;
  calc.symCount = 0;
  calc.currSym = "";
  $(".display").text('');
}
calc.ans = function() { 
    console.log(calc.currSym);
    console.log(calc.symCount,'sym',calc.prevVal,calc.newVal);
  calc.prevVal = calc.symCount > 2 ? 0 : calc.prevVal;
  switch(calc.currSym) {
  case '+':
    calc.add();
    calc.newVal = 0;
  break;
  case '-':
    calc.minus();
    calc.newVal = 0;
    break;
  case '*':
    calc.mult();
    calc.newVal = 0;
    break;
  case '÷': 
    calc.div();
    calc.newVal = 0;
    break;
  case '.':
    calc.dec();
    break;
  default:
    calc.reset();
  }

}

$(document).ready(function() {
  $('button').click(function() {
    var currVal = this.textContent;
    if (Number(currVal) && calc.symCount === 0) {
      calc.accumVal(currVal);
    } else if (Number(currVal)) {
      calc.accumValTwo(currVal);
    } else {
      calc.symCount++;
      if (calc.symCount >= 2 || String(currVal) === "=") {
        calc.ans();
      }
      calc.currSym = currVal;
    }
  });
});

console.log(calc.prevVal,calc.newVal);
