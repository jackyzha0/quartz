---
tags:
  - python
  - django
---
Poetry is a tool for **dependency management** and **packaging** in Python. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you. Poetry offers a lockfile to ensure repeatable installs, and can build your project for distribution.

# Warning
** Poetry should always be installed in a dedicated virtual environment to isolate it from the rest of your system. **



# How to install ?

https://python-poetry.org/docs/#installation

```bash
conda create -n poetry python=3.11
```

# Basics

1. Project Setup: Initialize new projects or existing directories with Poetry, creating a `pyproject.toml` file for configuration.
2. Specifying Dependencies: Manage project dependencies through `pyproject.toml`, using the `poetry add` command for easy addition.
3. Virtual Environment: Poetry automatically creates and manages virtual environments, with commands for activation and script execution within these environments.
4. Version Constraints: Define dependency versions using various constraints to ensure compatibility.
5. Installing Dependencies: Install project dependencies with or without a `poetry.lock` file, ensuring consistent dependency versions across environments.
6. Updating Dependencies: Update dependencies to their latest versions while respecting version constraints in `pyproject.toml`.

Code Examples:
- Create a new project: `poetry new poetry-demo`
- Add a dependency: `poetry add pendulum`
- Activate virtual environment: `poetry shell`

For a detailed explanation and more examples, visit the [Poetry Basic Usage Documentation](https://python-poetry.org/docs/basic-usage/)


# Do not forget 
Since this is the top StackOverflow result for "poetry command not found"...

**For Mac users** and zsh users, create a `.zshrc` file in your home folder with the following:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

```python
# In tests/test_erdem.py
import unittest

  

def sum(a, b):

return a + b

  

class TestSum(unittest.TestCase):

def test_sum(self):

self.assertEqual(sum(1, 2), 3)

  

def test_sum_negative(self):

self.assertEqual(sum(-1, 1), 0)

  

if __name__ == '__main__':

unittest.main()
```


```bash
poetry run pytest
```


# Install conda and poetry

https://medium.com/@silvinohenriqueteixeiramalta/conda-and-poetry-a-harmonious-fusion-8116895b6380

*Install conda install pytest for run poetry run pytest*

#  Managing Dependencies
The "Managing Dependencies" page on the Poetry documentation provides guidance on how to organize and manage dependencies in Python projects using Poetry. Key points include:

1. **Dependency Groups**: Dependencies can be organized into groups (e.g., main, test, docs) for better organization and optional installation. 

2. **Optional Groups**: Some groups can be marked as optional, meaning they are not installed by default but can be included with specific install commands.

3. **Adding/Removing Dependencies**: The `poetry add` and `poetry remove` commands are used to add or remove dependencies to/from specific groups.

4. **Installing Group Dependencies**: The `poetry install` command supports various options (`--with`, `--without`, `--only`) to control which groups of dependencies are installed.

5. **Synchronizing Dependencies**: The `--sync` option ensures that only the dependencies specified in the `poetry.lock` file are present, removing unneeded ones.

6. **Layering Optional Groups**: You can install subsets of optional groups without removing those already installed, useful in scenarios like multi-stage Docker builds.

For code examples and more detailed explanations, please refer to the [Poetry Documentation](https://python-poetry.org/docs/managing-dependencies/).

Here are some code examples from the Poetry documentation on managing dependencies:

1. **Adding a Dependency**:
   ```shell
   poetry add requests
   ```
   This adds the "requests" library to your project's dependencies.

2. **Adding a Dependency to a Specific Group**:
   ```shell
   poetry add pytest --group dev
   ```
   This adds "pytest" to the "dev" group, typically used for development dependencies.

3. **Installing Only Specific Groups of Dependencies**:
   ```shell
   poetry install --only main
   ```
   Installs only the dependencies in the "main" group.

4. **Removing a Dependency**:
   ```shell
   poetry remove requests
   ```
   This removes the "requests" library from your project's dependencies.

For more examples and a detailed explanation of each command, you can refer to the [Poetry Documentation on Managing Dependencies](https://python-poetry.org/docs/managing-dependencies/).

**As an example, `1.0.0-hotfix.1` is not compatible with [PEP 440](https://peps.python.org/pep-0440). You can instead choose to use `1.0.0-post1` or `1.0.0.post1`.**

# Libraries
The "Libraries" section of the Poetry documentation covers key aspects of making your library installable through Poetry. It details topics like versioning in compliance with PEP 440, managing the lock file, packaging the library for distribution, and publishing to both PyPI and private repositories. The section provides practical commands for these processes:

- Packaging your library: `poetry build`
- Publishing to PyPI: `poetry publish`
- Publishing to a private repository: `poetry publish -r my-repository`

For more detailed information and examples, refer to the [Poetry Documentation on Libraries](https://python-poetry.org/docs/libraries/)
# CLI
The "Commands" section of the Poetry documentation provides comprehensive details on various commands available in Poetry, a Python dependency management and packaging tool. It includes commands for project initialization (`new`, `init`), dependency management (`add`, `remove`, `install`, `update`), and other operations like building (`build`), publishing (`publish`), and configuring settings (`config`). Each command is explained with its purpose and usage, along with options to customize their behavior. This section is essential for understanding how to effectively use Poetry for Python project management.

For detailed usage and examples of each command, you can refer to the [Poetry CLI Documentation](https://python-poetry.org/docs/cli/).



## Pyenv and Conda


[LINK](https://stackoverflow.com/posts/58045893/timeline)

Personal recommendation: Don't use `pyenv` to install Anaconda or Miniconda.

Both `pyenv` and `conda` are able to manage different python environments. The `anaconda` installed by `pyenv` should only **serves as a Python interpreter**. Python environment creation from anaconda installed by `pyenv` is still handled by `pyenv virtualenv` but not `conda env create`.

I've been using these two tools together. It turns out the best solution is to install `conda`, `pyenv` separately, and manage their virtual environments separately as well.

1. alway initialize `pyenv`
2. only expose command `conda` but don't activate any environment

### Detail

Install `pyenv`.

Install Anaconda or Miniconda normally, NOT by `pyenv install`.

Make sure the `pyenv` and `conda` commands are available in an interactive shell.

Initialize `pyenv` by putting following content into shell init file (`.bashrc` for Bash, `.zshrc` for ZSH).

```bash
# Put the content into ~/.bashrc or ~/.bash_profile for Bash,
# .zshrc for ZSH

# you may need to add dir of command `pyenv` into PATH,
# if command pyenv is not available yet

if command -v pyenv &>/dev/null; then
    eval "$(pyenv init -)"
fi
if command -v pyenv-virtualenv &>/dev/null; then
    eval "$(pyenv virtualenv-init -)"
fi
```

Expose command `conda` but don't activate any environment, even the `base` environment. Execute the following commands in your shell.

```bash
# Run the content in the shell

# init conda, the following command write scripts into your shell init file automatically
conda init

# disable init of env "base"
conda config --set auto_activate_base false
```

Note: After this setup, the default python is the one set by `pyenv global`. Use `pyenv` and `conda` to manage environments separately.

Examples of managing virtual environments.

```bash
# virtual environments from pyenv
pyenv install 3.6.9
pyenv virtualenv 3.6.9 new-env
pyenv activate new-env
pyenv deactive
# You can also use `pyenv local`


# virtual environments from conda
conda env create new-env python=3.6
conda env list
conda activate new-env
conda deactivate
```

Default env location for `pyenv` is `~/.pyenv/versions`.

Default env location for `conda`, check output from `conda info`.

### References

- [pyenv installation](https://github.com/pyenv/pyenv#installation)
- [pyenv virtualenv installatoin](https://github.com/pyenv/pyenv-virtualenv#installation)
- [How do I prevent Conda from activating the base environment by default?](https://stackoverflow.com/a/57974390/5101148)

