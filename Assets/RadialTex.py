import math
from PIL import Image, ImageDraw

size = 512

with Image.new('RGBA', (size, size), (255, 255, 255, 0)) as im:
    dsa = []
    for x in range(size):
        for y in range(size):
            angle = math.atan2(y - size / 2, x - size / 2)
            angle = (angle + math.pi) / (2 * math.pi)
            value = int(angle * 255)
            radius = math.sqrt((x - size / 2) ** 2 + (y - size / 2) ** 2)
            alpha = 0 if radius > size / 2 else 255
            alpha = 0 if radius < size / 4 else alpha
            im.putpixel((x, y), (value, value, value, alpha))
    im.save('RadialTex.png')

##    
##    draw = ImageDraw.Draw(im)
##
##    for i in range(256):
##        bbox = (0, 0) + im.size       
##        draw.pieslice(
##            xy = bbox,
##            start = 360 * (i / 256),
##            end = 360 * ((i + 1) / 256),
##            fill = (i, i, i, 255))
##
##    radius = 80
##    draw.ellipse(
##        xy = ((128 - radius, 128 - radius), (128 + radius, 128 + radius)),
##        fill = (255, 255, 255, 0))
##    
##    im.save('RadialTex.png')
