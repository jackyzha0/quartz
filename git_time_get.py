# import os
# from rich.progress import track
# from git import Repo

# if __name__ == '__main__':
    
#     content_path = os.path.join(os.path.dirname(__file__), 'content')
    
#     for root, dirs, files in os.walk(content_path):
#         for file in files:
            
#             if '.' in root: 
#                 continue
            
#             # ignore bug and continue running
            
#             try:
            
#                 if file.endswith(".md"):
#                     file_path = os.path.join(root, file)
#                     repo = Repo(content_path)
#                     file_path = os.path.relpath(file_path, repo.working_dir)
#                     commit = repo.iter_commits(paths=file_path, max_count=1).__next__()
#                     # print(f"{file_path} - {str(commit.committed_datetime).split(' ')[0]}")
                    
#                     flag = False
                    
#                     # open file and write date into it
#                     f = open(os.path.join(root, file), 'r', encoding="utf-8")
                        
#                     lines = f.readlines()
#                     if lines[0].startswith("---"):
#                         for i in range(1, len(lines)):
#                             if lines[i] == "---\n" and lines[i-1].startswith("date") == False:
#                                 flag = True
#                                 lines.insert(i, f"date: {str(commit.committed_datetime).split(' ')[0]}\n")
#                                 break
#                             if lines[i] == "---\n" and lines[i-1].startswith("date") == True:
#                                 break
                                
#                     f.close()
                        
                    
#                     if flag == True:
                        
#                         f = open(os.path.join(root, file), 'w', encoding="utf-8")     
                        
#                         f.writelines(lines)
#                         print(f"{file_path} - {str(commit.committed_datetime).split(' ')[0]}")
                            
#                         f.close()
                                
                            
                    
#             except:
#                 # output error message
#                 print(f"Error: {file_path}")
#                 pass
#                 continue
    
#     print()        
#     print('--------------------------------------')
#     print
     
#     try:
            
#         for root, dirs, files in os.walk(content_path):
#             for file in files:
                
#                 if "." in root:
#                     continue
                
#                 if '.md' in file:    
                
#                     with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
#                         lines = f.readlines()
#                         if lines[0].startswith("---") == False:
#                             print(f"{os.path.join(root, file)}")
                            
#                     f.close()
                
#     except:
#         print(f"Error: {os.path.join(root, file)}")
#         pass


import os
from rich.progress import track
from git import Repo

if __name__ == '__main__':
    
    content_path = os.path.join(os.path.dirname(__file__), 'content')
    
    for root, dirs, files in os.walk(content_path):
        for file in files:
            
            if '.' in root: 
                continue
            
            # ignore bug and continue running
            
            try:
            
                if file.endswith(".md"):
                    file_path = os.path.join(root, file)
                    repo = Repo(content_path)
                    file_path = os.path.relpath(file_path, repo.working_dir)
                    commit = repo.iter_commits(paths=file_path, max_count=1).__next__()
                    print(f"{file_path} - {str(commit.committed_datetime).split(' ')[0]}")

                                
                            
                    
            except:
                # output error message
                print(f"Error: {file_path}")
                pass
                continue