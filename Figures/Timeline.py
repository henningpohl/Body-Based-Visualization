import matplotlib.colors as mcolors
import cairo

colors = [mcolors.to_rgb(x) for x in mcolors.TABLEAU_COLORS.values()]

# start, end, in, out, row, color
events = [
    # name tag
    (0, 360, 0, 0, 0, colors[0]),
    # emotion tracker
    (80, 240, 30, 30, 1, colors[2]),
    # weather
    (140, 280, 30, 0, 2, colors[1]), # clouds
    (200, 310, 40, 10, 2, colors[5]), # rain
    # messages (active for 20s)
    (40, 75, 15, 15, 3, colors[3]),
    (80, 115, 15, 15, 3, colors[3]),
    (150, 185, 15, 15, 3, colors[3]),
    (230, 265, 15, 15, 3, colors[3]),
    (280, 315, 15, 15, 3, colors[3]),
    # clock
    (15, 360, 20, 0, 4, colors[4])
]

def draw_bar(ctx, start, end, in_len, out_len, y, height, col):
    l = end - start
    pat = cairo.LinearGradient(start, y, end, y)
    pat.add_color_stop_rgba(0, col[0], col[1], col[2], 0)
    pat.add_color_stop_rgba(in_len / l, col[0], col[1], col[2], 1)
    pat.add_color_stop_rgba(1 - out_len / l, col[0], col[1], col[2], 1)
    pat.add_color_stop_rgba(1, col[0], col[1], col[2], 0)
    ctx.rectangle(start, y, l, height)
    ctx.set_source(pat)
    ctx.fill()

with cairo.SVGSurface('Timeline Template.svg', 360, 100) as surface:
    ctx = cairo.Context(surface)

    ctx.set_line_width(0.5)
    for x in range(0, 361, 60):
        ctx.move_to(x, 100)
        ctx.line_to(x, 2)
    ctx.set_source_rgb(0.7, 0.7, 0.7)
    ctx.stroke()

    for start, end, in_len, out_len, row, color in events:
        draw_bar(ctx, start, end, in_len, out_len, 5 + row * 18, 15, color)



    
