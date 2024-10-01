 // If "wild" is -1, unlimited length, >0: limited length; bool = whether obedience is required or disobedience
var PolyString = {
    "compile": function(exp) {
        var reqs = []; // format: {req,bool,mult,wild}
        var n = 0;
        var newprops = {"bool": true,"escaped":false};
        while(n < exp.length) {
            if(newprops.escaped) {
                if(reqs[reqs.length - 1] && reqs[reqs.length - 1].wild == 0) {
                    reqs[reqs.length - 1].req += exp[n];
                } else {
                    reqs.push({"reqs":exp[n],"bool":true,"wild":0});
                }
                newprops.escaped = false;
            } else if(exp[n] == "*") {
                if(reqs[reqs.length - 1] && reqs[reqs.length - 1].wild != 0 && typeof reqs[reqs.length - 1].wild == "number") {
                    reqs[reqs.length - 1].wild = -1;
                } else {
                    reqs.push({"bool":newprops.bool,"wild":-1});
                }
            } else if(exp[n] == "%") {
                if(reqs[reqs.length - 1] && reqs[reqs.length - 1].wild > 0 && typeof reqs[reqs.length - 1].wild == "number") {
                    reqs[reqs.length - 1].wild += 1;
                } else {
                    if(reqs.length == 0 || (reqs[reqs.length - 1] && reqs[reqs.length - 1].wild != -1)) {
                        reqs.push({"bool":newprops.bool,"wild":1});
                    }
                }
            } else if(exp[n] == "\\") {
                newprops.escaped = true;
            } else if(exp[n] == "," && reqs[reqs.length - 1]) {
                if(!reqs[reqs.length - 1].wild || reqs[reqs.length - 1].wild == 0) {
                    if(typeof reqs[reqs.length - 1].req == "string"){
                        reqs[reqs.length - 1].wild = undefined;
                        reqs[reqs.length - 1].req = [reqs[reqs.length - 1].req,""];
                    }
                }
            }
            n++;
        }
        return reqs;
    },
    "version":"1.0"
}
