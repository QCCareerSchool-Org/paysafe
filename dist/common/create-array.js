"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createArray(resArr, ClassName) {
    const newArr = [];
    for (let i = 0, len = resArr.length; i < len; i++) {
        if (resArr[i]) {
            var obj = new ClassName(resArr[i]);
            newArr.push(obj);
        }
    }
    return newArr;
}
exports.createArray = createArray;
