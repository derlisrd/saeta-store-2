import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {
  public async index({}: HttpContextContract) {

    const clientes = await Cliente.all();

    return clientes;
  }

  public async store({request}: HttpContextContract) {
    const data = request.only(['nombre','email','apellido','direccion','nacimiento','doc'])

    const cliente = await Cliente.create(data)

    return cliente

  }

  public async show({params}: HttpContextContract) {
    const cliente = await Cliente.find(params.id)

    return cliente;
  }


  public async update({request,params}: HttpContextContract) {
    const cliente = await Cliente.find(params.id)
    const data = request.only(['nombre','email','apellido','direccion','nacimiento','doc'])

    cliente?.merge(data);
    await cliente?.save()

    return cliente;
  }

  public async destroy({params}: HttpContextContract) {
    const cliente = await Cliente.find(params.id)

    await cliente?.delete();
  }
}
