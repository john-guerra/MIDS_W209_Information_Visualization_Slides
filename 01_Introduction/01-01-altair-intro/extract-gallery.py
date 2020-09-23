grep -o '[-a-z_0-9]*.html' altair-gallery.html | pbcopy

for i in range(13,33):
    print("""          section
            img(src="../shared_images/altair-01-{}.png")""".format(i))
