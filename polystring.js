// If "wild" is -1, unlimited length, >0: limited length
var PolyString = {
    "match": function(str,exp) {
        var reqs = []; // format: {req,bool,mult,wild}
        var n = 0;
        var newprops = {"bool": true};
        while(n < exp.length) {
            if(str[n] == "*") {
                if(reqs[reqs.length - 1].wild != 0 && reqs[reqs.length - 1].wild != undefined) {
                    reqs[reqs.length - 1].wild = -1;
                } else {
                    reqs.push({"bool":newprops.bool,"wild":-1});
                }
            } else if(str[n] == "%") {
                if(reqs[reqs.length - 1].wild > 0 && reqs[reqs.length - 1].wild != undefined) {
                    reqs[reqs.length - 1].wild += 1;
                } else {
                    reqs.push({"bool":newprops.bool,"wild":1});
                }
            }
            n++;
        }
        console.log(reqs);
    },
    "version":"1.0"
}
