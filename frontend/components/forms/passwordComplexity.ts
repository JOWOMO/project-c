export const passwordComplexity = (value: string) => true
    && value != null 
    && typeof(value) === "string"
    && value.length >= 6 
    && value.match(/[a-z]/) != null
    && value.match(/[A-Z]/) != null
;
