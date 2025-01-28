import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();
  // Méthode pour gérer la création d'un utilisateur
  async createUser(dto: CreateUserDto) {

    console.group('UserController@createUser');

    // Crée un nouvel utilisateur
    const newUser = {
      ...dto,
    };

    // Exemple d'intégration d'une base de données ou d'un service
    console.log('Nouvel utilisateur créé :', newUser);
    console.groupEnd();
    return await this.userService.createUser(dto.email, dto.name, dto.password, dto.role || 'user');
   }





   async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  async getUserById(id: number) {
    return await this.userService.getUserById(id);
  }
}
