import graphene
from btb.schema.types import Company
from btb.models import db, get_table
from btb.schema.resolvers import company_by_id
from sqlalchemy.dialects.postgresql import insert

class CompanyInput(graphene.InputObjectType):
    id = graphene.ID(required=False)
    name = graphene.String(required=True)


class UpdateCompany(graphene.Mutation):
    class Arguments:
        company = CompanyInput(required=True)

    Output = Company

    @staticmethod
    def mutate(root, info, company):
        with db.engine.begin() as conn:

            ct = get_table("company")

            ins = insert(ct).values(id=company.id, name=company.name)
            ins_stmt = ins.\
                on_conflict_do_update(
                    index_elements=[ct.c.id], 
                    set_={"name": company.name}
                ).\
                returning(ct.c.id)

            # not fully correct, we still need to insert into user_company relation

            data = None
            for result in conn.execute(ins_stmt):
                return company_by_id({"company_id": result.id})

        
