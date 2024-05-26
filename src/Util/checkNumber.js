

export function checkNumber(number){

    if(typeof number === 'number'){
        return true;
    }
    else{
        return false;
    }
}


export function ensureNumericInput(input) {
    // 숫자가 아닌 모든 문자를 제거
    return input.replace(/\D/g, '');
  }
  