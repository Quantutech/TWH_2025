import Repository from "../decorators/repository";
import ClientModel from "../models/Client";
import BaseRepository from "./abstracts/base-repository";

@Repository(ClientModel)
export default class ClientRepository extends BaseRepository<ClientModel> {
	public async findByEmail(email: string): Promise<ClientModel | null> {
		return this.model.findOne({ where: { email } });
	}

	public async findById(id: number): Promise<ClientModel | null> {
		return this.model.findOne({ where: { id } });
	}

	public async updatePasswordByEmail(email: string, password: string) {
		return this.model.update({ password }, { where: { email } });
	}

	public async updatePasswordById(id: number, password: string) {
		return this.model.update({ password }, { where: { id } });
	}

	public async updateEmailVerified(email: string) {
		return this.model.update({ isEmailVerified: true }, { where: { email } });
	}

	public async deleteById(id: number) {
		return this.model.destroy({ where: { id } });
	}
}
