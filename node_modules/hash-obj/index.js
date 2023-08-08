import crypto from 'crypto';
import isObject from 'is-obj';
import sortKeys from 'sort-keys';

export default function hashObject(object, {encoding = 'hex', algorithm = 'sha512'} = {}) {
	if (!isObject(object)) {
		throw new TypeError('Expected an object');
	}

	if (encoding === 'buffer') {
		encoding = undefined;
	}

	return crypto
		.createHash(algorithm)
		.update(JSON.stringify(sortKeys(object, {deep: true})), 'utf8')
		.digest(encoding);
}
