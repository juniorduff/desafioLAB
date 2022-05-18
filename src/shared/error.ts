import { HttpException, HttpStatus } from '@nestjs/common';
import { Event, Institution, Person, Ticket } from '@prisma/client';

type ErrorParms = {
  message: string;
  statusCode: HttpStatus;
  entity: Person | Ticket | Institution | Event;
};
export const ThowErrorWhenAlreadyExistis = ({
  statusCode,
  message,
  entity,
}: ErrorParms) => {
  if (entity) {
    throw new HttpException(message, statusCode);
  }
};
export const ThowErrorWhenNotExistis = ({
  statusCode,
  message,
  entity,
}: ErrorParms) => {
  if (!entity) {
    throw new HttpException(message, statusCode);
  }
};
