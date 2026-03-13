import re

with open('blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the incorrect escaped quotes
html = html.replace("openMediaModal(\\'image\\', \\'./blog/mcc25/image", "openMediaModal('image', './blog/mcc25/image")
html = html.replace(".jpg\\')", ".jpg')")

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Escaped quotes fixed.")
