
var vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let getCurrentDate = vscode.commands.registerCommand('getCurrentDate', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let start = new vscode.Position(0, 0);
		let end = new vscode.Position(document.lineCount + 1, 0);
		// console.log(editor.document.getText())

		let text = document.getText();
		text = text.replace(/\r|\n/ig, "");
		text = text.replaceAll(" ", "");
		text = text.replaceAll("00:00:00", " 00:00:00");

		editor.edit(editBuilder => {
			// editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), text);
			editBuilder.replace(new vscode.Range(start, end), text);
		});
		vscode.window.showInformationMessage("格式化成功!");
	});

	context.subscriptions.push(getCurrentDate);


	let format = vscode.commands.registerCommand('format', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let start = new vscode.Position(0, 0);
		let end = new vscode.Position(document.lineCount + 1, 0);
		// console.log(editor.document.getText())

		let text = document.getText();
		text = text.replaceAll('\\"', '"');
		text = text.replaceAll('"{', '{');
		text = text.replaceAll('}"', '}');

		editor.edit(editBuilder => {
			// editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), text);
			editBuilder.replace(new vscode.Range(start, end), text);
		});
		vscode.window.showInformationMessage("格式化成功!");
	});

	context.subscriptions.push(format);

	let batch_sql_beauty = vscode.commands.registerCommand('batch_sql_beauty', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let start = new vscode.Position(0, 0);
		let end = new vscode.Position(document.lineCount + 1, 0);
		// console.log(editor.document.getText())

		let text = document.getText().split("\n").map((str) => {
			let matchedResults = str.match(/=\s*"[^"]*"/g);
			matchedResults?.forEach((s1) => {
				let s2 = s1.replace(/\s+/g, "");
				str = str.replace(s1, s2);
			});
			return str;
		}).join("");

		editor.edit(editBuilder => {
			editBuilder.replace(new vscode.Range(start, end), text);
		});
		vscode.window.showInformationMessage("格式化成功!");
	});

	context.subscriptions.push(batch_sql_beauty);

	let to_json_list = vscode.commands.registerCommand('to_json_list', function () {
		let editor = vscode.window.activeTextEditor;
		let document = vscode.window.activeTextEditor.document;
		let start = new vscode.Position(0, 0);
		let end = new vscode.Position(document.lineCount + 1, 0);
		// console.log(editor.document.getText())

		let text = document.getText().split("\n")
			.filter(str => str.trim() !== '') // 过滤掉空行
			.map((str) => `"${str.trim()}"`) // 去掉前后的空格并加双引号
			.join(",\n"); // 逗号和换行

		text = `[\n${text}\n]`; // 生成JSON数组

		editor.edit(editBuilder => {
			editBuilder.replace(new vscode.Range(start, end), text);
		});
		vscode.window.showInformationMessage("格式化成功!");
	});

	context.subscriptions.push(to_json_list);

}

module.exports = {
	activate
}
