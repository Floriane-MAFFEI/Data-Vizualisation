import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //TODO Add bcrypt (more secure)

  // Path for register
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Path for login
  @Post('login')
  async login(@Body() userData: { username: string; password: string }) {
    // Compare username and password 
    const isValid = await this.userService.validateUser(userData.username, userData.password);
    if (isValid) {
      return { message: 'Connexion réussie !' };
    } else {
      throw new BadRequestException('Identifiants invalides');
    }
  }
}
