from flask import g
from btb.schema.resolvers import (
    MeLoader,
    SkillLoader,
    CompanyLoader,
    DemandLoader,
    SupplyLoader,
)

# this must the thread locals that are reset on every request
def instanciate_datasources():
    g.skill_loader = SkillLoader()
    g.company_loader = CompanyLoader()
    g.demand_loader = DemandLoader()
    g.supply_loader = SupplyLoader()
    g.me_loader = MeLoader()
