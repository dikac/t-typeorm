import {EntityManager} from "typeorm";
import Id from "../id";
import StandardUpdate from "../../entity/update";


export default function Update<Entity extends Required<Id>>(
    manager : EntityManager,
    data : Entity,
    entity ?: new()=>Entity,
    detaches : (keyof Entity)[] = []
) : Promise<Entity> {

    return StandardUpdate(manager, data, 'id', entity, detaches);
}
