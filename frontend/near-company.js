export class CompanyNEAR {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;    
  }

  async getCompanies() {
    const companies = await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_companies' });
    return companies.sort( (a, b) => b.id - a.id );
  }

  async setCompany(company) {
    company.id = +company.id;
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'set_company', args: company });
  }
}