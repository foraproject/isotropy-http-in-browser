/* @flow */

const assign = function(target: Object, name: string, source: Object, required: boolean) {
    required = isDefined(required) ? required : true;
    if (isDefined(source[name])) {
        target[name] = source[name];
    } else {
        if (required) {
            throw new Error(name + " is required to make a native target.");
        }
    }
};

const printNotImplemented = function(method: string) {
    console.log(`The method or property ${method} is not implemented on the client.`);
};

export default {
    isDefined,
    assign,
    printNotImplemented
};
