[[Reverse Engineering Python Exe to Source and Protection Methods]]
#python #reverseengineering #pyarmor
```bash
pip install -U pyarmor
```

## [Obfuscating one script](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#obfuscating-one-script "Permalink to this heading")

pyarmor gen foo.py

pyarmor g foo.py
$ pyarmor generate foo.py

### [1.1.3.1. Distributing the obfuscated script](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#distributing-the-obfuscated-script "Permalink to this heading")

Only copy `dist/foo.py` to another machine doesn’t work, instead copy all the files in the `dist/`.

Why? It’s clear after checking the content of `dist/foo.py`:

from pyarmor_runtime_000000 import __pyarmor__
__pyarmor__(__name__, __file__, ...)

Actually the obfuscated script can be taken as normal Python script with dependent package `pyarmor_runtime_000000`, use it as it’s not obfuscated.

## Important
Please run this obfuscated in the machine with same Python version and same platform, otherwise it doesn’t work. Because `pyarmor_runtime_000000` has an [extension module](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-extension-module), it’s platform-dependent and bind to Python version.

DO NOT install Pyarmor in the [Target Device](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-Target-Device), Python interpreter could run the obfuscated scripts without Pyarmor.

## [1.1.4. Obfuscating one package](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#obfuscating-one-package "Permalink to this heading")

pyarmor gen -O dist2 src/mypkg

cd dist2/
$ python -C 'import mypkg'

if they are subpackages use this: 
pyarmor gen -O dist2 -r src/mypkg


### [1.1.4.1. Distributing the obfuscated package](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#distributing-the-obfuscated-package "Permalink to this heading")


Also it works to copy the whole path `dist2` to another machine. But it’s not convenience, the better way is using [`-i`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-i) to generate all the required files inside package path:

$ pyarmor gen -O dist3 -r -i src/mypkg

