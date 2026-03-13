import re

with open('tournaments.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract the Mullai block
mullai_match = re.search(r'(<!-- Mullai Chess Championship 2025 -->.*?)(?=<!-- 2nd Rapid Championship -->|<\!-- Past Tournaments Section -->|</section>)', html, re.DOTALL)
if not mullai_match:
    print("Match failed. Could not locate block.")
else:
    mullai_block = mullai_match.group(1)
    
    # Remove it from its original spot
    html = html.replace(mullai_block, '')
    
    # Modify "EVENT ENDED" to "EVENT COMPLETED" 
    mullai_block = mullai_block.replace('bg-red-600', 'bg-green-600')
    mullai_block = mullai_block.replace('EVENT ENDED', 'EVENT COMPLETED')
    mullai_block = mullai_block.replace('Registration open', 'Registration closed') # just in case
    
    # we want to insert it directly after the Past Tournaments heading
    past_header = 'Past Tournaments\n          </h2>\n'
    if past_header in html:
        html = html.replace(past_header, past_header + '\n' + mullai_block)
        
        with open('tournaments.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Successfully moved Mullai Chess Championship to Past Tournaments!")
    else:
        print("Failed to find past tournaments header.")
