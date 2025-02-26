type ViewChangeHandler = (entry: IntersectionObserverEntry) => void

export type IOnStart = (element: Element, entry: IntersectionObserverEntry) => void | ViewChangeHandler

type MarginValue = `${number}${'px' | '%'}`
type MarginType = MarginValue | `${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue}` | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`

export interface InViewOptions {
  root?: Element | Document
  margin?: MarginType
  amount?: 'some' | 'all' | number
}

export interface InViewVariants {
  onStart: IOnStart
  options?: InViewOptions
}
