export enum AuthErrorCodes {
  Mismatch = 'CodeMismatchException',
  Limit = 'LimitExceededException',
  Exist = 'UsernameExistsException',
  NotFound = 'UserNotFoundException',
  Invalid = 'InvalidPasswordException',
  NotConfirmed = 'UserNotConfirmedException',
}

export function formatMessage(err: Error & { code: string }): string {
  if (err.code === AuthErrorCodes.Mismatch) {
    return 'Der Code stimmt leider nicht. Bitte versuche es erneut.'
  }

  if (err.code === AuthErrorCodes.Limit) {
    return 'Du hast das zu oft versucht. Bitte warte etwas ab, bis Du es erneut versuchst.'
  }

  if (err.code === AuthErrorCodes.Exist) {
    return "Das hat leider nicht geklappt. Es scheint sich schon jemand mit derselben E-Mail Adresse registriert zu haben. Vielleicht kannst Du versuchen Dich anzumelden?";
  }

  if (err.code === AuthErrorCodes.Invalid) {
    return "Das Passwort entspricht nicht den Komplexitätsanforderungen. Bitte gib mindestens 6 Zeichen bestehend aus Groß- und Kleinbuchstaben ein.";
  }
  
  if (err.code === AuthErrorCodes.NotFound) {
    return 'Deine E-Mail ist uns nicht bekannt.'
  } 

  return err.message;
}