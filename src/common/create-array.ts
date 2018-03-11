export function createArray<T>(resArr: T[], ClassName: { new(obj: T): T }): T[] {
  const newArr = [];
	for (let i = 0, len = resArr.length; i < len; i++) {
		if (resArr[i]) {
			var obj = new ClassName(resArr[i]);
			newArr.push(obj);
		}
	}
	return newArr;
}
