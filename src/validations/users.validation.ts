import { addMiddlewareToValidator } from 'utils'

interface IActions {}

const actions: IActions = {}

const usersValidation: IActions = addMiddlewareToValidator(actions)

export default usersValidation
