async function drawTree(pathBase){
// async function drawTree(){

const { content } = await fetchData;

// COMMENT : add a uid for pages and folders id ? will avoid problems if duplicates in page name and folder name

// we want to build an array of objects, one for each page and folder (type)
const tree = [];

for (let path in content) {
  const c = content[path];
  const pageTitle = c.title;
  const crumb = path.split("/");
  // ['', 'folder1','folder2', ... , pageId ]
  let pageId = crumb.pop();
  if (pageId == '') pageId = '_ROOT_';
  let parentFolderId = crumb.slice(-1)[0];
  if (parentFolderId == '' && pageId == '_ROOT_') parentFolderId = 'SUPER-ROOT';
  if (parentFolderId == '') parentFolderId = 'ROOT';
  parentFolderId = '_' + parentFolderId + '_'; // added to distinguished from pageId

  // we found a page
  tree.push({
    id: pageId,
    parentId: parentFolderId,
    name: pageTitle,
    type: 'page',
    href: pathBase.slice(0, pathBase.length - 1) + path
  })

  // if the page is in one or more folders
  crumb.forEach((folderId, level) => {
    let parentId = crumb[level - 1];
    if (parentId == '') {
      parentId = '_ROOT_'
    } else {
      parentId = '_' + parentId + '_';
    }

    // we found a folder
    const push = {
      id: '_' + folderId + '_',
      parentId: parentId,
      name: folderId.replace(/-/g, ' '),
      type: 'folder',
      // type : Tree.FOLDER,
      level: level
    }

    // avoid duplicates of folders
    if (folderId != '' && !tree.some(el => JSON.stringify(el) === JSON.stringify(push)))
      tree.push(push);
  });
}

// METHODE 1
// FYI https://www.jstree.com/docs/json/ doesn't need a hierarchial JSON
// it needs jQuery though. Not used for the moment

//METHODE 2
// build the hierarchial JSON
// from https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
let root;

const idMapping = tree.reduce((acc, el, i) => {
  acc[el.id] = i;
  return acc;
}, {});

tree.forEach((el) => {
  // Handle the root element
  if (el.parentId == '_SUPER-ROOT_') {
    root = el;
    return;
  }
  // Use our mapping to locate the parent element in our data array
  const parentEl = tree[idMapping[el.parentId]];
  // Add our current el to its parent's `children` array
  parentEl.children = [...(parentEl.children || []), el];
});

const structure = root.children;

// a temporary function to traverse the tree and allowing to display something
function* traverse(o, path = []) {
  for (var i in o) {
    const itemPath = path.concat(i);
    yield [i, o[i], itemPath, o];
    if (o[i] !== null && typeof o[i] == "object") {
      //going one step down in the object tree!!
      yield* traverse(o[i], itemPath);
    }
  }
}

// console.log(structure)
for (var [key, value, path] of traverse(structure)) {
  // console.log(key);
  // console.log(value);
  // console.log(path);
  // console.log("---");
  let doc = document.getElementById("tree").innerHTML
  if (value?.type == "folder") {
  document.getElementById("tree").innerHTML = doc +  '<h3>'+value.name + '</h3>'
  }
  if (value?.type == "page") {
  document.getElementById("tree").innerHTML = doc +  '&emsp;<a href="' + value.href + '">'+ value.name+'</a><br/>'
  }
}

return structure

}
