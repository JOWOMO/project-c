export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The LimitedString150 scalar type represents textual data, represented as UTF-8
   * character sequences, with a max length of 150.
   */
  LimitedString150: any;
  /**
   * The LimitedString50 scalar type represents textual data, represented as UTF-8
   * character sequences, with a max length of 50.
   */
  LimitedString50: any;
  /**
   * The LimitedString2000 scalar type represents textual data, represented as UTF-8
   * character sequences, with a max length of 2000.
   */
  LimitedString2000: any;
  /** Arbitrary JSON Properties for features */
  JSONScalar: any;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  companies?: Maybe<Array<Company>>;
  activeDemands?: Maybe<Array<Maybe<Demand>>>;
  activeSupplies?: Maybe<Array<Maybe<Supply>>>;
  demand?: Maybe<Demand>;
  supply?: Maybe<Supply>;
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

export type Industry = {
  __typename?: 'Industry';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CompanyContact = {
  __typename?: 'CompanyContact';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
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

export type MatchSupplyResult = {
  __typename?: 'MatchSupplyResult';
  matches: Array<SupplyMatch>;
  pageInfo: PageInfo;
};

export type SupplyMatch = {
  __typename?: 'SupplyMatch';
  distance: Scalars['Int'];
  percentage: Scalars['Int'];
  supply: Supply;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type CursorInput = {
  offset?: Maybe<Scalars['Int']>;
};

export type MatchDemandResult = {
  __typename?: 'MatchDemandResult';
  matches: Array<DemandMatch>;
  pageInfo: PageInfo;
};

export type DemandMatch = {
  __typename?: 'DemandMatch';
  distance: Scalars['Int'];
  percentage: Scalars['Int'];
  demand: Demand;
};

export type MatchQueryInput = {
  radius?: Maybe<Scalars['Int']>;
  skills: Array<Scalars['ID']>;
  postalCode: Scalars['String'];
  maxSalary?: Maybe<Scalars['Float']>;
  minQuantity?: Maybe<Scalars['Int']>;
};

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
  setMatchState?: Maybe<MatchDetails>;
  createSupportRequest?: Maybe<Scalars['String']>;
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


export type MutationSetMatchStateArgs = {
  answer: MatchAnswer;
  id: Scalars['ID'];
};


export type MutationCreateSupportRequestArgs = {
  description: Scalars['LimitedString2000'];
  page: Scalars['LimitedString2000'];
  summary: Scalars['LimitedString2000'];
};

export type UserInput = {
  firstName: Scalars['LimitedString150'];
  lastName: Scalars['LimitedString150'];
  email: Scalars['LimitedString150'];
};


export type CompanyInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['LimitedString50'];
  logoUrl?: Maybe<Scalars['LimitedString150']>;
  addressLine1: Scalars['LimitedString150'];
  addressLine2?: Maybe<Scalars['LimitedString150']>;
  addressLine3?: Maybe<Scalars['LimitedString150']>;
  postalCode: Scalars['LimitedString50'];
  city: Scalars['LimitedString50'];
  industry: Scalars['ID'];
};


export type DemandInput = {
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['LimitedString150'];
  description?: Maybe<Scalars['LimitedString2000']>;
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Maybe<Scalars['ID']>>>;
  maxHourlySalary?: Maybe<Scalars['Float']>;
};


export type SupplyInput = {
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['LimitedString150'];
  description?: Maybe<Scalars['LimitedString2000']>;
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Maybe<Scalars['ID']>>>;
  hourlySalary?: Maybe<Scalars['Float']>;
};

export type S3UploadGrant = {
  __typename?: 'S3UploadGrant';
  url: Scalars['String'];
  fields?: Maybe<Scalars['JSONScalar']>;
};


export enum MatchType {
  Supply = 'Supply',
  Demand = 'Demand'
}

/** This needs refactoring for all resource types: Address */
export type MatchDetails = {
  __typename?: 'MatchDetails';
  id: Scalars['ID'];
  name: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  addressLine1: Scalars['String'];
  postalCode: Scalars['String'];
  city: Scalars['String'];
};

export enum MatchAnswer {
  Opened = 'Opened',
  Accept = 'Accept',
  Reject = 'Reject'
}

export type AddCompanyMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  name: Scalars['LimitedString50'];
  addressLine1: Scalars['LimitedString150'];
  postalCode: Scalars['LimitedString50'];
  city: Scalars['LimitedString50'];
  industry: Scalars['ID'];
}>;


export type AddCompanyMutation = (
  { __typename?: 'Mutation' }
  & { updateCompany?: Maybe<(
    { __typename?: 'Company' }
    & Pick<Company, 'id'>
  )> }
);

export type UserAddMutationVariables = Exact<{
  first: Scalars['LimitedString150'];
  last: Scalars['LimitedString150'];
  email: Scalars['LimitedString150'];
}>;


export type UserAddMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUser'>
);

