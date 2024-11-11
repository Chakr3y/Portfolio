from Common_var import *

class Keyboard:
  # static reference to list from Common_var
  sounds = Notes_List

  def __init__(self, pos=[0,0], scale=1):
    # top-left corner of keyboard
    self.pos = pos
    # size scaling
    self.scale = scale
    self.generate_keys()

  # generate the layout of keys in pygame
  def generate_keys(self):
    # Each key is formatted as [playing?, Rect]
    self.keys = [] # list of Rects
    # separate keys by color to determine draw order
    self.white, self.black = [],[]

    # Left-to-right order
    incr = int(100*self.scale)
    for x in range(0, incr*6+1, incr):
      # generate white key
      self.keys.append([False, pygame.Rect(self.pos[0]+x, self.pos[1], incr, 4*incr)])
      self.white.append(self.keys[-1])

      # skip black keys in specific positions
      if x == incr*2 or x == incr*6: continue
      # generate black key
      self.keys.append([False, pygame.Rect(self.pos[0]+x+.6*incr, self.pos[1], incr*.8, incr*2.4)])
      self.black.append(self.keys[-1])

  # called on click event, play notes
  def click_keys(self, mouse):
    # checks mouse overlap for every key
    for i, k in enumerate(self.keys):
      if k[1].collidepoint(mouse):
        # prevent white-black overlap
        if k in self.white:
          # if a black key is not also being pressed
          if not any(b[1].collidepoint(mouse) for b in self.black):
            self.__play(self.sounds[i])
        else: self.__play(self.sounds[i])

  # play a sound object using pygame
  def __play(self, sound):
    sound.play(maxtime=1500)

  # detect playing Sound objects to animate keys
  def update(self):
    updated = []
    for i, s in enumerate(self.sounds):
      # update rect if color needs to change
      if bool(s.get_num_channels()) != self.keys[i][0]:
        updated.append(self.keys[i][1])

      # set key's sound status
      self.keys[i][0] = s.get_num_channels()
    
    return updated
  
  # draw the keyboard in pygame
  def draw(self, display):
    if display == None: display = pygame.display.get_surface()
    # draw white keys first
    for k in self.white:
      display.fill((0,0,0), k[1]) # black outline
      display.fill((170,170,170) if k[0] else (255,255,255), k[1].inflate(-1,-1))

    # draw black keys after for overlap
    for k in self.black:
      display.fill((0,0,0), k[1]) # black outline
      display.fill((80,80,80) if k[0] else (0,0,0), k[1])