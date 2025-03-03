var PolyString = {
    "compile": function(exp) {
        var reqs = []; // format: characters: {allowed characters, bool}; multitudes: {ands, multitude strings, identifier}
        var array_stack = [0];
        var n = 0;
        var i = 0;
        var newprops = {"bool": true,"escaped":false};
        var add = function(arg) {
            if(typeof arg == "string") {
                if(reqs[array_stack[0]].characters == undefined) {
                    reqs.push(newprops);
                }
                reqs[array_stack[0]].characters += arg;
                newprops.escaped = false;
            }
            if(reqs[array_stack[0]].wild != undefined) {
                if(reqs[array_stack[0]].wild != 0) {
                    reqs[array_stack[0]].wild += arg;
                }
                newprops.escaped = false;
            }
        };
        while(n < exp.length) {
            if(!reqs[array_stack[0]]) {
                reqs[array_stack[0]] = {
                    "characters":"",
                    "equiv":newprops.bool
                };
            }
            if(newprops.escaped) {
                add(exp[n]);
            }
            else if(exp[n] == "\\") {
                newprops.escaped = true;
            }
            else if(exp[n] == "%") {
                if(reqs[array_stack[0]].wild != undefined) {
                    if(reqs[array_stack[0]].wild != -1) {
                        add(1);
                    }
                } else {
                    array_stack[0]++;
                    reqs.push({
                        "equiv":newprops.bool,
                        "wild":1
                    });
                }
            }
            else if(exp[n] == "*") {
                if(reqs[array_stack[0]].wild != undefined) {
                    reqs[array_stack[0]].wild = -1;
                } else {
                    array_stack[0]++;
                    reqs.push({
                        "equiv":newprops.bool,
                        "wild":-1
                    });
                }
            }
            else {
                add(exp[n]);
            }
            n++;
        }
        for(let n = 0; n < reqs.length; n++) {
            if(
                reqs[n].characters == "" ||
                reqs[n].wild == 1
            ) {
                reqs = reqs.splice(0,n).concat(reqs.splice(n + 1,reqs.length));
                n -= 1;
            }
        }
        return reqs;
    },
    "error": function(arg,pat){
        var error;
        if(type == "call") {
            error = `Nothing to call '${arg}' on`;
        }
        if(type == "unmatched") {
            error = `Unmatched '${arg}'`;
        }
        if(type == "noset") {
            error = `Nonexistent set reference '${arg}'`;
        }
        if(type == "@") {
            error = `Nonexistent group reference to '${arg}'`;
        }
        if(type == "size") {
            error = `Expression too large`;
        }
        throw `SyntaxError: Invalid PolyString pattern ${pattern}: ${error}`;
        return error;
    },
    "version":"1.1"
}
