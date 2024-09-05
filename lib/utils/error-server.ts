export function handleServerError(error: unknown, customMessage?: string) {
  let message = "알 수 없는 오류가 발생했습니다.";
  
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  // TODO :: 서버 로깅 또는 다른 처리
  console.error(customMessage || message)
}