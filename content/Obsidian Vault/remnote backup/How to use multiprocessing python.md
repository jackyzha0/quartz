#code
- ` import multiprocessing, tqdm # for loading bar`
- ```python
collect_results = []

def replicate(input):
	# do the thing
	return thing

for x in tqdm(pool.imap(replicate, enumerate(vector)), total=len(vector)):
    collect_results.append(x)

pool.close()
pool.join()

```
- 
- this also shows a nice loading bar showing your progress, and maintains the order of the original input.
