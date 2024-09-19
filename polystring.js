 // If "wild" is -1, unlimited length, >0: limited length
var PolyString = {
    "compile": function(exp) {
        var reqs = []; // format: {req,bool,mult,wild}
        var n = 0;
        var newprops = {"bool": true};
        while(n < exp.length) {
            if(exp[n] == "*") {
                if(reqs[reqs.length - 1] && reqs[reqs.length - 1].wild != 0 && typeof reqs[reqs.length - 1].wild == "number") {
                    reqs[reqs.length - 1].wild = -1;
                } else {
                    reqs.push({"bool":newprops.bool,"wild":-1});
                }
            } else if(exp[n] == "%") {
                if(reqs[reqs.length - 1] && reqs[reqs.length - 1].wild > 0 && typeof reqs[reqs.length - 1].wild == "number" && !reqs[reqs.length - 1].wild == -1) {
                    reqs[reqs.length - 1].wild += 1;
                } else {
                    reqs.push({"bool":newprops.bool,"wild":1});
                }
            }
            n++;
        }
        return reqs;
    },
    "version":"1.0"
}
