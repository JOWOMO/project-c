export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONScalar: any;
};

export type Company = {
   __typename?: 'Company';
  id: Scalars['ID'];
  name: Scalars['String'];
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  addressLine3?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  city: Scalars['String'];
  industry?: Maybe<Industry>;
  contact: CompanyContact;
  demands?: Maybe<Array<Demand>>;
  supplies?: Maybe<Array<Supply>>;
};

export type CompanyContact = {
   __typename?: 'CompanyContact';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
};

export type CompanyInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  logoUrl?: Maybe<Scalars['String']>;
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  addressLine3?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  city: Scalars['String'];
  industry: Scalars['ID'];
};

export type CursorInput = {
  offset?: Maybe<Scalars['Int']>;
};

export type Demand = {
   __typename?: 'Demand';
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  skills: Array<Skill>;
  quantity: Scalars['Int'];
  maxHourlySalary?: Maybe<Scalars['Float']>;
  company: Company;
};

export type DemandInput = {
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Maybe<Scalars['ID']>>>;
  maxHourlySalary?: Maybe<Scalars['Float']>;
};

export type DemandMatch = {
   __typename?: 'DemandMatch';
  distance: Scalars['Int'];
  percentage: Scalars['Int'];
  demand: Demand;
};

export type Industry = {
   __typename?: 'Industry';
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MatchDemandResult = {
   __typename?: 'MatchDemandResult';
  matches: Array<DemandMatch>;
  pageInfo: PageInfo;
};

export type MatchQueryInput = {
  radius?: Maybe<Scalars['Int']>;
  skills: Array<Scalars['ID']>;
  postalCode: Scalars['String'];
  maxSalary?: Maybe<Scalars['Float']>;
  minQuantity?: Maybe<Scalars['Int']>;
};

export type MatchSupplyResult = {
   __typename?: 'MatchSupplyResult';
  matches: Array<SupplyMatch>;
  pageInfo: PageInfo;
};

export enum MatchType {
  Supply = 'Supply',
  Demand = 'Demand'
}

export type Mutation = {
   __typename?: 'Mutation';
  updateUser?: Maybe<Scalars['String']>;
  updateCompany?: Maybe<Company>;
  updateDemand?: Maybe<Demand>;
  removeDemand?: Maybe<Scalars['String']>;
  updateSupply?: Maybe<Supply>;
  removeSupply?: Maybe<Scalars['String']>;
  startUploadPicture?: Maybe<S3UploadGrant>;
  contactMatch?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};


export type MutationUpdateCompanyArgs = {
  company: CompanyInput;
};


export type MutationUpdateDemandArgs = {
  demand: DemandInput;
};


export type MutationRemoveDemandArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateSupplyArgs = {
  supply: SupplyInput;
};


export type MutationRemoveSupplyArgs = {
  id: Scalars['ID'];
};


export type MutationContactMatchArgs = {
  id: Scalars['ID'];
  matchType: MatchType;
  originId: Scalars['ID'];
};

export type PageInfo = {
   __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type Query = {
   __typename?: 'Query';
  me: User;
  companies?: Maybe<Array<Company>>;
  activeDemands?: Maybe<Array<Maybe<Demand>>>;
  activeSupplies?: Maybe<Array<Maybe<Supply>>>;
  demand?: Maybe<Demand>;
  supply?: Maybe<Supply>;
  company?: Maybe<Company>;
  skills: Array<Skill>;
  industries: Array<Industry>;
  teamNames: Array<Scalars['String']>;
  matchDemand: MatchSupplyResult;
  matchSupply: MatchDemandResult;
  matchSupplies: MatchSupplyResult;
  matchDemands: MatchDemandResult;
};


export type QueryDemandArgs = {
  id: Scalars['ID'];
};


export type QuerySupplyArgs = {
  id: Scalars['ID'];
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryMatchDemandArgs = {
  cursor?: Maybe<CursorInput>;
  id: Scalars['ID'];
  radius?: Maybe<Scalars['Int']>;
};


export type QueryMatchSupplyArgs = {
  cursor?: Maybe<CursorInput>;
  id: Scalars['ID'];
  radius?: Maybe<Scalars['Int']>;
};


export type QueryMatchSuppliesArgs = {
  cursor?: Maybe<CursorInput>;
  query: MatchQueryInput;
};


export type QueryMatchDemandsArgs = {
  cursor?: Maybe<CursorInput>;
  query: MatchQueryInput;
};

export type S3UploadGrant = {
   __typename?: 'S3UploadGrant';
  url: Scalars['String'];
  fields?: Maybe<Scalars['JSONScalar']>;
};

export type Skill = {
   __typename?: 'Skill';
  id: Scalars['ID'];
  group: Scalars['String'];
  name: Scalars['String'];
};

export type Supply = {
   __typename?: 'Supply';
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  skills: Array<Skill>;
  quantity: Scalars['Int'];
  hourlySalary?: Maybe<Scalars['Float']>;
  company: Company;
};

export type SupplyInput = {
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Maybe<Scalars['ID']>>>;
  hourlySalary?: Maybe<Scalars['Float']>;
};

export type SupplyMatch = {
   __typename?: 'SupplyMatch';
  distance: Scalars['Int'];
  percentage: Scalars['Int'];
  supply: Supply;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  externalId: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  companies?: Maybe<Array<Company>>;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type AddCompanyMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  addressLine1: Scalars['String'];
  postalCode: Scalars['String'];
  city: Scalars['String'];
  industry: Scalars['ID'];
};


export type AddCompanyMutation = (
  { __typename?: 'Mutation' }
  & { updateCompany?: Maybe<(
    { __typename?: 'Company' }
    & Pick<Company, 'id'>
  )> }
);

export type UserAddMutationVariables = {
  first: Scalars['String'];
  last: Scalars['String'];
  email: Scalars['String'];
};


export type UserAddMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type ConnectMutationVariables = {
  id: Scalars['ID'];
  origin: Scalars['ID'];
  type: MatchType;
};


export type ConnectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'contactMatch'>
);

export type RemoveDemandMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveDemandMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeDemand'>
);

export type RemoveSupplyMutationVariables = {
  id: Scalars['ID'];
};


export type RemoveSupplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeSupply'>
);

