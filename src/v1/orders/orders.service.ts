import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesService } from '../courses/courses.service';
import { Discount } from '../discounts/discounts.entity';
import { DiscountsService } from '../discounts/discounts.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDTO, UpdateOrderDTO } from './dtos';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  @Inject(GenericRepository)
  private readonly genericRepo: GenericRepository<Order>;

  @Inject(CoursesService)
  private readonly coursesService: CoursesService;

  @Inject(DiscountsService)
  private readonly discountsService: DiscountsService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  async createOrder(data: CreateOrderDTO) {
    data.course = await this.coursesService.selectById(data.course as number);
    if (data.discount) {
      data.discount = await this.discountsService.selectById(
        data.discount as number,
      );
    }
    data.user = await this.usersService.selectById(data.user as number);
    // TODO
    return this.genericRepo.create(data as any);
  }

  async updateOrder(id: number, data: UpdateOrderDTO) {
    const order = await this.selectById(id);
    if (data.course) {
      data.course = await this.coursesService.selectById(data.course as number);
      if (!data.course) {
        throw new NotFoundException('course is not found');
      }
    }
    if (data.discount) {
      data.discount = await this.discountsService.selectById(
        data.discount as number,
      );
      if (!data.discount) {
        throw new NotFoundException('discount is not found');
      }
    }
    return this.genericRepo.update({ id: order.id }, data as any);
  }

  selectAllOrders() {
    return this.genericRepo.selectAll();
  }

  async selectById(id: number) {
    const order = await this.genericRepo.selectById(id);
    if (!order) {
      throw new NotFoundException('order is not found');
    }
    return order;
  }

  async deleteOrderById(id: number) {
    const order = await this.selectById(id);
    return this.genericRepo.delete({ id: order.id });
  }
}
