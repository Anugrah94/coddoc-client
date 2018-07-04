export const pythonjs = (input) => {
  let str = convert(input);

  let func            = str.replace(/function/gi, 'def');
  let funcname        = func.replace(/[' ']+,+[(]/gi, '(');
  let funcname2       = funcname.replace(/,+[(]/gi, '(');
  let pythonClass     = funcname2.replace(/constructor/g, '__init__');
  let pythonThis      = pythonClass.replace(/this./gi, 'self.');
  let pythonInstance  = pythonThis.replace(/[' ']+new+['  ']/gi, ' ');
  let selfPython      = pythonInstance.replace(/[' ']+;+[(]+;/g, '(self');
  let selfPython2     = selfPython.replace(/;+[(]+;/g, '(self');
  let methodPython    = selfPython2.replace(/[' ']+;+[(]/g, '(self, ');
  let methodPython2   = methodPython.replace(/;+[(]/gi, '(self, ');
  let startBracket    = methodPython2.replace(/[' ']+{/gi, ':');
  let startBracket2   = startBracket.replace(/{/gi, ':');
  let consolelog      = startBracket2.replace(/console.log/gi, 'print');
  let append          = consolelog.replace(/.push/gi, '.append');
  let string          = append.replace(/String+[(]/gi, 'str(');
  let boolean         = string.replace(/Boolean+[(]/gi, 'bool(');
  let integer         = boolean.replace(/Number+[(]/gi, 'int(');
  let condition       = integer.replace(/if+[(]/gi, 'if ');
  let condition2      = condition.replace(/if+[' ']+[(]/gi, 'if ');
  let elsecondition   = condition2.replace(/else+[' ']+if/gi, 'elif');
  let elsecondition2  = elsecondition.replace(/[' ']+else+[' ']+if/gi, 'elif');
  let loop            = elsecondition2.replace(/for+[(]/gi, 'for ');
  let loop2           = loop.replace(/for+[' ']+[(]/gi, 'for ');
  let whileloop       = loop2.replace(/while+[(]/gi, 'while ');
  let whileloop2      = whileloop.replace(/while+[' ']+[(]/gi, 'while ');
  let endbracket      = whileloop2.replace(/[)]+,+:/gi, ':');
  let result          = endbracket.replace(/[^\a-z\A-Z\,\:\=\-\+\>\<\;\&\|\!\/\.\%\"\'\(\)\]\[\w\s]/gi, ' ');
  let and             = result.replace(/&&/gi, 'and');
  let or              = and.replace(/[|]+[|]/gi, 'or');
  let is              = or.replace(/===/gi,'is');
  let isNot           = is.replace(/!==/gi,'is not');
  let not             = isNot.replace(/!/gi, 'not ');
  let right           = not.replace(/true/gi, 'True');
  let wrong           = right.replace(/false/gi, 'False');
  let erase           = wrong.replace(/delete/gi, 'del');
  let comment         = erase.replace(/[/]+[/]/gi, '#');
  let comment2        = comment.replace(/[/]+[/]+[' ']/gi, '# ');
  let none            = comment2.replace(/null/gi, 'None');
  let variable        = none.replace(/var+[' ']/gi, '');
  let constanta       = variable.replace(/const+[' ']/gi, '');
  let varlet          = constanta.replace(/let+[' ']/gi, '');
  let negation        = varlet.replace(/[.]+[,]/gi, '!');
  let semicolon       = negation.replace(/[;]/gi, '');
  let length          = semicolon.replace(/.length/g, '');
  let upper           = length.replace(/.toUpperCase+[(]+[)]/g, '.upper()');
  let lower           = upper.replace(/.toLowerCase+[(]+[)]/g, '.lower()');
  let coma            = lower.replace(/[,]+[,]/gi, '');

  return coma;
}

function funcChange (input) {
  let funcStr = input.split('\n');

  for (let i = 0; i < funcStr.length; i++) {
    if (funcStr[i].includes('function') === true) {
      let string = '';
      for (let j = 0; j < funcStr[i].length; j++) {
        if (funcStr[i][j] === '(') {
          string += ',,' + funcStr[i][j];
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

function forScooping (input) {
  let convert = input.split('\n');
  let firstIndex;
  let lastIndex;

  for (let i = 0; i < convert.length; i++) {
    if (convert[i].includes('for') === true) {
      firstIndex = i;
    } else if (convert[i].includes('}   ') === true) {
      lastIndex = i;
    }
  }

  for (let i = firstIndex; i <= lastIndex; i++) {
    let arr = [];
    if (convert[i].includes('[') === true && convert[i].includes(']') === true && convert[i].includes('console.log') === false) {
      let step1 = convert[i].split(']');
      let indentation = step1[0].split(' ');

      for (let j = 0; j < indentation.length; j++) {
        if (indentation[j] === '') {
          arr.push(' ');
        }
      }

      let step2 = step1[0].split('[')
      arr.push(step2[step2.length-1])
      arr.push(step1[step1.length-1])
      
      convert[i] = arr.join('');
    }
  }

  return convert.join('\n');
}

function equalChange (input) {
  let str = funcChange(input);
  let string = '';

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '!' && str[i + 1] === '=' && str[i + 2] === ' ') {
      string += str[i] + ',,';
    } else if (str[i - 1] === `'` && str[i] === '!' && str[i + 1] === `'`) {
      string += '.' + ',';
    } else {
      string += str[i];
    }
  }

  return string;
}

function forLoop (input) {
  let loop = input.split('\n');

  for (let i = 0; i < loop.length; i++) {
    if (loop[i].includes('for') === true && loop[i].includes('++') === true) {
      let split = loop[i].split(';');
      let index00 = split[0].split('=')[0].split(' ');
      let index01 = split[0].split('=')[1].split(' ');
      let index1 = split[1].replace(/[^\a-z\A-Z\.\;\]\[\w\s]/gi, ' ').split(' ');
      let regex = /[a-zA-Z]/gi.test(index1[index1.length - 1]);
      let indentation = split[0].split(' ').join(' ').split('for');
      let result0 = [];

      for (let i = 0; i < index00.length; i++) {
        if (index00[i] !== '') {
          result0.push(index00[i]);
        }
      }
      
      if (!regex) {
        loop[i] = `${indentation[0]}for ${result0[result0.length - 1]} in range(${index01[index01.length - 1]}, ${index1[index1.length - 1]}, +1)):`; 
      } else {
        loop[i] = `${indentation[0]}for ${index1[1]} in ${index1[index1.length - 1]}:`; 
      }
    } else if (loop[i].includes('for') === true && loop[i].includes('--') === true) {
      let split = loop[i].split(';');
      let index00 = split[0].split('=')[0].split(' ');
      let index01 = split[0].split('=')[1].split(' ');
      let index1 = split[1].replace(/[^\a-z\A-Z\.\;\]\[\w\s]/gi, ' ').split(' ');
      let regexString = /[a-zA-Z]/gi.test(index1[index1.length - 1]);
      let regexNumber = /[1-9]/gi.test(index01[index01.length - 1]);
      let indentation = split[0].split(' ').join(' ').split('for');
      let result0 = [];

      for (let i = 0; i < index00.length; i++) {
        if (index00[i] !== '') {
          result0.push(index00[i]);
        }
      }
      
      if (!regexString && !regexNumber) {
        loop[i] = `${indentation[0]}for ${index1[1]} in reversed(${index01[index01.length - 1]})):`; 
      } else if (regexString, !regexNumber) {
        loop[i] = `${indentation[0]}for ${index1[1]} in ${index01[index01.length - 1]}:`; 
      } else if (regexString, regexNumber) {
        loop[i] = `${indentation[0]}for ${result0[result0.length - 1]} in range(${index1[index1.length - 1]}, ${index01[index01.length - 1]}, -1)):`; 
      }
    }
  }

  return loop.join('\n');
}

function changeInput (input) {
  let squareBracket = forScooping(input);
  let loop = forLoop(squareBracket);
  let str = equalChange(loop);
  let consolog = consolelog(str);
  let array = consolog.split('\n');

  for (let i = 0; i < array.length; i++) {
    if (array[i].includes('if') === true || array[i].includes('for') === true || array[i].includes('while') === true) {
      let string = '';
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === ')') {
          string += array[i][j] + ',,';
        } else {
          string += array[i][j];
        }
      }
      array[i] = string;
    }
  }

  return array.join('\n');
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
    let string = '';

    if (convert[i].includes(') {') && !convert[i].includes('function') || convert[i].includes('){') && !convert[i].includes('function')) {
      for (let j = 0; j < convert[i].length; j++) {
        if (convert[i][j] === '(' && convert[i][j + 1] === ')') {
          string += ';' + convert[i][j] + ';';
        } else if (convert[i][j] === '(') {
          string += ';' + convert[i][j];
        } else {
          string += convert[i][j];
        }
      }

      convert[i] = '  function' + string;
    }
  }

  return convert.join('\n');
}

function convert (input) {
  let inputConverting = changeInput(input);
  let classConverting = changeClass(inputConverting);

  return classConverting;
};

export const forScrapPython = (input) => {
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
    "function python", 
    "condition python", 
    "looping python",
    "class python",
    "output python",
    "input python",
    "constructor python",
    "method python",
    "return python",
    "variable python"
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
      arrayForSearch.push('variable python')
    } else if(earlyArray[i] === 'if' || earlyArray[i] === 'else if' || earlyArray[i] === 'else') {
      arrayForSearch.push('condition python')
    } else if(earlyArray[i] === 'for' || earlyArray[i] === 'while' || earlyArray[i] === 'forEach' || earlyArray[i] === 'map') {
      arrayForSearch.push('looping python')
    } else if(earlyArray[i] === 'class' || earlyArray[i] === 'Class') {
      arrayForSearch.push('class python')
    } else if(earlyArray[i] === 'console.log') {
      arrayForSearch.push('output python')
    } else if(earlyArray[i] === 'constructor') {
      arrayForSearch.push('constructor python')
    } else if(earlyArray[i] === 'function') {
      arrayForSearch.push('function python')
    } else if(earlyArray[i] === 'return') {
      arrayForSearch.push('return python')
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

// console.log(pythonjs(`function namafunc(param1, param2){\nvar a = String(10)\nfor (number in 5),{\nif (condition && condition || condition === true || condition === false === undefined && condition === null),{\ncode} else if (condition),{\nwhile (a > b),{\nconsole.log(code)\narray.push(item) if(item),{//code here}else{//code here}}//ini code\ndelete item}}}`));
// console.log(pythonjs(`class Person{\nconstructor(name){\nthis.name = name}\nfunction namafunc;(newName){\nvar self.name = newName}} \nvar person = new Person('ihsan') \nconsole.log(person.name)`));