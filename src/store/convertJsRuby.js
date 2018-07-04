export const rubyjs = (input) => {
  let str = convert(input)

  let func              = str.replace(/function/g, 'def');
  let initialize        = func.replace(/constructor+[' ']/g, 'initialize ');
  let initialize2       = initialize.replace(/constructor/g, 'initialize ');
  let thisRuby          = initialize2.replace(/this./g, '@');
  let funcBracket       = thisRuby.replace(/[' ']+[,]+[(]/g, ' (');
  let funcBracket2      = funcBracket.replace(/[,]+[(]/g, ' (');
  let bracket           = funcBracket2.replace(/[()]/g, '');
  let startCurlyBracket = bracket.replace(/[{]/g, '');
  let endCurlyBracket   = startCurlyBracket.replace(/[}]/g, 'end');
  let consolelog        = endCurlyBracket.replace(/console.log/g, 'puts ');
  let endElse           = consolelog.replace(/end+[' ']+else/g, 'else');
  let elsif             = endElse.replace(/else+[' ']+if/g, 'elsif');
  let endelsif          = elsif.replace(/end+[' ']+elsif/g, 'elsif');
  let equal             = endelsif.replace(/===/g, '==');
  let defWhile          = equal.replace(/[' ']+defwhile/g, 'while');

  let forloop = forLoop(defWhile);
  let semicolon = forloop.replace(/[;]/g, '')
  return semicolon;
}

function funcChange (input) {
  let funcStr = input.split('\n');

  for (let i = 0; i < funcStr.length; i++) {
    if (funcStr[i].includes('function') === true) {
      let string = '';
      for (let j = 0; j < funcStr[i].length; j++) {
        if (funcStr[i][j] === '(') {
          string += ',' + funcStr[i][j];
        } else {
          string += funcStr[i][j];
        }
      }
      funcStr[i] = string;
    } else if (funcStr[i].includes('while') === true) {
      let string = '';
      for (let j = 0; j < funcStr[i].length; j++) {
        if (funcStr[i][j] === '(') {
          string += ',' + funcStr[i][j];
        } else {
          string += funcStr[i][j];
        }
      }

      funcStr[i] = string;
    }
  }

  return funcStr.join('\n');
}

function consolelog (input) {
  let consolog = input.split('\n');

  for (let i = 0; i < consolog.length; i++) {
    if (consolog[i].includes('])') === true) {
      let squareSpitLeft = consolog[i].split('[');
      let result = squareSpitLeft[squareSpitLeft.length - 1].split(']')[0];
      let indentation = squareSpitLeft[0].split('console');
      
      consolog[i] = `${indentation[0]}console.log(${result})`;
    }
  }

  return consolog.join('\n');
}

function forLoop (input) {
  let loop = input.split('\n');

  for (let i = 0; i < loop.length; i++) {
    let arr = [];
    if (loop[i].includes('for') === true && loop[i].includes('++') === true) {
      //step 1
      let lineFor = loop[i].split(';');
      let lineFor0Step1 = lineFor[0].split('=');
      let lineFor0Step2 = lineFor0Step1[0].split(' ');

      for(let i=0;i<lineFor0Step2.length - 6;i++) {
        if(lineFor0Step2[i] === '') {
          arr.push(' ')
        }
      }
      let temp = [];
      for(let i=0;i<lineFor0Step2.length;i++) {
        if(lineFor0Step2[i] !== '') {
          temp.push(lineFor0Step2[i])
        }
      }
      arr.push('for');
      arr.push(' ',temp[temp.length-1]);
      arr.push(' in ');
      arr.push(lineFor0Step1[lineFor0Step1.length-1]);

      //step 2
      let lineFor1Step1 = lineFor[1];

      if(lineFor1Step1.includes('<=') === true) {
        let lineFor1Step2 = lineFor1Step1.split('<=')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('..',lineFor1Step3[0]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('..',lineFor1Step2[1]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      } else if (lineFor1Step1.includes('>=') === true) {
        let lineFor1Step2 = lineFor1Step1.split('>=')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('..',lineFor1Step3[0]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('..',lineFor1Step2[1]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      } else if (lineFor1Step1.includes('<') === true) {
        let lineFor1Step2 = lineFor1Step1.split('<')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('...',lineFor1Step3[0]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('...',lineFor1Step2[1]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      } else if (lineFor1Step1.includes('>') === true) {
        let lineFor1Step2 = lineFor1Step1.split('>')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('...',lineFor1Step3[0]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('...',lineFor1Step2[1]);
          let reg1 = arr[arr.length-1].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 1] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      }
    } else if (loop[i].includes('for') === true && loop[i].includes('--') === true) {
      //step 1
      let lineFor = loop[i].split(';');
      let lineFor0Step1 = lineFor[0].split('=');
      let lineFor0Step2 = lineFor0Step1[0].split(' ');

      for(let i=0;i<lineFor0Step2.length - 5;i++) {
        if(lineFor0Step2[i] === '') {
          arr.push(' ')
        }
      }
      let temp = [];
      for(let i=0;i<lineFor0Step2.length;i++) {
        if(lineFor0Step2[i] !== '') {
          temp.push(lineFor0Step2[i])
        }
      }
      arr.push('for');
      arr.push(' ',temp[temp.length-1]);
      arr.push(' in ');
      let clearSpace = lineFor0Step1[lineFor0Step1.length-1].replace(/[' ']/gi, '')
      arr.push('(', clearSpace);

      //step 2
      let lineFor1Step1 = lineFor[1];
      if(lineFor1Step1.includes('<=') === true) {
        let lineFor1Step2 = lineFor1Step1.split('<=')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('..',lineFor1Step3[0], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('..',lineFor1Step2[1], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      } else if (lineFor1Step1.includes('>=') === true) {
        let lineFor1Step2 = lineFor1Step1.split('>=')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('..',lineFor1Step3[0], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('..',lineFor1Step2[1], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      } else if (lineFor1Step1.includes('<') === true) {
        let lineFor1Step2 = lineFor1Step1.split('<')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('...',lineFor1Step3[0], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('...',lineFor1Step2[1], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      } else if (lineFor1Step1.includes('>') === true) {
        let lineFor1Step2 = lineFor1Step1.split('>')
        if(lineFor1Step2[1].includes('.') === true) {
          let lineFor1Step3 = lineFor1Step2[1].split('.');
          arr.push('...',lineFor1Step3[0], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        } else {
          arr.push('...',lineFor1Step2[1], ').to_a.reverse');
          let reg1 = arr[arr.length-2].replace(/[' ']/g, '')
          let reg2 = arr[arr.length-3].replace(/[' ']/g, '')
          arr[arr.length - 2] = reg1
          arr[arr.length - 3] = reg2
          loop[i] = arr.join('');
        }
      }
    }
  }

  let result = loop.join('\n').replace(/.length/g, '');
  return result;
}

function changeClass (input) {
  let convert = input.split('\n');
  let firstIndex;
  let lastIndex;

  for (let i = 0; i < convert.length; i++) {
    if (convert[i].includes('class') === true) {
      firstIndex = i;
    } else if (convert[i].includes('}') === true) {
      lastIndex = i;
    }
  }

  for (let i = firstIndex; i <= lastIndex; i++) {
    if (convert[i].includes(') {') && !convert[i].includes('function') || convert[i].includes('){') && !convert[i].includes('function')) {
      convert[i] = '  function' + convert[i];
    }
  }

  return convert.join('\n');
}

function convert (input) {
  let consolog = consolelog(input);
  let classInput = changeClass(consolog);
  let func = funcChange(classInput);

  return func;
}

export const forScrapRuby = (input) => {
  const library = [
    'function',
    'var',
    'let',
    'const',
    'if',
    'else',
    'else if',
    'for',
    'while',
    'forEach',
    'map',
    'class',
    'Class',
    'console.log',
    'constructor',
    'return'
  ];
  const forSearch = [
    "function ruby", 
    "condition ruby", 
    "looping ruby",
    "class ruby",
    "output ruby",
    "input ruby",
    "constructor ruby",
    "method ruby",
    "return ruby",
    "variable ruby"
  ];
  let earlyArray = [];
  for(let i=0; i<library.length; i++){
    if(input.indexOf(library[i]) !== -1){
      earlyArray.push(library[i])
    }
  }
  let arrayForSearch = [];
  for(let i=0; i<earlyArray.length; i++){
    if(earlyArray[i] === 'var' || earlyArray[i] === 'let' || earlyArray[i] === 'const') {
      arrayForSearch.push('variable ruby')
    } else if(earlyArray[i] === 'if' || earlyArray[i] === 'else if' || earlyArray[i] === 'else') {
      arrayForSearch.push('condition ruby')
    } else if(earlyArray[i] === 'for' || earlyArray[i] === 'while' || earlyArray[i] === 'forEach' || earlyArray[i] === 'map') {
      arrayForSearch.push('looping ruby')
    } else if(earlyArray[i] === 'class' || earlyArray[i] === 'Class') {
      arrayForSearch.push('class ruby')
    } else if(earlyArray[i] === 'console.log') {
      arrayForSearch.push('output ruby')
    } else if(earlyArray[i] === 'constructor') {
      arrayForSearch.push('constructor ruby')
    } else if(earlyArray[i] === 'function') {
      arrayForSearch.push('function ruby')
    } else if(earlyArray[i] === 'return') {
      arrayForSearch.push('return ruby')
    }
  };
  let arrayFinal = [];
  for(let i=0; i<forSearch.length; i++) {
    if(arrayForSearch.includes(forSearch[i]) === true) {
      arrayFinal.push(forSearch[i]);
    };
  };
  return arrayFinal;
}

// /lib/ruby/class 
// /lib/ruby/string
// /lib/python/iterator