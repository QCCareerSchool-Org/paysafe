"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArray = void 0;
function createArray(resArr, ClassName) {
    const newArr = [];
    for (let i = 0, len = resArr.length; i < len; i++) {
        if (resArr[i]) {
            const obj = new ClassName(resArr[i]);
            newArr.push(obj);
        }
    }
    return newArr;
}
exports.createArray = createArray;
