import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (require, response) => {
  const { provider, date } = require.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentsIsSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentsIsSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked.' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
