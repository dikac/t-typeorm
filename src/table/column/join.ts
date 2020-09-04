import Column from "./column";
import Table from "../table";
import {SelectQueryBuilder} from "typeorm";

export default function Join<
    ColumnType extends Column<Table<any>>,
    ColumnTypeJoin extends Column<Table<any>>,
>(
    query : SelectQueryBuilder<any>,
    column : ColumnType,
    Join : ColumnTypeJoin,
) : ColumnTypeJoin {

    query.leftJoin(Join.table.entity, Join.table.alias, `${column.column} = ${Join.column}`);

    return Join;
}