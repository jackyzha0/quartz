.theme-light
{
  --background-primary: #FBFBFB;
  --background-primary-alt: #FBFBFB;
  --background-secondary: #FBFBFB;
  --background-secondary-alt: #2E3236;
  --text-normal: #333;
  --text-faint: #B2B2B2;
  --text-title-h1: #333;
  --text-title-h2: #333;
  --text-title-h3: #333;
  --text-title-h4: #333;
  --text-title-h5: #333;
  --text-link: #B4B4B4;
  --text-a: #db4d52;
  --text-a-hover: #db4d52;
  --text-mark: #D3FFA4;
  --pre-code: #FFFFFF;
  --interactive-accent: #92A1A1;
  --interactive-before: #5e6565;
  --background-modifier-border: #92a1a17a;
  --blockquote-border: #D6555F;
  --tag-background: #A7B0B3;
  --interactive-accent-rgb: #db4d52;
  --font-family-editor: Avenir, "Avenir Next";
  --font-family-preview: Avenir, "Avenir Next";
}

.theme-dark
{
  --background-primary: #1E2022;
  --background-primary-alt: #1E2022;
  --background-secondary: #1E2022;
  --background-secondary-alt: #2E3236;
  --text-normal: #DDDDDD;
  --text-faint: #B2B2B2;
  --text-title-h1: #CBDBE5;
  --text-title-h2: #CBDBE5;
  --text-title-h3: #CBDBE5;
  --text-title-h4: #CBDBE5;
  --text-title-h5: #CBDBE5;
  --text-link: #B4B4B4;
  --text-a: #6BCAFB;
  --text-a-hover: #6BCAFB;
  --text-mark: #263D92;
  --pre-code: #252525;
  --interactive-accent: #92A1A1;
  --interactive-before: #5e6565;
  --background-modifier-border: #92a1a17a;
  --blockquote-border: #4AA8FB;
  --tag-background: #A7B0B3;
  --interactive-accent-rgb: #6BCAFB;
  --font-family-editor: Avenir, "Avenir Next";
  --font-family-preview: Avenir, "Avenir Next";
}


#graph-view-canvas .links
{
  stroke: var(--interactive-accent-rgb) !important;
}

strong,
.cm-strong
{
  color: var(--tax-normal);
  font-weight: 900 !important;
}

em {
  color: var(--tax-normal);
}

s {
  color: var(--tag-background);
}

mark
{
  background-color: var(--text-mark) !important;
  color: var(--text-normal);
  padding: 2px 3px 2px 3px;
}

/**********************/
/* links and brackets */
/**********************/

/* link */
a,
.internal-link,
.cm-hmd-internal-link,
.cm-link,
.cm-formatting-link
{
  color: var(--text-a) !important;
  text-decoration: none !important;
  font-family: var(--font-family-preview) !important;
}

a.view-action
{
  color: var(--text-faint) !important;
}

/* link hover color */
a:hover,
.internal-link:hover
{
  color: var(--text-a-hover) !important;
  text-decoration: none !important;
}

/* make external links italics to differentiate */
a:not(.internal-link) {
  font-style: italic;
}

/* blockquote */
.cm-quote /* for editor */
{
  color: var(--text-normal) !important;
}

blockquote /* for preview */
{
  border-color: var(--blockquote-border) !important;
  border-top-width: 0px !important;
  border-bottom-width: 0px !important;
  border-right-width: 0px !important;
  border-left-width: 2px !important;
}

/* icons at top of panes*/
.file-view-actions a
{
  color: var(--text-faint) !important;
}

.file-view-actions a:hover
{
  color: var(--text-normal) !important;
}

/* make it clear when a pane is pinned */
.view-action.mod-pin-leaf.is-active
{
  color: var(--text-a) !important;
}

/* editor markdown wrapping colors */
.cm-tag,
.cm-strikethrough,
.cm-formatting-strong,
.cm-formatting-em,
.cm-formatting-code
{
  color: var(--text-faint) !important;
}

/* editor list characters */
.cm-formatting-list
{
  color: var(--blockquote-border) !important;
}

