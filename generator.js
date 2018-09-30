const {renderTemplateFile } = require('template-file');
const fs = require('fs');
const data = {
    masterUrl:'https://lonelystar.cf',
    linkCss:'https://rawgit.com/ginneversmile/chat.embed.js/master/chat.embed.css',
    linkFontawesome:'https://helpdesk.inet.vn/public/css/libs/font-awesome.css'
}
renderTemplateFile('./rawfile.txt',data)
    .then(resp=>{
        fs.writeFileSync('./chat.embed.js',resp);
    })