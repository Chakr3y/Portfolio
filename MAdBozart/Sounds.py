from Common_var import *
from random import choice
from time import sleep
import pygame

class Chord:
  def __init__(self, notes, link):
    # list of indices of Sound objects to play
    self.notes = notes
    # list of chord indices that can be played next
    self.link = link

  # play notes and call next unless measure is 0
  def play(self, measure):
    # whole chords
    if style == 'whole':
      delay = 3/bps
      for i in self.notes:
        Notes_List[i].play(maxtime=int(delay*1000))
        print(Notes_Names[i],end='')
      sleep(delay)

    # arpeggio
    elif style == 'arpeggio':
      delay = 1/bps
      for i in self.notes:
        Notes_List[i].play(maxtime=int(delay*900))
        print(Notes_Names[i],end='')
        sleep(delay)
    
    # waltz
    elif style == 'waltz':
      delay = 1/bps
      for k, i in enumerate(self.notes):
        Notes_List[i].play(maxtime=int(delay*900))
        if k != 0: # second and third note
          Notes_List[self.notes[k%2+1]].play(maxtime=int(delay*900))

        sleep(delay)
        print(Notes_Names[i],end='')
    print()

    # play chords in sequence until 'measure' decrements to 0
    if measure > 1:
      self.next(measure-1)

  # link the current chord to the next in sequence
  def next(self, measure):
    self.chords[choice(self.link)].play(measure)

# ask for major or minor
scale_prompt = 'Scale (major or minor): '
scale = input(scale_prompt).lower()
while scale not in ('major','minor'):
  scale = input(scale_prompt).lower()

# ask for how many times to repeat
repeat_prompt = 'How many chords to play? '
repeat_times = input(repeat_prompt)
while not repeat_times.isdigit():
  repeat_times = input(repeat_prompt)

# ask for style/rhythm
style_prompt = 'Style (whole/arpeggio/waltz): '
style = input(style_prompt).lower()
while style not in ('whole','arpeggio','waltz'):
  style = input(style_prompt).lower()

# construct chords based on chosen scale
def set_scale(scale):
  global chords
  if scale == 'major':
    chords = [ # Major chord progression
      Chord((0,4,7), list(range(1,7))),
      Chord((2,5,9), [4,6]),
      Chord((4,7,11), [5,3]),
      Chord((5,9,0), [1,4,6]),
      Chord((7,11,2), [0,6]),
      Chord((9,0,4), [1,3]),
      Chord((11,2,5), [0,4,5])]
  elif scale == 'minor':
    chords = [ # Minor chord progression
      Chord((0,3,7), list(range(1,7))),
      Chord((2,5,8), [6,4]),
      Chord((3,7,10), [5]),
      Chord((5,8,0), [1,6]),
      Chord((7,10,2), [0]),
      Chord((8,0,3), [3,1]),
      Chord((10,2,5), [0])]
  else: print('error')
set_scale(scale)
# set static reference to list of chords
Chord.chords = chords

# convert for input using flats
# flat-sharp string dictionary
sharp_conv = {
  "DB": "C#",
  "EB": "D#",
  "FB": "E",
  "GB": "F#",
  "AB": "G#",
  "BB": "A#",
  "CB": "B"}
flat_list = list(sharp_conv)

print("\nType 'quit' to quit\n")
input_prompt = 'Please enter first key(ex. C, C#, Db): '
# synchronize threads and start loop
def start():
  barrier.wait()
  play()

# take input from the user
def get_note():
  input_note = input(input_prompt).upper()
  
  # if user types quit, the program stops
  if input_note == 'QUIT':
    pygame.quit()
    # NOTE: this will raise an error from the other thread
    # but it will exit the program

  # if input note is flat, convert to sharp
  if input_note in flat_list:
    input_note = sharp_conv[input_note]
  
  return input_note

# main loop for harmony system
def play():
  global Notes_Names, Notes_List, chords

  # prompt which note scale to play
  input_note = get_note()
  
  # reprompt if invalid
  while input_note not in Notes_Names:
    input_note = get_note()

  index_no = Notes_Names.index(input_note)

  # rearrange the scale
  for n in range(index_no):
    notes_conv[Notes_Names[n]] = notes_conv.pop(Notes_Names[n])
  # update lists
  Notes_Names = list(notes_conv)
  Notes_List = [*notes_conv.values()]

  # begin playing
  chords[0].play(int(repeat_times))

  notes_init() # reset chords
  play() # replay