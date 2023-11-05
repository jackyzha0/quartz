# Thoughts
A collection of all my thoughts scattered around my obsidian vault
```dataviewjs
function isThisFile(file) {
	// dv.paragraph(file.name)
	if (file.name == "Thoughts.md" || file.name == "Home.md") {
		return true;
	}
	else return false;

}

let folderChoicePath = ""
const files = app.vault.getMarkdownFiles()
	.filter(file => file.path.includes(folderChoicePath))
	.filter(file => !isThisFile(file))

let arr = files.map(async(file) => { 
    const content = await app.vault.cachedRead(file) 
    let lines = await content.split("\n").filter(line => line.includes("#想法")) 
    //console.log(lines) 
    return [dv.fileLink(file.name.split(".")[0], false, file.name.split(".")[0]), lines] 
    // return [dv.fileLink(file.name.split(".")[0], false, moment(file.name.split(".")[0], "YYYY年MM月DD日").format("M月D日")), lines] 
}) 

Promise.all(arr).then(values => { 
    const beautify = values.map(value => { 
        const temp = value[1].map(line => { return line.slice(4,) }) //美化要重写
        return [value[0],temp] 
    }) 
    const exists = beautify.filter(value => value[1][0] && value[0] != "[[未命名 10]]").slice(0,7).sort().reverse()
    dv.table(["文件", "想法"], exists)
})
```