/************************************/
/* lists  in preview (h/t @deathau) */
/************************************/

/* bullet lists */
ul { list-style: none; }
li > p {
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0;
}

ul li:not(.task-list-item)::before {
    content: "•";
    color: var(--blockquote-border);
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    padding:0;
    font-weight: bold;
    text-shadow: 0 0 0.5em var(--accent-2);
}
ul ul li:not(.task-list-item)::before {
    content: "•"
}
ul ul ul li:not(.task-list-item)::before {
    content: "•"
}

/* numbered lists */
ol {list-style: none; counter-reset: li}
ol > li {
    counter-increment: li;
}
ol > li:not(.task-list-item)::before,
ul ol > li:not(.task-list-item)::before,
ul ul ol > li:not(.task-list-item)::before,
ul ul ul ol > li:not(.task-list-item)::before {
    content: "." counter(li);
    color:  var(--blockquote-border);
    font-weight:normal;
    display: inline-block;
    width: 1em;
    margin-left: -1.5em;
    margin-right: 0.5em;
    text-align: right;
    direction: rtl;
    word-wrap: none;
    overflow: visible;
    word-break: keep-all;
}

/* task lists! (I'm proud of this, but could use improvement) */
.markdown-preview-view .task-list-item-checkbox {
    -webkit-appearance: none;
    box-sizing: border-box;
    border: 1px solid  var(--tag-background);
    border-radius: 3px;
    position: relative;
    width: 1.25em;
    height: 1.25em;
    margin: 0;
    cursor: pointer;
    color: var(--text-normal);
    font-weight: 600;
}
.markdown-preview-view .task-list-item-checkbox:checked::before {
    content: '✓';
    position: absolute;
    font-size:1em;
    line-height: 1em;
    width:1.1em;
    text-align:center;
    border-radius: 2px;
    cursor: pointer;
}

/* code blocks in preview */
pre code
{
  padding: 20px !important;
  line-height: normal;
  display: block;
  background-color: var(--pre-code) !important;
  color: var(--text-normal) !important;
}

.markdown-preview-view pre
{
  padding: 0px !important;
}

/* in-line code for editor and preview and code block for editor*/
code,
.cm-inline-code
{
  background-color: var(--pre-code) !important;
  color: var(--text-normal) !important;
  bottom: 0px !important;
  padding: 1px;
}

/* code and code blocks for preview */
.markdown-preview-view code
{
  font-size: 13.5px;
}

/**********/
/* tables */
/**********/
th
{
  font-weight: 800 !important;
}

thead
{
  border-bottom: 3px solid var(--background-modifier-border);
}

