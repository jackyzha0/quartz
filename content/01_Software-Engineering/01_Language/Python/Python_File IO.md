#Software-Engineering 

---
## # [File I/O](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)

## Input & Output

Reading and writing files.


---

#### File Handling

Key function: `open(filename, mode)`

---

#### Working with paths

```python
import os

current_file = os.path.realpath('file_io.ipynb')  
print('current file: {}'.format(current_file))
```

---
#### Note: in .py files you can get the path of current file by __file__

```python
current_dir = os.path.dirname(current_file)  
print('current directory: {}'.format(current_dir))
```

----
#### Note: in .py files you can get the dir of current file by os.path.dirname(__file__)

```python
data_dir = os.path.join(os.path.dirname(current_dir), 'jupyterNotebooks')
print('data directory: {}'.format(data_dir))
```

---
#### Checking if path exists
```python
print('exists: {}'.format(os.path.exists(data_dir)))
print('is file: {}'.format(os.path.isfile(data_dir)))
print('is directory: {}'.format(os.path.isdir(data_dir)))
```

---
## Reading files

```python
file_path = os.path.join(data_dir, 'simple_file.txt')

with open(file_path, 'r', encoding="UTF-8") as simple_file:
    for line in simple_file:
        print(line.strip())
```

The [`with`](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement) statement is for obtaining a [context manager](https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers) that will be used as an execution context for the commands inside the `with`. Context managers guarantee that certain operations are done when exiting the context. 

In this case, the context manager guarantees that `simple_file.close()` is implicitly called when exiting the context. This is a way to make developers life easier: you don't have to remember to explicitly close the file you openened nor be worried about an exception occuring while the file is open. Unclosed file maybe a source of a resource leak. Thus, prefer using `with open()` structure always with file I/O.

To have an example, the same as above without the `with`.
```python
file_path = os.path.join(data_dir, 'simple_file.txt')
```


### THIS IS NOT THE PREFERRED WAY

```python
simple_file = open(file_path, 'r')
for line in simple_file:
    print(line.strip())
simple_file.close()  # This has to be called explicitly 
```

## Writing files

```python
new_file_path = os.path.join(data_dir, 'new_file.txt')

with open(new_file_path, 'w') as my_file:
    my_file.write('This is my first file that I wrote with Python.')
Now go and check that there is a new_file.txt in the data directory. After that you can delete the file by:
if os.path.exists(new_file_path):  # make sure it's there
    os.remove(new_file_path)
```
