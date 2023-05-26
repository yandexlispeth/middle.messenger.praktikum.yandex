
function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {

    if (a === null || b === null) {
        return false;
    }

    for (const [key, value] of Object.entries(a)) {
        // eslint-disable-next-line no-prototype-builtins
        if (!b.hasOwnProperty(key)) {
            return false;
        }

        const value_b = b[key];

        if (value === void 0 && value_b === void 0) {
            return true;
        }

        if(value === null && value_b === null) {
            return true;
        }

        if(value === undefined || value_b === undefined) {
            continue;
        }


        if(value.length !== value_b.length) {
            return false;
        }

        if ((value.toString()) === "[object Object]" && (value_b.toString()) === "[object Object]") {
            return isEqual(value, value_b);
        }
        if (value instanceof Array && value_b instanceof Array) {
            for(let i = 0; i < value.length; i++) {
                if (value[i] !== value_b[i]) {
                    return false;
                }
            }
            return true;
        }

        if (value !== value_b) {
            return false;
        }
    }
    return true;
}

export default isEqual;
