import { validateRequest } from "middlewares"


export function addMiddlewareToValidator(validators: any) {
	for (let key in validators) {
		validators[key] = [...validators[key], validateRequest]
	}

	return validators
}

export function empty(val: any) {
	if (val === undefined) return true

	if (
		typeof val == 'function' ||
		typeof val == 'number' ||
		typeof val == 'boolean' ||
		Object.prototype.toString.call(val) === '[object Date]'
	)
		return false

	if (val == null || val.length === 0) return true

	if (typeof val == 'object') {
		var r = true

		for (var f in val) r = false
		return r
	}

	return false
}

export function notEmpty(val: any) {
	return !empty(val)
}

export function convertQueryObjToObj(queryObj: any) {
	const keyValues = Object.keys(queryObj).map(key => {
		const newKey = key.substring(key.indexOf('.') + 1)

		return { [newKey]: queryObj[key] }
	})

	return Object.assign({}, ...keyValues)
}
