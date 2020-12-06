import six
from graphene import Scalar
from graphql.language.ast import StringValue

__limited_stringtype_cache = {}

def LimitedString(maxLength, **kwargs):
    if maxLength < 1:
        raise ValueError(f"maxLength should be equal or greater 1")

    typename = f"LimitedString{maxLength}"
    docstring = \
        f'''
        The {typename} scalar type represents textual data, represented as UTF-8
        character sequences, with a max length of {maxLength}.
        '''
    # inspired by / stolen from: https://github.com/graphql-python/graphene/issues/456#issuecomment-296907579
    class LimitedStringClass(Scalar):     
        @staticmethod
        def coerce_string(value):
            if isinstance(value, bool):
                return u'true' if value else u'false'

            str_value = six.text_type(value)
            if len(str_value) > maxLength:
                raise Exception(f"{typename} can only receive strings with less than {maxLength} chars!")
            return str_value

        serialize = coerce_string
        parse_value = coerce_string

        @staticmethod
        def parse_literal(ast):
            if isinstance(ast, StringValue):
                if len(ast.value) > maxLength:
                    raise Exception(f"{typename} can only receive strings with less than {maxLength} chars!")
                return ast.value
   
    if maxLength not in __limited_stringtype_cache:
        # yes we're creating a new class at runtime here
        limited_string_type = __limited_stringtype_cache[maxLength] = type(typename, (LimitedStringClass, ), {'__doc__': docstring})

    limited_string_type = __limited_stringtype_cache[maxLength]
    
    return limited_string_type(**kwargs)