import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ExternalCompanyRegistryAdapter {
  private readonly lambdaUrl = process.env.REGISTER_COMPANY_LAMBDA_URL ?? "";

  async registerCompany(company: {
    cuit: string;
    name: string;
    joinDate?: string;
    type: string;
  }): Promise<void> {
    try {
      await axios.post(this.lambdaUrl, company);
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error("Company already registered in Lambda");
      }

      throw new Error("Error invoking external Lambda");
    }
  }
}
