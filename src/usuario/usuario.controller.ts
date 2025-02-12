import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() usuario: Partial<Usuario>) {
    return this.usuarioService.create(usuario);
  }

  @Post('login')
  login(@Body() user:Partial<Usuario>){
    return this.usuarioService.login(user)
  }

  @Put('atualizarSenha/:cpf')
  update(@Param('cpf') CPF:string, @Body() user: Partial<Usuario>): Promise<Partial<Usuario>> {
    return this.usuarioService.update(CPF, user);
  }
}
