# IO Instruction
**Def**:: I/O instructions enables computer's ==I/O== to give and recieve data from the [[Periferal Devices|periferal devices]] <!--SR:!2022-02-10,3,250-->

- Every microprocessor has instruction to give and read io device information.
- For this reason, 8086 has ==IN== and ==OUT== instruction to recieve and give repectavly.
- The port number is specfied along with IN and OUT instruction.
- Both instruction uses register ==AL or AX== to ==transfer data==.
- The IO address is stored ::: in DX register.

## 1. Classification According to transfering data type.
---
There are two types of I/O instruction
1. Those that transfer single item
2. Thos that transfer a string of item


