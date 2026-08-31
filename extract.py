import re
import json

with open("scratch.js", "r") as f:
    content = f.read()

# Find arrays that look like game/project data
# It might have keywords like "description:", "image:", "video:", "link:", "github:"
matches = re.findall(r'(\[\{.*?\}\])', content)
for i, m in enumerate(matches):
    if 'description' in m and 'image' in m:
        print(f"Match {i}:")
        print(m[:500] + "...")
