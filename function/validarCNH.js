function ValidarCNH(cnh) {
    var char1 = cnh.charAt(0);
    if (cnh.replace(new RegExp("\\D+", 'g'), "").length !== 11 || (function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })(/* replace */ '00000000000'.split('0').join(char1), cnh)) {
        return false;
    }
    var v = 0;
    var j = 9;
    for (var i = 0; i < 9; ++i, --j) {
        {
            v += (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(cnh.charAt(i)) - 48) * j);
        }
        ;
    }
    var dsc = 0;
    var vl1 = v % 11;
    if (vl1 >= 10) {
        vl1 = 0;
        dsc = 2;
    }
    v = 0;
    j = 1;
    for (var i = 0; i < 9; ++i, ++j) {
        {
            v += (((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(cnh.charAt(i)) - 48) * j);
        }
        ;
    }
    var x = v % 11;
    var vl2 = (x >= 10) ? 0 : x - dsc;
    return (function (o1, o2) {
        if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        }
    })((new String(vl1).toString() + new String(vl2).toString()), cnh.substring(cnh.length - 2));
}
module.exports = ValidarCNH;