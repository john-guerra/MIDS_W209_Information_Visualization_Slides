import os
import sys
import re
import shutil
import glob

from pathlib import Path

if len(sys.argv) > 2:
  print("""Usage
    python filter_unused_images.py""")

  sys.exit(-1)

IMAGES_FOLDER = Path("shared_images").resolve()
BASE_FOLDER = Path(".").resolve()

def get_image_list():
  images = []

  original_path = os.getcwd()

  for path in BASE_FOLDER.rglob("index.pug"):
    print("scanning ", path,)
    os.chdir(path.parent)

    for line in open("index.pug").readlines():
      images_found = re.findall(r'"\.\./shared_images/.*\.\w*"', line)
      if len(images_found) > 0:
        images.append(Path(images_found[0].replace('"','')).resolve())
    print(len(images), " currently")


  print("moving to the original path", original_path)
  os.chdir(original_path)
  return images



def move_images(images_used):
  prev_path = os.getcwd()
  os.chdir(BASE_FOLDER)



  for image_path in IMAGES_FOLDER.rglob("*"):
    unused_folder = os.path.join(image_path.parent, "unused_images")

    if not os.path.exists(unused_folder):
      os.mkdir(unused_folder)


    # print(image_path, image_path.is_dir())
    if image_path.is_dir() or str(image_path) == ".DS_Store" or str(image_path).find("unused_images")!=-1:
      continue

    if not image_path.resolve() in images_used:
      print("%s unused, moving it" % image_path)
      try:
        shutil.move(str(image_path), unused_folder)
      except Exception as e:
        print ("error moving", e)

  os.chdir(prev_path)



images_used = get_image_list()
print("Images found:")
print(images_used)

print("moving images")
move_images(images_used)