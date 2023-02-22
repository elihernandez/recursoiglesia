import { User } from 'api/models/User'
import { uuid } from 'uuidv4'

export const users: Array<User> = [
    {
        id: uuid(),
        email: 'recursoiglesia1@gmail.com',
        password: '$2a$10$K.COECQd.ZrLsCMK5xxSNeLZLGAQlEsjGHsQ0AhqLM5sH1jqCR08a',
        name: 'Recurso Iglesia'
    }
]