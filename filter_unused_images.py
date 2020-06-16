import os
import sys
import re
import shutil
import glob

if len(sys.argv) < 2:
  print """Usage
    python filter_unused_images.py folder"""

  sys.exit(-1)



def getImageList(path):
  images = []
  for line in open(path).readlines():
    imagesFound = re.findall("images/.*\.\w*", line)
    if len(imagesFound) > 0:
      images.append(imagesFound[0])
  return images


def moveImages(path, imagesUsed):
  prev_path = os.getcwd()
  os.chdir(path)
  unused_folder = os.path.join("images", "unused_images")
  if not os.path.exists(unused_folder):
    os.mkdir(unused_folder)

  for imagePath in glob.glob(os.path.join("images", "*.*")):
    # print imagePath
    if not imagePath in imagesUsed:
      print "%s unused, moving it" % imagePath
      shutil.move(imagePath, unused_folder)

  os.chdir(prev_path)


folder = sys.argv[1]

imagesUsed = getImageList(os.path.join(folder, "index.jade"))
print "Images found:"
print imagesUsed

print "moving images"
moveImages(folder, imagesUsed)