# Quartz Commands

- ./watch.sh
     - !#/bin/bash

       cd  ~/Documents/quartz; nodemon -w ~/Documents/The_Cosmos -w ~/Documents/quartz/assets/js -w ~/Documents/quartz/styles -w ~/Documents/quartz/layouts -w ~/Documents/quartz/config.toml -w ~/Documents/quartz/data/config.yaml -x "~/Documents/quartz/compile.sh" -e md,html,js,scss,xml
    - Will watch the obsidian vault. Whenever it sees a change its going to compile that content using obsidian export, pass that to hugo obsidian and then hugo obsidian is going to drop that content into the content folder within quartz
- ./compile.sh
     - !#/bin/bash

       cd ~/Documents/hugo-obsidian; rm -fr ~/Documents/quartz/content/*; rm -rf ~/Documents/quartz/public/*; ~/Documents/obsidian-export/target/debug/obsidian-export ~/Documents/The_Cosmos ~/Documents/quartz/content; go run ~/Documents/hugo-obsidian -input=/Users/cyb3r/Documents/quartz/content -output=/Users/cyb3r/Documents/quartz/assets/indices -index -root=/Users/cyb3r/Documents/quartz; (cd ~/Documents/quartz && hugo --minify)
    - when a file changes it will run this compile script. Makes sure your in the hugo-obsidian directory. Empties out the content from previous runs. Empties public folder to make sure nothing is there as well. Adds title command convert the path of the file to the title in the front matter. Hugo looks at that front matter to determine title to show inside the layout and you don't get that from automatically from quartz or hugo-obsidian so obsidian export will do it for you. The n it will look inside your obsidian vault directory and put that into quartz content directory. Then runs hugo--obsidian 
- ./serve.sh
    - I think this one just starts the local server