---
title: Normalisation
draft: true
---
# 3 Normalisation
formal process of eliminanting unnecessary redundancy in relations by splitting relations into smaller chunks

bottom up approach
- functional dependencies ⇒ normalised relations
- requirements ⇒ conceptual ≫ logical is "top down"
- use normalisation to verify your logical design
	- to ensure you haven't missed anything


### 0.1 Pros ans cons

+ frees from anomalies
+ separates data the belong to different entities
+ reduces data redundancy
+ doesn't bias db design infaour of certain queries at the expense of others

- more relations required
- more complex queries can imply slower performance in some DBMSs

### 0.2 Normal forms
1NF ⇒ Single valued attributes only
2NF ⇒ all on-key attibutes fully dependent on PK (i.e., no dependencies on part of the PK) (no partial dependencies)
3NF/BCNF ⇒ no non-key transitive dependencies
4NF ⇒ no multivalued dependencies
5NF ⇒ all join dependencies implied by Composite key (CKs)
6NF ⇒ irreducible relations