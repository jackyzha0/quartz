---
title: 文件夹和标签列表
tags:
  - feature/emitter
---

Quartz会为您拥有的任何文件夹和标签生成列表页面。

## 文件夹列表

Quartz将为该文件夹下的所有页面生成一个索引页面。这包括多个层次的任何内容。

此外，Quartz还将为子文件夹生成页面。假设您在嵌套文件夹`content/abc/def/note.md`中有一个笔记。然后Quartz将为`abc` 下的所有笔记生成一个页面，并为`abc/def`下的全部笔记生成一页。

您可以通过引用文件夹列表的名称和尾部斜杠链接到该列表，如下所示：`[[advanced/]]`（结果为[[advanced/]]）。

默认情况下，Quartz会将页面命名为`Folder: <folder name>` ，而没有说明。您可以通过在具有`title`的文件夹中创建一个`index.md` 文件来覆盖它[[authoring content#语法|元数据]]字段。您在此文件中写入的任何内容也将用于文件夹描述中。

例如，对于文件夹`content/posts`，您可以添加另一个文件`content/posts/index.md` t来为其添加特定的描述。

## 标签列表

Quartz还将为您的vault中的每个唯一标签创建一个索引页面，并呈现带有该标签的所有笔记的列表。

Quartz还支持标记层次结构（例如`plugin/emitter`），并且还将为标记层次结构的每个级别呈现单独的标记页面。它还将在`/tags`处创建一个默认的全局标记索引页面，显示Quartz中所有标记的列表。

您可以通过引用带有`tag/`前缀的标签列表来链接到该标签列表，如下所示：`[[tags/plugin]]`（结果为[[tags/plugin]]）。

与文件夹列表一样，您也可以通过为每个标记创建一个文件来提供标记页面的描述和标题。例如，如果您想为 #component 标记创建一个自定义描述，您可以在`content/tags/component.md`中创建一个带有标题和描述的文件。

## 自定义

文件夹列表是[[FolderPage]]插件的一个功能，[[TagPage]]插件中的标记列表。有关自定义选项，请参阅插件页面。
