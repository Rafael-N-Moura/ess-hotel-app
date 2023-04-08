import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Reservation } from '../../entities/Reservation.entity';
import { ReservationCreationDTO } from 'src/infra/database/interfaces/reservation.interface';
import { ReservationRepository } from 'src/infra/database/repositories/ReservationRepository';

@Injectable()
export class TypeOrmReservationRepository implements ReservationRepository {
  constructor(
    @Inject('RESERVATION_REPOSITORY')
    private reservationRepository: Repository<Reservation>,
  ) {}

  getReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  getReservationByCEP(cep: string): Promise<Reservation> {
    return this.reservationRepository.findOne({
      where: {
        cep,
      },
    });
  }

  getReservationById(id: string): Promise<Reservation> {
    return this.reservationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createReservation({
    name,
    city,
    street,
    streetNumber,
    cep,
    checkIn,
    checkOut,
    guests,
    budget,
    additionalInfo,
    bedrooms,
    beds,
    bathrooms,
    photos,
    owner,
  }: ReservationCreationDTO): Promise<void> {
    const newReservation = new Reservation();

    Object.assign(newReservation, {
      name,
      city,
      street,
      streetNumber,
      cep,
      checkIn,
      checkOut,
      guests,
      budget,
      additionalInfo,
      bedrooms,
      beds,
      bathrooms,
      photos,
      owner,
    });

    await this.reservationRepository.save(newReservation);
  }

  async getReservationByList(list: string[]): Promise<Reservation[]> {
    const reservations = [];
    for (const id of list) {
      const reservation = await this.reservationRepository.findOne({
        where: {
          id,
        },
      });
      reservations.push(reservation);
    }

    const test = await this.reservationRepository.find();
    console.log(test);
    return reservations;
  }
}