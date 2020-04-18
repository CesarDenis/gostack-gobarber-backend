import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (require, response) => {
  const { provider, date } = require.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentsIsSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentsIsSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked.' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
