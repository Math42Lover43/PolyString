var PolyString = {
    "compile": function(exp) {
        var reqs = []; // format: characters: {[index, identifiers*], allowed characters, bool}; multitudes: {ands, multitude strings, identifier}
        var n = 0;
        var newprops = {"bool": true,"escaped":false};
        while(n < exp.length) {
            
            n++;
        }
        return reqs;
    },
    "error": function(type,arg){
        var error;
        var name = "Syntax";
        if(type == "quantifier") {
            error = "Quantifier tokens require a left-hand side";
        }
        if(type == "unmatched") {
            error = "Unmatched '" + arg + "'";
        }
        if(type == "unexpected") {
            error = "Unexpected token '" + arg + "'";
        }
        if(type == "badend") {
            error = "Unexpected end of pattern";
        }
        if(type == "noset") {
            error = "Set '" + arg + "' does not exist";
        }
        if(type == "@") {
            error = "Nothing to reference";
        }
        if(type == "stack") {
            error = "Maximum call stack size exceeded";
            name = "Range";
        }
        console.error("Uncaught " + name + "Error: Invalid PolyString pattern: " + error);
        return error;
    },
    "version":"1.1"
}
