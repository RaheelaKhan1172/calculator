var calc = {
  currAns:0,
  prevVal:0,
  newVal:0,
  currSym:[],
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
      console.log('yo add',calc.prevVal,calc.currAns,calc.newVal);

  if (calc.prevVal === 0) {
    calc.currAns = Number(calc.currAns) +  Number(calc.newVal);
  } else {
    calc.currAns = Number(calc.prevVal) + Number(calc.newVal);
  }
  $(".display").text(calc.currAns);
}
calc.minus = function() {
        console.log('yo min',calc.prevVal,calc.currAns,calc.newVal);

  calc.currAns = (calc.prevVal === 0) ? Number(calc.currAns) - Number(calc.newVal) : Number(calc.prevVal) - Number(calc.newVal);
  $(".display").text(calc.currAns);
}
calc.mult = function() {
    console.log('yo',calc.prevVal,calc.currAns,calc.newVal);
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
  console.log('ans',calc.currSym); 
  var sym = calc.currSym.shift();
  calc.prevVal = calc.symCount > 2 ? 0 : calc.prevVal;
  switch(sym) {
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
  case '%': 
    calc.perc();
    break;
  default:
    calc.reset();
  }

}

$(document).ready(function() {
  $('button').click(function() {
    var currVal = this.textContent;
    console.log('cur',currVal,'sym',calc.currSym);
       if (currVal !== "=" && !Number(currVal)) {
        calc.currSym.push(currVal);
            console.log('vut sym', calc.currSym);
      }
    if (Number(currVal) && calc.symCount === 0) {
      calc.accumVal(currVal);
    } else if (Number(currVal)) {
      calc.accumValTwo(currVal);
    } else if (currVal === "=" && calc.newVal === 0){
      $(".display").text(calc.prevVal);
      calc.prevVal = 0;
    } else if (currVal ==="AC" || currVal ==="CE") {
      calc.reset();
    } else {
      console.log('ji');
      calc.symCount++;
      if (calc.symCount >= 2 || currVal === "=") {
        if (calc.newVal !== 0) {
          console.log('new',calc.newVal);
          calc.ans();
        }
      }

    }
  });
});

console.log(calc.prevVal,calc.newVal);
