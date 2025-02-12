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

  async update(CPF: string, user: Partial<Usuario>):Promise<Partial<Usuario>> {

    const userFinded = await this.repository.findOneBy({CPF})

    if(!userFinded) throw new Error("usuário não existe.")

    await this.repository.update(CPF,user);

    const updated = await this.repository.findOneBy({CPF})
    
    const {senha, ...dados} = updated

    return dados
  }

}
