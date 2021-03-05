import { onMounted, onUnmounted } from 'vue'

interface IOptions {
  capture?: boolean
  once?: boolean
  passive?: boolean
}

export const useEventListener = (
  eventName: string = '',
  handler: Function,
  element: HTMLElement | Element | Window | Document = window,
  options: IOptions
) => {
  const eventListener: EventListenerOrEventListenerObject = (event: Event) => handler(event)

  onMounted(() => {
    element.addEventListener(eventName, eventListener, {
      capture: options?.capture,
      once: options?.once,
      passive: options?.passive
    })
  })

  onUnmounted(() => {
    element.removeEventListener(eventName, eventListener, { capture: options?.capture })
  })
}
