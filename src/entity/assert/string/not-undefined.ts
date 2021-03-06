import Name from "@dikac/t-object/string/name";


export default function NotUndefined(
    valid : boolean,
    entity : object,
    primaryKey : PropertyKey
) : string {

    if(valid) {

        return `entity ${Name(entity)}.${primaryKey.toString()} is not "undefined"`;

    } else {

        return `entity ${Name(entity)}.${primaryKey.toString()} must not be "undefined" for current operation`;
    }
}
