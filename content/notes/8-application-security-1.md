---
title: "8-application-security-1"
aliases: 
tags: 
- comp210
- lecture
---

application development security
- human error
- policy failure
- physical access
- network access
- social engineering
- software flaws
	- third party
	- created by you

# 10 immuntable laws of security
1. If a bad guy can persuade you to run his program on your computer, it’s not your computer anymore. 
2. If a bad guy can alter the operating system on your computer, it’s not your computer anymore. 
3. If a bad guy has unrestricted physical access to your computer, it’s not your computer anymore. 
4. If you allow a bad guy to upload programs to your website, it’s not your website any more. 
5. Weak passwords trump strong security. 
6. A computer is only as secure as the administrator is trustworthy. 
7. Encrypted data is only as secure as the decryption key.
8. An out of date virus scanner is only marginally better than no virus scanner at all.
9. Absolute anonymity isn’t practical, in real life or on the Web. 
10. Technology is not a panacea.

![laws from dev persepctive](https://i.imgur.com/QtdVqLd.png)
![laws from dev persepctive](https://i.imgur.com/jCIi9mw.png)


# Cost of data breach
about $150 per record. or 3.86 million per US company

Costs include:
- Notifying affected customers 
- Hiring forensic experts 
- Additional call centers 
- Providing credit monitoring services to those affected
- Internal investigations 
- Lost customers 
- Lost reputation 
- Public relations

The costs vary significantly from county to country: 
- Differences in privacy related laws. 
- Costs relating to notifying affected customers vary widely. 
- Some countries have additional penalties for breaches involving medical records and data relating to minors. 
- Some countries/regions experience more destructive attacks.

Other interesting points made in the report: 
- Average time to to discover a breach was 207 days. 
- Average time to contain a breach was 73 days. 
- 80% of breaches exposed customer’s PII (Personally Identiable Information). 
- A company has a ~30% chance of having a serious data breach within the next 2 years (based on 2019 report). 
- The per-record cost increases with the number of records breached


# CWE/SANS
CWE - Common Weakness Enumeration. A community developed list of software security flaw, and details on how to avoid them. 
SANS - (SysAdmin, Audit, Network, Security) Institute. A research and education institute for security practitioners. 
MITRE - A not-for-profit research organisation that works with the US government.

## Top 25 errors
1. Out-of-bounds Write ** 
2. Cross-site Scripting (XSS) ** 
3. Out-of-bounds Read ** 
4. Improper Input Validation ** 
5. OS Command Injection ** 
6. SQL Injection ** 
7. Use After Free ** 
8. Path Traversal ** 
9. Cross-Site Request Forgery (CSRF) ** 
10. Unrestricted Upload ** 
11. Missing Authentication * 
12. Integer Overflow 
13. Deserialization of Untrusted Data ** 
14. Improper Authentication * 
15. NULL Pointer Dereference ** 
16. Use of Hard-coded Credentials 
17. Buffer overflow ** 
18. Missing Authorization * 
19. Incorrect Default Permissions * 
20. Exposure of Sensitive Information ** 
21. Insufficiently Protected Credentials 
22. Incorrect Permission Assignment * 
23. Improper Restriction of XML External Entity Reference 
24. Server-Side Request Forgery 
25. Command Injection ** 


**. covered in this lecture
*. Covered in other lectures 

## OWASP top 10 errors
1. Injection 
2. Broken Authentication 
3. Sensitive Data Exposure 
4. XML External Entities (XXE) 
5. Broken Access Control 
6. Security Misconfiguration 
7. Cross-Site Scripting (XSS) 
8. Insecure Deserialization 
9. Using Components with Known Vulnerabilities 1
0. Insufficient Logging & Monitoring

# Software development is not a core competency
- A ‘core competency’ is an area that an organisation has extensive skill and experience in.
	- Usually something that contributes directly to the organisation’s revenue stream, and that they consider to be a competitive advantage.
- Unless the organisation is actually a software development business (or similar) then they probably lack the necessary skills and experience to manage a development project.
	- Often massively underestimating the costs and complexity. 
		- Ideally they will contract the development to a reputable software development company. 
		- Too often this is not the case.

# Layers of abstraction
1. Transistors
2. Logic gates
3. Arithmetic circuits
4. Arithmetic logic units (ALU)
5. Instruction set architectures (ISA)
6. Machine code
7. Compilers
8. Programming languages
9. OS kernels and drivers 
10. System APIs 
11. Programming language APIs 
12. Library APIs 
13. Application APIs 
14. Applications

It is very likely that there are security flaws in lower layers before we even start writing code

# Deficiencies in programming languages
some of these flaws are due to issue with programming languages. e.g.,
- buffer overflow (1, 3, 17)
- use after free (7)

Ideally the compiler or runtime should be able to detect these and throw an error. Some languages, like C and C++ dont. This is why some experts reccomend that they shuold no longer be used for systems and server programming

# Injection flaws
## SQL injection
- a user provides malicious data which gets executed due to poorly constructed code.

- fix by using prepared statements(java) or equivalent
- use input sanitation libraries

## command injection

## cross site scripting