Check the output:
```bash
$ ls dist3/
...    mypkg

$ ls dist3/mypkg/
...          __init__.py
...          pyarmor_runtime_000000
```
`


## [1.1.5. Expiring obfuscated scripts](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#expiring-obfuscated-scripts "Permalink to this heading")

It’s easy to set expire date for obfuscated scripts by [`-e`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-e). For example, generate obfuscated script with the expire date to 30 days:

pyarmor gen -O dist4 -e 30 foo.py



## [1.1.6. Binding obfuscated scripts to device](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#binding-obfuscated-scripts-to-device "Permalink to this heading")

python -m pyarmor.cli.hdinfo

Using [`-b`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-b) to bind hardware information to obfuscated scripts. For example, bind `dist5/foo.py` to Ethernet address:

$ pyarmor gen -O dist5 -b 00:16:3e:35:19:3d foo.py

pyarmor gen -O dist5 -b "00:16:3e:35:19:3d HXS2000CN2A" foo.py

## [1.1.7. Packaging obfuscated scripts](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#content)[](https://pyarmor.readthedocs.io/en/latest/tutorial/getting-started.html#packaging-obfuscated-scripts "Permalink to this heading")




## [1.2.7. Run Pyarmor from Python script](https://pyarmor.readthedocs.io/en/latest/tutorial/installation.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/installation.html#run-pyarmor-from-python-script "Permalink to this heading")

Create a script `tool.py`, pass arguments by yourself

from pyarmor.cli.__main__ import main_entry

args = ['gen', 'foo.py']
main_entry(args)

Run it by Python interpreter:

$ python tool.py

## [1.3.6. Binding to many machines](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#binding-to-many-machines "Permalink to this heading")

Using [`-b`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-b) many times to bind obfuscated scripts to many machines.

For example, machine A and B, the ethernet addresses are `66:77:88:9a:cc:fa` and `f8:ff:c2:27:00:7f` respectively. The obfuscated script could run in both of machine A and B by this command

$ pyarmor gen -b "66:77:88:9a:cc:fa" -b "f8:ff:c2:27:00:7f" foo.py


## [1.3.8. Localization runtime error](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#localization-runtime-error "Permalink to this heading")

Some of runtime error messages could be customized. When something is wrong with the obfuscated scripts, it prints your own messages.

First create `messages.cfg` in the path `.pyarmor`:

$ mkdir .pyarmor
$ vi .pyarmor/message.cfg

Then edit it. It’s a `.ini` format file, change the error messages as needed

[runtime.message]

  error_1 = this license key is expired
  error_2 = this license key is not for this machine
  error_3 = missing license key to run the script
  error_4 = unauthorized use of script

Now obfuscate the script in the current path to use customized messages:

$ pyarmor gen foo.py

If we want to show same message for all of license errors, edit it like this

[runtime.message]

  error_1 = invalid license key
  error_2 = invalid license key
  error_3 = invalid license key

Here no `error_4`, it means this error uses the default message.

And then obfuscate the scripts again.




### [1.3.9.2. Packing to one folder](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/obfuscation.html#packing-to-one-folder "Permalink to this heading")

First packing script to one folder by PyInstaller:

$ pyinstaller foo.py

It generates one bundle folder `dist/foo`, and an executable file `dist/foo/foo`, pass this executable to pyarmor:

$ pyarmor gen -O obfdist --pack dist/foo/foo foo.py

Like above section, `dist/foo/foo` will be repacked with obfuscated scripts.

Now run it:

$ dist/foo/foo


## [1.4.4. Filter mix string](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#filter-mix-string "Permalink to this heading")

By default [`--mix-str`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-mix-str) encrypts all the string length > 8.

But it can be configured to filter any string to meet various needs.

Exclude short strings by length < 10:

$ pyarmor cfg mix.str:threshold 10

Exclude any string by regular expression with format `/pattern/`, the pattern syntax is same as module `re`. For example, exclude all strings length > 1000:

$ pyarmor cfg mix.str:excludes "/.{1000,}/"

Append new ruler to exclude 2 words `__main__` and `xyz`:

$ pyarmor cfg mix.str:excludes ^ "__main__ xyz"

Reset exclude ruler:

$ pyarmor cfg mix.str:excludes = ""

Encrypt only string length between 8 and 32 by regular expression:

$ pyarmor cfg mix.str:includes = "/.{8,32}/"

Check trace log to find which strings are protected.



## [1.4.8. Generating cross platform scripts](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#generating-cross-platform-scripts "Permalink to this heading")

New in version 8.1.

Here list all the standard [platform](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-Platform) names.

In order to generate scripts for other platform, use [`--platform`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-platform) specify target platform. For example, building scripts for windows.x86_64 in Darwin:

$ pyarmor gen --platform windows.x86_64 foo.py

[`pyarmor.cli.runtime`](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#module-pyarmor.cli.runtime "pyarmor.cli.runtime: A universal wheel is used for cross-platform obfuscation, it provides prebuilt extension modules `pyarmor_runtime` which is required to run the obfuscated scripts in all supported platforms") provides prebuilt binaries for these platforms. If it’s not installed, pyarmor may complain of `cross platform need pyarmor.cli.runtime, please run "pip install pyarmor.cli.runtime~=2.1.0" first`. Following the hint to install pyarmor.cli.runtime with the right version.

Using [`--platform`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-platform) multiple times to support multiple platforms. For example, generate the scripts to run in most of x86_64 platforms:

$ pyarmor gen --platform windows.x86_64
              --platform linux.x86_64 \
              --platform darwin.x86_64 \
              foo.py

## [1.4.9. Obfuscating scripts for multiple Python versions](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#obfuscating-scripts-for-multiple-python-versions "Permalink to this heading")

New in version 8.3.

This guide how to obfuscate the script foo.py which works with both Python 3.8 and 3.9.

First install Pyarmor for each Python version:

$ python3.8 -m pip install pyarmor
$ python3.9 -m pip install pyarmor

If you have Pyarmor license, register Pyarmor by any Python version:

$ python3.8 -m pyarmor.cli reg pyarmor-regfile-xxxx.zip

Enable builtin plugin `MultiPythonPlugin`:

$ python3.8 -m pyarmor.cli cfg plugins + "MultiPythonPlugin"

Obfuscate the script to different output path by each Python version:

$ python3.8 -m pyarmor.cli gen -O dist1 foo.py
$ python3.9 -m pyarmor.cli gen -O dist2 foo.py

Then merge 2 output paths by any Python version:

$ python3.8 -m pyarmor.cli.merge -O dist dist1 dist2

The final output path is `dist`:

$ python3.8 dist/foo.py
$ python3.9 dist/foo.py

## [1.4.10. Using shared runtime package](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/advanced.html#using-shared-runtime-package "Permalink to this heading")

It’s possible generating runtime package once and use it later.

First generate runtime package:

$ pyarmor gen runtime -O build/my_runtime1

Then obfuscate scripts with it:

$ pyarmor gen --use-runtime build/my_runtime1 foo.py

But it need copy shared runtime package to dist path:

# pyarmor_runtime_000000 need to replaced with real name
$ ls build/my_runtime1/
$ cp -a build/my_runime1/pyarmor_runtime_000000 dist/

The other options could be used to generate shared runtime package, for examples:

$ pyarmor gen runtime -e .10 -O build/my_runtime2
$ pyarmor gen --platform windows.x86_64,linux.x86_64 build/my_runtime3

If using [outer key](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-Outer-Key) with runtime package, it need specify –outer both generating runtime package and obfuscating scripts:

$ pyarmor gen runtime --outer -O build/my_outer_runtime
$ pyarmor gen --outer --use-runtime build/my_outer_runtime foo.py

$ cp -a build/my_outer_runtime/pyarmor_runtime_000000 dist/
$ pyarmor gen key -e .10
$ mv dist/pyarmor.rkey dist/pyarmor_runtime_000000




## [1.5.5. Using hook to check network time by other service](https://pyarmor.readthedocs.io/en/latest/tutorial/customization.html#contents)[](https://pyarmor.readthedocs.io/en/latest/tutorial/customization.html#using-hook-to-check-network-time-by-other-service "Permalink to this heading")

New in version 8.2.

If NTP is not available in the [target device](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-Target-Device) and the obfuscated scripts has expired date, it may raise `RuntimeError: Resource temporarily unavailable`.

In this case, using hook script to verify expired data by other time service.

First create hook script in the `.pyarmor/hooks/foo.py`:

def _pyarmor_check_worldtime(host, path):
    from http.client import HTTPSConnection
    expired = __pyarmor__(1, None, b'keyinfo', 1)
    conn = HTTPSConnection(host)
    conn.request("GET", path)
    res = conn.getresponse()
    if res.code == 200:
        data = res.read()
        s = data.find(b'"unixtime":')
        n = data.find(b',', s)
        current = int(data[s+11:n])
        if current > expire:
            raise RuntimeError('license is expired')
     else:
         raise RuntimeError('got network time failed')
_pyarmor_check_worldtime('worldtimeapi.org', '/api/timezone/Europe/Paris')

Then generate script with local expired date:

$ pyarmor gen -e .30 foo.py

Thus the obfuscated script could verify network time by itself.

See also

[Hooks](https://pyarmor.readthedocs.io/en/latest/reference/environments.html#hooks) [`__pyarmor__()`](https://pyarmor.readthedocs.io/en/latest/reference/environments.html#pyarmor__ "__pyarmor__")



https://pyarmor.readthedocs.io/en/latest/how-to/security.html


# 2.2. Protecting Runtime Memory Data[](https://pyarmor.readthedocs.io/en/latest/how-to/protection.html#protecting-runtime-memory-data "Permalink to this heading")

Pyarmor focuses on protecting Python scripts, through several irreversible obfuscation methods, Pyarmor makes sure the obfuscated scripts can’t be restored by any way.

But it isn’t good at memory protection and anti-debug. If you care about runtime memory data, or runtime key verification, generally it need extra methods to prevent debugger from hacking dynamic libraries.

Pyarmor could prevent hacker from querying runtime data by valid Python C API and other Python ways, only if the Python interpreter and extension module `pyarmor_runtime` are not hacked. This is what extra tools need to protect, the common methods include

- Signing the binary file to make sure they’re not changed by others
    
- Using third-party binary protection tools to protect Python interpreter and extension module `pyarmor_runtime`
    
- Pyarmor provides some configuration options to check interps and debuggers.
    
- Pyarmor provides runtime patch feature to let expert users to write C functions or python scripts to improve security.
    

**Basic steps**

Above all, Python interpreter to run the obfuscated scripts can’t be replaced, if the obfuscated scripts could be executed by patched Python interpreter, it’s impossible to prevent others to read any Python runtime data.

At this time Pyarmor need [`--pack`](https://pyarmor.readthedocs.io/en/latest/reference/man.html#cmdoption-pyarmor-gen-pack) to implement this.

First pack the script by [PyInstaller](https://www.pyinstaller.org/) [1](https://pyarmor.readthedocs.io/en/latest/how-to/protection.html#id3):

$ pyinstaller foo.py

Next configure and repack the bundle, the following options are necessary [2](https://pyarmor.readthedocs.io/en/latest/how-to/protection.html#id4):

$ pyarmor cfg check_debugger=1 check_interp=1
$ pyarmor gen --mix-str --assert-call --assert-import --private --pack dist/foo/foo foo.py

Then protect all the binary files in the output path `dist/foo/` through external tools, make sure these binary files can not be replaced or modified in runtime.

Available external tools: codesign, VMProtect

Note

[1](https://pyarmor.readthedocs.io/en/latest/how-to/protection.html#id1)

If pack to one file by PyInstaller, it’s not enough to protect this file alone. You must make sure all the binary files extracted from this file are protected too.

[2](https://pyarmor.readthedocs.io/en/latest/how-to/protection.html#id2)

Do not use `check_interp` in 32-bit x86 platforms, it doesn’t work

**Hook Scripts**

Expert users could write [hook script](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-Hook-script) to check PyInstaller bootstrap modules to improve security.

Here it’s an example to show how to do, note that it may not work in different PyInstaller version, do not use it directly.

 1# Hook script ".pyarmor/hooks/foo.py"
 2
 3def protect_self():
 4    from sys import modules
 5
 6    def check_module(name, checklist):
 7        m = modules[name]
 8        for attr, value in checklist.items():
 9            if value != sum(getattr(m, attr).__code__.co_code):
10                raise RuntimeError('unexpected %s' % m)
11
12    checklist__frozen_importlib = {}
13    checklist__frozen_importlib_external = {}
14    checklist_pyimod03_importers = {}
15
16    check_module('_frozen_importlib', checklist__frozen_importlib)
17    check_module('_frozen_importlib_external', checklist__frozen_importlib_external)
18    check_module('pyimod03_importers', checklist_pyimod03_importers)
19
20protect_self()

The highlight lines need to be replaced with real check list. In order to get baseline, first replace function `check_module` with this fake function

def check_module(name, checklist):
    m = modules[name]
    refs = {}
    for attr in dir(m):
        value = getattr(m, attr)
        if hasattr(value, '__code__'):
            refs[attr] = sum(value.__code__.co_code)
    print('    checklist_%s = %s' % (name, refs))

Run the following command to get baseline:

$ pyinstaller foo.py
$ pyarmor gen --pack dist/foo/foo foo.py

...
checklist__frozen_importlib = {'__import__': 9800, ...}
checklist__frozen_importlib_external = {'_calc_mode': 2511, ...}
checklist_pyimod03_importers = {'imp_lock': 183, 'imp_unlock': 183, ...}

Edit hook script to restore `check_module` and replace empty check lists with real ones.

Using this real hook script to generate the final bundle:

$ pyinstaller foo.py
$ pyarmor gen --pack dist/foo/foo foo.py

**Runtime Patch**

New in version 8.3.

Pyarmor provides runtime patch feature so that users could write one C or python script to do any anti-debug or other checks. It will be embedded into [runtime files](https://pyarmor.readthedocs.io/en/latest/reference/concepts.html#term-Runtime-Files), and called on extension module `pyarmor_runtime` initialization.

First create script `.pyarmor/hooks/pyarmor_runtime.py`, and do some checks in the function [`bootstrap()`](https://pyarmor.readthedocs.io/en/latest/reference/environments.html#bootstrap "bootstrap"). For example:

def bootstrap(user_data):
    from ctypes import windll
    if windll.kernel32.IsDebuggerPresent():
        print('found debugger')
        return False