export type UpdateDemandMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Scalars['ID']>>;
  descriptionExt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
};


export type UpdateDemandMutation = (
  { __typename?: 'Mutation' }
  & { updateDemand?: Maybe<(
    { __typename?: 'Demand' }
    & Pick<Demand, 'id' | 'name'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id' | 'name' | 'group'>
    )> }
  )> }
);

export type UpdateSupplyMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Scalars['ID']>>;
  active: Scalars['Boolean'];
  descriptionExt?: Maybe<Scalars['String']>;
};


export type UpdateSupplyMutation = (
  { __typename?: 'Mutation' }
  & { updateSupply?: Maybe<(
    { __typename?: 'Supply' }
    & Pick<Supply, 'id' | 'name'>
  )> }
);

export type Check_StateQueryVariables = {};


export type Check_StateQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { companies?: Maybe<Array<(
      { __typename?: 'Company' }
      & { supplies?: Maybe<Array<(
        { __typename?: 'Supply' }
        & Pick<Supply, 'id'>
      )>>, demands?: Maybe<Array<(
        { __typename?: 'Demand' }
        & Pick<Demand, 'id'>
      )>> }
    )>> }
  ) }
);

export type DemandMatchesQueryVariables = {
  id: Scalars['ID'];
  radius?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CursorInput>;
};


export type DemandMatchesQuery = (
  { __typename?: 'Query' }
  & { result: (
    { __typename?: 'MatchSupplyResult' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'offset' | 'pageSize' | 'hasNextPage'>
    ), matches: Array<(
      { __typename?: 'SupplyMatch' }
      & Pick<SupplyMatch, 'distance' | 'percentage'>
      & { match: (
        { __typename?: 'Supply' }
        & Pick<Supply, 'id' | 'name' | 'description' | 'quantity'>
        & { salary: Supply['hourlySalary'] }
        & { skills: Array<(
          { __typename?: 'Skill' }
          & Pick<Skill, 'name'>
        )>, company: (
          { __typename?: 'Company' }
          & Pick<Company, 'id' | 'name' | 'addressLine1' | 'postalCode' | 'city'>
          & { contact: (
            { __typename?: 'CompanyContact' }
            & Pick<CompanyContact, 'firstName' | 'lastName' | 'pictureUrl'>
          ), industry?: Maybe<(
            { __typename?: 'Industry' }
            & Pick<Industry, 'name'>
          )> }
        ) }
      ) }
    )> }
  ) }
);

