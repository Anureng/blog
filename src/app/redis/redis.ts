import { Redis } from '@upstash/redis'
export const revalidate = 0 // disable cache

export const redis = new Redis({
    url: 'https://wanted-elephant-46241.upstash.io',
    token: 'AbShAAIncDFlNGQ3MGYzZjg3ODc0ZjcwYTQwOTViY2RkOGM4ZGU0NXAxNDYyNDE',
})