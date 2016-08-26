#!/usr/bin/env node
'use strict';

const prependFile = require('prepend-file');
const argv = require('minimist')(process.argv.slice(2));

const filename = argv._[0] || '';
const data = argv._[1] || '';

prependFile(filename, data, err => {
	if (err) {
		if (err.message) {
			console.error(err.message);
			process.exit(1);
		} else {
			throw err;
		}
	}
});