export type SupplyMatchesQueryVariables = {
  id: Scalars['ID'];
  radius?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CursorInput>;
};


export type SupplyMatchesQuery = (
  { __typename?: 'Query' }
  & { result: (
    { __typename?: 'MatchDemandResult' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'offset' | 'pageSize' | 'hasNextPage'>
    ), matches: Array<(
      { __typename?: 'DemandMatch' }
      & Pick<DemandMatch, 'distance' | 'percentage'>
      & { match: (
        { __typename?: 'Demand' }
        & Pick<Demand, 'id' | 'name' | 'description' | 'quantity'>
        & { salary: Demand['maxHourlySalary'] }
        & { skills: Array<(
          { __typename?: 'Skill' }
          & Pick<Skill, 'name'>
        )>, company: (
          { __typename?: 'Company' }
          & Pick<Company, 'id' | 'name' | 'addressLine1' | 'postalCode' | 'city'>
          & { contact: (
            { __typename?: 'CompanyContact' }
            & Pick<CompanyContact, 'firstName' | 'lastName' | 'pictureUrl'>
          ), industry?: Maybe<(
            { __typename?: 'Industry' }
            & Pick<Industry, 'name'>
          )> }
        ) }
      ) }
    )> }
  ) }
);

export type DasboardTeamsQueryVariables = {};


export type DasboardTeamsQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'pictureUrl'>
  ), activeDemands?: Maybe<Array<Maybe<(
    { __typename?: 'Demand' }
    & Pick<Demand, 'id' | 'name'>
    & { company: (
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'postalCode' | 'city'>
    ) }
  )>>>, activeSupplies?: Maybe<Array<Maybe<(
    { __typename?: 'Supply' }
    & Pick<Supply, 'id' | 'name'>
    & { company: (
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'postalCode' | 'city'>
    ) }
  )>>> }
);

export type GetDemandsQueryVariables = {};


export type GetDemandsQuery = (
  { __typename?: 'Query' }
  & { companies?: Maybe<Array<(
    { __typename?: 'Company' }
    & { demands?: Maybe<Array<(
      { __typename?: 'Demand' }
      & Pick<Demand, 'id' | 'name' | 'isActive' | 'description' | 'quantity'>
      & { skills: Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id' | 'name' | 'group'>
      )> }
    )>> }
  )>> }
);

export type RegistrationCompanyQueryVariables = {};


export type RegistrationCompanyQuery = (
  { __typename?: 'Query' }
  & { industries: Array<(
    { __typename?: 'Industry' }
    & Pick<Industry, 'id' | 'name'>
  )>, me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { companies?: Maybe<Array<(
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'name' | 'addressLine1' | 'postalCode' | 'city'>
      & { industry?: Maybe<(
        { __typename?: 'Industry' }
        & Pick<Industry, 'id'>
      )> }
    )>> }
  ) }
);

export type GetTeamsQueryVariables = {};


export type GetTeamsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'teamNames'>
  & { skills: Array<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'id' | 'name'>
  )>, companies?: Maybe<Array<(
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'addressLine1' | 'addressLine2' | 'addressLine3'>
    & { demands?: Maybe<Array<(
      { __typename?: 'Demand' }
      & Pick<Demand, 'id' | 'name' | 'isActive' | 'description' | 'quantity'>
      & { skills: Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      )> }
    )>>, supplies?: Maybe<Array<(
      { __typename?: 'Supply' }
      & Pick<Supply, 'id' | 'name' | 'isActive' | 'description' | 'quantity'>
      & { skills: Array<(
        { __typename?: 'Skill' }
        & Pick<Skill, 'id'>
      )> }
    )>> }
  )>> }
);

export type RegistrationUserQueryVariables = {};


export type RegistrationUserQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  ) }
);

export type GetSkillsQueryVariables = {};


export type GetSkillsQuery = (
  { __typename?: 'Query' }
  & { skills: Array<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'id' | 'name' | 'group'>
  )> }
);

export type UserQueryVariables = {};


export type UserQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    & { companies?: Maybe<Array<(
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'name' | 'addressLine1' | 'postalCode' | 'city'>
    )>> }
  ) }
);
