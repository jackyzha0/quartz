import os
from rich.progress import track
from git import Repo

if __name__ == '__main__':
    
    content_path = os.path.join(os.path.dirname(__file__))
    prefix_path = os.path.join(content_path, "content")
    
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
                    # print(f"{file_path} - {str(commit.committed_datetime).split(' ')[0]}")
                    
                    # check if path exists, no matter capital or not
                    print(os.path.join(prefix_path, file_path))

                                
                            
                    
            except:
                # output error message
                print(f"Error: {file_path}")
                pass
                continue