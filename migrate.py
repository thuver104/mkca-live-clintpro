import re
import sys

def apply_theme(filename, out_filename):
    with open('blog.html', 'r', encoding='utf-8') as f:
        blog_html = f.read()
        
    head_match = re.search(r'(<!DOCTYPE html>.*?<body[^>]*>)', blog_html, re.DOTALL)
    new_head = head_match.group(1)
    
    bg_match = re.search(r'(<!-- Ambient Animated Background -->.*?)<!-- Floating Navigation -->', blog_html, re.DOTALL)
    new_bg = bg_match.group(1)
    
    nav_match = re.search(r'(<!-- Floating Navigation -->.*?)<!-- Hero Section -->', blog_html, re.DOTALL)
    new_nav = nav_match.group(1)
    
    footer_match = re.search(r'(<!-- Premium Footer -->.*?)<!-- Scripts -->', blog_html, re.DOTALL)
    new_footer = footer_match.group(1)
    
    scripts_match = re.search(r'(<!-- Scripts -->.*?)</body>', blog_html, re.DOTALL)
    new_scripts = scripts_match.group(1)

    with open(filename, 'r', encoding='utf-8') as f:
        target_html = f.read()

    body_content = re.sub(r'<!DOCTYPE html>.*?<body[^>]*>', '', target_html, flags=re.DOTALL)
    body_content = re.sub(r'<!-- Floating Chess Pieces Background -->.*?</div>\s*<!-- Hero Background with Enhanced Overlay -->.*?</div>', '', body_content, flags=re.DOTALL)
    body_content = re.sub(r'<!-- Navigation -->.*?</nav>', '', body_content, flags=re.DOTALL)
    body_content = re.sub(r'<!-- Footer -->.*?</footer>', '', body_content, flags=re.DOTALL)
    body_content = re.sub(r'<!-- Back to Top Button -->.*?</button>', '', body_content, flags=re.DOTALL)
    body_content = re.sub(r'<!-- Scripts -->.*?</html>', '', body_content, flags=re.DOTALL)

    replacements = {
        'bg-chess-dark ': 'bg-chess-950 ',
        'bg-chess-darker': 'bg-chess-900',
        'text-chess-light': 'text-chess-100',
        'text-chess-gray': 'text-slate-400',
        'bg-white/10': 'glass-card border-none',
        'bg-white/5': 'bg-chess-800/40 border-none',
        'bg-white/15': 'glass-card border-none',
        'backdrop-blur-xl': 'backdrop-blur-xl',
        'backdrop-blur-2xl': 'backdrop-blur-2xl',
        'border-white/20': 'border-chess-700/50',
        'border-white/30': 'border-chess-700/50',
        'text-chess-accent': 'text-chess-accent',
        'font-serif': 'font-heading tracking-wide',
        'font-sans': 'font-sans',
        'rounded-3xl': 'rounded-[2rem]',
        'rounded-2xl': 'rounded-[1.5rem]',
        'bg-gradient-to-r from-chess-accent to-chess-accent-light': 'text-gradient-gold',
        'bg-clip-text text-transparent': '', 
        'text-5xl md:text-7xl lg:text-8xl': 'text-5xl sm:text-7xl lg:text-8xl',
        'animate-slide-up': 'animate-fade-in-up',
        'animate-fade-in': 'animate-fade-in-up',
        'min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center': 'relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 text-center z-10 flex flex-col items-center animate-fade-in-up',
        '<section id="home" class="': '<section id="home" class="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-4 text-center z-10 flex flex-col items-center ',
        '<section class="relative z-10 min-h-screen': '<section class="relative z-10 pt-40 pb-20 lg:pt-52 lg:pb-32',
    }

    for old, new in replacements.items():
        body_content = body_content.replace(old, new)
        
    if 'index.' in filename:
        current_nav = new_nav.replace('href="./index.html" class="text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"', 'href="./index.html" class="text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"')
        current_nav = current_nav.replace('href="./blog.html" class="text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"', 'href="./blog.html" class="text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"')
    elif 'tournaments.' in filename:
        current_nav = new_nav.replace('href="./tournaments.html" class="text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"', 'href="./tournaments.html" class="text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"')
        current_nav = current_nav.replace('href="./blog.html" class="text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"', 'href="./blog.html" class="text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"')
    elif 'rplayels.' in filename:
        current_nav = new_nav.replace('href="./rplayels.html" class="text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"', 'href="./rplayels.html" class="text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"')
        current_nav = current_nav.replace('href="./blog.html" class="text-sm font-bold text-chess-accent relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-chess-accent after:rounded-full"', 'href="./blog.html" class="text-sm font-medium text-slate-300 hover:text-chess-accent transition-colors"')
    else:
        current_nav = new_nav
        
    combined_scripts = new_scripts.replace('</script>', '''
        // Academy Hours Update
    document.addEventListener("DOMContentLoaded", () => {
      const now = new Date();
      const hours = now.getHours();
      const messageElement = document.getElementById("academy-message");
      if (messageElement) {
        if (hours >= 8 && hours < 21) {
          messageElement.textContent = "Academy doors are open!";
        } else {
          messageElement.textContent = "We're done for the day. Catch you tomorrow!";
        }
      }
    });

    // Old Modals & Extras

    function openModal(src) {
        const modal = document.getElementById("imageModal");
        if(modal) {
          const modalImg = document.getElementById("modalImage");
          modalImg.src = src;
          modal.classList.remove("hidden");
          document.body.classList.add("overflow-hidden");
        }
    }
    function closeModal() {
        const modal = document.getElementById("imageModal");
        if(modal) {
          modal.classList.add("hidden");
          document.body.classList.remove("overflow-hidden");
        }
    }
    document.addEventListener("keydown", (e) => {
        const m = document.getElementById("imageModal");
        if (e.key === "Escape" && m && !m.classList.contains("hidden")) {
          closeModal();
        }
    });

    const launchDate = new Date("June 21, 2026 00:00:00").getTime();
    if(document.getElementById("days")) {
      const countdown = setInterval(function () {
        const now = new Date().getTime();
        const distance = launchDate - now;
        if(distance < 0) return;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let d = document.getElementById("days"); if(d) d.innerHTML = days.toString().padStart(2, "0");
        let h = document.getElementById("hours"); if(h) h.innerHTML = hours.toString().padStart(2, "0");
        let m = document.getElementById("minutes"); if(m) m.innerHTML = minutes.toString().padStart(2, "0");
        let s = document.getElementById("seconds"); if(s) s.innerHTML = seconds.toString().padStart(2, "0");
      }, 1000);
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          if(this.getAttribute("href")==="#") return;
          const target = document.querySelector(this.getAttribute("href"));     
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            const mobileMenu = document.getElementById("mobile-menu");
            const menuBtn = document.getElementById("mobile-menu-btn");
            if (mobileMenu && !mobileMenu.classList.contains("mobile-menu-closed")) {
              mobileMenu.classList.remove("mobile-menu-open");
              mobileMenu.classList.add("mobile-menu-closed");
              if(menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
          }
        });
      });
    </script>
    ''')
    
    # We must also inject the modal HTML structure into the body if it is missing
    modal_html = '''
    <!-- Image Modal -->
    <div id="imageModal" class="fixed inset-0 bg-chess-950/90 backdrop-blur-md flex items-center justify-center hidden z-[1000]" onclick="closeModal()">
      <div class="relative max-w-4xl max-h-[90vh] p-4">
        <img id="modalImage" src="" alt="Enlarged Image" class="max-w-full max-h-[90vh] rounded-2xl shadow-2xl glass-card border border-slate-700/50" onclick="event.stopPropagation()" />
        <button class="absolute -top-4 -right-4 text-white text-3xl font-bold bg-chess-accent text-chess-950 rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform duration-300" onclick="closeModal()" aria-label="Close Modal">x</button>
      </div>
    </div>
    '''
    
    final_html = f"{new_head}\n{new_bg}\n{current_nav}\n{body_content}\n{modal_html}\n{new_footer}\n{combined_scripts}\n</body>\n</html>"

    with open(out_filename, 'w', encoding='utf-8') as f:
        f.write(final_html)

apply_theme('index.old.html', 'index.html')
apply_theme('tournaments.old.html', 'tournaments.html')
apply_theme('rplayels.old.html', 'rplayels.html')
print("Fixed missing unclosed divs!")
