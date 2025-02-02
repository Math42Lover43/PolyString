var PolyString = {
    "compile": function(exp) {
        var reqs = []; // format: characters: {allowed characters, bool}; multitudes: {ands, multitude strings, identifier}
        var array_stack = [0];
        var n = 0;
        var i = 0;
        var newprops = {"bool": true,"escaped":false};
        var add = function(arg) {
            if(reqs[array_stack[0]].characters != undefined) {
                reqs[array_stack[0]].characters += arg;
                newprops.escaped = false;
            }
            if(reqs[array_stack[0]].wild != undefined) {
                if(reqs[array_stack[0]].wild != 0) {
                    reqs[array_stack[0]].wild++;
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
                    add();
                } else {
                    array_stack[0]++;
                    reqs.push({
                        "equiv":newprops.bool,
                        wild = 1;
                    });
                }
            }
            else {
                add(exp[n]);
            }
            n++;
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
        console.error(`Uncaught SyntaxError: Invalid PolyString pattern |${pattern}|: ${error}`);
        return error;
    },
    "version":"1.1"
}
