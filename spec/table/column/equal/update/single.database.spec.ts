import Connection from "../../../../connection";
import Value from "../../../../../dist/table/column/value";
import GrandParent from "../../../../grand-parent/grand-parent";
import GrandParentGenerate from "../../../../grand-parent/generate";
import Inserts from "../../../../../dist/entity/array/inserts";
import Entity from "../../../../../dist/table/entity";
import {Connection as OrmConnection} from "typeorm";
import Equal from "../../../../../dist/table/column/equal";

it("force console log", () => { spyOn(console, 'log').and.callThrough();});

let entities  = [GrandParentGenerate(), GrandParentGenerate()];
let connection : OrmConnection;

it('open connection', (done)=>{

    Connection.then((con)=>connection = con).then(done).catch(fail);
});

it('insert grand-parent', (done)=>{

    Inserts(connection.manager, entities, 'id').then(done);
});

it('auto', (done)=>{

    let repository = connection.getRepository(GrandParent);

    let builder = repository.createQueryBuilder().update({
        name : entities[0].name + 'updated'
    });

    let standard = new Value(Entity(builder, GrandParent), 'id', entities[0].id);

    Equal(builder, standard);

    builder.execute().then(()=>{

        let select =  repository.createQueryBuilder().select();

        let standard = new Value(Entity(select, GrandParent), 'id', entities[0].id);

        Equal(select, standard);

        select.getOne().then(record=>{

            if(record) {

                expect(record.id).toBe(entities[0].id)
                expect(record.name).toBe(entities[0].name + 'updated')

            } else {

                fail('record should exits')
            }

            done();
        });

    }).then(done).catch(fail);

});


it('alias', (done)=>{

    let repository = connection.getRepository(GrandParent);

    let builder = repository.createQueryBuilder('GP').update({
        name : entities[1].name + 'updated'
    });

    let standard = new Value(Entity(builder, GrandParent), 'id', entities[1].id);

    Equal(builder, standard);

    builder.execute().then(()=>{

        let select =  repository.createQueryBuilder('GP');

        let standard = new Value(Entity(select, GrandParent), 'id', entities[1].id);

        Equal(select, standard);

        select.getOne().then(record=>{

            if(record) {

                expect(record.id).toBe(entities[1].id)

            } else {

                fail('record should exits')
            }

        });

    }).then(done).catch(fail);

});

