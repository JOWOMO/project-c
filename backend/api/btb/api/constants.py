from enum import IntEnum

# also update frontend/constants/inputLengths.ts
class InputLengths(IntEnum): 
  ULTRA_SHORT_STRING = 12
  SHORT_STRING = 50
  MIDDLE_STRING = 150
  LONG_STRING = 2000