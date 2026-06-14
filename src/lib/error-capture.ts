let lastCapturedError: Error | undefined;

export function captureError(error: Error) {
  lastCapturedError = error;
}

export function consumeLastCapturedError() {
  const err = lastCapturedError;
  lastCapturedError = undefined;
  return err;
}
