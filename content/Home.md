---
banner: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5"
banner_y: 1
banner_icon: 🌳
banner_lock: true
---
# HOME

>[!quote] Work harder

## 任务 TASKS 
```tasks
not done
due after 5 days ago
due before in three weeks
sort by priority
sort by due
sort by path
```
## 最近修改 RECENTLY MODIFIED
```dataview

TABLE WITHOUT ID
	link(file.name) as "文件",
	creation_date AS "创建时间",
	tags AS "标签"
FROM "" AND !"Templates" AND !"Journal"
WHERE file != this.file
SORT file.mtime desc
LIMIT 5
```

## 想法 THOUGHTS
```dataviewjs
function isThisFile(file) {
	// dv.paragraph(file.name)
	if (file.name == "Home.md" || file.name == "Thoughts.md") {
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
## 日记 DAILY NOTES (list of daily notes)
```dataview
TABLE WITHOUT ID
	link(file.name) as "日期",
	摘录 AS "🌄",
	鸟崽 AS "🐥",
	运动 AS "🏃‍♂️",
	邮件 AS "💌",
	写作 AS "📝",
	心情 AS "👾",
	总结
	FROM "01 - Journal" 
	SORT file.name DESC
	LIMIT 7
```
## 热图 HEATMAPS

```dataviewjs
dv.span("** 🏀 锻炼 Exercise 💪 **") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */ 
const calendarData = { year: 2023, // (optional) defaults to current year 
	colors: { // (optional) defaults to green 
		blue: ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"], // first entry is considered default if supplied 
		green: ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"], 
		red: ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"], 
		orange: ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"], 
		pink: ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"], 
		orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"] 
	}, 
	showCurrentDayBorder: true, // (optional) defaults to true 
	defaultEntryIntensity: 4, // (optional) defaults to 4 
	intensityScaleStart: 10, // (optional) defaults to lowest value passed to entries.intensity 
	intensityScaleEnd: 100, // (optional) defaults to highest value passed to entries.intensity 
	entries: [], // (required) populated in the DataviewJS loop below 
} 

//DataviewJS loop 
for (let page of dv.pages('"Journal"').where(p => p.exercise)) { 
	//dv.span("<br>" + page.file.name) // uncomment for troubleshooting 
	calendarData.entries.push({ 
		// (required) Format YYYY-MM-DD 
		date: moment(page.file.name.split(".")[0], "YYYY年MM月DD日").format("YYYY-MM-DD"), 
		// (required) the data you want to track, will map color intensities automatically 
		intensity: page.exercise, 
		// (optional) Add text to the date cell 
		// content: "🏋️", 
		// (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used 
		color: "green", 
		}) 
	} 
	
renderHeatmapCalendar(this.container, calendarData) 
```

```dataviewjs
dv.span("** 📚 读书 📚 **") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */ 
const calendarData = { year: 2023, // (optional) defaults to current year 
	colors: { // (optional) defaults to green 
		// first entry is considered default if supplied 
		blue: ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"], 
		green: ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"], 
		red: ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"], 
		orange: ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"], 
		pink: ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"], 
		orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"] 
	}, 
	showCurrentDayBorder: true, // (optional) defaults to true 
	defaultEntryIntensity: 4, // (optional) defaults to 4 
	intensityScaleStart: 10, // (optional) defaults to lowest value passed to entries.intensity 
	intensityScaleEnd: 100, // (optional) defaults to highest value passed to entries.intensity 
	entries: [], // (required) populated in the DataviewJS loop below 
} 

//DataviewJS loop 
for (let page of dv.pages('"Journal"').where(p => p.reading)) { 
	//dv.span("<br>" + page.file.name) // uncomment for troubleshooting 
	calendarData.entries.push({ 
		// (required) Format YYYY-MM-DD 
		date: moment(page.file.name.split(".")[0], "YYYY年MM月DD日").format("YYYY-MM-DD"),
		// (required) the data you want to track, will map color intensities automatically 
		intensity: page.reading, 
		// (optional) Add text to the date cell 
		// content: "🏋️", 
		// (optional) Reference from *calendarData.colors*. If no color is supplied; colors[0] is used 
		color: "green", 
		}) 
	} 
	
renderHeatmapCalendar(this.container, calendarData) 
```

## OBSIDIAN ACTIVITY
```dataviewjs

let ftMd = dv.pages("").file.sort(t => t.cday)[0]
let total = parseInt([new Date() - ftMd.ctime] / (60*60*24*1000))
let totalDays = "您已使用 *Obsidian* "+total+" 天，"
let nofold = '!"misc/templates"'
let allFile = dv.pages(nofold).file
let totalMd = "共创建 "+
	allFile.length+" 篇笔记"
let totalTag = allFile.etags.distinct().length+" 个标签"
let totalTask = allFile.tasks.length+"个待办。 "
dv.span(totalDays+totalMd+"、"+totalTag+"、"+totalTask)

```

## Main Pages
[[Bookmarks]]
[[Thoughts]]
## TAGS
本Vault所有的TAGs
```dataviewjs


```
```dataviewjs
let nofold = '!"Templates"'
let allFile = dv.pages(nofold).file
let tags = allFile.etags.distinct()
let tagsString = ""
for (let tag of tags) {
	tagsString += tag
}
dv.span(tagsString)
```

- #任务 - 实现 tasks 插件功能
- #工作 - 赚钱/工作有关的笔记
- #想法 - 有一些特别的想法，在 [[Thoughts]]显示所有的想法
- #TODO - 一些笔记任务
- #笔记 - 普通/学习有关的笔记
- #日记 - 日记 Daily Note 笔记
- #生活 - 生活有关的笔记（旅行计划，学习/工作计划， 等等）

