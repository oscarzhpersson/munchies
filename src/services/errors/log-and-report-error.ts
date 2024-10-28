export function logAndReportError(error: string): void {
  console.error(error)
  // TODO: Log to relevant service: Datadog is my preference, sentry works as well.
}
