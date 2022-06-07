


```
adb backup -noapk com.ecell.www.LookfitPlatform

( printf "\x1f\x8b\x08\x00\x00\x00\x00\x00" ; tail -c +25 backup.ab ) |  tar xfvz -

```


[Reverse app - Android encrypted database backup files and sqliteCipher - Code World](https://www.codetd.com/en/article/8389711)

[cmd - How to extract or unpack an .ab file (Android Backup file) - Stack Overflow](https://stackoverflow.com/a/46500482)

[Backup and Restore](https://commonsware.com/Room/pages/chap-sqlciphermgmt-001.html)

![[Pasted image 20220507220447.png]]


[Unpacking Android backups](https://nelenkov.blogspot.com/2012/06/unpacking-android-backups.html)

