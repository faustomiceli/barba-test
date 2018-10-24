module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    },
	"globals": {
		"$Y": true,
		"yTos": true,
		"tc_vars": true
	},
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
    "parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 2017
    },
	"rules": {
		"no-cond-assign": [2,"always"],
		"no-console": 1,
		"no-constant-condition": 2,
		"no-debugger": 1,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty": 1,
		"no-extra-semi": 1,
		"no-func-assign": 1,
		"no-unreachable": 1,
		"valid-typeof": 2,
		"curly": [1,"all"],
		"no-alert": 2,
		"no-caller": 1,
		"no-eval": 2,
		"no-proto": 1,
		"no-redeclare": 1,
		"no-return-assign": 1,
		"no-undef": 1,
		"no-undefined": 1,
		"no-unused-vars": 1,
		"no-use-before-define": 1,
		"array-bracket-spacing": [1,"never",{}],
		"comma-spacing": [1,{"after":true}],
		"computed-property-spacing": 1,
		"eol-last": 1,
		"lines-around-comment": [1,{"beforeBlockComment":false,"afterBlockComment":true,"beforeLineComment":true}],
		"new-cap": 1,
		"no-lonely-if": 1,
		"no-mixed-spaces-and-tabs": 1,
		"no-multiple-empty-lines": 1,
		"no-spaced-func": 1,
		"no-trailing-spaces": 1,
		"quotes": [1,"single","avoid-escape"],
		"space-infix-ops": 1,
		"arrow-spacing": [1,{"before":true,"after":true}],
		"constructor-super": 1
	}
};
