import * as Joi from 'joi'

export const ConfigEnv = Joi.object({
  NODE_ENV: Joi.string().default('development'),
  NODE_DOCKER_PORT: Joi.number().default(3002),
  NODE_DOCKER_HOST: Joi.string().default('localhost'),
  JWT_SECRET: Joi.string().default('9nqFiH9DkCKceayq7xyJpdKg595'),
  JWT_EXPIRES_IN: Joi.string().default('5m')
})