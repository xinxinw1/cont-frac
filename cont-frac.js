/***** Continued Fractions 1.1 *****/

/* require tools 4.0 */
/* require prec-math 4.1 */
/* require math-check 2.1 */

////// Import //////

var udf = undefined;

var str = String;

var falp = $.falp;

var pos = $.pos;
var rem = $.rem;
var has = $.has;
var rpl = $.rpl;

var len = $.len;

var sli = $.sli;
var fst = $.fst;
var rst = $.rst;

var joi = $.joi;

var app = $.app;

var bef = $.bef;
var aft = $.aft;

var foc = $.foc;
var clr = $.clr;
var satt = $.satt;
var ratt = $.ratt;
var con = $.cont;

var prec = PMath.gprec;
var proc = PMath.proc;

var Rp = {frac: proc(R.frac)};

////// Functions //////

function frac(a, b, nprec){
  if (has("/", a)){
    a = rem(/\s/g, "", a);
    b = $("b").value = aft("/", a);
    a = $("a").value = bef("/", a);
    foc($("b"));
  }
  
  a = rem(/\.$/g, a);
  b = rem(/\.$/g, b);
  
  a = R.real(a);
  b = R.real(b);
  nprec = R.realint(nprec);
  
  if (falp(a) || falp(b) || falp(nprec)){
    display("");
    return false;
  }
  
  var dec = R.div(a, b, nprec);
  var arr = fracToArr(a, b);
  var calc = arrToCalc(arr);
  var disp = arrToDisp(arr);     
  
  display(disp, calc, dec);
}

function dec(a){
  a = rem(/\.$/g, a);
  a = R.real(a);
  
  if (falp(a)){
    display("");
    return false;
  }
  
  var b = "1";
  while (R.decp(a)){
    a = R.right(a, 1);
    b += "0";
  }
  
  var arr = fracToArr(a, b);
  var calc = arrToCalc(arr);
  var disp = arrToDisp(arr);
  
  display(disp, calc);
}

function func(a, b, nprec){
  nprec = R.realint(nprec);
  
  if (falp(nprec)){
    display("");
    return false;
  }
  
  var dec = Rp.frac(a, b, nprec);
  var calc = funcToCalc(a, b);
  var frac = Rp.frac.p + " / " + Rp.frac.q;
  
  display(calc, frac, dec);
}

function cont(a, nprec){
  nprec = R.realint(nprec);
  a = rem(/\s/g, a);
  a = rem(/^\[/g, a);
  a = rem(/([;,]-?|\.|\])$/g, a);
  
  var reg = /^-?[0-9]+(\.[0-9]+)?((;|,)-?[0-9]+(\.[0-9]+)?)*$/;
  if (falp(nprec) || !reg.test(a)){
    display("");
    return false;
  }
  
  var arr = a.split(/[;,]/g);
  var calc = arrToCalc(arr);
  
  var an = function (n){
    if (n < arr.length)return arr[n];
    return null;
  }
  
  var dec = R.sfrac(an, nprec);
  var frac = R.sfrac.p + " / " + R.sfrac.q;
  
  display(calc, frac, dec);
}

function fracToArr(a, b){
  var arr = [];
  
  var both, r;
  while (r != "0"){
    both = R.qar(a, b);
    arr.push(both[0]);
    r = both[1];
    a = b;
    b = r;
  }
  
  return arr;
}

function arrToCalc(arr){
  var calc = arr[0];
  for (var i = 1; i < arr.length; i++){
    calc += "+1/(" + arr[i];
  }
  for (var k = i-1; k >= 1; k--){
    calc += ")";
  }
  
  return calc;
}

function funcToCalc(a, b){
  var n = Rp.frac.n;
  n = (n > 100)?100:n;
  var calc = a(0);
  for (var i = 1; i <= n; i++){
    calc += "+" + b(i) + "/(" + a(i);
  }
  for (var k = i-1; k >= 1; k--){
    calc += ")";
  }
  
  return calc;
}

function arrToDisp(arr){
  if (arr.length > 1)return "[" + fst(arr) + "; " + joi(rst(arr), ", ") + "]";
  return "[" + arr[0] + "]";
}

function display(res1, res2, res3){
  $("results1").innerHTML = res1;
  $("results2").innerHTML = (res2 != udf)?res2:"";
  $("results3").innerHTML = (res3 != udf)?res3:"";
}

var curr = "frac";
function change(id){
  satt($(curr), "href", "javascript:void(0);");
  ratt($(id), "href");
  curr = id;
  clr($("inputs"));
  clr($("hidden"));
  $("form").onsubmit = function (){return false;};
  display("", "");
  var ins = $("inputs");
  switch (id){
    case "frac":
      var exec = function (){
        frac($("a").value, $("b").value, $("nprec").value);
      };
      var ps = {type: "text", autocomplete: "off", onkeyup: exec};
      con(ins, ["input", app(ps, {id: "a", size: "40"})],
               " / ",
               ["input", app(ps, {id: "b", size: "40"})],
               " nprec: ",
               ["input", app(ps, {id: "nprec", size: "10", value: prec()})]);
      break;
    case "dec":
      con(ins, ["input", {type: "text",
                          size: "100",
                          autocomplete: "off",
                          onkeyup: function (){dec(this.value);}}]);
      break;
    case "func":
      var exec = function (){
        try {
          con($("hidden"), ["script", "function a(n){" + $("a").value + "}",
                                      "function b(n){" + $("b").value + "}"]);
          func(a, b, $("nprec").value);
        } catch (e){
          display(e);
        }
        return false;
      };
      con(ins, "a(n): ", ["textarea", {id: "a", rows: 3, cols: 40}],
               " b(n): ", ["textarea", {id: "b", rows: 3, cols: 40}],
               " nprec: ", ["input", {id: "nprec",
                                     type: "text",
                                     size: "10",
                                     value: prec(),
                                     autocomplete: "off",
                                     onkeyup: exec}]);
      $("form").onsubmit = exec;
      break;
    case "cont":
      var exec = function (){
        cont($("a").value, $("nprec").value);
      };
      var ps = {type: "text", autocomplete: "off", onkeyup: exec};
      con(ins, ["input", app(ps, {id: "a", size: 100})],
               " nprec: ",
               ["input", app(ps, {id: "nprec", size: 10, value: prec()})]);
      break;
  }
}
           
function init(){
  var arr = ["frac", "dec", "func", "cont"];
  for (var i = 0; i < arr.length; i++){
    satt($(arr[i]), {href: "javascript:void(0);",
                     onclick: mkOnclick(arr[i])});
  }
  change("frac");
  var text = "javascript:display('Error: unknown (timeout?)');";
  satt($("form"), "action", text);
}

function mkOnclick(id){
  return function (){change(id);};
}
