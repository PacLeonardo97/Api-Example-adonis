
let isValidCpf = (cpf) => {
    cpf = cpf.replace(/(\.|\/|\-)/g, '');
    if (cpf.length !== 11 || ['00000000000', '11111111111', '22222222222',
        '33333333333', '44444444444', '55555555555', '66666666666',
        '77777777777', '88888888888', '99999999999'].includes(cpf)) {
        return false;
    }
    let rest = 0;
    let i = 0;
    let sum = 0;
    for (i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) {
        rest = 0;
    }
    if (rest !== parseInt(cpf.charAt(9))) {
        return false;
    }
    sum = 0;
    for (i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    if (rest === 10 || rest === 11) {
        rest = 0;
    }
    if (rest !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

module.exports = isValidCpf;