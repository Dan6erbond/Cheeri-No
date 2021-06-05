import { InputType, OmitType } from "@nestjs/graphql";
import { CompanyObject } from "./company.object";

@InputType()
export class CreateCompanyInput extends OmitType(
  CompanyObject,
  ["id", "createdAt", "updatedAt"] as const,
  InputType,
) {}