export type ConnectMutationVariables = Exact<{
  id: Scalars['ID'];
  origin: Scalars['ID'];
  type: MatchType;
}>;


export type ConnectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'contactMatch'>
);

export type SetMatchStateMutationVariables = Exact<{
  id: Scalars['ID'];
  answer: MatchAnswer;
}>;


export type SetMatchStateMutation = (
  { __typename?: 'Mutation' }
  & { setMatchState?: Maybe<(
    { __typename?: 'MatchDetails' }
    & Pick<MatchDetails, 'id' | 'name' | 'email' | 'firstName' | 'lastName' | 'pictureUrl' | 'addressLine1' | 'postalCode' | 'city'>
  )> }
);

export type RemoveDemandMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveDemandMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeDemand'>
);

export type RemoveSupplyMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveSupplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeSupply'>
);

export type SupportRequestMutationVariables = Exact<{
  description: Scalars['LimitedString2000'];
  summary: Scalars['LimitedString2000'];
  page: Scalars['LimitedString2000'];
}>;


export type SupportRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSupportRequest'>
);

export type UpdateDemandMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  name: Scalars['LimitedString150'];
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Scalars['ID']>>;
  descriptionExt?: Maybe<Scalars['LimitedString2000']>;
  active: Scalars['Boolean'];
}>;


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

export type UpdateSupplyMutationVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
  companyId: Scalars['ID'];
  name: Scalars['LimitedString150'];
  quantity: Scalars['Int'];
  skills?: Maybe<Array<Scalars['ID']>>;
  active: Scalars['Boolean'];
  descriptionExt?: Maybe<Scalars['LimitedString2000']>;
}>;


export type UpdateSupplyMutation = (
  { __typename?: 'Mutation' }
  & { updateSupply?: Maybe<(
    { __typename?: 'Supply' }
    & Pick<Supply, 'id' | 'name'>
  )> }
);

export type Check_StateQueryVariables = Exact<{ [key: string]: never; }>;


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

export type CompanyInfoFragment = (
  { __typename?: 'Company' }
  & Pick<Company, 'id' | 'name' | 'addressLine1' | 'postalCode' | 'city'>
  & { industry?: Maybe<(
    { __typename?: 'Industry' }
    & Pick<Industry, 'id' | 'name'>
  )> }
);

export type ContactInfoFragment = (
  { __typename?: 'CompanyContact' }
  & Pick<CompanyContact, 'id' | 'firstName' | 'lastName' | 'pictureUrl'>
);

export type DemandInfoFragment = (
  { __typename?: 'Demand' }
  & Pick<Demand, 'id' | 'name' | 'description' | 'quantity'>
  & { salary: Demand['maxHourlySalary'] }
  & { skills: Array<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'name' | 'id'>
  )> }
);

export type SupplyInfoFragment = (
  { __typename?: 'Supply' }
  & Pick<Supply, 'id' | 'name' | 'description' | 'quantity'>
  & { salary: Supply['hourlySalary'] }
  & { skills: Array<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'name' | 'id'>
  )> }
);

export type CompanyDetailsFromDemandQueryVariables = Exact<{
  id: Scalars['ID'];
  origin: Scalars['ID'];
}>;


