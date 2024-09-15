// 디바운스 함수
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
  let timer: NodeJS.Timeout | undefined;
  return ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
};

// 디바운스 사용방법

// const handleResize = debounce(() => {
        // 코드작성
// }, 200); // 디바운스 지연 시간 설정