import os
from rich.progress import track
from git import Repo

if __name__ == '__main__':
    
    content_path = r"C:\Users\83549\Documents\github_proj\content"
    prefix_path = os.path.join(os.path.dirname(__file__), 'content')
    
    file_path_list = []
    date_list = []
    
    for root, dirs, files in os.walk(content_path):
        for file in files:
            
            if '.' in root: 
                continue
            
            # ignore bug and continue running
            

            
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                repo = Repo(content_path)
                file_path = os.path.relpath(file_path, repo.working_dir)
                commit = repo.iter_commits(paths=file_path, max_count=1).__next__()
                # print(f"{file_path} - {str(commit.committed_datetime).split(' ')[0]}")
                
                file_path = file_path.replace('文学', 'literature')
                file_path = file_path.replace('句子', 'sentence')
                
                # check if path exists, no matter capital or not
                
                file_path_list.append(os.path.join(prefix_path, file_path).lower())
                date_list.append(str(commit.committed_datetime).split(' ')[0])
                
                # print(file_path_list[-1])

            
    for root, dirs, files in os.walk(prefix_path):
        for file in files:
            
            if '.' in root: 
                continue
            
            if file.endswith(".md"):
                
                check_path = os.path.join(root, file)
                check_path = check_path.lower()
                
                if check_path in file_path_list:
                    index = file_path_list.index(check_path)
                    file_path = os.path.join(root, file)
                    date = date_list[index]
                    
                    # open file and write date into it
                    f = open(file_path, 'r', encoding="utf-8")
                        
                    lines = f.readlines()
                    for i in range(0, len(lines)):
                        if lines[i].startswith("date:") == True:
                            lines[i] = f"date: {date}\n"

                                
                    f.close()
                    
                    f = open(file_path, 'w', encoding="utf-8")
                    f.writelines(lines)
                    f.close()
                    
                    print(f"{file_path} - {date}")
            
            