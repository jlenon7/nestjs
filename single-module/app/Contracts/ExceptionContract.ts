export interface ExceptionContract {
  name?: string
  message?: string | any
  status?: number
  stack?: string
  isSecJsException?: boolean
}
