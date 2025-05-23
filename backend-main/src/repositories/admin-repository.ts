import Repository from "../decorators/repository";
import AdminModel from "../models/Admin";
import BaseRepository from "./abstracts/base-repository";

@Repository(AdminModel)
export default class AdminRepository extends BaseRepository<AdminModel> {
	public async findByEmail(email: string): Promise<AdminModel | null> {
		return this.model.findOne({ where: { email } });
	}

	public async findById(id: string): Promise<AdminModel | null> {
		return this.model.findOne({ where: { id } });
	}

	public async updatePassword(email: string, password: string) {
		return this.model.update({ password }, { where: { email } });
	}

	public async updateEmailVerified(email: string) {
		return this.model.update({ isEmailVerified: true }, { where: { email } });
	}

	public async updateById(id: string, data: Partial<AdminModel>) {
		return this.model.update(data, { where: { id } });
	}

	public async deleteById(id: string) {
		return this.model.destroy({ where: { id } });
	}
}
