

import graphene
from btb.schema.types import Demand
from btb.models import db, get_table
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app

class DemandInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    company_id = graphene.ID(required=True)

    name = graphene.String(required=True)
    description_int = graphene.String()
    description_ext = graphene.String()

    quantity = graphene.Int(required=True)
    skills = graphene.List(graphene.Int)
    max_hourly_wages = graphene.Float()


class UpdateDemand(graphene.Mutation):
    class Arguments:
        demand = DemandInput(required=True)

    Output = Demand

    @staticmethod
    def mutate(root, info, demand):
        current_app.logger.debug('UpdateDemand', demand)

        with db.engine.begin() as conn:
            sql = text("""
insert into btb.team_demand (id, company_id, name, description_int, description_ext, quantity, skills, max_hourly_wages)
values (coalesce(:id, nextval('btb.team_demand_id_seq')), :company_id, :name, :description_int, :description_ext, :quantity, :skills, :max_hourly_wages)
on conflict (id) 
do update set 
    company_id = excluded.company_id, 
    name = excluded.name, 
    description_int = excluded.description_int, 
    description_ext = excluded.description_ext, 
    quantity = excluded.quantity, 
    skills = excluded.skills,
    max_hourly_wages = excluded.max_hourly_wages
returning id
            """)
            data = conn.execute(sql, **demand.__dict__)
            id = next(data).id

            return g.demand_loader.load(id)


class RemoveDemand(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, id):
        current_app.logger.debug('RemoveDemand', id)

        with db.engine.begin() as conn:
            sql = text("""
delete from btb.team_demand where id = :id
            """)
            data = conn.execute(sql, id=id)

            return 'OK'
