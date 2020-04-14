import graphene
from btb.api.schema.types import Company
from btb.api.models import db
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import text
from flask import g, current_app


class CompanyInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    name = graphene.String(required=True)
    logo_url = graphene.String()
    
    address_line1 = graphene.String(required=True)
    address_line2 = graphene.String()
    address_line3 = graphene.String()

    postal_code = graphene.String(required=True)
    city = graphene.String(required=True)
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
