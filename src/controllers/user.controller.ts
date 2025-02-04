import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();
  



  async createUser(dto: CreateUserDto) {
    return await this.userService.createUser(dto.email, 
      dto.name, 
      dto.password, 
      dto.role || 'user');
   }





   async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  async getUserById(id: number) {

    return await this.userService.getUserById(id);
  }

  async deleteUserById(id: number) {
    console.log("Controller@deleteUserById", id);
    return await this.userService.deleteUserById(id);
  }
}
