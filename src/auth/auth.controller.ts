import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public, ResponseMessage, UserDecor } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/user.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('Login successfully')
  async login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @ResponseMessage('Register user successfully')
  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get('/account')
  @ResponseMessage('Get account successfully')
  async getProfile(@UserDecor() user: IUser) {
    return { user };
  }

  @Public()
  @Get('/refresh')
  @ResponseMessage('Get new token successfully')
  handleRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }

  @Post('/logout')
  @ResponseMessage('Logout successfully')
  async logout(
    @UserDecor() user: IUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(user, response);
  }
}
