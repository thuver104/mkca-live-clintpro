import re

with open('blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all <a href="....jpg" target="_blank"> with <div onclick="openMediaModal('image', '....jpg')" class="cursor-pointer">
html = re.sub(
    r'<a href="(\./blog/mcc25/image\d\.jpg)" target="_blank">',
    r'<div onclick="openMediaModal(\'image\', \'\1\')" class="cursor-pointer">',
    html
)

html = re.sub(
    r'(alt="Gallery">)</a>',
    r'\1</div>',
    html
)

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Gallery updated")