.table
{
  background-color: var(--background-secondary-alt);
  border: 1px solid var(--background-modifier-border);
  padding: 4px;
  line-height: normal;
  display: block;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

/* embedded images */
img
{
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* horizontal line in preview */
.markdown-preview-view hr
{
  background-color: var(--text-link);
}

/* checkboxes */
.markdown-preview-view .task-list-item-checkbox
{
  top: 0px;
}

/* match cursor color to theme */
.CodeMirror-cursor
{
  border-left: 2px solid var(--blockquote-border);
}

/********/
/* tags */
/********/

/* text of the tag in editor */
.cm-s-obsidian span.cm-hashtag-end {
  color: var(--pre-code);
  background-color: var(--tag-background);
  text-decoration: none;
  border-radius: 0 10px 10px 0px;
  padding: 1px 5px 1px 0px;
}

/* text of the actual hashtag in the editor */
.cm-s-obsidian span.cm-hashtag-begin {
  color: var(--pre-code);
  background-color: var(--tag-background);
  text-decoration: none;
  border-radius: 10px 0 0 10px;
  padding: 1px 0px 2px 5px;
}

/* entire tag in preview */
a.tag
{
  font-style: normal;
  color: var(--pre-code) !important;
  background-color: var(--tag-background);
  text-decoration: none;
  border-radius: 10px;
  padding: 1px 5px 1px 5px;
}

/*************/
/* side dock */
/*************/

/* side dock text, like file names and backlink context */
.side-dock-panels-container *
{
  font-size: 13px !important;
}

/* side dock titles at top */
.side-dock-title
{

  font-size: 20px !important;
  font-weight: 800 !important;
}

/* hover actions on side dock navigation */
.side-dock-ribbon-tab:hover,
.side-dock-ribbon-tab-inner:hover,
.side-dock-ribbon-action:hover,
.side-dock-ribbon-action.is-active:hover,
.nav-action-button:hover,
.side-dock-collapse-btn:hover
{
  color: var(--text-a);
}

/* non-hover actions on side dock navigation */
.side-dock-ribbon-tab,
.side-dock-ribbon-tab-inner,
.side-dock-ribbon-action,
.side-dock-ribbon-action.is-active,
.nav-action-button,
.side-dock-collapse-btn
{
  color: var(--text-faint);
}

/* quick switcher item currently selected */
.suggestion-item.is-selected
{
  background-color: var(--pre-code);
}

/* condense line spacing on file explorer title list. also avoids character-level word breaks */
.nav-file-title-content,
.search-result-file-title,
.search-result-file-match
{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  line-height: normal !important;
  word-break: keep-all;
}

/* styling for title that is selected in filer explorer */
.nav-file.is-active > .nav-file-title
{
  background-color: var(--pre-code);
  color: var(--text-a);
  border-color: var(--blockquote-border);
  border-width: 0px 0px 0px 3px;
  border-radius: 1px;
}

/* text color of non-selected files in sidebar */
.nav-file-title,
.search-result-file-match
{
  color: var(--text-faint);
}

.search-result-file-title
{
  color: var(--text-muted);
}

/* color and background of titles hovered over in side bars */
body:not(.is-grabbing) .nav-file-title:hover,
body:not(.is-grabbing) .nav-folder-title:hover,
.search-result-file-match:hover,
.search-result-file-title:hover,
body:not(.is-grabbing) .nav-file-title:hover .nav-folder-collapse-indicator,
body:not(.is-grabbing) .nav-folder-title:hover .nav-folder-collapse-indicator
{
  background-color: var(--pre-code);
  color: var(--text-normal);
}

/* clean up side bar empty state (e.g. unlinked mentions) */
.search-empty-state
{
  width: auto;
  padding-left: 15px;
  padding-right: 15px;
  line-height: normal;
}

/* to have sidebar hide and then reveal on hover */
.app-container.is-left-sidedock-collapsed .side-dock.mod-left:not(:hover),
.app-container.is-right-sidedock-collapsed .side-dock.mod-right:not(:hover)
{
  width: 0px !important;
}

/* font for everything outside of editor/preview panes */
.app-container
{
  font-family: var(--font-family-preview);
}

.status-bar-item
{
  font-family: var(--font-family-preview);
  font-size: 12px;
}

/******************/
/* settings popup */
/******************/

/* left hand side section non-selected section */
.vertical-tab-header,
.vertical-tab-nav-item
{
  background-color: var(--background-primary);
  border-color: var(--text-faint);
  border-width: 2px;
}

/* left hand side section selected section */
.vertical-tab-nav-item.is-active
{
  background-color: var(--pre-code);
  border-color: var(--blockquote-border);
  border-width: 5px;
}

/* in settings menu to show hot key mapping */
.setting-hotkey
{
  background-color: var(--pre-code);
}

/******************/
/* editor section */
/******************/

/* normal text outside of headings and code */
.cm-s-obsidian
{
  font-family: var(--font-family-editor);
  font-size: 15px;
  color: var(--text-normal);
  padding-left: 10% !important;
  padding-right: 10% !important;
}

.mod-single-child .cm-s-obsidian
{
  font-family: var(--font-family-editor);
  font-size: 15px;
  color: var(--text-normal);
  padding-left: 30% !important;
  padding-right: 30% !important;
}

/* headings */
.cm-header-1
{
  font-family: var(--font-family-editor);
  font-weight: 500;
  font-size: 28px;
  font-weight: bold;
  color: var(--text-title-h1);
}

.cm-header-2
{
  font-family: var(--font-family-editor);
  font-weight: 500;
  font-size: 26px;
  font-weight: bold;
  color: var(--text-title-h2);
}

.cm-header-3
{
  font-family: var(--font-family-editor);
  font-weight: 500;
  font-size: 22px;
  font-weight: bold;
  color: var(--text-title-h3);
}

.cm-header-4
{
  font-family: var(--font-family-editor);
  font-weight: 500;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-title-h4);
}

.cm-header-5
{
  font-family: var(--font-family-editor);
  font-weight: 500;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-title-h5);
}

