var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var PdfPrinter = require('pdfmake');
var fs = require('fs');
var reporting =require('./reporting');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

function createPdfBinary(docDefinition, callback) {
	var fonts = {
		Roboto: {
			normal: path.join(__dirname, './fonts/Roboto-Regular.ttf'),
			bold: path.join(__dirname, './fonts/Roboto-Medium.ttf'),
			italics: path.join(__dirname, './fonts/Roboto-Italic.ttf'),
			bolditalics: path.join(__dirname, './fonts/Roboto-MediumItalic.ttf')
		}
	};

	//pdfmake.setFonts(fonts);

    var printer = new PdfPrinter(fonts);
	var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    pdfDoc.end();
	//pdf.getDataUrl(callback);
}
var docDefinition = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
};
var content={
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "hello"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "hello 2"
          }
        ]
      }
    ]
  };

app.get('/pdf', function (req, res) {
	eval(req.body.content);
    var def=reporting.reporting(content);
    
	createPdfBinary(def[0].content, function (binary) {
		res.contentType('application/pdf');
		res.send(binary);
	}, function (error) {
		res.send('ERROR:' + error);
	});

});

var server = http.createServer(app);
var port = process.env.PORT || 1234;
server.listen(port);

console.log('http server listening on port %d', port);
console.log('dev-playground is available at http://localhost:%d', port);