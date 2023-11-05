# Deploying a nodejs app to Production

Deploy on server using pm2, set up nginx reverse proxy
https://www.freecodecamp.org/news/deploy-nodejs-app-server-to-production/
requirements: server with ssh and root access
1. create project directory
2. create app.js file with following content
```
```
3. run `npm install `
4. configure nginx (skip for now) reverse proxy
5. run app as process using pm2

Deploy on server using systemd, but not manual update / revision control system (git)
https://medium.com/swlh/localhost-to-com-deploying-a-web-app-for-beginners-ea05b0213eb7
requiremenst: working local project, server with ssh and root access
1. install software on ser, such as nodejs
2. run on server boot using 
stemd service manager in ubuntu, write to `sudo vim /etc/systemd/system/nodeapp.service` 
```
[Unit]  
Description=NodeToProdution  
After=multi-user.target # Run once the multi user environment has loaded.

[Service]  
Type=idle # Run only after everything else is loaded  
Environment="PORT=8080" # This is optional, for environment variables.  
ExecStart=/usr/bin/node /root/myapp/app.js # Command to run.

[Install]  
WantedBy=multi-user.target
```
3. 



notes:
1. https://unix.stackexchange.com/questions/368100/where-to-place-user-created-systemd-unit-files
2. https://stackoverflow.com/questions/29739715/how-can-i-run-pm2-on-a-certain-node-version
3. https://stackoverflow.com/questions/29349684/how-can-i-specify-the-required-node-js-version-in-package-json

## Deploying an Node.js App to Personal Server in Production with Github Actions and PM2
https://medium.com/@g.c.dassanayake/deploying-a-nodejs-application-using-github-actions-e5f4bde7b21b
requirements: github account, server, 
1. create a local node.js application
2. create a github repository and push initial application
3. create github workflow file
4. create github actions self hosted runner 
5. configure pm2 to daemonize program
6. open port to the web through port routing 

other things to learn
- nginx and reverse poxy 


## PM2 
ERROR: How to daemonize application using pm2 and yarn
SOLUTION: 
## Silencing React.Js warnings 
ERROR: When running cicd, get "Treating warnings as errors because process.env.CI = true"
SOLUTION: 