.cm-header-6
{
  font-family: var(--font-family-editor);
  font-weight: 500;
  font-size: 16px;
  font-weight: bold;
  color: var(--text-title-h5);
}

.cm-string,
.cm-formatting-task,
.CodeMirror-guttermarker-subtle
{
  color: var(--text-link) !important;
}


/* remote secondary scroll bar in editor that comes from adding variable padding */
.CodeMirror-scroll::-webkit-scrollbar {
    display: none;
}

/******************/
/* preview section */
/******************/

/* normal text outside of headings and code */
.markdown-preview-view
{
  font-family: var(--font-family-preview);
  font-size: 15px;
  color: var(--text-normal);
  padding-left: 10% !important;
  padding-right: 10% !important;
}

.mod-single-child .markdown-preview-view
{
  font-family: var(--font-family-preview);
  font-size: 15px;
  color: var(--text-normal);
  padding-left: 30% !important;
  padding-right: 30% !important;
}

/* headings */
.markdown-preview-view h1
{
  font-family: var(--font-family-preview);
  font-weight: 600 !important;
  font-size: 28px;
  font-weight: bold;
  color: var(--text-title-h1);
}

.markdown-preview-view h2
{
  font-family: var(--font-family-preview);
  font-weight: 600 !important;
  font-size: 26px;
  font-weight: bold;
  color: var(--text-title-h2);
}

.markdown-preview-view h3
{
  font-family: var(--font-family-preview);
  font-weight: 600 !important;
  font-size: 22px;
  font-weight: bold;
  color: var(--text-title-h3);
}

.markdown-preview-view h4
{
  font-family: var(--font-family-preview);
  font-weight: 600 !important;
  font-size: 20px;
  font-weight: bold;
  color: var(--text-title-h4);
}

.markdown-preview-view h5
{
  font-family: var(--font-family-preview);
  font-weight: 600 !important;
  font-size: 18px;
  font-weight: bold;
  color: var(--text-title-h5);
}

.markdown-preview-view h6
{
  font-family: var(--font-family-preview);
  font-weight: 600 !important;
  font-size: 16px;
  font-weight: bold;
  color: var(--text-title-h5);
}

/* add some header prefix in preview */
h1::before
{
  content: 'H1 ';
  font-size: 12px;
  color: var(--text-faint)
}

h2::before
{
  content: 'H2 ';
  font-size: 12px;
  color: var(--text-faint)
}

h3::before
{
  content: 'H3 ';
  font-size: 12px;
  color: var(--text-faint)
}

h4::before
{
  content: 'H4 ';
  font-size: 12px;
  color: var(--text-faint)
}

h5::before
{
  content: 'H5 ';
  font-size: 12px;
  color: var(--text-faint)
}

h6::before
{
  content: 'H6 ';
  font-size: 12px;
  color: var(--text-faint)
}

/* internal embedded link rendering in preview */
.markdown-embed-title
{
  font-weight: 600;
}

.markdown-embed
{
  padding-left: 10px !important;
  padding-right: 10px !important;
  margin-left: 10px !important;
  margin-right: 10px !important;
}

/* to have andy matuschak mode
.workspace-split.mod-vertical { overflow-x:auto; }
.workspace-leaf, .workspace-split > .workspace-split { min-width: 500px; min-height: 500px; }
.workspace-split.mod-horizontal { overflow-y: auto; }
*/
