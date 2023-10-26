#Services 

---

#### # Get Image

Open Docker

From [gvenzl Oracle-Free](https://hub.docker.com/r/gvenzl/oracle-free)

```cmd
// Pull Image
docker pull gvenzl/oracle-free

// Run DB Container
docker run -d -p 1521:1521 -e ORACLE_PASSWORD=root1234/ gvenzl/oracle-free
```

---
#### # Create User

Open Docker - Oracle Container with Terminal

```cmd
// starts Oracle SQL*Plus-Tool with admin-rights
sqlplus / as sysdba

// Creates User CLEMENS - Password: SCHMID
CREATE USER CLEMENS IDENTIFIED BY SCHMID;
GRANT CONNECT TO CLEMENS;
GRANT RESOURCE,UNLIMITED TABLESPACE TO CLEMENS;
```

---
