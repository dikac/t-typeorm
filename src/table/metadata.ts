import Table from "./table";
import EnsureClass from "@dikac/t-class/ensure/class";
import ThrowableClass from "@dikac/t-class/assert/throwable/class";
import {Alias} from "typeorm/query-builder/Alias";
import Standard from "./standard";
import Class from "@dikac/t-class/class";

/**
 * create {@see Table} from {@see Alias}
 */
export default function Metadata<
    Constructor extends Class<object, unknown[]>
>(
    alias : Alias,
    aliased : boolean
) : Table<Constructor> {

    let constructor = <Constructor> EnsureClass(alias.target, (value)=>ThrowableClass(value, 'Alias.metadata'));

    return new Standard(constructor, alias.name, aliased);
}
