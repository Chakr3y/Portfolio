import os
from threading import Thread
from pygame.locals import *

print("\nWelcome to MAd Bozart, an algorithmic music generator.\nPlay the selected instrument by clicking on piano keys.\n")
from Common_var import *

pygame.init() # initialize pygame
display = pygame.display.set_mode((800, 600)) # set window resolution
pygame.display.set_caption("MAd Bozart") # window text
display.fill((255, 255, 255)) # change background color to black

# initialize GUI
from Keyboard import Keyboard
keyboard = Keyboard(scale=0.75)
keyboard.draw(display) 
pygame.display.update()

# sound loop
from Sounds import start

# thread that runs graphics and input
def kbThread():
  barrier.wait() # wait for sound to start playing
  
  while True:
    for event in pygame.event.get():
      # click plays piano
      if event.type == MOUSEBUTTONDOWN:
        mousepos = pygame.mouse.get_pos()
        keyboard.click_keys(mousepos)

      # escape key exits program
      if event.type == KEYDOWN:
        if event.key == K_ESCAPE:
          pygame.quit()
    
    # update keyboard and update display
    updated = keyboard.update()
    keyboard.draw(display)
    pygame.display.update(updated)

if __name__ == '__main__': # main process
  # run sound system on a separate thread
  t = Thread(target=start, daemon=True)
  t.start()

  kbThread()