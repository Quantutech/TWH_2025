import Repository from "../decorators/repository";
import ProviderInsurance from "../models/ProviderInsurance";
import BaseRepository from "./abstracts/base-repository";

@Repository(ProviderInsurance)
export default class ProviderInsuranceRepository extends BaseRepository<ProviderInsurance> {
}