
```bash
conda create -n uncompile python=3.6
conda activate uncompile
# We will use pyinstxtractor-ng
# git clone https://github.com/countercept/python-exe-unpacker.git
#cd python-exe-unpacker
#python pyinstxtractor.py ~/Downloads/Aimful/aimful-kucoin.exe
git clone https://github.com/pyinstxtractor/pyinstxtractor-ng.git
pyinstxtractor-ng --one-dir main.exe
cd main.exe_extracted
pip install uncompyle6
uncompyle6 -o output *.pyc
cd output && ls -lah
```

## Reverse engineering


Basic information about binaries. There are two main versions of the program in question:
`aimful-kucoin.exe` and `aimful-binance.exe`. They are both Windows executables. From the FAQ section of the discord server, the following information is available:

> In what language was this bot written?
> - Python.

1. Extract the contents of the binary

```bash
git clone https://github.com/countercept/python-exe-unpacker.git
cd python-exe-unpacker
python pyinstxtractor.py ~/Downloads/Aimful/aimful-kucoin.exe
```

Install python decompiler called `decompyle3` based on `uncompyle6`:

```bash
git clone https://github.com/rocky/python-decompile3.git
cd python-decompile3
pip install -e .
```

2. Attempt to decompile the contents of the binary

```bash
cd ./aimful-kucoin.exe_extracted/PYZ-00.pyz_extracted
decompyle3 ./kucoin.client.pyc

> ...
> ImportError: Ill-formed bytecode file ./kucoin.client.pyc
> <class 'ValueError'>; bad marshal data (unknown type code)
```

By searching for the file header "e3000000" on google, we can find this article:
https://timonpeng.com/tips-of-pyinstaller-executable-file-decompilation/

3. Inspect the struct file header bytes
```bash
xxd < struct | head -5
```

Output:
```
00000000: 420d 0d0a 0000 0000 7079 6930 1001 0000  B.......pyi0....
00000010: e300 0000 0000 0000 0000 0000 0008 0000  ................
00000020: 0040 0000 0073 3800 0000 6400 6401 6402  .@...s8...d.d.d.
00000030: 6403 6404 6405 6406 6407 6708 5a00 6408  d.d.d.d.d.g.Z.d.
00000040: 6409 6c01 5400 6408 640a 6c01 6d02 5a02  d.l.T.d.d.l.m.Z.
```

Mainly we are interested in the first 16 bytes:
```
420d 0d0a 0000 0000 7079 6930 1001 0000
```

> You can find that the first byte of the main program is `e3`, therefore, the contents before `e3` in the struct file are filled to the front of the main program file.

```bash
cp ./aiumful-kucoin ./aimful-kucoin.pyc

set pyc_file ./aimful-kucoin.pyc

# pad file with extra 4 bytes at the beginning
printf '\x00\x00\x00\x00' > $pyc_file.new
cat $pyc_file >> $pyc_file.new
mv $pyc_file.new $pyc_file
# replace the binary header with the 16 bytes above
printf '\x42\x0d\x0d\x0a\x00\x00\x00\x00\x70\x79\x69\x30\x10\x01\x00\x00' | dd of=$pyc_file bs=1 seek=0 count=16 conv=notrunc
```

4. Attempt to decompile the binary
```bash
decompyle3 ./aimful-kucoin.pyc
```

Output:
```
# decompyle3 version 3.7.6
# Python bytecode 3.7 (3394)
# Decompiled from: Python 3.7.12 (default, Oct  9 2021, 17:28:41)
# [Clang 12.0.0 (clang-1200.0.32.29)]
# Embedded file name: dist\obf\aimful-kucoin.py
# Compiled at: 1995-09-27 10:18:56
# Size of source mod 2**32: 272 bytes
from pytransform import pyarmor_runtime
pyarmor_runtime()
__pyarmor__(__name__, __file__, b'PYARMOR\x00\x00\x03\x07\x00B\r\r\n\x06*\xa0\x01\x00\x00\x00\x00\x01\x00\x00\x00@\x00\x00\x00\x94\xa5\x01\x00\x00\x00\x00\x18>\x11
... binary obfuscated ...
```

From here we can deduce that the binary is obfuscated with the `pytransform` library using `pyarmor_runtime()`.
Quick search reveals there are some tools that can de-obfuscate the binary data.

```bash
git clone https://github.com/u0pattern/PyArmor-Deobfuscator.git
# copy PyArmorDeobfuscator.py to the working directory
# ...

decompyle3 ./aimful-kucoin.pyc > ./aimful-kucoin-obf.py
pip install uncompyle6
python ./PyArmorDeobfuscator.py -f ./pyimful-kucoin-obf.py -o ./aimful-kucoin.py
```

Output is:
```
[-] _pytransform.dll file not found [-]
```
At this point we need to start looking at the source code of the decompiler script.
From the comment in the source code we can see that we need the following:
```py
# please make sure you have _pytransform.dll and __init__.py in /dist/pytransform/ directory !!!
```

https://forum.tuts4you.com/topic/41945-python-pyarmor-my-protector/?tab=comments#comment-203008
From another article online, I found that using the extracted files, we can create the following directory structure:
```
.
|-- some-python-bytecode.pyc
`-- pytransform
    |-- __init__.py
    |-- _pytransform.dll
    |-- _pytransform.dylib

1 directory, 5 files
```
The DLL was already included in the directory. For running on OSX I downloaded the pytransform library and placed it in the same directory as the script.
https://pyarmor.dashingsoft.com/platforms.html

The contents of `__init__.py` are:
```py
from pytransform import pyarmor_runtime
pyarmor_runtime('/path/to/runtime')
```
as per docs at https://pyarmor.readthedocs.io/en/latest/understand-obfuscated-scripts.html

5. Another attempt
```bash
python ./PyArmorDeobfuscator.py -f ./pyimful-kucoin-obf.py -o ./aimful-kucoin.py
```
Output is:
```
ImportError: File name: './aimful-kucoin-obf.pyc' doesn't exist
```

Rename `aimful-kucoin.pyc` to `aimful-kucoin-obf.pyc` and re-run the script.
The output is the same as the previous one, with a slight difference because this time we are using uncompyle6 to decompile the file.
```
# uncompyle6 version 3.7.4
# Python bytecode 3.7 (3394)
# Decompiled from: Python 3.7.12 (default, Oct  9 2021, 17:28:41) 
# [Clang 12.0.0 (clang-1200.0.32.29)]
# Embedded file name: dist\obf\aimful-kucoin.py
# Compiled at: 1995-09-27 10:18:56
# Size of source mod 2**32: 272 bytes
from pytransform import pyarmor_runtime
pyarmor_runtime()
__pyarmor__(__name__, __file__, b'PYARMOR\x00\x00\x03\x07\x00B\r\r\n\x06*\xa0\x01\x00\x00\x00\x00\x01\x00\x00\x00@\x00\x00\x00\x94\xa5\x01\x00\x00\x00\x00\x18>\x11\xb8\n\x00\x0
... binary obfuscated ...
```