export type CompanyDetailsFromDemandQuery = (
  { __typename?: 'Query' }
  & { query?: Maybe<(
    { __typename?: 'Supply' }
    & Pick<Supply, 'id'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id'>
    )> }
  )>, result?: Maybe<(
    { __typename?: 'Demand' }
    & Pick<Demand, 'id'>
    & { company: (
      { __typename?: 'Company' }
      & { contact: (
        { __typename?: 'CompanyContact' }
        & ContactInfoFragment
      ), demands?: Maybe<Array<(
        { __typename?: 'Demand' }
        & DemandInfoFragment
      )>> }
      & CompanyInfoFragment
    ) }
  )> }
);

export type CompanyDetailsFromSupplyQueryVariables = Exact<{
  id: Scalars['ID'];
  origin: Scalars['ID'];
}>;


export type CompanyDetailsFromSupplyQuery = (
  { __typename?: 'Query' }
  & { query?: Maybe<(
    { __typename?: 'Demand' }
    & Pick<Demand, 'id'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id'>
    )> }
  )>, result?: Maybe<(
    { __typename?: 'Supply' }
    & Pick<Supply, 'id'>
    & { company: (
      { __typename?: 'Company' }
      & { contact: (
        { __typename?: 'CompanyContact' }
        & ContactInfoFragment
      ), supplies?: Maybe<Array<(
        { __typename?: 'Supply' }
        & SupplyInfoFragment
      )>> }
      & CompanyInfoFragment
    ) }
  )> }
);

export type DemandMatchesQueryVariables = Exact<{
  id: Scalars['ID'];
  radius?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CursorInput>;
}>;


export type DemandMatchesQuery = (
  { __typename?: 'Query' }
  & { request?: Maybe<(
    { __typename?: 'Demand' }
    & Pick<Demand, 'id'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id'>
    )> }
  )>, result: (
    { __typename?: 'MatchSupplyResult' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'offset' | 'pageSize' | 'hasNextPage'>
    ), matches: Array<(
      { __typename?: 'SupplyMatch' }
      & Pick<SupplyMatch, 'distance' | 'percentage'>
      & { match: (
        { __typename?: 'Supply' }
        & { company: (
          { __typename?: 'Company' }
          & { contact: (
            { __typename?: 'CompanyContact' }
            & ContactInfoFragment
          ) }
          & CompanyInfoFragment
        ) }
        & SupplyInfoFragment
      ) }
    )> }
  ) }
);

export type SupplyMatchesQueryVariables = Exact<{
  id: Scalars['ID'];
  radius?: Maybe<Scalars['Int']>;
  cursor?: Maybe<CursorInput>;
}>;


export type SupplyMatchesQuery = (
  { __typename?: 'Query' }
  & { request?: Maybe<(
    { __typename?: 'Supply' }
    & Pick<Supply, 'id'>
    & { skills: Array<(
      { __typename?: 'Skill' }
      & Pick<Skill, 'id'>
    )> }
  )>, result: (
    { __typename?: 'MatchDemandResult' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'offset' | 'pageSize' | 'hasNextPage'>
    ), matches: Array<(
      { __typename?: 'DemandMatch' }
      & Pick<DemandMatch, 'distance' | 'percentage'>
      & { match: (
        { __typename?: 'Demand' }
        & { company: (
          { __typename?: 'Company' }
          & { contact: (
            { __typename?: 'CompanyContact' }
            & ContactInfoFragment
          ) }
          & CompanyInfoFragment
        ) }
        & DemandInfoFragment
      ) }
    )> }
  ) }
);

export type DasboardTeamsQueryVariables = Exact<{ [key: string]: never; }>;


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

export type RegistrationCompanyQueryVariables = Exact<{ [key: string]: never; }>;


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

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'teamNames'>
  & { skills: Array<(
    { __typename?: 'Skill' }
    & Pick<Skill, 'id' | 'name' | 'group'>
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

export type RegistrationUserQueryVariables = Exact<{ [key: string]: never; }>;


export type RegistrationUserQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
  ) }
);
