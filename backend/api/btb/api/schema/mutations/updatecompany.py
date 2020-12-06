import graphene
from btb.api.schema.types import Company
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app
from btb.api.constants import InputLengths
from btb.api.schema.types.util import LimitedString

class CompanyInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    name = LimitedString(InputLengths.SHORT_STRING, required=True)
    logo_url = LimitedString(InputLengths.MIDDLE_STRING)
    
    address_line1 = LimitedString(InputLengths.MIDDLE_STRING, required=True)
    address_line2 = LimitedString(InputLengths.MIDDLE_STRING)
    address_line3 = LimitedString(InputLengths.MIDDLE_STRING)

    postal_code = LimitedString(InputLengths.SHORT_STRING, required=True)
    city = LimitedString(InputLengths.SHORT_STRING, required=True)
    industry = graphene.ID(required=True)


class UpdateCompany(graphene.Mutation):
    class Arguments:
        company = CompanyInput(required=True)

    Output = Company

    @staticmethod
    def mutate(root, info, company):
        current_app.logger.debug("UpdateCompany %s", company)

        with db.engine.begin() as conn:
            sql = text(
                """
insert into btb_data.company (id, name, logo_url, address_line1, address_line2, address_line3, postal_code, city, industry_id)
values (coalesce(:id, uuid_generate_v4()), :name, :logo_url, :address_line1, :address_line2, :address_line3, :postal_code, :city, :industry)
on conflict (id) 
do update set 
    name = excluded.name, 
    logo_url = excluded.logo_url, 
    address_line1 = excluded.address_line1, 
    address_line2 = excluded.address_line2, 
    address_line3 = excluded.address_line3, 
    postal_code = excluded.postal_code,
    city = excluded.city,
    industry_id = excluded.industry_id
returning id
            """
            )
            data = conn.execute(sql, **company.__dict__)
            companyid = next(data).id

            sql = text(
                """
insert into btb_data.company_customer(customer_id, company_id)
    select id, :company
    from btb_data.customer
    where external_id = :user
on conflict do nothing
            """
            )

            conn.execute(sql, user=g.principal.get_id(), company=companyid)
            return g.company_loader.load(companyid)
