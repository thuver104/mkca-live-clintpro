import re

with open('tournaments.html', 'r', encoding='utf-8') as f:
    html = f.read()

mullai_match = re.search(r'(<!-- Mullai Chess Championship 2025 -->.*?)(?=</section>)', html, re.DOTALL)
if not mullai_match:
    print("Match failed")
else:
    mullai_block = mullai_match.group(1)
    # verify this is the current tournament section block
    
    html = html.replace(mullai_block, '')
    
    mullai_block = mullai_block.replace('bg-red-600 text-white px-4 py-2\nrounded-full mt-4 font-semibold">EVENT ENDED</div>', 'bg-green-600 text-white px-4 py-2 rounded-full mt-4 font-semibold mb-4">EVENT COMPLETED</div>')
    mullai_block = mullai_block.replace('EVENT ENDED', 'EVENT COMPLETED')
    mullai_block = mullai_block.replace('bg-red-600', 'bg-green-600')
    
    past_match = re.search(r'(<!-- Past Tournaments Section -->\s*<section[^>]+>\s*<div[^>]+>\s*<h2[^>]+>\s*Past Tournaments\s*</h2>)', html, re.DOTALL)
    
    if past_match:
        past_tourney_headers = past_match.group(1)
        html = html.replace(past_tourney_headers, past_tourney_headers + '\n\n' + mullai_block)
        
        # Write back
        with open('tournaments.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Success")
    else:
        print("Failed to find past tournaments insertion point.")
