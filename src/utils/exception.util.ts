import { HttpException } from '@nestjs/common';

export const dynamicException = (error) => {
  console.error(error);
  throw new HttpException(error.response?.message, error.response?.statusCode);
};
