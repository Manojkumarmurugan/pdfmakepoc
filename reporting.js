const reporting = (content) => {
const handleContent = (content) => {
    var result=[];
        switch(content.type) {
        case 'text' :
            result =  handleText(content);
            break;
        case 'paragraph': {
            result = handleParagraph(content);
            break;
        }
        case 'formula': {
            result = handleFormula(content);
            break;
        }
        case "heading": {
            result =handleHeading(content);
            break;
        }
        case "table": {
            result=handleTable(content);
            break;
        }
        case "bullet_list" :
        case "ordered_list":
            result=handleBullet(content);
        }
        return result;
    }
    var contentResult=content.content.map(content => {
		return handleContent(content);
    });
    
    return contentResult;
}

const handleText = (content) =>{
    var dd = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    }
    return dd;
}

const handleParagraph = (content) => {
    var dd = {
        content:[]
    }
    var i=0;
    var paraContent=content.content.map((content,index) =>{
        dd.content.push(content.text);
    });
    return dd;
}

module.exports ={
    reporting : reporting
}