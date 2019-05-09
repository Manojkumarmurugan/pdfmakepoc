var PDFDocument = require('pdfkit');
var fs = require("fs");
const util = require('./util.js');
const fileSystem = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
var cors = require('cors');
const expr = require('expression-eval');
let currentNode = {};
const PdfDocument = require('pdfkit');
var PdfTable = require('voilab-pdf-table');


const port = 3001;
let headings = {
	1: {},
	2: {},
	3: {}
};

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res) => res.send("Hello World!"));

app.get('/pdf1',(req,res) => {
 
	generateDoc(res)
	
});

app.get('/pdf',(req,res)=>{
	generateDoc(req.body, res)
	var filePath = path.join(__dirname, 'output.pdf');
    var stat = fileSystem.statSync(filePath);
    
    res.writeHead(200, {
        'Content-Type': 'application/pdf', 
        'Content-Length': stat.size
    });
    
    var readStream = fileSystem.createReadStream(filePath);
    readStream.on('data', function(data) {
        res.write(data);
    });
    
    readStream.on('end', function() {
        res.end();        
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var document = {"type":"doc",
				"content":[{"type":"boring_paragraph",
							"content":[
								{"type":"text","text":"This paragraph is ,boring, it can't have anything."}
							]
							},
							{"type":"paragraph",
							"content":[
								{"type":"text",
								"text":"Press ctrl/cmd-space to insert a star, ctrl/cmd-b to toggle shouting, and ctrl/cmd-q to add or remove a link."}
									]
							}
						]
	};


util.store(document);
function generateDoc(response) {
	var document = {
		"type": "doc",
		"content": [
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "kjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkhkjfsdhjfdjfdhfjkh"
					}
				]
			},
			{
				"type": "ordered_list",
				"attrs": {
					"class": "lower-alpha"
				},
				"content": [
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "Text"
									}
								]
							}
						]
					},
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "Text 2"
									}
								]
							},
							{
								"type": "ordered_list",
								"attrs": {
									"class": "custom-number"
								},
								"content": [
									{
										"type": "list_item",
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "Inner text 1"
													}
												]
											}
										]
									},
									{
										"type": "list_item",
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "Inner text 2"
													}
												]
											},
											{
												"type": "ordered_list",
												"attrs": {
													"class": "lower-roman"
												},
												"content": [
													{
														"type": "list_item",
														"content": [
															{
																"type": "paragraph",
																"content": [
																	{
																		"type": "text",
																		"text": "Inner Inner text i"
																	}
																]
															}
														]
													}
												]
											}
										]
									},
									{
										"type": "list_item",
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "Inner text 3"
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "Text 3"
									}
								]
							},
							{
								"type": "ordered_list",
								"attrs": {
									"class": "lower-roman"
								},
								"content": [
									{
										"type": "list_item",
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "Inner text i"
													}
												]
											}
										]
									},
									{
										"type": "list_item",
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "Inner text ii"
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	};
	const doc = new PDFDocument;
    const table = new PdfTable(doc, {
				bottomMargin: 30,
				leftMargin: 2000
		});
		const maxWidth = table.pdf.page.width - table.pdf.page.margins.left - table.pdf.page.margins.right;
	var handleContent = (doc, content) => {
		switch(content.type) {
			case 'text' :
				handleText(doc, content);
				break;
			case 'paragraph': {
				handleParagraph(doc, content);
				break;
			}
			case 'formula': {
				handleFormula(doc, content);
				break;
			}
			case "heading": {
				handleHeading(doc, content);
                break;
			}
      case "table": {
        handleTable(doc, content);
      }
      case "bullet_list" :
      case "ordered_list":
            var result =[];
						result = handleBullet(doc, content, 0);
						renderBullet(result,maxWidth);
						// console.log(result);
		}
	}
	
	const handleFormula = (doc, content) => {
		currentNode = content;
		if(!content.content) {
			return;
		}
		const d = content.content[0].text;
		//console.log(document.state)
		const ast = expr.parse(d); // abstract syntax tree (AST)
		const value = expr.eval(ast, document.state); 
		content.content[0].text = value;
		handleText(doc, content.content[0], false);
	}
	const handleHeading= (doc, content) => {
		const level = content.attrs.level;
		currentNode = content;
		if(level <= 3) {
			if(level === 1) {
				headings = {
					1: content,
					2: {},
					3: {}
				}
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(12)
			} else if(level === 2) {
				headings = {
					1: headings[1],
					2: content,
					3: {}
				}
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(10)
			} else if(level === 3) {
				headings = {
					1: headings[1],
					2: headings[2],
					3: content
				}
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(8.5)
			}
		}
		
		if(content.content) {
			doc
			.text(content.content[0].text, {continued: false});
			doc.fontSize(10)
			.text(' ', {continued: false});
		}
	}
	var handleText = (doc, content, continued) => {
		currentNode = content;
		if(content.marks && content.marks.length > 0) {
			if(content.marks[0].type === 'shouting') {
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(10)
			} else {
				return;
			}
		} else {
			doc.font('fonts/HelveticaNeueLTStd-Lt.otf')
			.fontSize(8.5)
		}
		doc
			.text(content.text, {continued});
		if(!continued) {
			doc.fontSize(8.5)
			.text(' ', {continued: false});
		}
	}
	var handleParagraph =(doc, content) => {
		currentNode = content;
		if(!currentNode.content) {
			doc.fontSize(25)
			.text(' ', {continued: false});
			return;
		}
		currentNode.content.map((content, index) => {
			switch(content.type) {
				case 'text': 
					handleText(doc, content, currentNode.content.length - 1 > index)
					break;
				
				case 'star': 
					//doc.image('star.png', {width: 15, height: 15, continued: doct.content.length - 1 > index})
					break;
				case "formula":
					handleFormula(doc, content)
					break;
				
			}
		})
	}
  const handleTable = (doc, content) => {

        const tableContent = content.content.reduce((tableData, tableItem) => {

            if(tableItem.content.length > 0) {
                if(tableItem.content[0].type === 'table_header') {
                    let columns =  tableItem.content.map((rowItem, rowIndex) => {
                        let row = rowItem.content.map(rowContent => rowContent.content[0].text).join(' ');
                        return row;
                    });
                    tableData.columns = columns;
                } else {
                    let row = tableItem.content.reduce((rowContent, rowItem, rowIndex) => {
                        const cell = rowItem.content.map(rowContent => rowContent.content[0].text).join(' ');
                        rowContent[tableData.columns[rowIndex]] = cell;
                        return rowContent;
                    }, {});
                    tableData.data.push(row);
                }
            }
            return tableData;
        }, {columns: [], data: []});
        const maxWidth = table.pdf.page.width - table.pdf.page.margins.left - table.pdf.page.margins.right;
        let columns = tableContent.columns.map(column => ({id: column, header: column, width: maxWidth/tableContent.columns.length }));
        table
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'center',
                padding: [10]
            })
            .addColumns(columns)
            
            table.addBody(tableContent.data)
        //console.log(content);
	}
	/**
	 * let columns = [0,1];
			  const maxWidth = table.pdf.page.width - table.pdf.page.margins.left - table.pdf.page.margins.right;
				let header = columns.map(column => ({id: column, header: '',width:80}));
				//console.log(header);
				table
				.setColumnsDefaults({
						align: 'left',
						padding :[5]
				})
				.addColumns([
					{id: '0', header: '',width:30,align: 'justify'},
					{id: '1', header: '',width:440,align: 'justify'}
				]);
				//.addColumns(header);
				table.addBody(bulletContent);
	 */
	
	const renderBullet = (content,width) => {
		let columns = [0,1];
		table
				.setColumnsDefaults({
						align: 'left',
						padding :[5]
				})
				.addColumns([
					{id: '0', header: '',width:30,align: 'justify',x:'1000',y:1000},
					{id: '1', header: '',width:440,align: 'justify',x:1000,y:1000}
				]);
				for(var i=0;i<content.length;i++){
						if(!Array.isArray(content[i])){
							table.addBody([content[i]]);
						}
						else{
							renderBullet(content[i],width/2);
						}
				}
	} 
  const handleBullet = (doc, content, level) => {
    let bulletContent = content.content.reduce((bulletData, bulletItem, bulletIndex) => {
      var i=0;
      if(bulletItem.content.length<=1){
        var rows = bulletItem.content.map(rowContent => rowContent.content[0].text).join(' ');
        var rowData = {}; 
        if(content.attrs.class!=undefined)
            rowData[i] = bulletUtil((bulletIndex+1),content.attrs.class);
        else
            rowData[i]  = '-';
				rowData[++i] = rows;
        bulletData.push(rowData);
      }
      else{
        bulletItem.content.map((element,index) => {
            if(element.type==='paragraph'){
              var rows = element.content.map(rowContent => rowContent.text).join(' ');
              var rowData = {}; 
              if(content.attrs.class!=undefined)
                  rowData[i] = bulletUtil((bulletIndex+1),content.attrs.class);
              else
                  rowData[i]  = '-';
							rowData[++i] = rows;
              bulletData.push(rowData);
            }
            else if (element.type === 'ordered_list' || element.type  === 'bullet_list'){
              result = handleBullet(doc,element,level+1);
              bulletData.push(result);
            }
        });
      }
      return bulletData;
    },[]);
       return bulletContent;    
  }
		
		const bulletUtil = (number, bulletType) => {
			var bullet = '';
			switch (bulletType) {
				case 'lower-alpha': {
					bullet = alphaCharacterUtil(number)+')';
					break;
				}
				case 'upper-alpha': {
					bullet = (alphaCharacterUtil(number).toUpperCase())+')';
					break;
				}
				case 'upper-alpha-with-dot': {
					bullet = (alphaCharacterUtil(number).toUpperCase())+'.';
					break;
				}
				case 'lower-roman': {
					bullet = '('+romanCharacterUtil(number)+')';
					break;
				}
				case 'custom-number': {
					bullet = '('+number+')';
					break;
				}
				default:{
					bullet='-';
					break;
				}
			}
			 return bullet;
		}
		
		const alphaCharacterUtil = (number) => {
				var baseChar = 97;//('a').charCodeAt(0);
				var letter = '';
				do {
						number -= 1;
						letter = String.fromCharCode(baseChar + (number%26))+letter;
						number = (number / 26) >> 0;
				}while (number > 0);
			return letter;
		}
		
		const romanCharacterUtil = (number) => {
			if (!+number)
				return false;
			var	digits = String(+number).split(""),
			key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
				"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
				"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
			roman = "",
			i = 3;
			while (i--)
				roman = (key[+digits.pop() + (i * 10)] || "") + roman;
			return (Array(+digits.join("") + 1).join("M") + roman).toLowerCase();
		}

	doc.pipe(response);
	//console.log(response);
	doc.on('pageAdded', () => {
		if(headings[1].content) {
			if(!(currentNode === headings[1]) )
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(12).text(headings[1].content[0].text+ "(Continued)")
			
		}
		if(headings[2].content) {
			if(!(currentNode === headings[2]) )
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(10).text(headings[2].content[0].text+ "(Continued)")
			
		}
		if(headings[3].content) {
			if(!(currentNode === headings[3]) )
				doc.font('fonts/HelveticaNeueLTStd-Md.otf')
				.fontSize(8.5).text(headings[3].content[0].text+ "(Continued)")
			
		}
	});

	document.content.map(content => {
		handleContent(doc, content)
	});

	doc.end();
}