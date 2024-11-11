import os, pygame
from threading import Barrier

#initialize mixer, set volume and channels
pygame.init()
from pygame import mixer
mixer.music.set_volume(1)
mixer.set_num_channels(10)

# beats per second
bps = 2

# for thread sync
barrier = Barrier(2)

notes_dir = 'Notes/' # file directory
# select instrument
instrument = input('Instrument ("?" for list): ').lower()
while instrument not in os.listdir(notes_dir):
  if instrument == '?': # print help
    print(*os.listdir(notes_dir),sep=', ')
  # reprompt
  instrument = input('Instrument ("?" for list): ').lower()
notes_dir += instrument # append the correct file directory

# Notes dictionary
notes_conv, Notes_Names, Notes_List = [None]*3
def notes_init(): # reset chords to C
  global notes_conv, Notes_Names, Notes_List
  notes_conv = {
    "C" : mixer.Sound(notes_dir + "/Cnote.wav"),
    "C#" : mixer.Sound(notes_dir + "/C#note.wav"),
    "D" : mixer.Sound(notes_dir + "/Dnote.wav"),
    "D#" : mixer.Sound(notes_dir + "/D#note.wav"),
    "E" : mixer.Sound(notes_dir + "/Enote.wav"),
    "F" : mixer.Sound(notes_dir + "/Fnote.wav"),
    "F#" : mixer.Sound(notes_dir + "/F#note.wav"),
    "G" : mixer.Sound(notes_dir + "/Gnote.wav"),
    "G#" : mixer.Sound(notes_dir + "/G#note.wav"),
    "A" : mixer.Sound(notes_dir + "/Anote.wav"),
    "A#" : mixer.Sound(notes_dir + "/A#note.wav"),
    "B" : mixer.Sound(notes_dir + "/Bnote.wav")
  }
  Notes_Names = list(notes_conv)
  Notes_List = [*notes_conv.values()]
notes_init()