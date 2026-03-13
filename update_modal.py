import re

with open('blog.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add modal HTML and JS at the end of the <body>
modal_code = """
  <!-- Media Modal -->
  <div id="media-modal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md hidden opacity-0 transition-opacity duration-300" onclick="closeMediaModal()">
    <button class="absolute top-6 right-6 text-white hover:text-chess-accent text-5xl transition-colors" onclick="closeMediaModal()">&times;</button>
    <div class="max-w-6xl w-full mx-4 max-h-[90vh] flex justify-center items-center" onclick="event.stopPropagation()">
      <img id="modal-img" class="hidden max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain" src="" alt="Modal Media" />
      <video id="modal-vid" class="hidden max-h-[85vh] w-full rounded-lg shadow-2xl" controls controlsList="nodownload"></video>
    </div>
  </div>

  <script>
    function openMediaModal(type, src) {
      const modal = document.getElementById('media-modal');
      const img = document.getElementById('modal-img');
      const vid = document.getElementById('modal-vid');
      
      if (type === 'image') {
        img.src = src;
        img.classList.remove('hidden');
        vid.classList.add('hidden');
        vid.pause();
      } else if (type === 'video') {
        vid.src = src;
        vid.classList.remove('hidden');
        img.classList.add('hidden');
        vid.play();
      }
      
      modal.classList.remove('hidden');
      setTimeout(() => modal.classList.remove('opacity-0'), 10);
    }

    function closeMediaModal() {
      const modal = document.getElementById('media-modal');
      const vid = document.getElementById('modal-vid');
      
      modal.classList.add('opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        vid.pause();
        vid.src = '';
      }, 300);
    }
  </script>
</body>"""

if 'id="media-modal"' not in html:
    html = html.replace('</body>', modal_code)

# 2. Update Video Links
v1_old = '<a href="./blog/mcc25/mediaclip/MullaiMedia.mp4" target="_blank" class="block aspect-video'
v1_new = '<div onclick="openMediaModal(\'video\', \'./blog/mcc25/mediaclip/MullaiMedia.mp4\')" class="block aspect-video'
v2_old = '<a href="./blog/mcc25/mediaclip/DanNews.mp4" target="_blank" class="block aspect-video'
v2_new = '<div onclick="openMediaModal(\'video\', \'./blog/mcc25/mediaclip/DanNews.mp4\')" class="block aspect-video'

html = html.replace(v1_old, v1_new)
html = html.replace(v2_old, v2_new)
html = html.replace('</video>\n               </a>', '</video>\n               </div>')

# 3. Update Image Gallery Links
gallery_old = '''               <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  <a href="./blog/mcc25/image1.jpg" target="_blank"><img src="./blog/mcc25/image1.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></a>
                  <a href="./blog/mcc25/image2.jpg" target="_blank"><img src="./blog/mcc25/image2.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></a>
                  <a href="./blog/mcc25/image3.jpg" target="_blank"><img src="./blog/mcc25/image3.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></a>
                  <a href="./blog/mcc25/image4.jpg" target="_blank"><img src="./blog/mcc25/image4.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></a>
                  <a href="./blog/mcc25/image5.jpg" target="_blank"><img src="./blog/mcc25/image5.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></a>
                  <a href="./blog/mcc25/image6.jpg" target="_blank"><img src="./blog/mcc25/image6.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></a>
               </div>'''

gallery_new = '''               <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  <div onclick="openMediaModal('image', './blog/mcc25/image1.jpg')" class="cursor-pointer"><img src="./blog/mcc25/image1.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></div>
                  <div onclick="openMediaModal('image', './blog/mcc25/image2.jpg')" class="cursor-pointer"><img src="./blog/mcc25/image2.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></div>
                  <div onclick="openMediaModal('image', './blog/mcc25/image3.jpg')" class="cursor-pointer"><img src="./blog/mcc25/image3.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></div>
                  <div onclick="openMediaModal('image', './blog/mcc25/image4.jpg')" class="cursor-pointer"><img src="./blog/mcc25/image4.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></div>
                  <div onclick="openMediaModal('image', './blog/mcc25/image5.jpg')" class="cursor-pointer"><img src="./blog/mcc25/image5.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></div>
                  <div onclick="openMediaModal('image', './blog/mcc25/image6.jpg')" class="cursor-pointer"><img src="./blog/mcc25/image6.jpg" class="w-full h-24 object-cover rounded-lg border border-slate-700 hover:opacity-75 transition-opacity" alt="Gallery"></div>
               </div>'''

html = html.replace(gallery_old, gallery_new)

with open('blog.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated successfully")
