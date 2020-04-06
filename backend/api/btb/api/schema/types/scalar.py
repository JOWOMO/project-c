import graphene

class JSONScalar(graphene.Scalar):
    """
    Arbitrary JSON Properties for features
    """

    @staticmethod
    def serialize(value):
        return value

    @staticmethod
    def parse_literal(node):
        return node.value

    @staticmethod
    def parse_value(value):
        return value
