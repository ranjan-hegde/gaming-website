import re
with open("scratch.js", "r") as f:
    content = f.read()
# Try to find common properties for games/projects
matches = re.findall(r'(\w+:\s*["\'].*?["\'])', content)
keys = set()
for m in matches:
    keys.add(m.split(':')[0].strip())
print(f"Common keys: {list(keys)[:20]}")

# Let's extract all string literals that are relatively long, they might be descriptions
strings = re.findall(r'(["\'])(.*?)\1', content)
descriptions = [s[1] for s in strings if len(s[1]) > 50 and ' ' in s[1] and not '<' in s[1]]
print("Possible descriptions:")
for d in descriptions[:10]:
    print("- " + d)
