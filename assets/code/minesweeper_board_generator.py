import random
import numpy as np
from skimage.measure import label
from scipy import ndimage

print('This is a minesweeper board generator.')

while True:
    try:
        width = int(input('Enter the board width: '))
        if width < 1:
            print('Board width must be at least 1.')
        else:
            break
    except ValueError:
        print('Enter only an integer value.')

while True:
    try:
        height = int(input('Enter the board height: '))
        if height < 1:
            print('Board height must be at least 1.')
        else:
            break
    except ValueError:
        print('Enter only an integer value.')

uncleared_cells = np.zeros((height, width), dtype=int)

while True:
    try:
        mine_set = str(input(f'Enter the mine density (0% - 100%) or mine count (0 - {width * height}): '))
        if mine_set.find('%') > -1:  # Triggers if mine density value is entered
            mine_freq = mine_set.split('%')[0]
            if float(mine_freq) < 0 or float(mine_freq) > 100:
                print(f'Mine density must be between 0% and 100%.')
            else:  # Places mines according to mine density value
                mine_count = 0
                mine_freq_current = 0
                while mine_freq_current < float(mine_freq):
                    target_x = random.randint(0, width - 1)
                    target_y = random.randint(0, height - 1)
                    if uncleared_cells[target_y, target_x] == 0:
                        uncleared_cells[target_y, target_x] = 9
                        mine_freq_current += 100 / (width * height)
                        mine_count += 1
                break
        else:  # Triggers if mine count value is entered
            if float(mine_set) < 0 or float(mine_set) > (width * height):
                print(f'Mine count must be between 0 and {width * height}.')
            else:  # Places mines according to mine count value
                mine_count = 0
                while mine_count < float(mine_set):
                    target_x = random.randint(0, width - 1)
                    target_y = random.randint(0, height - 1)
                    if uncleared_cells[target_y, target_x] == 0:
                        uncleared_cells[target_y, target_x] = 9
                        mine_count += 1
                break
    except ValueError:
        print('Invalid input.')

cleared_cells = np.ndarray.copy(uncleared_cells)

for y in range(height):
    for x in range(width):
        num_neighbors = 0
        for dy in range(-1 if y > 0 else 0, 2 if y < height - 1 else 1):
            for dx in range(-1 if x > 0 else 0, 2 if x < width - 1 else 1):
                if uncleared_cells[y + dy, x + dx] == 9:
                    num_neighbors += 1
        if uncleared_cells[y, x] == 0 and num_neighbors > 0:
            cleared_cells[y, x] = num_neighbors

reformat_dict = {0: 1, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}
reformatted_board = np.vectorize(reformat_dict.get)(cleared_cells)  # Flood areas are translated to 1 for counting and dilation, all other cells are translated to 0 to escape counting and dilation
flood_board = label(reformatted_board, connectivity=2)  # Undilated flood areas are translated to sequential integers for counting
dilated_board = ndimage.binary_dilation(reformatted_board, np.full((3, 3), True)).astype(int)  # Flood areas are dilated by a 3x3 matrix of Trues/1s
dilated_board[np.where(cleared_cells == 9)] = 9  # Mine cells markers are added between dilated flood areas


def colorize(a):  # prints flood-colorized board when a = 1
    def flood_detect(N, codeN):  # prints N numbers in codeN colors
        if a == 1 and dilated_board[y, x] == 1:
            print(f'\033[1;{codeN}48;2;200;200;255m{N} \033[0m', end='')  # variable on light blue background
        elif a == 1 and dilated_board[y, x] != 1:
            print(f'\033[1;{codeN}48;2;200;255;200m{N} \033[0m', end='')  # variable on light green background
        else:
            print(f'\033[1;{codeN}48;2;255;255;255m{N} \033[0m', end='')  # variable on white background

    if cleared_cells[y, x] == 0:
        flood_detect(' ', '')  # no text/blank
    elif cleared_cells[y, x] == 1:
        flood_detect(1, '38;2;0;0;255;')  # blue text
    elif cleared_cells[y, x] == 2:
        flood_detect(2, '38;2;0;255;0;')  # green text
    elif cleared_cells[y, x] == 3:
        flood_detect(3, '38;2;255;0;0;')  # red text
    elif cleared_cells[y, x] == 4:
        flood_detect(4, '38;2;102;0;204;')  # purple text
    elif cleared_cells[y, x] == 5:
        flood_detect(5, '38;2;153;0;0;')  # maroon text
    elif cleared_cells[y, x] == 6:
        flood_detect(6, '38;2;0;255;255;')  # cyan text
    elif cleared_cells[y, x] == 7:
        flood_detect(7, '38;2;0;0;0;')  # black text
    elif cleared_cells[y, x] == 8:
        flood_detect(8, '38;2;160;160;160;')  # gray text
    elif cleared_cells[y, x] == 9:
        if a == 1:
            print(f'\033[1;38;2;0;0;0;48;2;255;200;200m# \033[0m', end='')  # black text on light red background
        else:
            print(f'\033[1;38;2;0;0;0;48;2;255;255;255m# \033[0m', end='')  # black text on white background
    else:
        print(f'\033[48;2;255;255;255m  \033[0m', end='')  # blank on white background


side_print = str(input('Print visualizations side-by-side? (y/n): '))
if side_print.lower() == 'y':
    print()
    for y in range(height):
        print(' ', end='')
        for x in range(width):
            print(f'{uncleared_cells[y, x]} ', end='')
        print('     ', end='')
        print('\033[48;2;255;255;255m \033[0m', end='')
        for x in range(width):
            colorize(0)
        print('     ', end='')
        print('\033[48;2;255;255;255m \033[0m', end='')
        for x in range(width):
            colorize(1)
        print()
else:
    print()
    for y in range(height):
        print(' ', end='')
        for x in range(width):
            print(f'{uncleared_cells[y, x]} ', end='')
        print()
    print()
    for y in range(height):
        print('\033[48;2;255;255;255m \033[0m', end='')
        for x in range(width):
            colorize(0)
        print()
    print()
    for y in range(height):
        print('\033[48;2;255;255;255m \033[0m', end='')
        for x in range(width):
            colorize(1)
        print()

print()
print('Board Statistics:')
print(f'Dimensions: {width} x {height} = {width * height}')
print(f'Mine Count: {mine_count}')
print(f'Mine Density: {mine_count} / {width * height} = {round(mine_count / width / height * 100, 3)}%')
print(
    f'3BV: {np.max(flood_board)} (dilated flood areas) + {np.count_nonzero(dilated_board == 0)} (isolated safe cells) = {np.max(flood_board) + np.count_nonzero(dilated_board == 0)}')