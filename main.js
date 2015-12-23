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
  calc.currSym = [];
  $(".display").text('');
}
calc.ans = function() {
  console.log('ans',calc.currSym); 
  var sym = calc.currSym.shift();
  console.log('am i herre');
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
  default:
    calc.reset();
  }

}

$(document).ready(function() {
  $('button').click(function() {
    var currVal = this.textContent;
       if (currVal !== "=" && currVal !== '.' && currVal !== '0' && currVal !== "%" && !Number(currVal)) {
        calc.currSym.push(currVal);
            console.log('vut sym', calc.currSym);
      }
    
    if (Number(currVal) && calc.symCount === 0) {
      calc.isNumOne = true;
      calc.accumVal(currVal);
    } else if (Number(currVal)) {
      calc.isNumOne = false;
      calc.accumValTwo(currVal);
    } else if (currVal === "=" && calc.newVal === 0){
      if(calc.isNumOne === true) {
      $(".display").text(calc.prevVal);
      calc.prevVal = 0;
     }  else {
        $('.display').text(calc.newVal);
        calc.newVal = 0;
      } 
    } else if(currVal === "0") {
      if (calc.isNumOne === true) {
        calc.prevVal = (calc.prevVal <= 10 ) ? calc.prevVal * 10 : calc.prevVal * 100;
        $(".display").text(calc.prevVal);
      } else {
        calc.newVal = (calc.newVal <=10 ) ? calc.newVal * 10 : calc.newVal * 100;
        $(".display").text(calc.newVal);
      }
    } else if (currVal ==="AC" || currVal ==="CE") {
      calc.reset();
    } else if (currVal === "."){
      if (calc.isNumOne === undefined || calc.isNumOne === true) {
        calc.prevVal = (calc.prevVal.length>0) ? calc.prevVal + '.' : '.'+calc.prevVal;
        $(".display").text(calc.prevVal);
        console.log('nohere',calc.prevVal.length);
      } else {
        calc.newVal = (calc.newVal.length > 0)? calc.newVal + '.' : '.'+calc.newVal;
        $(".display").text(calc.newVal); 
      }
      } else if (currVal === "%") {
         if (!calc.isNumOne) {
      calc.newVal = (calc.newVal <= 10) ? calc.newVal / 10 : calc.newVal / 100;
      $(".display").text(calc.newVal);
      } else {
       calc.prevVal = (calc.prevVal <= 10) ? calc.prevVal / 10 : calc.prevVal / 100;
       $(".display").text(calc.prevVal);
      }    
      } else {
      console.log('ji');
      calc.symCount++;
      if (calc.symCount >= 2 || currVal === "=") {
        if (calc.newVal !== 0) {
          calc.ans();
        }
      }
    }
  });
});

console.log(calc.prevVal,calc.newVal);
