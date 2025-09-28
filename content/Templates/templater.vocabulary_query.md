<%*
const dv = this.app.plugins.plugins["dataview"].api;

const query = `
TABLE ("**Speech:** " + speech + "<br/>**Meaning:** " + definition + "<br/>**Example:** " + sentences) AS "Definition"
from #vocabulary
WHERE !icontains(file.name, "vocabulary_template")
sort date desc
`

const result = await dv.queryMarkdown(query);

if ( result.successful ) {
 tR += result.value
} else {
  tR += "~~~~\n" + result.error + "\n~~~~"
}
%>