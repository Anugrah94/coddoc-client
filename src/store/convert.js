export const pythonjs = (input) => {
  let str = check(input);
  console.log(str)

  let func            = str.replace(/function/gi, 'def');
  let funcname        = func.replace(/,+[(]/gi, '(');
  let funcname2       = funcname.replace(/,+[' ']+[(]/gi, '(')
  let pythonClass     = funcname2.replace(/constructor+[(]/gi, 'def __init__(self, ');
  let pythonThis      = pythonClass.replace(/this./gi, 'self.');
  let pythonInstance  = pythonThis.replace(/[' ']+new+['  ']/gi, ' ');
  let methodPython    = pythonInstance.replace(/;+[(]/gi, '(self, ');
  let startBracket    = methodPython.replace(/[' ']+{/gi, ':');
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
  let result          = endbracket.replace(/[^\a-z\A-Z\,\:\=\+\>\<\;\&\|\!\/\.\"\'\()\w\s]/gi, ' ');
  let and             = result.replace(/&&/gi, 'and');
  let or              = and.replace(/[|]+[|]/gi, 'or');
  let not             = or.replace(/!/gi, 'not ');
  let is              = not.replace(/===/gi,'is');
  let isNot           = is.replace(/!==/gi,'is not');
  let right           = isNot.replace(/true/gi, 'True');
  let wrong           = right.replace(/false/gi, 'False');
  let erase           = wrong.replace(/delete/gi, 'del');
  let comment         = erase.replace(/[/]+[/]/gi, '#');
  let none            = comment.replace(/null/gi, 'None');
  let variable        = none.replace(/var+[' ']/gi, '');

  return variable;
}

export const functionDetection = (array) => {
  let keyword = [];

  array.forEach(search => {
    if (/^(function)/g.test(search) || /^(if)/g.test(search) || /^(for)/g.test(search) || /^(while)/g.test(search) || /^(class)/g.test(search)) {
      keyword.push(`${search} python w3school`);
    }
  })

  return keyword;
}

const check = (input) => {
  let compare = ['let', 'var', 'const'];
  let convert = input.split(' ');
  let result;
  for(let i=0; i<compare.length; i++) {
    if(convert[0] === compare[i]) {
      result = compare[i];
    };
  };
  if(result === compare[0] || result === compare[1] || result === compare[2]) {
    result = 'var';
    for(let i=1; i<convert.length; i++) {
      result += ' ' + convert[i];
    };
    return result;
  } else if(convert[0] === 'class' || convert[0] === 'Class') {
    let findC = input.indexOf('constructor') + 1;
    if(findC === 0) {
      let start = input.indexOf('{');
      let forCheck = '';
      let early = '';
      for(let l=0; l<=start; l++){
        early += input[l];
      }
      for(let p=start+1; p<input.length-2; p++){
        forCheck += input[p];
      }
      let mid = toConvert(forCheck);
      let newClass = early + '\n' + mid + '\n}'
      return newClass;
    }
  } else if(convert[0] !== 'function') {
    result = '';
    for(let i=0; i<input.length; i++) {
      if(input[i] === ')' && (input[i+1] === '{' || input[i+1] === ' ')){
        result += input[i] + ',';
      } else {
        result += input[i];
      };
    };
    return result;
  };
};

const toConvert = (str) => {
  if(str.length === 0) {
    return '';
  } else {
    let count = 0;
    for(let i=0; i<str.length; i++){
      if(str[i] === '{'){
        count++;
      } else if(str[i] === '}') {
        count--;
        if(count === 0) {
          let tempStr = 'function ';
          for(let j=0; j<=i; j++){
            tempStr += str[j]
          }
          let stop = tempStr.indexOf('(');
          let newStr = '';
          for(let k=0; k<tempStr.length; k++){
            if(k === stop) {
              newStr += ';' + tempStr[k];
            } else {
              newStr += tempStr[k];
            }
          }
          let strLeft = str.slice(i+2, str.length);
          return newStr + '\n' + toConvert(strLeft);
        }
      }
    }
  }
}

export const scrapping = (str) => {
  let library = [
    'for',
    'let',
    'var',
    'const',
    'while',
    'if',
    'else',
    'else if',
    'function',
    'class',
    'console.log'
  ]
  let newLib = []
  for(let i=0; i<library.length; i++){
    if(str.indexOf(library[i]) !== -1){
      newLib.push(library[i])
    }
  }
  return newLib
}

// console.log(pythonjs(`function namafunc(param1, param2){\nvar a = String(10)\nfor (number in 5),{\nif (condition && condition || condition === true || condition === false === undefined && condition === null),{\ncode} else if (condition),{\nwhile (a > b),{\nconsole.log(code)\narray.push(item) if(item),{//code here}else{//code here}}//ini code\ndelete item}}}`));
// console.log(pythonjs(`class Person{\nconstructor(name){\nthis.name = name}\nfunction namafunc;(newName){\nvar self.name = newName}} \nvar person = new Person('ihsan') \nconsole.log(person.name)`));