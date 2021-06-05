import {
  InputType,
  IntersectionType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { CreateCompanyInput } from "./create-company.input";
import { CompanyObject } from "./company.object";

@InputType()
export class UpdateCompanyInput extends IntersectionType(
  PickType(CompanyObject, ["id"] as const, InputType),
  PartialType(CreateCompanyInput),
) {}
