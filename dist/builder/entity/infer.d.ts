import { QueryBuilder } from "typeorm";
declare type Infer<Type> = Type extends QueryBuilder<infer As> ? As : never;
export default Infer;
