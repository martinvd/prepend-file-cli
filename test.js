'use strict';

const fs = require('fs');

const assert = require('assert');
const execa = require('execa');

describe('Prepend to file', () => {
	const testfile = '.temp1';

	after(cb => fs.unlink(testfile, cb));

	it('Should create an empty file and have content added', cb => {
		execa('node', ['cli.js', testfile, 'Hello']).then(() => {
			let fileData = fs.readFileSync(testfile).toString();
			assert.strictEqual(fileData, 'Hello');
			cb();
		});
	});

	it('Should prepend data to a non empty file', cb => {
		execa('node', ['cli.js', testfile, 'What']).then(() => {
			let fileData = fs.readFileSync(testfile).toString();
			assert.strictEqual(fileData, 'WhatHello');
			cb();
		});
	});

	it('Should accepts buffers', cb => {
		let buf = new Buffer('abc', 'utf8');
		execa('node', ['cli.js', testfile, buf]).then(() => {
			let fileData = fs.readFileSync(testfile).toString();
			assert.strictEqual(fileData, 'abcWhatHello');
			cb();
		});
	});

	it('Should accepts numbers', cb => {
		let number = 220;
		execa('node', ['cli.js', testfile, number]).then(() => {
			let fileData = fs.readFileSync(testfile).toString();
			assert.strictEqual(fileData, '220abcWhatHello');
			cb();
		});
	});
});
