import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>
  ){}

  async create(usuario: Partial<Usuario>) {
    return this.repository.save(usuario)
  }

  async login(user : Partial<Usuario>):Promise<Partial<Usuario> | null> {
    const {email, senha} = user
    const resUser = await this.repository.findOneBy({email,senha});
    if(resUser != null){
      const {senha,CPF,...res} = resUser
      return res;
    }
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, usuario: Partial<Usuario>) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
