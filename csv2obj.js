// Arran Bishop (@UnrealSec)
// https://github.com/UnrealSecurity

function csvToObject(text) {
    let lines = text.split(/\r|\n/);
    let obj = [];
    let headers = [];

    lines.forEach((line, j)=>{
        let state = 0;
        let temp = [];
        let row = [];

        for (let i=0; i<line.length; i++) {
            let c = line[i];
            
            if (state == 0) {
                if (c == '"') {
                    state = 1;
                } else if (c == ',') {
                    row.push(temp.join(''));
                    temp = [];
                } else {
                    temp.push(c);
                }
            } else if (state == 1) {
                if (c == '"') {
                    state = 0;
                    if (temp.length > 0) {
                        row.push(temp.join(''));
                        temp = [];
                    }
                } else if (c == '\\' && (i==0 || (i > 0 && line[i-1] != '\\')) && i != line.length-1) {
                    let e = line[i+1];
                    if (e == 'n') {
                        temp.push('\n');
                        i+=1;
                    } else if (e == 't') {
                        temp.push('\t');
                        i+=1;
                    } else if (e == 'r') {
                        temp.push('\r');
                        i+=1;
                    } else if (e == '"') {
                        temp.push('"');
                        i+=1;
                    }
                } else {
                    temp.push(c);
                }
            }
        }
        
        if (j == 0) {
            headers.push(...row);
        } else {
            if (headers.length == row.length) {
                let o = {};
                for (let k=0; k<row.length; k++) {
                    let cell = row[k];
                    
                    if (cell.length == 0) {
                        cell = null;
                    } else if (!isNaN(cell)) {
                        cell = Number(cell);
                    }
                    
                    o[headers[k]] = cell;
                }
                obj.push(o);
            }
        }
    });

    return obj;
}

if (typeof(module) != 'undefined') module.exports = csvToObject;
