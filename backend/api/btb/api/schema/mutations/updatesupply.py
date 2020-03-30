

import graphene
from btb.api.schema.types import Supply
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app

class SupplyInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    company_id = graphene.ID(required=True)

    name = graphene.String(required=True)
    description_int = graphene.String()
    description_ext = graphene.String()

    quantity = graphene.Int(required=True)
    skills = graphene.List(graphene.Int)
    hourly_salary = graphene.Float()


class UpdateSupply(graphene.Mutation):
    class Arguments:
        supply = SupplyInput(required=True)

    Output = Supply

    @staticmethod
    def mutate(root, info, supply):
        current_app.logger.debug('UpdateSupply', supply)

        with db.engine.begin() as conn:
            sql = text("""
insert into btb.team_supply (id, company_id, name, description_int, description_ext, quantity, skills, hourly_salary)
values (coalesce(:id, nextval('btb.team_supply_id_seq')), :company_id, :name, :description_int, :description_ext, :quantity, :skills, :hourly_salary)
on conflict (id) 
do update set 
    company_id = excluded.company_id, 
    name = excluded.name, 
    description_int = excluded.description_int, 
    description_ext = excluded.description_ext, 
    quantity = excluded.quantity, 
    skills = excluded.skills,
    hourly_salary = excluded.hourly_salary
returning id
            """)
            data = conn.execute(sql, **supply.__dict__)
            id = next(data).id

            return g.supply_loader.load(id)


class RemoveSupply(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, id):
        current_app.logger.debug('RemoveSupply', id)

        with db.engine.begin() as conn:
            sql = text("""
delete from btb.team_supply where id = :id
            """)
            data = conn.execute(sql, id=id)

            return 'OK'
