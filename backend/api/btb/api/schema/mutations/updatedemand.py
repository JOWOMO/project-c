import graphene
from btb.api.schema.types import Demand
from btb.api.models import db
from btb.api.schema.resolvers import map_skills
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app
from btb.api.constants import InputLengths
from btb.api.schema.types.util import LimitedString


class DemandInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    company_id = graphene.ID(required=True)
    is_active = graphene.Boolean(required=True)

    name = LimitedString(InputLengths.MIDDLE_STRING, required=True)
    # description_int = graphene.String()
    description = LimitedString(InputLengths.LONG_STRING)

    quantity = graphene.Int(required=True)
    skills = graphene.List(graphene.ID)
    max_hourly_salary = graphene.Float()


class UpdateDemand(graphene.Mutation):
    class Arguments:
        demand = DemandInput(required=True)

    Output = Demand

    @staticmethod
    def mutate(root, info, demand):
        current_app.logger.debug("UpdateDemand %s", demand)

        with db.engine.begin() as conn:

            skills = map_skills(conn, demand.skills)
            demand.skills = skills

            sql = text(
                """
insert into btb_data.team_demand (id, company_id, is_active, name, description_ext, quantity, skills, max_hourly_salary)
values (coalesce(:id, uuid_generate_v4()), :company_id, :is_active, :name, :description, :quantity, (:skills)::int[], :max_hourly_salary)
on conflict (id) 
do update set 
    company_id = excluded.company_id, 
    is_active = excluded.is_active,
    name = excluded.name, 
    description_ext = excluded.description_ext, 
    quantity = excluded.quantity, 
    skills = excluded.skills,
    max_hourly_salary = excluded.max_hourly_salary,
    modified_on = now()
returning id
            """
            )
            data = conn.execute(sql, **demand.__dict__)
            id = next(data).id

            return g.demand_loader.load(id)


class RemoveDemand(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = graphene.String

    @staticmethod
    def mutate(root, info, id):
        current_app.logger.debug("RemoveDemand %s", id)

        with db.engine.begin() as conn:
            sql = text(
                """
delete from btb_data.team_demand where id = :id
            """
            )
            data = conn.execute(sql, id=id)

            return "OK"
