export const AVIATOR_FLIGHT_9_MESSAGES = [
  "TIME FOR TAKEOFF, FULL THRUST AVIATOR!",
  "YOU ARE ON THE RIGHT FLIGHT PATH, AVIATOR!",
  "CONGRATULATIONS AVIATOR, KEEP MOVING FORWARD!",
  "EXCELLENT WORK, KEEP FLYING HIGHER!",
  "FLY STEADY AND NEVER CRASH YOUR FOCUS!",
  "KEEP PUSHING THE THROTTLE, YOU GOT THIS!",
  "REACH FOR THE SKIES AND CHASE YOUR DREAM!",
  "PRECISION IS POWER, KEEP CLIMBING AVIATOR!",
  "STAY ON COURSE AND REACH YOUR FINAL ALTITUDE!"
];

export const SUCCESS_MESSAGES = AVIATOR_FLIGHT_9_MESSAGES;

export const PENALTY_MESSAGES = [
  "DON'T GIVE UP, ONE MORE, YOU GOT THIS!",
  "STAY FOCUSED, KEEP TRYING!",
  "MISTAKES MAKE YOU STRONGER, AVIATOR!"
];

export const COMPLETE_VICTORY_MESSAGES = [
  "WELCOME TO VICTORY, AVIATOR!",
  "AVIATOR, YOU ARE THE BEST!",
  "MISSION ACCOMPLISHED, EXCELLENT FLIGHT!"
];

export const COMPLETE_RETRY_MESSAGES = [
  "DON'T GIVE UP, KEEP PRACTICING TO OVERCOME!",
  "GIVE IT ANOTHER SHOT, AVIATOR!",
  "TRAINING MAKES PERFECT, TRY AGAIN!"
];

export const getFlightSuccessMessage = (currentIndex: number) => {
  const index = Math.max(0, currentIndex) % AVIATOR_FLIGHT_9_MESSAGES.length;
  return AVIATOR_FLIGHT_9_MESSAGES[index];
};

export const getRandomMessage = (type: 'SUCCESS' | 'PENALTY' | 'COMPLETE_VICTORY' | 'COMPLETE_RETRY', currentIndex?: number, _total?: number) => {
  if (type === 'SUCCESS' && typeof currentIndex === 'number') {
    return getFlightSuccessMessage(currentIndex);
  }
  let list: string[] = [];
  if (type === 'SUCCESS') list = AVIATOR_FLIGHT_9_MESSAGES;
  if (type === 'PENALTY') list = PENALTY_MESSAGES;
  if (type === 'COMPLETE_VICTORY') list = COMPLETE_VICTORY_MESSAGES;
  if (type === 'COMPLETE_RETRY') list = COMPLETE_RETRY_MESSAGES;
  
  return list[Math.floor(Math.random() * list.length)];
};


