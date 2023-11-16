---
tags:
  - 笔记
citekey:
  "{ citekey }": 
status: unread
dateread:
---

>[!Cite]
>{{bibliography}}

>[!tip] Synthesis
>**Contribution**::
>
>**Related**:: {% for relation in relations | selectattr("citekey") %} [[@{{relation.citekey}}]]{% if not loop.last %}, {% endif%} {% endfor %}

>[!info] Metadata
{% for type, creators in creators | groupby("creatorType") -%}
{%- for creator in creators -%}
>**{{"First" if loop.first}}{{type | capitalize}}**::
{%- if creator.name %} {{creator.name}}
{%- else %} {{creator.lastName}}, {{creator.firstName}}
{%- endif %}
{% endfor %}~
{%- endfor %}
> **Title**:: {{title}}
> **Year**:: {{date | format("YYYY")}}
> **Citekey**:: {{citekey}} {%- if itemType %}
> **itemType**:: {{itemType}}{%- endif %}{%- if itemType == "journalArticle" %}
> **Journal**::*{{publicationTitle}}*{%- endif %}{%- if volume %}
> **Volume**:: {{volume}} {%- endif %}{%- if issue %}
> **Issue**:: {{issue}} {%- endif %}{%- if itemType == "bookSection" %}
> **Book**:: {{publicationTitle}} {%- endif %}{%- if publisher %}
> **Publisher**:: {{publisher}} {%- endif %}{%- if place %}
> **Location**:: {{place}} {%- endif %}{%- if pages %}
> **Pages**:: {{pages}} {%- endif %}{%- if DOI %}
> **DOI**:: {{DOI}} {%- endif %}{%- if ISBN %}
> **ISBN**:: {{ISBN}} {%- endif %}

> [!success] Link
> {%- for attachment in attachments | filterby("path", "endswith", ".pdf") %}
> [{{attachment.title}}](file://{{attachment.path | replace(" ", "%20")}}) {%- endfor -%}.

> [!Abstract]
> {%- if abstractNote %}
> {{abstractNote}}
> {%- endif -%}
>

# Notes
> {%- if markdownNotes %}
>{{markdownNotes}}{%- endif -%}.

# Annotations
{%- macro calloutHeader(type, color) -%}
{%- if type  == "highlight" -%}
<mark style="background-color: {{color}}">Quote</mark>
{%- endif -%}

{%- if type == "text" -%}
Note
{%- endif -%}
{%- endmacro -%}

{% persist "annotations" %}
{% set newAnnotations = annotations | filterby("date", "dateafter", lastImportDate) %}
{% if newAnnotations.length > 0 %}

### Imported: {{importDate | format("YYYY-MM-DD h:mm a")}}

{% for a in newAnnotations %}
{{calloutHeader(a.type, a.color)}}
> {{a.annotatedText}}
{% endfor %}
{% endif %}
{% endpersist %}