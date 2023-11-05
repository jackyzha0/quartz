# Making an OS
Environment
Mac M1 + Docker -> run on docker container with alpine base -> too complicated
UTM -> ubuntu image
Parallel -> expensive

## Part 1: Hello world
### How a computer boots? 
1. BIOS is copied from a ROM chip into RAM
2. BIOS starts executing code
	1. initializes hardware 
	2. runs some tests
3. BIOS searches and starts the operating system
4. Operating system runs

### How does the operating system starts?
Legacy Booting 
- BIOS loads first sector of each bootable device into memory (0x7C00)
- BIOS checks for 0xAA55 signature
- If found, it starts executing code 

### Steps
1. write asm code
2. assemble code
3. put it in first sector with signature that bios requires 

main.asm
```python
# org (directive) : tells assembler where we expect the code to be loaded, is used to calculate label addresses with the given offset
# bits (directive) : tells assembler to emit 16/32/64-bit code
org 0x7C00 
bits 16 

main:
	hlt # stops cpu from executing (can be resumed with interupt)
.halt:
	jmp .halt

# add signature that bios requires, last two bytes of first sector to be 0xAA55

# program to run on 1.44 megabytes, where one sector  512 bytes

# db (directive) :define bytes, writes bytes given to the assembled binary file
# $ special symbol which is equal to memory offset of the curretnt line
# $$ special symbol which is equal to the memory offset of the beggining of the current section (in our case, the progam so far in bytes)

times 510-($-$$) db 0 

# dw word1, word2 ... (directive) : stands for define words, writes given words (2 byte value encoded in little endian) to the assembled binary file
dw 0AA55h

```

Directive
- Gives a clue to the assembler that will affect how the program gets compiled, not translated to machine code.
- Is assembler specific, different assemblers might have different directives
Instruction
- Translated to a machine code instruction that CPU will execute
## Part 2: 